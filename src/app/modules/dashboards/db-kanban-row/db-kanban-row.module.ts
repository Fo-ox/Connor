import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolymorpheusModule,POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus'
import {
    TuiDialogModule,
    TuiNotificationsModule,
    TuiButtonModule,
    TuiTextfieldControllerModule,
    TuiDataListModule, TuiScrollbarModule,
} from "@taiga-ui/core";
import { DbKanbanRowComponent } from './db-kanban-row.component';
import { DbKanbanModule } from "../db-kanban/db-kanban.module";
import { CreateDashboardModule } from "../../forms/create-dashboard/create-dashboard.module";

@NgModule({
    declarations: [
        DbKanbanRowComponent
    ],
    exports: [
        DbKanbanRowComponent
    ],
    imports: [
        CommonModule,
        DbKanbanModule,
        TuiDialogModule,
        TuiNotificationsModule,
        TuiButtonModule,
        TuiTextfieldControllerModule,
        TuiDataListModule,
        TuiScrollbarModule,
        CreateDashboardModule,
    ]
})
export class DbKanbanRowModule { }
