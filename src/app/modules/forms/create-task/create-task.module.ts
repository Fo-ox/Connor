import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTaskComponent } from './create-task.component';
import { ReactiveFormsModule } from "@angular/forms";
import {
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    TuiInputModule,
    TuiMultiSelectModule,
    TuiSelectModule
} from "@taiga-ui/kit";
import { TuiLoaderModule, TuiTextfieldControllerModule } from "@taiga-ui/core";

@NgModule({
    declarations: [
        CreateTaskComponent
    ],
    exports: [
        CreateTaskComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TuiInputModule,
        TuiTextfieldControllerModule,
        TuiMultiSelectModule,
        TuiDataListWrapperModule,
        TuiLoaderModule,
        TuiSelectModule,
        TuiComboBoxModule
    ]
})
export class CreateTaskModule { }
