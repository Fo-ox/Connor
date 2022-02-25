import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanTaskColComponent } from './kanban-task-col.component';
import { KanbanTaskModule } from "../kanban-task/kanban-task.module";
import { TuiScrollbarModule } from "@taiga-ui/core";

@NgModule({
    declarations: [
        KanbanTaskColComponent
    ],
    exports: [
        KanbanTaskColComponent
    ],
    imports: [
        CommonModule,
        KanbanTaskModule,
        TuiScrollbarModule
    ]
})
export class KanbanTaskColModule { }
