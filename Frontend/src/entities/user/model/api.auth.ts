import { AuthResponse } from './types';
import axios, { AxiosResponse } from 'axios';
import { API_URL } from '@/shared/config/api';

const BASE_URL = `${API_URL}/User`;

export const registerUser = async (
    name: string,
    phone: string,
    email: string,
    password: string
): Promise<AxiosResponse<AuthResponse>> => {
    return axios.post<AuthResponse>(
        `${BASE_URL}/registration`,
        { name, phone, email, password },
        { withCredentials: true }
    );
};

export const loginUser = async (
    email: string,
    password: string
): Promise<AxiosResponse<AuthResponse>> => {
    return axios.post<AuthResponse>(
        `${BASE_URL}/login`,
        { email, password },
        { withCredentials: true }
    );
};

export const logoutUser = async (): Promise<void> => {
    return axios.post(`${BASE_URL}/logout`, { withCredentials: true });
};
