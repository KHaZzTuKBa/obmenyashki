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

export interface RefreshResponse {
    accessToken: string | null;
}
