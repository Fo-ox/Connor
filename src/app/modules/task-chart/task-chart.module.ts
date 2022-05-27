import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskChartComponent } from './task-chart.component';
import {TuiLegendItemModule, TuiPieChartModule, TuiRingChartModule} from "@taiga-ui/addon-charts";
import {DisplayEstimatePipeModule} from "../../pipes/display-estimate-pipe/display-estimate-pipe.module";

@NgModule({
    declarations: [
        TaskChartComponent
    ],
    exports: [
        TaskChartComponent
    ],
    imports: [
        CommonModule,
        TuiLegendItemModule,
        TuiRingChartModule,
        TuiPieChartModule,
        DisplayEstimatePipeModule
    ]
})
export class TaskChartModule { }
