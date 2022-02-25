import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { ChatlistModule } from "./chatlist/chatlist.module";
import { TuiScrollbarModule } from "@taiga-ui/core";
import { CreateChatModule } from "../../forms/create-chat/create-chat.module";



@NgModule({
    declarations: [
        SidebarComponent
    ],
    exports: [
        SidebarComponent
    ],
    imports: [
        CommonModule,
        ChatlistModule,
        TuiScrollbarModule,
        CreateChatModule
    ]
})
export class SidebarModule { }
