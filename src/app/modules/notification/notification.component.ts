import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { TuiNotification, TuiNotificationsService } from "@taiga-ui/core";
import { of, Subscription } from "rxjs";
import { AtomStateService } from "../../services/atom-state/app-atom-state.service";
import { delay, switchMap } from "rxjs/operators";
import { Notification } from "../../models/ui.models";

@Component({
    selector: 'notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent implements OnInit, OnDestroy {
    private notification = AtomStateService.notificationState.getAtomValueByKey('NOTIFICATION');
    private notificationSubscription: Subscription;

    constructor(@Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService) { }

    ngOnInit(): void {
        this.notificationSubscription = this.notification.pipe(
            delay(200),
            switchMap((notification: Notification) => notification
                ? this.notificationsService.show(notification?.notificationContent, {
                    label: notification?.notificationTitle,
                    hasCloseButton: true,
                    hasIcon: true,
                    autoClose: true,
                    status: notification?.notificationType || TuiNotification.Info
                })
                : of(null)
            ),
        ).subscribe();
    }

    ngOnDestroy(): void {
        this.notificationSubscription.unsubscribe();
    }
}
