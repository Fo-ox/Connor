import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ChatList, ChatMessage} from "../../../../models/chatList.models";
import {AtomStateService} from "../../../../services/atom-state/app-atom-state.service";
import {filter, map} from "rxjs/operators";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {User} from "../../../../models/user.models";

@Component({
    selector: 'app-chatlist',
    templateUrl: './chatlist.component.html',
    styleUrls: ['./chatlist.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatlistComponent implements OnInit, OnChanges {
    @Input() chatList: ChatList;
    @Input() lastMessage: ChatMessage;

    public isActive$: Observable<boolean>;
    public lastUser$: Observable<User>;

    private lastMessageUpdater$: BehaviorSubject<ChatMessage> = new BehaviorSubject(null);

    ngOnInit(): void {
        this.isActive$ = AtomStateService.queryParametersEntities.getAtomValueByKey('QUERY_PARAMS_CHAT_ID')
            ?.pipe(map((chatId: string) => chatId === this.chatList.chartId))

        this.lastUser$ = combineLatest([
            AtomStateService.systemUsersState.getAtomValueByKey('SYSTEM_USERS'),
            this.lastMessageUpdater$
        ]).pipe(
            filter(([users, lastMessage]: [User[], ChatMessage]) => !!(users?.length && lastMessage)),
            map(([users, lastMessage]: [User[], ChatMessage]) => {
                return users.find((user: User) => user.id === lastMessage.fromUserId)
            })
        )
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.lastMessage && this.lastMessageUpdater$.next(this.lastMessage);
    }
}
