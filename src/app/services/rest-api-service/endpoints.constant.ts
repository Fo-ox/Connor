export const CERTIFICATE: string = 'http://';
export const DOMAIN: string = 'localhost:8080';
export const SOCKET: string = CERTIFICATE + DOMAIN + '/ws';

export enum Endpoints {
    LOGIN = '/user/login',
    GET_USERS = '/user/getAll',
    CREATE_USER = '/user/create',
    GET_DASHBOARDS = '/dashboards/getAll',
    CREATE_DASHBOARD = '/dashboards/create',
    UPDATE_DASHBOARD = '/dashboards/update',
    GET_TASKS = '/tasks/getAll',
    CREATE_TASK = '/tasks/create',
    UPDATE_TASK = '/tasks/update',
    GET_MESSAGES = '/message/getMessagesByChatId',
    MESSAGE_CONNECT = '/topic/public',
    SEND_MESSAGE = '/app/chat.sendMessage',
    GET_CHATS = '/chats/getAllChatsUser',
    CREATE_CHAT = '/app/user.sendChat',
    CHAT_CONNECT = '/topic/chat',
    GET_COMMENTS = '/comment/getCommentsByTaskId',
    SEND_COMMENT = '/comment/create'
}
