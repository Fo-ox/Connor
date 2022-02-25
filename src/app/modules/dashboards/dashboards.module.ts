import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardsComponent } from './dashboards.component';
import { DashboardsRoutingModule } from "./dashboards-routing.module";
import { NavigationModule } from "../navigation/navigation.module";
import { DbKanbanRowModule } from "./db-kanban-row/db-kanban-row.module";
import { TuiScrollbarModule } from "@taiga-ui/core";
import { CreateDashboardModule } from "../forms/create-dashboard/create-dashboard.module";
import { DialogTriggerModule } from "../dialog/dialog-trigger/dialog-trigger.module";

@NgModule({
    declarations: [
        DashboardsComponent,
    ],
    imports: [
        CommonModule,
        DashboardsRoutingModule,
        NavigationModule,
        DbKanbanRowModule,
        TuiScrollbarModule,
        CreateDashboardModule,
        DialogTriggerModule,
    ]
})
export class DashboardsModule { }
