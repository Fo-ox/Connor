import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CommonHelper} from "../../helpers/common.helper";
import {TASKS} from "../../mockups/task.mockups";
import {User} from "../../models/user.models";
import {AtomStateService} from "../../services/atom-state/app-atom-state.service";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {Task} from "../../models/task.models";
import {filter, map, tap} from "rxjs/operators";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
    selector: 'task-chart',
    templateUrl: './task-chart.component.html',
    styleUrls: ['./task-chart.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskChartComponent implements OnInit, OnChanges {
    @Input() set tasks(tasks: Task[]) {
        this.taskSubject$.next(tasks);
    };

    public users$: Observable<User[]> = AtomStateService.systemUsersState.getAtomValueByKey('SYSTEM_USERS')

    public chartData$: Observable<{totalEstimates: number, estimates: number[], labels: string[]}>;
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

                return { totalEstimates, estimates, labels }
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
        return groupedByAssignee[assigneeId]
            .reduce(function (acc: number, task: Task) { return acc + +task.predictEstimate || 0}, 0);
    }

    private static getLabel(users: User[], assigneeId: string): string {
        const assigneeUser: User = users.find((user: User) => user.id === assigneeId);
        return assigneeUser
            ? `${assigneeUser?.userInfo?.firstName} ${assigneeUser?.userInfo?.lastName}`
            : 'unknown user';
    }
}