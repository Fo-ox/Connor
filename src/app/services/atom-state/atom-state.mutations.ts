import { Dashboard } from "../../models/dashboards.models";
import { switchMap, take } from "rxjs/operators";
import { AtomStateService } from "./app-atom-state.service";
import { Task } from "../../models/task.models";
import { User } from "../../models/user.models";

export class AtomStateMutations {
    public static setDashboard(newDashBoard: Dashboard): void {
        AtomStateService.dashboardState.getAtomValueByKey('DASHBOARDS')
            .pipe(
                take(1),
                switchMap((dashboards: Dashboard[]) => {
                    if (dashboards.find((dashboard: Dashboard) => dashboard.id === newDashBoard.id)) {
                        return AtomStateService.dashboardState.setAtomByKey({
                            key: 'DASHBOARDS',
                            value: dashboards.map((dashboard: Dashboard) => dashboard.id === newDashBoard.id ? newDashBoard : dashboard)
                        })
                    }
                    return AtomStateService.dashboardState.setAtomByKey({
                        key: 'DASHBOARDS',
                        value: dashboards?.length
                            ? dashboards.concat(newDashBoard)
                            : [newDashBoard]
                    })
                }),
            ).subscribe();
    }

    public static setTask(newTask: Task): void {
        AtomStateService.tasksState.getAtomValueByKey('TASKS')
            .pipe(
                take(1),
                switchMap((tasks: Task[]) => {
                    if (tasks.find((task: Task) => task.id === newTask.id)) {
                        return AtomStateService.tasksState.setAtomByKey({
                            key: 'TASKS',
                            value: tasks.map((task: Task) => task.id === newTask.id ? newTask : task)
                        })
                    }
                    return AtomStateService.tasksState.setAtomByKey({
                        key: 'TASKS',
                        value: tasks?.length
                            ? tasks.concat(newTask)
                            : [newTask]
                    })
                }),
            ).subscribe();
    }

    public static setUser(newUser: User): void {
        AtomStateService.systemUsersState.getAtomValueByKey('SYSTEM_USERS')
            .pipe(
                take(1),
                switchMap((users: User[]) => {
                    return AtomStateService.systemUsersState.setAtomByKey({
                        key: 'SYSTEM_USERS',
                        value: users?.length
                            ? users.concat(newUser)
                            : [newUser]
                    })
                }),
            ).subscribe();
    }
}
