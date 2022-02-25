import { Transition } from "../services/dictionary-provider/dictionaries.models";
import { TooltipAction } from "../models/ui.models";
import { FormGroup } from "@angular/forms";
import { Dashboard, DashboardResponse } from "../models/dashboards.models";
import { Task, TaskResponse } from "../models/task.models";
import { User, UserResponse } from "../models/user.models";
import {ChatList, ChatListInput, ChatListResponse, ChatMessage, ChatMessageResponse} from "../models/chatList.models";

export class ConverterHelper {
    public static transitionToTooltipAction(transitions: Transition[]): TooltipAction[] {
        return transitions.map((transition: Transition) => ({
            id: transition.key,
            displayName: transition.displayName,
            customData: {
                toStatus: transition.toStatus
            }
        }))
    }

    public static convertFormToUserPayload(form: FormGroup): UserResponse {
        if (!form) {
            return null;
        }
        return {
            firstName: form.controls.firstName?.value,
            lastName: form.controls.lastName?.value,
            login: form.controls.login?.value,
            password: form.controls.password?.value,
            profileIcon: form.controls.profileIcon?.value,
        }
    }

    public static convertFormToDashboardPayload(form: FormGroup, id?: string): DashboardResponse {
        if (!form) {
            return null;
        }
        return {
            title: form.controls.name?.value,
            createdBy: form.controls.reporter?.value?.id,
            defaultAssignedBy: form.controls.reporter?.value?.id,
            team: [form.controls.reporter?.value?.id]?.concat(form.controls.team?.value?.map((user: User) => user.id)),
            dashboardId: id
        }
    }

    public static convertFormToChatPayload(form: FormGroup): ChatListInput {
        if (!form) {
            return null;
        }
        return {
            title: form.controls.name?.value,
            userId: form.controls.reporter?.value?.id,
            users: (form.controls.team?.value?.length
                ? form.controls.team?.value?.concat([form.controls.reporter?.value])
                : [form.controls.reporter?.value])?.map((user: User) => ({userId: user.id})),
        }
    }

    public static convertFormToTaskPayload(form: FormGroup): TaskResponse {
        if (!form) {
            return null;
        }
        return {
            dashboardId: form.controls.dashboardId?.value,
            title: form.controls.name?.value,
            description: form.controls.description?.value,
            assignedBy: form.controls.assignee?.value?.id,
            createdBy: form.controls.reporter?.value?.id,
            type: form.controls.type?.value?.key,
            priority: form.controls.priority?.value?.key,
            status: form.controls.status?.value,
        }
    }

    public static convertTaskToTaskPayload(task: Task): TaskResponse {
        if (!task) {
            return null;
        }
        return {
            taskId: task.id,
            dashboardId: task.dashboardId,
            title: task.title,
            description: task.description,
            assignedBy: task.assignee,
            createdBy: task.reporter,
            type: task.type,
            priority: task.priority,
            status: task.status,
            // creationDate: task.creationDate,
        }
    }

    public static convertDashboardResponseToDashboard(dashboard: DashboardResponse): Dashboard {
        if (!dashboard) {
            return null;
        }
        return {
            projectTitle: dashboard.title,
            id: dashboard.dashboardId,
            reporter: dashboard.createdBy,
            assignee: dashboard.team?.map((user: UserResponse) => user.userId),
            description: dashboard.description,
            creationDate: new Date(dashboard.creationDate)?.toISOString(),
            updateDate: new Date(dashboard.modificationDate)?.toISOString(),
        }
    }

    public static convertTaskResponseToTask(task: TaskResponse): Task {
        if (!task) {
            return null;
        }
        return {
            title: task.title,
            id: task.taskId,
            code: task.dashboardSeq,
            type: task.type,
            priority: task.priority,
            status: task.status,
            assignee: task.assignedBy,
            reporter: task.createdBy,
            creationDate: new Date(task.creationDate)?.toISOString(),
            dashboardId: task.dashboardId,
            description: task.description,
            updateDate: new Date(task.modificationDate)?.toISOString(),
        }
    }

    public static convertUserResponseToUser(user: UserResponse): User {
        if (!user) {
            return null;
        }
        return {
            id: user.userId,
            userInfo: {
                firstName: user.firstName,
                lastName: user.lastName,
                profileIcon: user.profileIcon
            }
        }
    }

    public static convertChatResponseToChat(chat: ChatListResponse): ChatList {
        if (!chat) {
            return null;
        }
        return {
            chartId: chat.chartId,
            createTime: chat.createTime,
            createdBy: ConverterHelper.convertUserResponseToUser(chat.users?.find((user: UserResponse) => user.userId === chat.createdBy)),
            deletionTime: chat.deletionTime,
            titleChat: chat.titleChat,
            users: chat.users?.map((user: UserResponse) => ConverterHelper.convertUserResponseToUser(user)),
        }
    }

    public static convertMessageResponseToMessage(message: ChatMessageResponse): ChatMessage {
        if (!message) {
            return null;
        }
        return {
            chatId: message.chatId,
            fromUserId: message.fromUserId,
            messageId: message.messageId,
            messageText: message.messageText,
            messageTime: message.messageTime,
            updateTime: message.updateTime,
        }
    }
}
