import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CommonHelper} from "../../helpers/common.helper";
import {TASKS} from "../../mockups/task.mockups";
import {User} from "../../models/user.models";
import {AtomStateService} from "../../services/atom-state/app-atom-state.service";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {Task} from "../../models/task.models";
import {filter, map, tap} from "rxjs/operators";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {DictionariesService} from "../../services/dictionary-provider/dictionaries.service";
import {Dictionary} from "../../services/dictionary-provider/dictionaries.models";

@UntilDestroy()
@Component({
    selector: 'task-chart',
    templateUrl: './task-chart.component.html',
    styleUrls: ['./task-chart.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskChartComponent implements OnInit, OnChanges {
    @Input() set tasks(tasks: Task[]) {
        if (tasks) {
            this.taskTypesAssignment = []
            const groupedByType = CommonHelper.objectGroupByParameter<Task>(
                tasks,
                'type',
                1,
            );
            DictionariesService.arrayDictionaries.type.forEach((type: Dictionary) => {
                groupedByType[type.key] && this.taskTypesAssignment.push({
                    type: type.displayName, count: groupedByType[type.key]?.length
                })
            })
        }
        this.taskSubject$.next(tasks);
    };

    public taskTypesAssignment: {type: string, count: number}[] = [];
    public dictionaries = DictionariesService.arrayDictionaries;

    public users$: Observable<User[]> = AtomStateService.systemUsersState.getAtomValueByKey('SYSTEM_USERS')

    public chartData$: Observable<{totalEstimates: number, estimates: number[], labels: string[], resolvedEstimates?: number}>;
    public activeItemIndex: number = null;

    public readonly NOT_ASSIGNED = 'Not Assigned';

    private taskSubject$: BehaviorSubject<Task[]> = new BehaviorSubject(null);


    constructor() {
    }

    ngOnChanges(changes: SimpleChanges): void {

    }

    ngOnInit(): void {
        this.chartData$ = combineLatest([
            this.taskSubject$,
            this.users$
        ]).pipe(
            filter(([tasks, users]: [Task[], User[]]) => !!tasks?.length && !!users?.length),
            map(([tasks, users]: [Task[], User[]]) => {
                const groupedByAssignee = CommonHelper.objectGroupByParameter<Task>(
                    tasks,
                    'assignee',
                    1,
                    this.NOT_ASSIGNED,
                );

                const estimates = [];
                const labels = [];

                if (groupedByAssignee[this.NOT_ASSIGNED]?.length) {
                    estimates.push(TaskChartComponent.getEstimate(groupedByAssignee, this.NOT_ASSIGNED));
                    labels.push(this.NOT_ASSIGNED)

                    delete groupedByAssignee[this.NOT_ASSIGNED];
                }

                Object.keys(groupedByAssignee).forEach((assigneeId: string) => {
                    estimates.push(TaskChartComponent.getEstimate(groupedByAssignee, assigneeId));
                    labels.push(TaskChartComponent.getLabel(users, assigneeId))
                })

                const totalEstimates = estimates.reduce((prev, next) => prev + next)
                let resolvedEstimates: number = 0;
                tasks.forEach((task: Task) => {
                    if (typeof task.resolvedEstimate === 'number' && !Number.isNaN(task.resolvedEstimate) && task.completed) {
                        resolvedEstimates += task.resolvedEstimate
                    }
                })

                return { totalEstimates, estimates, labels, resolvedEstimates }
            }),
        );
    }

    public getColor(index: number): string {
        return `var(--tui-chart-${index > 9 ? index % 10 : index})`;
    }

    public isItemActive(index: number): boolean {
        return this.activeItemIndex === index;
    }

    private static getEstimate(groupedByAssignee: Record<string, Task[]>, assigneeId: string): number {
        let total: number = 0;
        groupedByAssignee[assigneeId]
            .forEach((task: Task) => {
                if (!task.completed) {
                    total = total + (+task.predictEstimate || 0)
                }
            });
        return total;
    }

    private static getLabel(users: User[], assigneeId: string): string {
        const assigneeUser: User = users.find((user: User) => user.id === assigneeId || user.externalSystemId === assigneeId);
        return assigneeUser
            ? `${assigneeUser?.userInfo?.firstName} ${assigneeUser?.userInfo?.lastName}`
            : 'unknown user';
    }
}
