import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouteLinks, RoutingService } from "../../services/routing-service/routing.service";

@Component({
    selector: 'app-not-found-page',
    templateUrl: './not-found-page.component.html',
    styleUrls: ['./not-found-page.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundPageComponent {
    constructor(private routingService: RoutingService) { }

    onDashboardsNavigate(): void {
        this.routingService.navigate(RouteLinks.DASHBOARDS);
    }
}
