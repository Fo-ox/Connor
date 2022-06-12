export const CERTIFICATE: string = 'https://';
// export const DOMAIN: string = 'localhost:3000';
export const DOMAIN: string = 'connor-server.herokuapp.com';
export const SOCKET: string = CERTIFICATE + DOMAIN + '/ws';

export enum Endpoints {
    LOGIN = '/user/authorise',
    GET_USERS = '/user/users',
    CREATE_USER = '/user/create',
    GET_DASHBOARDS = '/dashboards/getAll',
    CREATE_DASHBOARD = '/dashboards/create',
    UPDATE_DASHBOARD = '/dashboards/update',
    GET_TASKS = '/task/tasks',
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
