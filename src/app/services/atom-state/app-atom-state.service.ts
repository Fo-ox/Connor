import { AbstractAtomService } from "./atom-state.absctract";
import {
    ChatListAtomState, ChatMsgAtomState, CommentsAtomState,
    DashboardsAtomState, DefaultModelAtomState, LoadingAtomState, ModelsAtomState, NotificationAtomState,
    QueryParamsEntitiesAtomState, SystemUsersAtomState,
    TasksAtomState, TasksCountAtomState, TemplatesAtomState,
    ThisUserAtomState, TokenAtomState, TriggerAtomState
} from "./app-atom-state.models";

export class AtomStateService {
    public static thisUserState = new AbstractAtomService<ThisUserAtomState>('This user state');
    public static systemUsersState = new AbstractAtomService<SystemUsersAtomState>('System users state');
    public static tasksState = new AbstractAtomService<TasksAtomState>('Tasks state');
    public static tasksCountState = new AbstractAtomService<TasksCountAtomState>('Tasks count state')
    public static modelsState = new AbstractAtomService<ModelsAtomState>('Models state');
    public static defaultModelState = new AbstractAtomService<DefaultModelAtomState>('Default model state')

    public static dashboardState = new AbstractAtomService<DashboardsAtomState>('Dashboard state');
    public static chatListState = new AbstractAtomService<ChatListAtomState>('ChatList state');
    public static chatMsgState = new AbstractAtomService<ChatMsgAtomState>('ChatMsg state');
    public static chatTriggerState = new AbstractAtomService<TriggerAtomState>('Trigger state');
    public static queryParametersEntities = new AbstractAtomService<QueryParamsEntitiesAtomState>('Query parameters state')
    public static templates = new AbstractAtomService<TemplatesAtomState>('System templates state');
    public static loadingState = new AbstractAtomService<LoadingAtomState>('Loading state');
    public static notificationState = new AbstractAtomService<NotificationAtomState>('Notification state');
    public static tokenState = new AbstractAtomService<TokenAtomState>('Token state');
    public static commentsState = new AbstractAtomService<CommentsAtomState>('Comments state');
}
