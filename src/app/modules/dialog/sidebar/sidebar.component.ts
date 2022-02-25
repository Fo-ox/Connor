import {ChangeDetectionStrategy, Component, Inject, Input, OnChanges, TemplateRef} from '@angular/core';
import {ChatList, ChatMessage} from "../../../models/chatList.models";
import { RouteLinks, RouteQueryParameter, RoutingService } from "../../../services/routing-service/routing.service";
import { TuiDialogContext, TuiDialogService } from "@taiga-ui/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import {BehaviorSubject, combineLatest, Observable, Subscription} from "rxjs";
import { POLYMORPHEUS_CONTEXT } from "@tinkoff/ng-polymorpheus";
import {AtomStateService} from "../../../services/atom-state/app-atom-state.service";
import {filter, map, tap} from "rxjs/operators";

@UntilDestroy()
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
    @Input() ChatLists : ChatList[];

    public lastMessages$: Observable<Record<string, ChatMessage>>;

    private dialogSubscriber$: Subscription;

    constructor(
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<number>,
        private routingService: RoutingService)
    {
        this.lastMessages$ = AtomStateService.chatMsgState.getAtomValueByKey('CHAT_MSG').pipe(
            filter((messageState: Record<string, ChatMessage[]>) => !!messageState),
            map((messageState: Record<string, ChatMessage[]>) => {
                const newMessageState: Record<string, ChatMessage> = {};
                Object.keys(messageState)?.forEach((chatId: string) => {
                    newMessageState[chatId] = messageState[chatId][messageState[chatId].length - 1]
                })
                return newMessageState;
            })
        )
    }

    public onSelectTask(ChatId: string): void {
        this.routingService.navigate(
            RouteLinks.DIALOG,
            {
                [RouteQueryParameter.CHAT_ID]: ChatId,
            },
        )
    }

    openDialog(content:TemplateRef<TuiDialogContext<void>> ){
        this.dialogSubscriber$ = this.dialogService.open(content, {size: 's'})
            .pipe(untilDestroyed(this)).subscribe();
    }

    closeDialog(): void {
        this.dialogSubscriber$.unsubscribe();
    }
}
