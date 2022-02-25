import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DbKanbanComponent } from "./db-kanban.component";
import {SvgIconsModule} from "@ngneat/svg-icon";
import {AvatarModule} from "../../avatar/avatar.module";
import {MoreTooltipModule} from "../../more-tooltip/more-tooltip.module";
import {CreateDashboardModule} from "../../forms/create-dashboard/create-dashboard.module";

@NgModule({
    declarations: [
        DbKanbanComponent
    ],
    exports: [
        DbKanbanComponent
    ],
    imports: [
        CommonModule,
        SvgIconsModule,
        AvatarModule,
        MoreTooltipModule,
        CreateDashboardModule
    ]
})
export class DbKanbanModule { }
