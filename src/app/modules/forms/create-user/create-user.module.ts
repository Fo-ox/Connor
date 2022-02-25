import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './create-user.component';
import { ReactiveFormsModule } from "@angular/forms";
import { TuiDataListWrapperModule, TuiInputModule, TuiMultiSelectModule } from "@taiga-ui/kit";
import { TuiLoaderModule, TuiTextfieldControllerModule } from "@taiga-ui/core";
import { AvatarModule } from "../../avatar/avatar.module";

@NgModule({
    declarations: [
        CreateUserComponent
    ],
    exports: [
        CreateUserComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TuiInputModule,
        TuiTextfieldControllerModule,
        TuiMultiSelectModule,
        TuiDataListWrapperModule,
        TuiLoaderModule,
        AvatarModule
    ]
})
export class CreateUserModule { }
