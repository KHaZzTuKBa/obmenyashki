import { $api } from '@/shared/api';
import { User } from './types';
import axios from 'axios';
import { API_URL } from '@/shared/config/api';
import { IAuthResponse } from '@/shared/api/http/auth-response';

const BASE_URL = `${API_URL}/User`;

export const registerUser = async (
    name: string,
    phone: string,
    email: string,
    password: string
) => {
    return axios.post<IAuthResponse>(
        `${BASE_URL}/registration`,
        { name, phone, email, password },
        { withCredentials: true }
    );
};

export const loginUser = async (email: string, password: string) => {
    return axios.post<IAuthResponse>(
        `${BASE_URL}/login`,
        { email, password },
        { withCredentials: true }
    );
};

export const logoutUser = async (user: User) => {
    return axios.post(
        `${BASE_URL}/logout`,
        { user },
        { withCredentials: true }
    );
};

export const getUser = async (id: number) => {
    return await $api.get<User>(`/getUser/${id}`);
};

export const updateUser = async (user: User) => {
    return await $api.patch<User>(`/updateUser/${user.id}`, user);
};
