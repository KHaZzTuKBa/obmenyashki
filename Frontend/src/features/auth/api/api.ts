import axios, { AxiosError, AxiosResponse } from 'axios';

import { API_URL } from '@/shared/config/api';

import { AuthResponse, LoginFormData, RegisterFormData } from '../model/types';

const BASE_URL = `${API_URL}/User`;

export const registerUser = async (
    data: RegisterFormData
): Promise<AuthResponse> => {
    try {
        const response: AxiosResponse<AuthResponse> =
            await axios.post<AuthResponse>(
                `${BASE_URL}/registration`,
                { ...data },
                { withCredentials: true }
            );
        if (
            response.status !== 200 ||
            response.data.user === null ||
            response.data.accessToken === null
        ) {
            throw new AxiosError(response.data.message);
        }
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<AuthResponse>;
        console.error(
            'API Error: ',
            axiosError.response?.data.message || axiosError.message
        );
        throw axiosError;
    }
};

export const loginUser = async (data: LoginFormData): Promise<AuthResponse> => {
    try {
        const response: AxiosResponse<AuthResponse> =
            await axios.post<AuthResponse>(
                `${BASE_URL}/login`,
                { ...data },
                { withCredentials: true }
            );
        if (
            response.status !== 200 ||
            response.data.user === null ||
            response.data.accessToken === null
        ) {
            throw new AxiosError(response.data.message);
        }
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<AuthResponse>;
        console.error(
            'API Error: ',
            axiosError.response?.data.message || axiosError.message
        );
        throw axiosError;
    }
};
