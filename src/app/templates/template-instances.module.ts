import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconsModule } from "@ngneat/svg-icon";
import { TemplateInstances } from "./template-instances.component";
import { AvatarModule } from "../modules/avatar/avatar.module";

@NgModule({
    declarations: [
        TemplateInstances
    ],
    exports: [
        TemplateInstances
    ],
    imports: [
        CommonModule,
        SvgIconsModule,
        AvatarModule
    ]
})
export class TemplateInstancesModule { }
