import { ChangeDetectionStrategy, Component, Inject, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Dashboard } from "../../../models/dashboards.models";
import { AtomStateService } from "../../../services/atom-state/app-atom-state.service";
import { map } from "rxjs/operators";
import { User } from "../../../models/user.models";
import { Observable, Subscription } from "rxjs";
import { TooltipAction } from "../../../models/ui.models";
import { TuiDialogContext, TuiDialogService } from "@taiga-ui/core";
import { POLYMORPHEUS_CONTEXT } from "@tinkoff/ng-polymorpheus";
import { RoutingService } from "../../../services/routing-service/routing.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
    selector: 'db-kanban',
    templateUrl: './db-kanban.component.html',
    styleUrls: ['./db-kanban.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DbKanbanComponent implements OnInit {
    @Input() dashboard: Dashboard;
    @Input() update: boolean = false;
    @ViewChild('createDashboard') createDashboard: TemplateRef<any>;

    public userAvatars$: Observable<Record<string, string>>;
    public actions: TooltipAction[] = [{
        id: 'update',
        displayName: 'Update'
    }]

    private dialogSubscriber$: Subscription;

    constructor(
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<number>,
        private routingService: RoutingService,
    ) {}

    ngOnInit(): void {
        this.userAvatars$ = AtomStateService.systemUsersState.getAtomValueByKey('SYSTEM_USERS')
            .pipe(
                map((users: User[]) => {
                    const userAvatars: Record<string, string> = {};
                    users.forEach((user: User) => userAvatars[user.id] = user.userInfo?.profileIcon)
                    return userAvatars
                })
            )
    }

    openDialog(content:TemplateRef<TuiDialogContext<void>> ){
        this.dialogSubscriber$ = this.dialogService.open(content, {size: 's'})
            .pipe(untilDestroyed(this)).subscribe();
    }

    closeDialog(): void {
        this.dialogSubscriber$.unsubscribe();
    }

    onItemSelect(event: TooltipAction) {
        if (event.id === 'update') {
            this.openDialog(this.createDashboard)
        }
    }
}





