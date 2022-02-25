import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TooltipAction } from "../../models/ui.models";

@Component({
    selector: 'more-tooltip',
    templateUrl: './more-tooltip.component.html',
    styleUrls: ['./more-tooltip.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoreTooltipComponent {
    @Input() items: TooltipAction[] = [];
    @Output() selectItem: EventEmitter<TooltipAction> = new EventEmitter();
}
