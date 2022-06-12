import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import { AtomStateService } from "./services/atom-state/app-atom-state.service";
import { TASKS } from "./mockups/task.mockups";
import { DASHBOARDS } from "./mockups/dashboard.mockup";
import { SYSTEM_USERS, THIS_USER } from "./mockups/user.mockup";
import { CHAT_LIST, CHAT_MSG } from "./mockups/chatList.mockup"
import { RoutingService } from "./services/routing-service/routing.service";
import {share, switchMap, take, tap} from "rxjs/operators";
import { DashboardResponse } from "./models/dashboards.models";
import { ConverterHelper } from "./helpers/converter.helper";
import { TaskResponse } from "./models/task.models";
import { RestApiService } from "./services/rest-api-service/rest-api.service";
import { SessionUser, UserResponse } from "./models/user.models";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { SocketService } from "./services/socket-server/socket.service";
import {ChatList, ChatListResponse, ChatMessage, ChatMessageResponse} from "./models/chatList.models";
import {BehaviorSubject} from "rxjs";

@UntilDestroy()
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
    constructor(private routingService: RoutingService,
                private restApiService: RestApiService,
                private socketService: SocketService) {
        routingService.queryParamsDetector();
        const sessionUser = RestApiService.getSessionUser();
        sessionUser.userToken && AtomStateService.tokenState.setAtomByKey({
            key: 'TOKEN',
            value: {
                userId: sessionUser.userId,
                userToken: sessionUser.userToken
            }
        })
    }

    private messageTrigger$: BehaviorSubject<Record<string, ChatMessage[]>> = new BehaviorSubject(null);

    ngOnInit(): void {
        AtomStateService.tokenState.getAtomValueByKey('TOKEN').pipe(
            tap((sessionUser: SessionUser) => {
                if (!sessionUser) {
                    return;
                }
                // this.socketService._connectMessage();
                // this.socketService._connectChat();
                this.restApiService.loadUsers()
                    .pipe(
                        tap((users: UserResponse[]) => {
                            AtomStateService.systemUsersState.setAtomByKey({
                                key: 'SYSTEM_USERS',
                                value: users?.map((user: UserResponse) => {
                                    return ConverterHelper.convertUserResponseToUser(user)
                                })
                            })
                            AtomStateService.thisUserState.setAtomByKey({
                                key: 'THIS_USER',
                                value: ConverterHelper.convertUserResponseToUser(users
                                    ?.find((user: UserResponse) => user.id === sessionUser.userId))
                            })
                        })
                    ).subscribe();

                // this.restApiService.loadDashboards()
                //     .pipe(
                //         tap((dashboards: DashboardResponse[]) => AtomStateService.dashboardState.setAtomByKey({
                //             key: 'DASHBOARDS',
                //             value: dashboards?.map((dashboard: DashboardResponse) => {
                //                 return ConverterHelper.convertDashboardResponseToDashboard(dashboard)
                //             })
                //         }))
                //     ).subscribe();

                this.restApiService.loadTasks()
                    .pipe(
                        tap((tasks: TaskResponse[]) => AtomStateService.tasksState.setAtomByKey({
                            key: 'TASKS',
                            value: tasks?.map((task: TaskResponse) => {
                                return ConverterHelper.convertTaskResponseToTask(task)
                            })
                        }))
                    ).subscribe();

                // this.restApiService.loadChats(sessionUser.userId)
                //     .pipe(
                //         tap((chats: ChatListResponse[]) => {
                //             chats && AtomStateService.chatListState.setAtomByKey({
                //                 key: 'CHAT_LIST',
                //                 value: chats
                //                     ?.map((chat: ChatListResponse) => ConverterHelper.convertChatResponseToChat(chat))
                //                     ?.sort((curr: ChatList, next: ChatList) => +new Date(next.createTime) - +new Date(curr.createTime))
                //             })
                //
                //             const messagesByChatId: Record<string, ChatMessage[]> = {};
                //
                //             chats.forEach((chat: ChatListResponse, index: number) => {
                //                 this.restApiService.loadMessages(chat.chartId)
                //                     .pipe(
                //                         tap((messages: ChatMessageResponse[]) => {
                //                             messagesByChatId[chat.chartId] = messages
                //                                 ?.map((message: ChatMessageResponse) => ConverterHelper.convertMessageResponseToMessage(message))
                //                                 ?.sort((curr: ChatMessage, next: ChatMessage) => +new Date(curr.messageTime) - +new Date(next.messageTime))
                //                             if (chats.length - 1 === index) {
                //                                 this.messageTrigger$.next(messagesByChatId);
                //                             }
                //                         }),
                //                     ).subscribe();
                //             })
                //         })
                //     ).subscribe();
            }),
            untilDestroyed(this)
        ).subscribe();

        // this.messageTrigger$.pipe(
        //     tap((initialMessages: Record<string, ChatMessage[]>) => {
        //         initialMessages && AtomStateService.chatMsgState.setAtomByKey({
        //             key: 'CHAT_MSG',
        //             value: initialMessages
        //         })
        //     }),
        //     untilDestroyed(this)
        // ).subscribe()

        // AtomStateService.tasksState.setAtomByKey({
        //     key: 'TASKS',
        //     value: TASKS,
        // })

        // AtomStateService.dashboardState.setAtomByKey({
        //     key: 'DASHBOARDS',
        //     value: DASHBOARDS,
        // })

        // AtomStateService.thisUserState.setAtomByKey({
        //     key: 'THIS_USER',
        //     value: THIS_USER,
        // })

        // AtomStateService.systemUsersState.setAtomByKey({
        //     key: 'SYSTEM_USERS',
        //     value: SYSTEM_USERS,
        // })

        // AtomStateService.chatListState.setAtomByKey({
        //     key: 'CHAT_LIST',
        //     value: CHAT_LIST,
        // })

        // AtomStateService.chatMsgState.setAtomByKey({
        //     key: 'CHAT_MSG',
        //     value: CHAT_MSG,
        // })

    }

    ngOnDestroy(): void {
        this.socketService._disconnectMessage();
        this.socketService._disconnectChat();
    }
}
