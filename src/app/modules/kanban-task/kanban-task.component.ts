import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { Task, TaskResponse } from "../../models/task.models";
import { Icon, Transition } from "../../services/dictionary-provider/dictionaries.models";
import { DictionariesService } from "../../services/dictionary-provider/dictionaries.service";
import { Observable } from "rxjs";
import { AtomStateService } from "../../services/atom-state/app-atom-state.service";
import { filter, map, tap } from "rxjs/operators";
import { TooltipAction } from "../../models/ui.models";
import { ConverterHelper } from "../../helpers/converter.helper";
import { User } from "../../models/user.models";
import { UNKNOWN_USER } from "../../constants/user.constants";
import { AtomStateMutations } from "../../services/atom-state/atom-state.mutations";
import { RestApiService } from "../../services/rest-api-service/rest-api.service";

@Component({
    selector: 'kanban-task',
    templateUrl: './kanban-task.component.html',
    styleUrls: ['./kanban-task.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanTaskComponent implements OnInit, OnChanges {
    @Input() task: Task;

    public taskIcon: Icon;
    public isActiveTask$: Observable<boolean>;
    public transitions: TooltipAction[] = [];
    public dictionaries = DictionariesService.arrayDictionaries;
    public assignee$: Observable<User>;
    public userTemplate$: Observable<TemplateRef<any>> = AtomStateService.templates.getAtomValueByKey('TEMPLATE_PARAMETER_USER');

    constructor(private restApiService: RestApiService) {}

    ngOnInit(): void {
        this.isActiveTask$ = AtomStateService.queryParametersEntities.getAtomValueByKey('QUERY_PARAMS_TASK_ID')
            .pipe(map((taskId: string) => taskId === this.task.id));
        this.transitions = ConverterHelper.transitionToTooltipAction(this.dictionaries.transition
            .filter((transition: Transition) => transition.fromStatus === this.task?.status))
        // warning, maybe not update after change assignee, test on API
        this.assignee$ = AtomStateService.systemUsersState.getAtomValueByKey('SYSTEM_USERS')
            .pipe(map((users: User[]) => users?.find((user: User) => user.id === this.task?.assignee)
                || (this.task?.assignee ? UNKNOWN_USER : null)))
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.task && changes.task) {
            this.taskIcon = DictionariesService.getIconForTask(this.task.type, this.task.priority);
        }
    }

    onStatusTransition(tooltipAction: TooltipAction): void {
        this.restApiService.updateTask(
            ConverterHelper.convertTaskToTaskPayload({...this.task, status: tooltipAction.customData?.toStatus}),
        ).pipe(
            filter((task: TaskResponse) => !!task),
            tap((task: TaskResponse) => {
                AtomStateMutations.setTask(ConverterHelper.convertTaskResponseToTask(task));
            })
        ).subscribe()
    }
}
