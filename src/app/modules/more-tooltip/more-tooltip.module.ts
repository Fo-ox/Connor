import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoreTooltipComponent } from './more-tooltip.component';
import { SvgIconsModule } from "@ngneat/svg-icon";
import { TuiHintModule, TuiTooltipModule } from "@taiga-ui/core";

@NgModule({
    declarations: [
        MoreTooltipComponent
    ],
    exports: [
        MoreTooltipComponent
    ],
    imports: [
        CommonModule,
        SvgIconsModule,
        TuiTooltipModule,
        TuiHintModule
    ]
})
export class MoreTooltipModule { }
