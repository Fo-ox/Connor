import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from "./user-routing.module";
import { NavigationModule } from "../navigation/navigation.module";

@NgModule({
    declarations: [
        UserComponent
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        NavigationModule,
    ],
    exports: [UserComponent]
})
export class UserModule { }
