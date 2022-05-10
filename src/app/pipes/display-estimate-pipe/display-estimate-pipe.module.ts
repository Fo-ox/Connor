import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayEstimatePipe } from './display-estimate.pipe';

@NgModule({
    declarations: [
        DisplayEstimatePipe
    ],
    exports: [
        DisplayEstimatePipe
    ],
    imports: [
        CommonModule
    ]
})
export class DisplayEstimatePipeModule { }
