import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog.component';
import {NavigationModule} from "../navigation/navigation.module";
import { DialogRoutingModule } from "./dialog-routing.module";
import {ChatlistModule} from "./sidebar/chatlist/chatlist.module";
import {ChatdetailModule} from "./chatdetail/chatdetail.module";
import {TuiForModule} from "@taiga-ui/cdk";
import {SidebarModule} from "./sidebar/sidebar.module";


@NgModule({
  declarations: [
    DialogComponent
  ],
    imports: [
        CommonModule,
        NavigationModule,
        DialogRoutingModule,
        ChatlistModule,
        ChatdetailModule,
        TuiForModule,
        SidebarModule,
    ]
})
export class DialogModule { }
