import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'task-description',
    templateUrl: './task-description.component.html',
    styleUrls: ['./task-description.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDescriptionComponent {
    @Input() description: string;
}
