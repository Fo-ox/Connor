import {ChangeDetectionStrategy, Component, Input, TemplateRef} from '@angular/core';
import {ChatList, ChatMessage} from "../../../models/chatList.models";
import {User} from "../../../models/user.models";
import {SocketService} from "../../../services/socket-server/socket.service";
import {Observable} from "rxjs";
import {AtomStateService} from "../../../services/atom-state/app-atom-state.service";
import {map} from "rxjs/operators";

@Component({
    selector: 'app-chatdetail',
    templateUrl: './chatdetail.component.html',
    styleUrls: ['./chatdetail.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatdetailComponent {
    @Input() chat: ChatList;
    @Input() user: User;

    public allMessages$: Observable<Record<string, ChatMessage[]>> = AtomStateService.chatMsgState.getAtomValueByKey('CHAT_MSG');
    public userTemplate$: Observable<TemplateRef<any>> = AtomStateService.templates.getAtomValueByKey('TEMPLATE_PARAMETER_USER');
    public userAvatars$: Observable<Record<string, string>>;

    public messageValue: string = '';

    constructor(private socketService: SocketService) {
        this.userAvatars$ = AtomStateService.systemUsersState.getAtomValueByKey('SYSTEM_USERS')
            .pipe(
                map((users: User[]) => {
                    const userAvatars: Record<string, string> = {};
                    users.forEach((user: User) => userAvatars[user.id] = user.userInfo?.profileIcon)
                    return userAvatars
                })
            )
    }

    onSendMessage(): void {
        if (this.messageValue) {
            this.socketService.onSendMessage({
                chatId: this.chat.chartId,
                fromUserId: this.user.id,
                messageText: this.messageValue
            })
            this.messageValue = null;
        }
    }
}

