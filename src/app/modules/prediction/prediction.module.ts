import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PredictionComponent } from './prediction.component';
import { PredictionRoutingModule } from "./prediction-routing.module";
import {NavigationModule} from "../navigation/navigation.module";
import {PredictionDashboardModule} from "./prediction-dashboard/prediction-dashboard.module";
import {TuiScrollbarModule} from "@taiga-ui/core";

@NgModule({
    declarations: [
        PredictionComponent
    ],
    imports: [
        CommonModule,
        PredictionRoutingModule,
        NavigationModule,
        PredictionDashboardModule,
        TuiScrollbarModule
    ]
})
export class PredictionModule { }
