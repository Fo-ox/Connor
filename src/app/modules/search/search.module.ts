import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import {TuiHostedDropdownModule, TuiPrimitiveTextfieldModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {SvgIconsModule} from "@ngneat/svg-icon";

@NgModule({
    declarations: [
        SearchComponent
    ],
    exports: [
        SearchComponent
    ],
    imports: [
        CommonModule,
        TuiHostedDropdownModule,
        SvgIconsModule,
        TuiPrimitiveTextfieldModule,
        TuiTextfieldControllerModule
    ]
})
export class SearchModule { }
