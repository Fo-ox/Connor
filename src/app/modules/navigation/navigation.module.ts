import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { AvatarModule } from "../avatar/avatar.module";
import { SearchModule } from "../search/search.module";
import { RouterModule } from "@angular/router";
import { TuiButtonModule } from "@taiga-ui/core";
import { SvgIconsModule } from "@ngneat/svg-icon";
import { CreateUserModule } from "../forms/create-user/create-user.module";
import { PreditionToolModule } from "../predition-tool/predition-tool.module";

@NgModule({
    declarations: [
        NavigationComponent
    ],
    exports: [
        NavigationComponent
    ],
    imports: [
        CommonModule,
        AvatarModule,
        SearchModule,
        RouterModule,
        TuiButtonModule,
        SvgIconsModule,
        CreateUserModule,
        PreditionToolModule,
    ]
})
export class NavigationModule { }
