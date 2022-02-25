import {ChangeDetectionStrategy, Component, Inject, OnInit, TemplateRef} from '@angular/core';
import { User } from "../../models/user.models";
import { RouteLinks, RoutingService } from "../../services/routing-service/routing.service";
import { RestApiService } from "../../services/rest-api-service/rest-api.service";
import {Observable, Subscription} from "rxjs";
import {AtomStateService} from "../../services/atom-state/app-atom-state.service";
import {map} from "rxjs/operators";
import {TuiDialogContext, TuiDialogService} from "@taiga-ui/core";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {POLYMORPHEUS_CONTEXT} from "@tinkoff/ng-polymorpheus";

@UntilDestroy()
@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit {
    private dialogSubscriber$: Subscription;

    constructor(
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<number>,
        private routingService: RoutingService) {
    }

    public user$: Observable<User> = AtomStateService.thisUserState.getAtomValueByKey('THIS_USER');
    public displayUserName$: Observable<string>;

    ngOnInit(): void {
        this.displayUserName$ = this.user$.pipe(
            map((user: User) => `${user?.userInfo?.firstName || ''}${user?.userInfo?.firstName && ' '}${user?.userInfo?.lastName || ''}`)
        );
    }

    onDashboardsNavigate() {
        this.routingService.navigate(RouteLinks.DASHBOARDS);
    }

    onLogout() {
        RestApiService.clearSessionUser();
        this.routingService.navigate(RouteLinks.LOGIN);
    }

    openDialog(content:TemplateRef<TuiDialogContext<void>> ){
        this.dialogSubscriber$ = this.dialogService.open(content, {size: 's'})
            .pipe(untilDestroyed(this)).subscribe();
    }

    closeDialog(): void {
        this.dialogSubscriber$.unsubscribe();
    }
}
