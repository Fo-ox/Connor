import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrayProtoPipe } from "./array-proto-pipe.pipe";

@NgModule({
    declarations: [
        ArrayProtoPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ArrayProtoPipe
    ]
})
export class ArrayProtoPipeModule { }
