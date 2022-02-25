import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatdetailComponent } from './chatdetail.component';
import {ChatContentModule} from "./chat-content/chat-content.module";
import {SvgIconsModule} from "@ngneat/svg-icon";
import {
    TuiDropdownControllerModule,
    TuiHostedDropdownModule,
    TuiPrimitiveTextfieldModule,
    TuiScrollbarModule, TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {AvatarModule} from "../../avatar/avatar.module";



@NgModule({
    declarations: [
        ChatdetailComponent
    ],
    exports: [
        ChatdetailComponent
    ],
    imports: [
        CommonModule,
        ChatContentModule,
        SvgIconsModule,
        TuiScrollbarModule,
        TuiHostedDropdownModule,
        AvatarModule,
        TuiDropdownControllerModule,
        TuiPrimitiveTextfieldModule,
        TuiTextfieldControllerModule
    ]
})
export class ChatdetailModule { }
