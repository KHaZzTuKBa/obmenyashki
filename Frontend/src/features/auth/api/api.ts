import axios, { AxiosError, AxiosResponse } from 'axios';

import { API_URL } from '@/shared/config/api';

import { AuthResponse } from '../model/types';

const BASE_URL = `${API_URL}/User`;

export const registerUser = async (
    name: string,
    phone: string,
    email: string,
    password: string
): Promise<AuthResponse> => {
    try {
        const response: AxiosResponse<AuthResponse> =
            await axios.post<AuthResponse>(
                `${BASE_URL}/registration`,
                { name, phone, email, password },
                { withCredentials: true }
            );
        if (
            response.status !== 200 ||
            response.data.user === null ||
            response.data.accessToken === null
        ) {
            throw new AxiosError(response.data?.message);
        }
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<AuthResponse>;
        console.error(axiosError);

        console.error('API Error:', axiosError.response?.data?.message);
        throw axiosError;
    }
};

export const loginUser = async (
    email: string,
    password: string
): Promise<AuthResponse> => {
    try {
        const response: AxiosResponse<AuthResponse> =
            await axios.post<AuthResponse>(
                `${BASE_URL}/login`,
                { email, password },
                { withCredentials: true }
            );
        if (
            response.status !== 200 ||
            response.data.user === null ||
            response.data.accessToken === null
        ) {
            throw new AxiosError(response.data?.message);
        }
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<AuthResponse>;
        console.error('API Error:', axiosError.response?.data?.message);
        throw axiosError;
    }
};
