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

export interface AuthResponse {
    user: User;
    accessToken: string | null;
    message?: string;
}

export interface RefreshResponse {
    accessToken: string | null;
}
