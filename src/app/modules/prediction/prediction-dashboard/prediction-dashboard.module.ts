import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PredictionDashboardComponent } from './prediction-dashboard.component';

@NgModule({
    declarations: [
        PredictionDashboardComponent
    ],
    exports: [
        PredictionDashboardComponent
    ],
    imports: [
        CommonModule
    ]
})
export class PredictionDashboardModule { }
