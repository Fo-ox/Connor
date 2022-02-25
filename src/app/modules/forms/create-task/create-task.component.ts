import {Component, EventEmitter, OnInit, Output, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {AtomStateService} from "../../../services/atom-state/app-atom-state.service";
import {User} from "../../../models/user.models";
import {RestApiService} from "../../../services/rest-api-service/rest-api.service";
import {LoadingService} from "../../../services/loading-service/loading.service";
import {filter, map, switchMap, tap} from "rxjs/operators";
import {TuiContextWithImplicit, TuiStringHandler} from "@taiga-ui/cdk";
import {GenerateHelper} from "../../../helpers/generate.helper";
import {ConverterHelper} from "../../../helpers/converter.helper";
import {AtomStateMutations} from "../../../services/atom-state/atom-state.mutations";
import {TaskResponse} from "../../../models/task.models";
import {Dashboard} from "../../../models/dashboards.models";
import {DictionariesService} from "../../../services/dictionary-provider/dictionaries.service";

@Component({
    selector: 'create-task',
    templateUrl: './create-task.component.html',
    styleUrls: ['./create-task.component.less'],
})
export class CreateTaskComponent implements OnInit {
    public formGroup: FormGroup;
    public userTemplate$: Observable<TemplateRef<any>> = AtomStateService.templates.getAtomValueByKey('TEMPLATE_PARAMETER_USER');
    public typeTemplate$: Observable<TemplateRef<any>> = AtomStateService.templates.getAtomValueByKey('TEMPLATE_PARAMETER_TYPE');
    public priorityTemplate$: Observable<TemplateRef<any>> = AtomStateService.templates.getAtomValueByKey('TEMPLATE_PARAMETER_PRIORITY');
    public currentUser$: Observable<User>;
    public users$: Observable<User[]>;
    public currentDashboard$: Observable<Dashboard>;
    public searchedUsers$: Observable<User[]>;
    public loading$: Observable<boolean>;
    public dictionaries = DictionariesService.arrayDictionaries;

    private loadingStarter$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    private searchValue$: BehaviorSubject<string> = new BehaviorSubject(null);

    @Output() cancelEvent: EventEmitter<boolean> = new EventEmitter();

    constructor(private formBuilder: FormBuilder, private restApiService: RestApiService) {
        this.formGroup = this.formBuilder.group({
            name: [null, Validators.required],
            description: [null],
            type: [null, Validators.required],
            status: [null],
            priority: [null],
            assignee: [null],
            reporter: [null, Validators.required],
            dashboardId: [null, Validators.required]
        })
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

        this.users$ = AtomStateService.systemUsersState.getAtomValueByKey('SYSTEM_USERS');

        this.currentDashboard$ = AtomStateService.queryParametersEntities.getAtomValueByKey('QUERY_PARAMS_DASHBOARD_ID')
            .pipe(
                switchMap((dashboardId: string) => {
                    return AtomStateService.dashboardState.getAtomValueByKey('DASHBOARDS').pipe(
                        map((dashboards: Dashboard[]) => dashboards
                            ?.find((dashboard:Dashboard) =>  dashboard.id === dashboardId)
                        ),
                        tap((dashboard: Dashboard) => this.formGroup.controls.dashboardId.setValue(dashboard?.id))
                    )})
            );
        this.formGroup.controls.status.setValue(this.dictionaries.status[0].key);


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

    onCreate(): void {
        this.formGroup.markAllAsTouched();
        this.formGroup.updateValueAndValidity();
        if (this.formGroup.valid) {
            this.loadingStarter$.next(GenerateHelper.generateUUID());
            this.restApiService.createTask(
                ConverterHelper.convertFormToTaskPayload(this.formGroup),
                this.loadingStarter$.value
            ).pipe(
                filter((task: TaskResponse) => !!task),
                tap((task: TaskResponse) => {
                    AtomStateMutations.setTask(ConverterHelper.convertTaskResponseToTask(task));
                    this.cancelEvent.emit(true);
                })
            ).subscribe();
        }
    }
}
