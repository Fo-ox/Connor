import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskDetailComponent } from './task-detail.component';
import { TaskParameterModule } from "../task-parameter/task-parameter.module";
import { TaskDescriptionModule } from "../task-description/task-description.module";
import {
    TuiLoaderModule,
    TuiPrimitiveTextfieldModule,
    TuiScrollbarModule,
    TuiTextfieldControllerModule
} from "@taiga-ui/core";
import { SvgIconsModule } from "@ngneat/svg-icon";
import { TuiInputInlineModule } from "@taiga-ui/kit";
import { FormsModule } from "@angular/forms";
import { TuiAutoFocusModule } from "@taiga-ui/cdk";
import {AvatarModule} from "../avatar/avatar.module";

@NgModule({
    declarations: [
        TaskDetailComponent
    ],
    exports: [
        TaskDetailComponent
    ],
    imports: [
        CommonModule,
        TaskParameterModule,
        TaskDescriptionModule,
        TuiScrollbarModule,
        SvgIconsModule,
        TuiLoaderModule,
        TuiInputInlineModule,
        FormsModule,
        TuiAutoFocusModule,
        TuiPrimitiveTextfieldModule,
        TuiTextfieldControllerModule,
        AvatarModule
    ]
})
export class TaskDetailModule { }
