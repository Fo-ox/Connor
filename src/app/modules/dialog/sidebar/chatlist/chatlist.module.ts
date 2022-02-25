import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatlistComponent } from './chatlist.component';
import {SvgIconsModule} from "@ngneat/svg-icon";
import {AvatarModule} from "../../../avatar/avatar.module";



@NgModule({
    declarations: [
        ChatlistComponent
    ],
    exports: [
        ChatlistComponent
    ],
    imports: [
        CommonModule,
        SvgIconsModule,
        AvatarModule
    ]
})
export class ChatlistModule { }
