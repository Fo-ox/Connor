import { ChangeDetectionStrategy, Component, Inject, OnInit, TemplateRef } from '@angular/core';
import { combineLatest, Observable, Subscription } from "rxjs";
import { AtomStateService } from "../../services/atom-state/app-atom-state.service";
import { map } from "rxjs/operators";
import { Dashboard, DashboardTypes } from "../../models/dashboards.models";
import { User } from "../../models/user.models";
import { TuiDialogContext, TuiDialogService } from "@taiga-ui/core";
import { POLYMORPHEUS_CONTEXT } from "@tinkoff/ng-polymorpheus";
import { untilDestroyed, UntilDestroy } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
    selector: 'app-dashboards',
    templateUrl: './dashboards.component.html',
    styleUrls: ['./dashboards.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardsComponent implements OnInit {
    public groupedDashboards$: Record<DashboardTypes, Observable<Dashboard[]>> = { my: null, teams: null, all: null };
    public dashboards$: Observable<Dashboard[]> = AtomStateService.dashboardState.getAtomValueByKey('DASHBOARDS');
    public user$: Observable<User> = AtomStateService.thisUserState.getAtomValueByKey('THIS_USER');

    private dialogSubscriber$: Subscription;

    constructor(
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<number>) {
    }

    ngOnInit(): void {
        this.groupedDashboards$.my = combineLatest([
            this.dashboards$,
            this.user$
        ]).pipe(map(([dashboards, user]: [Dashboard[], User]) => {
            return user && dashboards
                ? dashboards.filter((dashboard: Dashboard) => dashboard.reporter === user.id)
                : [];
        }));

        this.groupedDashboards$.teams = combineLatest([
            this.dashboards$,
            this.user$
        ]).pipe(map(([dashboards, user]: [Dashboard[], User]) => {
            return user && dashboards
                ? dashboards.filter((dashboard: Dashboard) => dashboard.assignee?.includes(user.id)
                    && dashboard.reporter !== user.id )
                : [];
        }));

        this.groupedDashboards$.all = combineLatest([
            this.dashboards$,
            this.user$
        ]).pipe(map(([dashboards, user]: [Dashboard[], User]) => {
            return user && dashboards
                ? dashboards.filter((dashboard: Dashboard) => !dashboard.assignee?.includes(user.id)
                    && dashboard.reporter !== user.id)
                : [];
        }));
    }

    openDialog(content:TemplateRef<TuiDialogContext<void>> ){
        this.dialogSubscriber$ = this.dialogService.open(content, {size: 's'})
            .pipe(untilDestroyed(this)).subscribe();
    }

    closeDialog(): void {
        this.dialogSubscriber$.unsubscribe();
    }

}
