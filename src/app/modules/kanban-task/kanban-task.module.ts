import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanTaskComponent } from './kanban-task.component';
import { SvgIconsModule } from "@ngneat/svg-icon";
import { AvatarModule } from "../avatar/avatar.module";
import { MoreTooltipModule } from "../more-tooltip/more-tooltip.module";

@NgModule({
    declarations: [
        KanbanTaskComponent
    ],
    exports: [
        KanbanTaskComponent
    ],
    imports: [
        CommonModule,
        SvgIconsModule,
        AvatarModule,
        MoreTooltipModule
    ]
})
export class KanbanTaskModule { }
