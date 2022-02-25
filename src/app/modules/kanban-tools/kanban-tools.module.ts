import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanToolsComponent } from './kanban-tools.component';
import { SvgIconsModule } from "@ngneat/svg-icon";
import {CreateTaskModule} from "../forms/create-task/create-task.module";
import {TuiHintModule} from "@taiga-ui/core";

@NgModule({
    declarations: [
        KanbanToolsComponent
    ],
    exports: [
        KanbanToolsComponent
    ],
    imports: [
        CommonModule,
        SvgIconsModule,
        CreateTaskModule,
        TuiHintModule
    ]
})
export class KanbanToolsModule { }
