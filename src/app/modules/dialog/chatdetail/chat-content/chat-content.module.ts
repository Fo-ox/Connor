import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatContentComponent } from './chat-content.component';
import {AvatarModule} from "../../../avatar/avatar.module";



@NgModule({
    declarations: [
        ChatContentComponent
    ],
    exports: [
        ChatContentComponent
    ],
    imports: [
        CommonModule,
        AvatarModule
    ]
})
export class ChatContentModule { }
