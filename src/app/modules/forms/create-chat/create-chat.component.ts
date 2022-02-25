import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { AtomStateService } from "../../../services/atom-state/app-atom-state.service";
import { User } from "../../../models/user.models";
import { LoadingService } from "../../../services/loading-service/loading.service";
import { map, switchMap, tap } from "rxjs/operators";
import { TuiContextWithImplicit, TuiStringHandler } from "@taiga-ui/cdk";
import { GenerateHelper } from "../../../helpers/generate.helper";
import { ConverterHelper } from "../../../helpers/converter.helper";
import { SocketService } from "../../../services/socket-server/socket.service";

@Component({
  selector: 'create-chat',
  templateUrl: './create-chat.component.html',
  styleUrls: ['./create-chat.component.less']
})
export class CreateChatComponent implements OnInit {
    public formGroup: FormGroup;
    public userTemplate$: Observable<TemplateRef<any>> = AtomStateService.templates.getAtomValueByKey('TEMPLATE_PARAMETER_USER');
    public currentUser$: Observable<User>;
    public users$: Observable<User[]>;
    public searchedUsers$: Observable<User[]>;
    public loading$: Observable<boolean>;

    private loadingStarter$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    private searchValue$: BehaviorSubject<string> = new BehaviorSubject(null);

    @Output() cancelEvent: EventEmitter<boolean> = new EventEmitter();

    constructor(private formBuilder: FormBuilder, private socketService: SocketService) {
        this.formGroup = this.formBuilder.group({
            name: [null, Validators.required],
            team: [null, Validators.required],
            reporter: [null, Validators.required],
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

        this.users$ = this.currentUser$
            .pipe(switchMap((thisUser: User) => AtomStateService.systemUsersState.getAtomValueByKey('SYSTEM_USERS')
                .pipe(map((users: User[]) => users.filter((systemUser: User) => systemUser.id !== thisUser.id)))
            ));

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
            this.socketService.createChat(
                ConverterHelper.convertFormToChatPayload(this.formGroup),
                this.loadingStarter$.value
            );
            this.cancelEvent.emit(true);
        }
    }
}
