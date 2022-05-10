import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskTableComponent } from './task-table.component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import {ArrayProtoPipeModule} from "../../pipes/array-proto-pipe/array-proto-pipe.module";
import {TaskParameterModule} from "../task-parameter/task-parameter.module";
import {TuiScrollbarModule} from "@taiga-ui/core";

@NgModule({
    declarations: [
        TaskTableComponent
    ],
    exports: [
        TaskTableComponent
    ],
    imports: [
        CommonModule,
        TuiTableModule,
        ArrayProtoPipeModule,
        TaskParameterModule,
        TuiScrollbarModule,
    ]
})
export class TaskTableModule { }
