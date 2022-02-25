import { ChangeDetectionStrategy, Component, Inject, Input, TemplateRef } from '@angular/core';
import { Subscription } from "rxjs";
import { TuiDialogContext, TuiDialogService } from "@taiga-ui/core";
import { POLYMORPHEUS_CONTEXT } from "@tinkoff/ng-polymorpheus";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
    selector: 'kanban-tools',
    templateUrl: './kanban-tools.component.html',
    styleUrls: ['./kanban-tools.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class KanbanToolsComponent {
    @Input() dashboardName: string;
    @Input() noDashboardAccess: boolean;
    private dialogSubscriber$: Subscription;

    constructor(
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<number>) {
    }

    openDialog(content:TemplateRef<TuiDialogContext<void>> ){
        this.dialogSubscriber$ = this.dialogService.open(content, {size: 's'})
            .pipe(untilDestroyed(this)).subscribe();
    }

    closeDialog(): void {
        this.dialogSubscriber$.unsubscribe();
    }
}
