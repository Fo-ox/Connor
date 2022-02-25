import { User, UserResponse } from "./user.models";

export type ChatList = {
    chartId: string,
    createTime: string,
    createdBy: User,
    deletionTime: string,
    titleChat: string,
    users: User[];
}

export type ChatListInput = {
    chat_id?: string,
    title: string,
    userId: string,
    users: Array<{ userId: string }>,
}

export type ChatListResponse = {
    chartId?: string,
    createTime?: string,
    createdBy: string,
    deletionTime?: string,
    titleChat: string,
    users: UserResponse[];
}

export type ChatMessage = {
    chatId: string,
    fromUserId: string,
    messageId: string,
    messageText: string,
    messageTime?: string,
    updateTime?: string,
}

export type ChatMessageResponse = {
    chatId: string,
    fromUserId: string,
    messageId?: string,
    messageText: string,
    messageTime?: string,
    updateTime?: string,
}
