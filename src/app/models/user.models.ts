export type User = {
    id: string;
    role?: string;
    externalSystemId?: string;
    userInfo: UserInfo;
}

export type UserInfo = {
    firstName?: string;
    lastName?: string;
    profileIcon?: string;
}

export interface UserResponse {
    id?: string;
    externalSystemId?: string;
    role?: string;
    firstName: string;
    lastName?: string;
    email?: null,
    avatarUrl?: string;
    hardSkillsLevel?: string;
}

export interface UserInput extends UserResponse {
    login: string;
    password: string;
}

export type SessionUser = {
    userId: string;
    userToken: string;
}

