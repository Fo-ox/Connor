import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { TuiNotificationsModule } from "@taiga-ui/core";

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
    ]
})
export class NotificationModule { }
