export type User = {
    id: string;
    name: string;
    birthday?: string;
    town?: string;
    phone: string;
    email: string;
    avatarURL?: string;
};

export type AuthResponse = {
    user: User;
    token: string | null;
};

export type RefreshResponse = {
    token: string | null;
};
