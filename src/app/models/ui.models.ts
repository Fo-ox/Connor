import { TuiNotification } from "@taiga-ui/core";

export type TooltipAction = {
    id: string;
    displayName: string;
    customData?: any;
}

export type Notification = {
    notificationType: TuiNotification;
    notificationTitle?: string;
    notificationContent?: string | number;
}
