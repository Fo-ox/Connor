import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardDetailComponent } from './dashboard-detail.component';
import { NavigationModule } from "../navigation/navigation.module";
import { DashboardsDetailRoutingModule } from "./dashboard-detail-routing.module";
import { KanbanModule } from "../kanban/kanban.module";
import { TaskDetailModule } from "../task-detail/task-detail.module";
import { DialogTriggerModule } from "../dialog/dialog-trigger/dialog-trigger.module";

@NgModule({
    declarations: [
        DashboardDetailComponent
    ],
    imports: [
        CommonModule,
        DashboardsDetailRoutingModule,
        NavigationModule,
        KanbanModule,
        TaskDetailModule,
        DialogTriggerModule
    ]
})
export class DashboardDetailModule { }
