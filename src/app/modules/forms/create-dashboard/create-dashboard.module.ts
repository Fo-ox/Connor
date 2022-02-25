import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateDashboardComponent } from './create-dashboard.component';
import { ReactiveFormsModule } from "@angular/forms";
import { TuiDataListWrapperModule, TuiInputModule, TuiMultiSelectModule, TuiSelectModule } from "@taiga-ui/kit";
import { TuiLoaderModule, TuiTextfieldControllerModule } from "@taiga-ui/core";
import { TuiLetModule } from "@taiga-ui/cdk";

@NgModule({
    declarations: [
        CreateDashboardComponent
    ],
    exports: [
        CreateDashboardComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TuiInputModule,
        TuiMultiSelectModule,
        TuiTextfieldControllerModule,
        TuiDataListWrapperModule,
        TuiLetModule,
        TuiSelectModule,
        TuiLoaderModule
    ]
})
export class CreateDashboardModule { }
