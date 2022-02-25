import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AtomStateService } from "../../services/atom-state/app-atom-state.service";
import { combineLatest, Observable } from "rxjs";
import { Task } from "../../models/task.models";
import { filter, map, switchMap } from "rxjs/operators";
import { Dashboard } from "../../models/dashboards.models";
import {User} from "../../models/user.models";

@Component({
    selector: 'dashboard-detail',
    templateUrl: './dashboard-detail.component.html',
    styleUrls: ['./dashboard-detail.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardDetailComponent implements OnInit {
    public tasks$: Observable<Task[]>;
    public activeTask$: Observable<Task>;
    public dashboard$: Observable<Dashboard>;
    public user$: Observable<User>;

    ngOnInit(): void {
        // detect url dashboardId and getDashboard info into storage
        this.dashboard$ = AtomStateService.queryParametersEntities.getAtomValueByKey('QUERY_PARAMS_DASHBOARD_ID')
            .pipe(
                switchMap((dashboardId: string) => {
                    return AtomStateService.dashboardState.getAtomValueByKey('DASHBOARDS').pipe(
                        map((dashboards: Dashboard[]) => dashboards
                                ?.find((dashboard:Dashboard) =>  dashboard.id === dashboardId)
                        ),
                )})
            );

        // detect dashboard data and filter tasks per dashboard
        this.tasks$ = combineLatest(([
            AtomStateService.tasksState.getAtomValueByKey('TASKS'),
            this.dashboard$,
        ])).pipe(
            filter(([tasks, thisDashboard]: [Task[], Dashboard]) => !!(tasks && thisDashboard)),
            map(([tasks, thisDashboard]: [Task[], Dashboard]) => {
                return tasks?.filter((task: Task) => task.dashboardId === thisDashboard.id)
            }),
        )

        // track active task to show detail info
        this.activeTask$ = AtomStateService.queryParametersEntities.getAtomValueByKey('QUERY_PARAMS_TASK_ID')
            .pipe(
                switchMap((taskId: string) => {
                    return this.tasks$.pipe(map((tasks: Task[]) => tasks.find((task: Task) => task.id === taskId)))
                })
            );

        this.user$ = AtomStateService.thisUserState.getAtomValueByKey('THIS_USER');
    }
}
