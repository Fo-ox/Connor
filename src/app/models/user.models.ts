export type User = {
    id: string;
    userInfo: UserInfo;
}

export type UserInfo = {
    firstName?: string;
    lastName?: string;
    profileIcon?: string;
}

export type UserResponse = {
    userId?: string;
    userToken?: string;
    firstName?: string;
    lastName?: string;
    login?: string;
    password?: string;
    profileIcon?: string;
    status?: string;
}

export type SessionUser = {
    userId: string;
    userToken: string;
}

