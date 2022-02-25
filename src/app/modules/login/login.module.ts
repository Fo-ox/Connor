import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from "./login-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { TuiInputModule, TuiInputPasswordModule } from "@taiga-ui/kit";
import { TuiLoaderModule, TuiTextfieldControllerModule } from "@taiga-ui/core";

@NgModule({
    declarations: [
        LoginComponent,
    ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        ReactiveFormsModule,
        TuiInputModule,
        TuiTextfieldControllerModule,
        TuiInputPasswordModule,
        TuiLoaderModule,
    ]
})
export class LoginModule { }
