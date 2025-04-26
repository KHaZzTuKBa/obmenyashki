export interface User {
    id: string;
    name: string;
    birthday?: string;
    town?: string;
    phone: string;
    email: string;
    avatarURL?: string;
    isOnline: boolean;
}

export interface GetUserResponse {
    user: User;
    message: string;
}

export interface UpdateUserResponse {
    user: User;
    message: string;
}
