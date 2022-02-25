import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter, Input, OnChanges,
    OnInit,
    Output,
    TemplateRef
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AtomStateService } from "../../../services/atom-state/app-atom-state.service";
import { filter, map, switchMap, tap } from "rxjs/operators";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { User } from "../../../models/user.models";
import { TuiContextWithImplicit, TuiStringHandler } from "@taiga-ui/cdk";
import { LoadingService } from "../../../services/loading-service/loading.service";
import { RestApiService } from "../../../services/rest-api-service/rest-api.service";
import { GenerateHelper } from "../../../helpers/generate.helper";
import { ConverterHelper } from "../../../helpers/converter.helper";
import {Dashboard, DashboardResponse} from "../../../models/dashboards.models";
import { AtomStateMutations } from "../../../services/atom-state/atom-state.mutations";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
    selector: 'create-dashboard',
    templateUrl: './create-dashboard.component.html',
    styleUrls: ['./create-dashboard.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateDashboardComponent implements OnInit, OnChanges {
    @Input() initialValues: Dashboard;

    public formGroup: FormGroup;
    public userTemplate$: Observable<TemplateRef<any>> = AtomStateService.templates.getAtomValueByKey('TEMPLATE_PARAMETER_USER');
    public currentUser$: Observable<User>;
    public users$: Observable<User[]>;
    public searchedUsers$: Observable<User[]>;
    public loading$: Observable<boolean>;

    private loadingStarter$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    private searchValue$: BehaviorSubject<string> = new BehaviorSubject(null);
    private initialValuesUpdater$: BehaviorSubject<Dashboard> = new BehaviorSubject(null);

    @Output() cancelEvent: EventEmitter<boolean> = new EventEmitter();

    constructor(private formBuilder: FormBuilder, private restApiService: RestApiService) {
        this.formGroup = this.formBuilder.group({
            name: [null, Validators.required],
            team: [null],
            reporter: [null],
        })
    }

    ngOnChanges(): void {
        if (this.initialValues) {
            this.updateControl('name', this.initialValues.projectTitle);
            this.updateControl('reporter', this.initialValues.reporter);
            this.initialValuesUpdater$.next(this.initialValues);
        }
    }

    private updateControl(controlName: string, controlValue: string | User[]): void {
        this.formGroup?.controls?.[controlName]?.setValue(controlValue);
        this.formGroup?.controls?.[controlName]?.updateValueAndValidity();
    }

    ngOnInit() {
        this.loading$ = combineLatest([
            LoadingService.getLoadingState(),
            this.loadingStarter$
        ]).pipe(
            map(([loadingState, loadingId]: [string[], string]) => {
                return !!loadingState?.find((item: string) => item === loadingId)
            })
        );

        this.currentUser$ = AtomStateService.thisUserState.getAtomValueByKey('THIS_USER')
            .pipe(tap((user: User) => this.formGroup.controls.reporter.setValue(user)));

        this.users$ = this.currentUser$
            .pipe(switchMap((thisUser: User) => AtomStateService.systemUsersState.getAtomValueByKey('SYSTEM_USERS')
                .pipe(
                    map((users: User[]) => users.filter((systemUser: User) => systemUser.id !== thisUser.id))
                )
            ));

        combineLatest([
            this.initialValuesUpdater$,
            AtomStateService.systemUsersState.getAtomValueByKey('SYSTEM_USERS')
        ]).pipe(
            tap(([dashboard, users]:[Dashboard, User[]]) => {
                if (dashboard?.assignee?.length && users?.length) {
                    this.updateControl(
                        'team',
                        users?.filter((user: User) => dashboard?.assignee?.includes(user.id) && dashboard.reporter !== user.id)
                    );
                }
            }),
            untilDestroyed(this)
        ).subscribe()

        this.searchedUsers$ = this.searchValue$
            .pipe(
                switchMap((searchValue: string) => searchValue
                    ? this.users$.pipe(
                        map((users: User[]) => users
                            .filter((user: User) => user.userInfo.firstName.toLocaleLowerCase()
                                    .includes(searchValue.toLocaleLowerCase())
                            || user.userInfo.lastName.toLocaleLowerCase()
                                    .includes(searchValue.toLocaleLowerCase()))
                        )
                    ) : this.users$
                )
            );
    }

    readonly stringify: TuiStringHandler<User | TuiContextWithImplicit<User>> = item =>
        'userInfo' in item
            ? `${item.userInfo?.firstName || ''} ${item.userInfo?.lastName || ''}`
            : item.$implicit?.userInfo?.firstName || '';

    onUsersSearch(searchString: string) {
        this.searchValue$.next(searchString);
    }

    onCreateAndUpdate(): void {
        this.formGroup.markAllAsTouched();
        this.formGroup.updateValueAndValidity();
        if (this.formGroup.valid) {
            this.loadingStarter$.next(GenerateHelper.generateUUID());
            this.restApiService[this.initialValues ? 'updateDashboard' : 'createDashboard'](
                ConverterHelper.convertFormToDashboardPayload(this.formGroup, this.initialValues?.id),
                this.loadingStarter$.value
            ).pipe(
                filter((dashboard: DashboardResponse) => !!dashboard),
                tap((dashboard: DashboardResponse) => {
                    AtomStateMutations.setDashboard(ConverterHelper.convertDashboardResponseToDashboard(dashboard));
                    this.cancelEvent.emit(true);
                })
            ).subscribe();
        }
    }
}
