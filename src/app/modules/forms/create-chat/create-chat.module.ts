import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateChatComponent } from './create-chat.component';
import { ReactiveFormsModule } from "@angular/forms";
import { TuiDataListWrapperModule, TuiInputModule, TuiMultiSelectModule } from "@taiga-ui/kit";
import { TuiLoaderModule, TuiTextfieldControllerModule } from "@taiga-ui/core";

@NgModule({
    declarations: [
        CreateChatComponent
    ],
    exports: [
        CreateChatComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TuiInputModule,
        TuiTextfieldControllerModule,
        TuiMultiSelectModule,
        TuiDataListWrapperModule,
        TuiLoaderModule
    ]
})
export class CreateChatModule { }
