import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    Input,
    OnChanges, OnInit, Output,
    SimpleChanges,
    TemplateRef
} from '@angular/core';
import { Task } from "../../models/task.models";
import { DictionariesService } from "../../services/dictionary-provider/dictionaries.service";
import { parametersNameMap, parametersTemplateMap } from "../../constants/parameters.constants";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { AtomStateService } from "../../services/atom-state/app-atom-state.service";
import { map, take, tap } from "rxjs/operators";
import { Dictionary } from "../../services/dictionary-provider/dictionaries.models";
import { User } from "../../models/user.models";
import { UNKNOWN_USER } from "../../constants/user.constants";
import {Dashboard} from "../../models/dashboards.models";

@Component({
    selector: 'task-parameter',
    templateUrl: './task-parameter.component.html',
    styleUrls: ['./task-parameter.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskParameterComponent implements OnChanges, OnInit {
    @Input() parameterName: keyof Task;
    @Input() parameterValue: string;
    @Input() editable: boolean = false;
    @Input() dashboard: Dashboard;

    @Output() parameterValueChanges: EventEmitter<string> = new EventEmitter();

    public parameterKey: string;
    public dictionaries = DictionariesService.objectDictionaries;
    public arrayDictionaries = DictionariesService.arrayDictionaries;
    public systemUser$: Observable<User[]>;

    public emptyTemplate$: Observable<TemplateRef<any>> = AtomStateService.templates.getAtomValueByKey('TEMPLATE_PARAMETER_EMPTY');
    public valueTemplate$: Observable<TemplateRef<any>>;
    public valueContext$: Observable<Dictionary | User | string>;
    public valueItems: Array<Dictionary | User | string> = [];

    private valueUpdater$: BehaviorSubject<Dictionary | User | string> = new BehaviorSubject(null);
    private dashboardUpdater$: BehaviorSubject<Dashboard> = new BehaviorSubject(null);

    ngOnInit(): void {
        const templateStorageKey = parametersTemplateMap.get(this.parameterName);
        templateStorageKey && (this.valueTemplate$ = AtomStateService.templates.getAtomValueByKey(templateStorageKey));

        this.valueContext$ = combineLatest([
            this.valueTemplate$,
            this.valueUpdater$
        ]).pipe(map(([, context]: [TemplateRef<any>, Dictionary | User | string]) => context));

        this.systemUser$ = combineLatest([
            AtomStateService.systemUsersState.getAtomValueByKey('SYSTEM_USERS'),
            this.dashboardUpdater$,
            this.valueUpdater$,
        ]).pipe(
            map(([users, dashboard, value]: [User[], Dashboard, Dictionary | User | string]) => {
                this.valueItems = users?.filter((user: User) => dashboard?.assignee?.includes(user.id))
                return users
            })
        )
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.dashboard && this.dashboardUpdater$.next(this.dashboard);
        this.parameterKey = parametersNameMap.get(this.parameterName);
        if (this.parameterName && (changes.parameterName || changes.parameterValue)) {
            if (Object.keys(this.dictionaries).includes(this.parameterName)) {
                this.valueUpdater$.next(this.dictionaries[this.parameterName]?.[this.parameterValue]);
                this.valueItems = this.arrayDictionaries[this.parameterName];
            } else if (this.parameterName === 'assignee' || this.parameterName === 'reporter') {
                AtomStateService.systemUsersState.getAtomValueByKey('SYSTEM_USERS').pipe(
                        tap((users: User[]) => {
                            this.valueUpdater$.next(users?.find((user: User) => user.id === this.parameterValue)
                                || (this.parameterValue ? UNKNOWN_USER : null)
                            )
                        }),
                        take(1)).subscribe();
            } else {
                this.valueUpdater$.next(this.parameterValue);
            }
        }
    }

    onParameterValueChanges(event: any) {
        this.parameterValueChanges.emit(event?.key || event?.id)
    }
}
