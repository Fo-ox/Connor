import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PredictionDashboardComponent } from './prediction-dashboard.component';
import { TuiDataListWrapperModule, TuiInputDateRangeModule, TuiSelectModule } from "@taiga-ui/kit";
import {TuiScrollbarModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SvgIconsModule } from "@ngneat/svg-icon";
import {TaskTableModule} from "../../task-table/task-table.module";
import {TaskChartModule} from "../../task-chart/task-chart.module";

@NgModule({
    declarations: [
        PredictionDashboardComponent
    ],
    exports: [
        PredictionDashboardComponent
    ],
    imports: [
        CommonModule,
        TuiInputDateRangeModule,
        TuiTextfieldControllerModule,
        TuiSelectModule,
        FormsModule,
        SvgIconsModule,
        ReactiveFormsModule,
        TuiDataListWrapperModule,
        TaskTableModule,
        TaskChartModule,
        TuiScrollbarModule
    ]
})
export class PredictionDashboardModule { }
