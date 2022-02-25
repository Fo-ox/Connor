import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouteLinks, RoutingService } from "../../../services/routing-service/routing.service";
import { Observable } from "rxjs";
import { AtomStateService }  from "../../../services/atom-state/app-atom-state.service";

@Component({
    selector: 'dialog-trigger',
    templateUrl: './dialog-trigger.component.html',
    styleUrls: ['./dialog-trigger.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogTriggerComponent {
    public isUpdate$: Observable<boolean> = AtomStateService.chatTriggerState.getAtomValueByKey('IS_UPDATE');

    constructor(private routingService: RoutingService) {
    }

    onDialogNavigate(): void {
        this.routingService.navigate(RouteLinks.DIALOG);
    }
}
