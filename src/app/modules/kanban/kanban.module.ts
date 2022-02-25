import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanComponent } from './kanban.component';
import { KanbanToolsModule } from "../kanban-tools/kanban-tools.module";
import { KanbanTaskColModule } from "../kanban-task-col/kanban-task-col.module";
import {CreateTaskModule} from "../forms/create-task/create-task.module";
import {TuiHintModule} from "@taiga-ui/core";

@NgModule({
    declarations: [
        KanbanComponent
    ],
    exports: [
        KanbanComponent
    ],
    imports: [
        CommonModule,
        KanbanToolsModule,
        KanbanTaskColModule,
        CreateTaskModule,
        TuiHintModule
    ]
})
export class KanbanModule { }
