import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Task } from "../../models/task.models";
import { RouteLinks, RouteQueryParameter, RoutingService } from "../../services/routing-service/routing.service";

@Component({
    selector: 'kanban-task-col',
    templateUrl: './kanban-task-col.component.html',
    styleUrls: ['./kanban-task-col.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class KanbanTaskColComponent {

    constructor(private routingService: RoutingService) {
    }

    @Input() columnName: string;
    @Input() tasks: Task[];

    public allTaskCount: number = 4;
    public filteredTaskCount: number = 10;

    public onSelectTask(dashboardId: string, id: string): void {
        this.routingService.navigate(
            RouteLinks.DASHBOARDS_DETAIL,
            {
                [RouteQueryParameter.DASHBOARD_ID]: dashboardId,
                [RouteQueryParameter.TASK_ID]: id,
            },
        )
    }
}
