import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskParameterComponent } from './task-parameter.component';
import { TuiDataListWrapperModule, TuiSelectModule } from "@taiga-ui/kit";
import { TuiTextfieldControllerModule } from "@taiga-ui/core";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        TaskParameterComponent
    ],
    exports: [
        TaskParameterComponent
    ],
    imports: [
        CommonModule,
        TuiSelectModule,
        TuiTextfieldControllerModule,
        TuiDataListWrapperModule,
        FormsModule,
    ]
})
export class TaskParameterModule { }
