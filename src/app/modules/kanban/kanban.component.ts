import {ChangeDetectionStrategy, Component, Inject, Input, OnChanges, TemplateRef} from '@angular/core';
import { Task } from "../../models/task.models";
import { DictionariesService } from "../../services/dictionary-provider/dictionaries.service";
import { TuiDialogContext, TuiDialogService } from "@taiga-ui/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Subscription } from "rxjs";
import { POLYMORPHEUS_CONTEXT } from "@tinkoff/ng-polymorpheus";
import { Dashboard } from "../../models/dashboards.models";
import { User } from "../../models/user.models";

@UntilDestroy()
@Component({
    selector: 'kanban',
    templateUrl: './kanban.component.html',
    styleUrls: ['./kanban.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class KanbanComponent implements OnChanges {
    @Input() set tasks(tasks: Task[]) {
        if (!tasks?.length) {
            this.isEmpty = true;
            return;
        }
        const sortedTask: Record<string,Task[]> = {};
        tasks?.forEach((task: Task) => {
            sortedTask.hasOwnProperty(task.status)
                ? sortedTask[task.status].push(task)
                : sortedTask[task.status] = [task];
        })
        this.isEmpty = false;
        this.tasksByStatus = sortedTask;
    }

    @Input() dashboard: Dashboard;
    @Input() currentUser: User;

    public tasksByStatus: Record<string,Task[]>;
    public statusDictionary = DictionariesService.arrayDictionaries.status;
    public isEmpty: boolean = false;
    public noDashboardAccess: boolean = false;

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

    ngOnChanges(): void {
        if (this.dashboard && this.currentUser) {
            this.noDashboardAccess = !this.dashboard?.assignee?.includes(this.currentUser?.id)
                && !(this.dashboard.reporter === this.currentUser?.id);
        }
    }
}
