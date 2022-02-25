import { ChangeDetectionStrategy, Component, Inject, Input, TemplateRef } from '@angular/core';
import { Dashboard } from "../../../models/dashboards.models";
import { RouteLinks, RouteQueryParameter, RoutingService } from "../../../services/routing-service/routing.service";
import { TuiDialogContext, TuiDialogService } from "@taiga-ui/core";
import { POLYMORPHEUS_CONTEXT } from "@tinkoff/ng-polymorpheus";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Subscription } from "rxjs";

@UntilDestroy()
@Component({
    selector: 'db-kanban-row',
    templateUrl: './db-kanban-row.component.html',
    styleUrls: ['./db-kanban-row.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DbKanbanRowComponent {
    @Input() showCreateButton: boolean = false;
    @Input() update: boolean = false;
    @Input() rowTitle: string;
    @Input() dashboards: Dashboard[];

    private dialogSubscriber$: Subscription;

    constructor(
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<number>,
        private routingService: RoutingService,
    ) {}

    openDialog(content:TemplateRef<TuiDialogContext<void>> ){
        this.dialogSubscriber$ = this.dialogService.open(content, {size: 's'})
            .pipe(untilDestroyed(this)).subscribe();
    }

    closeDialog(): void {
        this.dialogSubscriber$.unsubscribe();
    }

    onSelectDashboard(id: string) {
        this.routingService.navigate(
            RouteLinks.DASHBOARDS_DETAIL,
            {[RouteQueryParameter.DASHBOARD_ID]: id},
        )
    }
}
