import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { TuiModeModule, TuiNotificationsModule, TuiThemeNightModule } from "@taiga-ui/core";

@NgModule({
    declarations: [
        NotificationComponent
    ],
    exports: [
        NotificationComponent
    ],
    imports: [
        CommonModule,
        TuiNotificationsModule,
        TuiThemeNightModule,
        TuiModeModule,
    ]
})
export class NotificationModule { }
