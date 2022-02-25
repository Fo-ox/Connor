import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent implements OnInit {
    @Input() avatarUrl: string;
    @Input() borderRadius: string;
    public _borderStyle: Record<string, string> = {};

    ngOnInit(): void {
        this.borderRadius && (this._borderStyle.borderRadius =  this.borderRadius)
    }
}
