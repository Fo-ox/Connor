import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PredictionComponent } from './prediction.component';
import { PredictionRoutingModule } from "./prediction-routing.module";
import {NavigationModule} from "../navigation/navigation.module";
import {PredictionDashboardModule} from "./prediction-dashboard/prediction-dashboard.module";

@NgModule({
    declarations: [
        PredictionComponent
    ],
    imports: [
        CommonModule,
        PredictionRoutingModule,
        NavigationModule,
        PredictionDashboardModule
    ]
})
export class PredictionModule { }
