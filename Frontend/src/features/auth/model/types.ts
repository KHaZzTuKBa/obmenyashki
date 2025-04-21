import { User } from '@/entities/user';

export interface AuthResponse {
    user: User;
    accessToken: string | null;
    message?: string;
}

export interface LoginFormData {
    email: string;
    password: string;
}

export interface RegisterFormData {
    name: string;
    phone: string;
    email: string;
    password: string;
}
