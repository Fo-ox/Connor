import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskDescriptionComponent } from './task-description.component';

@NgModule({
    declarations: [
        TaskDescriptionComponent
    ],
    exports: [
        TaskDescriptionComponent
    ],
    imports: [
        CommonModule
    ]
})
export class TaskDescriptionModule { }
