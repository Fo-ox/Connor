import { Atom } from './atom-state.models';
import { SessionUser, User } from "../../models/user.models";
import { Task } from "../../models/task.models";
import { Dashboard } from "../../models/dashboards.models";
import { TemplateRef } from "@angular/core";
import { ChatList, ChatMessage } from "../../models/chatList.models";
import { Notification } from "../../models/ui.models";
import {TaskComment} from "../../models/comments.model";

export type ThisUserAtomState = AtomThisUser;
export type SystemUsersAtomState = AtomSystemUsers;
export type TasksAtomState = AtomTasks;
export type DashboardsAtomState = AtomDashboards;
export type ChatListAtomState = AtomChatList;
export type LoadingAtomState = AtomLoading;
export type NotificationAtomState = AtomNotification;
export type ChatMsgAtomState = AtomChatMsg;
export type TriggerAtomState = AtomChatTrigger;
export type CommentsAtomState = AtomComments;
export type TokenAtomState = AtomToken;
export type QueryParamsEntitiesAtomState = AtomQueryParamsDashboardId | AtomQueryParamsTaskId | AtomQueryParamsChatId ;
export type TemplatesAtomState = AtomTemplateParameterType
    | AtomTemplateParameterPriority
    | AtomTemplateParameterEmpty
    | AtomTemplateParameterUser
    | AtomTemplateParameterValue
    | AtomTemplateParameterDate;

export type AtomKeys =
    'THIS_USER'
    | 'SYSTEM_USERS'
    | 'TASKS'
    | 'DASHBOARDS'
    | 'CHAT_LIST'
    | 'LOADING'
    | 'NOTIFICATION'
    | 'CHAT_MSG'
    | 'IS_UPDATE'
    | 'COMMENTS'

    | 'TOKEN'

    | 'QUERY_PARAMS_DASHBOARD_ID'
    | 'QUERY_PARAMS_TASK_ID'
    | 'QUERY_PARAMS_CHAT_ID'

    | 'TEMPLATE_PARAMETER_VALUE'
    | 'TEMPLATE_PARAMETER_TYPE'
    | 'TEMPLATE_PARAMETER_PRIORITY'
    | 'TEMPLATE_PARAMETER_EMPTY'
    | 'TEMPLATE_PARAMETER_DATE'
    | 'TEMPLATE_PARAMETER_USER';

export type AtomThisUser = Atom<'THIS_USER', User>;
export type AtomSystemUsers = Atom<'SYSTEM_USERS', User[]>;
export type AtomTasks = Atom<'TASKS', Task[]>;
export type AtomDashboards = Atom<'DASHBOARDS', Dashboard[]>;
export type AtomChatList = Atom<'CHAT_LIST', ChatList[]>;
export type AtomLoading = Atom<'LOADING', string[]>;
export type AtomNotification = Atom<'NOTIFICATION', Notification>
export type AtomChatMsg = Atom<'CHAT_MSG', Record<string, ChatMessage[]>>;
export type AtomChatTrigger = Atom<'IS_UPDATE', boolean>;
export type AtomComments = Atom<'COMMENTS', TaskComment[]>;

export type AtomToken = Atom<'TOKEN', SessionUser>;

export type AtomQueryParamsDashboardId = Atom<'QUERY_PARAMS_DASHBOARD_ID', string>
export type AtomQueryParamsTaskId = Atom<'QUERY_PARAMS_TASK_ID', string>
export type AtomQueryParamsChatId = Atom<'QUERY_PARAMS_CHAT_ID', string>

export type AtomTemplateParameterValue = Atom<'TEMPLATE_PARAMETER_VALUE', TemplateRef<any>>;
export type AtomTemplateParameterType = Atom<'TEMPLATE_PARAMETER_TYPE', TemplateRef<any>>;
export type AtomTemplateParameterPriority = Atom<'TEMPLATE_PARAMETER_PRIORITY', TemplateRef<any>>;
export type AtomTemplateParameterEmpty = Atom<'TEMPLATE_PARAMETER_EMPTY', TemplateRef<any>>;
export type AtomTemplateParameterUser = Atom<'TEMPLATE_PARAMETER_USER', TemplateRef<any>>;
export type AtomTemplateParameterDate = Atom<'TEMPLATE_PARAMETER_DATE', TemplateRef<any>>;
