import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreditionToolComponent } from './predition-tool.component';
import { SvgIconsModule } from "@ngneat/svg-icon";
import { TuiHostedDropdownModule, TuiTextfieldControllerModule } from "@taiga-ui/core";
import { TuiDataListWrapperModule, TuiSelectModule } from "@taiga-ui/kit";
import { TuiActiveZoneModule } from "@taiga-ui/cdk";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        PreditionToolComponent
    ],
    exports: [
        PreditionToolComponent
    ],
    imports: [
        CommonModule,
        SvgIconsModule,
        TuiHostedDropdownModule,
        TuiSelectModule,
        TuiDataListWrapperModule,
        TuiTextfieldControllerModule,
        TuiActiveZoneModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class PreditionToolModule { }
