import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {Injectable, OnDestroy} from "@angular/core";
import { Endpoints, SOCKET } from "../rest-api-service/endpoints.constant";
import { AtomStateService } from "../atom-state/app-atom-state.service";
import { TuiNotification } from "@taiga-ui/core";
import {
    ChatList,
    ChatListInput,
    ChatListResponse, ChatMessage,
    ChatMessageResponse
} from "../../models/chatList.models";
import { ConverterHelper } from "../../helpers/converter.helper";
import { UserResponse } from "../../models/user.models";
import { RestApiService } from "../rest-api-service/rest-api.service";
import {BehaviorSubject, combineLatest, Subscription} from "rxjs";
import {filter, tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class SocketService implements OnDestroy {
    private stompChatClient: any;
    private stompMessageClient: any;

    private messageSubscriber: Subscription;
    private messageUpdater$: BehaviorSubject<ChatMessage[]> = new BehaviorSubject(null);

    constructor() {
        this.messageSubscriber = combineLatest([
            AtomStateService.chatMsgState.getAtomValueByKey('CHAT_MSG'),
            this.messageUpdater$
        ]).pipe(
            filter(([messageState, newMessages]: [Record<string, ChatMessage[]>, ChatMessage[]]) => !!newMessages?.length),
            tap(([messageState, newMessages]: [Record<string, ChatMessage[]>, ChatMessage[]]) => {
                AtomStateService.chatMsgState.setAtomByKey({
                    key: 'CHAT_MSG',
                    value: {
                        ...messageState,
                        [newMessages?.[0].chatId]: newMessages
                    }
                })
                AtomStateService.chatTriggerState.setAtomByKey({
                    key: 'IS_UPDATE',
                    value: true
                })
            })
        ).subscribe();
    }

    ngOnDestroy(): void {
        this.messageSubscriber.unsubscribe();
    }

    _connectMessage(): void {
        let ws = SockJS(SOCKET);
        this.stompMessageClient = Stomp.over(ws);
        this.stompMessageClient.debug = null;
        const _this = this;
        _this.stompMessageClient.connect({}, function (frame) {
            _this.stompMessageClient.subscribe(Endpoints.MESSAGE_CONNECT, function (sdkEvent) {
                _this.onMessageReceived(sdkEvent);
            });
        }, this.errorMessageCallBack);
    };

    _connectChat(): void {
        let ws = SockJS(SOCKET);
        this.stompChatClient = Stomp.over(ws);
        this.stompChatClient.debug = null;
        const _this = this;
        _this.stompChatClient.connect({}, function (frame) {
            _this.stompChatClient.subscribe(Endpoints.CHAT_CONNECT, function (sdkEvent) {
                _this.onChatReceived(sdkEvent);
            });
        }, this.errorChatCallBack);
    };

    _disconnectMessage(): void {
        if (this.stompMessageClient !== null) {
            this.stompMessageClient.disconnect();
        }
        console.log("Disconnected Message");
    }

    _disconnectChat(): void {
        if (this.stompChatClient !== null) {
            this.stompChatClient.disconnect();
        }
        console.log("Disconnected Chat");
    }

    errorMessageCallBack(error): void {
        AtomStateService.notificationState.setAtomByKey({
            key: 'NOTIFICATION',
            value: {
                notificationType: TuiNotification.Error,
                notificationTitle: 'Error message socket connection',
                notificationContent: error
            }
        })
        setTimeout(() => {
            this._connectMessage();
        }, 5000);
    }

    errorChatCallBack(error): void {
        AtomStateService.notificationState.setAtomByKey({
            key: 'NOTIFICATION',
            value: {
                notificationType: TuiNotification.Error,
                notificationTitle: 'Error chat socket connection',
                notificationContent: error
            }
        })
        setTimeout(() => {
            this._connectChat();
        }, 5000);
    }

    onSendMessage(message: ChatMessageResponse): void {
        AtomStateService.notificationState.setAtomByKey({
            key: 'NOTIFICATION',
            value: {
                notificationType: TuiNotification.Info,
                notificationTitle: `Sending message`
            }
        })
        this.stompMessageClient.send(Endpoints.SEND_MESSAGE, {}, JSON.stringify(message));
    }

    onMessageReceived(newMessages): void {
        const processedMessages: ChatMessage[] = JSON.parse(newMessages.body)
            ?.map((message: ChatMessageResponse) => ConverterHelper.convertMessageResponseToMessage(message))
            ?.sort((curr: ChatMessage, next: ChatMessage) => +new Date(curr.messageTime) - +new Date(next.messageTime));

        this.messageUpdater$.next(processedMessages);
    }

    onChatReceived(chat): void {
        const newChats: ChatList[] = JSON.parse(chat.body)
            ?.filter((chat: ChatListResponse) => chat.users.find((user: UserResponse) => user.userId === RestApiService.getSessionUser().userId))
            ?.map((chat: ChatListResponse) => ConverterHelper.convertChatResponseToChat(chat))
            ?.sort((curr: ChatList, next: ChatList) => +new Date(next.createTime) - +new Date(curr.createTime));

        newChats && AtomStateService.chatListState.setAtomByKey({
            key: 'CHAT_LIST',
            value: newChats
        })

        newChats && AtomStateService.chatTriggerState.setAtomByKey({
            key: 'IS_UPDATE',
            value: true
        })
    }

    public createChat(newChat: ChatListInput, loadingId?: string): void {
        AtomStateService.notificationState.setAtomByKey({
            key: 'NOTIFICATION',
            value: {
                notificationType: TuiNotification.Info,
                notificationTitle: `Creating ${newChat.title} chat`
            }
        })
        this.stompMessageClient.send(Endpoints.CREATE_CHAT, {}, JSON.stringify(newChat));
    }
}
