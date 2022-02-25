import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ChatList } from "../../models/chatList.models";
import { AtomStateService } from "../../services/atom-state/app-atom-state.service";
import { User } from "../../models/user.models";

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent implements OnInit {
    public chatLists$: Observable<ChatList[]> = AtomStateService.chatListState.getAtomValueByKey('CHAT_LIST');
    public chat$: Observable<ChatList>;
    public user$: Observable<User>;

    ngOnInit(): void {
        this.user$ = AtomStateService.thisUserState.getAtomValueByKey('THIS_USER')

        this.chat$ = combineLatest([
            AtomStateService.queryParametersEntities.getAtomValueByKey('QUERY_PARAMS_CHAT_ID'),
            AtomStateService.chatListState.getAtomValueByKey('CHAT_LIST')
        ]).pipe(
            map(([chatId, chats]: [string, ChatList[]]) => {
                return chats?.find((chat: ChatList) => chat.chartId === chatId)
            })
        )

        AtomStateService.chatTriggerState.setAtomByKey({
            key: 'IS_UPDATE',
            value: false
        })
    }
}



