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

export interface GetUserResponce {
    user: User;
    message?: string;
}

export interface UpdateUserResponce {
    user: User;
    message?: string;
}

export interface RefreshResponse {
    accessToken: string | null;
}
