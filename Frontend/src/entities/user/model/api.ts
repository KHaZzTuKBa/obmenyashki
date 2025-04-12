import { $api } from '@/shared/api';
import { User } from './types';
import axios from 'axios';
import { API_URL } from '@/shared/config/api';
import { IAuthResponse } from '@/shared/api/http/auth-response';

const BASE_URL = `${API_URL}/User`;

export const registerUser = (
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

export const loginUser = (email: string, password: string) => {
    return axios.post<IAuthResponse>(
        `${BASE_URL}/login`,
        { email, password },
        { withCredentials: true }
    );
};

export const logoutUser = (user: User) => {
    return axios.post(
        `${BASE_URL}/logout`,
        { user },
        { withCredentials: true }
    );
};

export const getUser = (user: User) => {
    return $api.get<User>(`/getUser/${user.id}`);
};

export const updateUser = (user: User) => {
    return $api.patch<User>(`/updateUser/${user.id}`, user);
};
