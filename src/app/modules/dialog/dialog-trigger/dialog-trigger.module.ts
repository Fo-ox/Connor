import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogTriggerComponent } from './dialog-trigger.component';
import { SvgIconsModule } from "@ngneat/svg-icon";

@NgModule({
    declarations: [
        DialogTriggerComponent
    ],
    exports: [
        DialogTriggerComponent
    ],
    imports: [
        CommonModule,
        SvgIconsModule
    ]
})
export class DialogTriggerModule { }
