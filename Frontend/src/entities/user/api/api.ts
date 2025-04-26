import { AxiosError, AxiosResponse } from 'axios';

import { $baseApi } from '@/shared/api';

import { getAccessToken, User } from '../model';
import { GetUserResponse, UpdateUserResponse } from '../model/types';

import { $api } from './instance';

const BASE_URL = 'User';

export const getUserById = async (userId: string): Promise<User> => {
    try {
        const response: AxiosResponse<GetUserResponse> =
            await $api.get<GetUserResponse>(
                `${BASE_URL}/getUser/?Id=${userId}`
            );
        return response.data.user;
    } catch (error) {
        const axiosError = error as AxiosError<GetUserResponse>;
        console.error(
            'API Error: ',
            axiosError.response?.data.message || axiosError.message
        );
        throw axiosError;
    }
};

export const updateUser = async (user: User): Promise<User> => {
    try {
        const response: AxiosResponse<UpdateUserResponse> =
            await $api.patch<UpdateUserResponse>(
                `${BASE_URL}/updateUser`,
                user
            );
        return response.data.user;
    } catch (error) {
        const axiosError = error as AxiosError<GetUserResponse>;
        console.error(
            'API Error: ',
            axiosError.response?.data.message || axiosError.message
        );
        throw axiosError;
    }
};

export const logoutUser = async (): Promise<void> => {
    try {
        await $baseApi.get<void>(`${BASE_URL}/logout`, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            },
        });
    } catch (error) {
        const axiosError = error as AxiosError<GetUserResponse>;
        console.error(
            'API Error: ',
            axiosError.response?.data.message || axiosError.message
        );
        throw axiosError;
    }
};

export const isAuth = async (): Promise<boolean> => {
    try {
        const response: AxiosResponse<void> = await $api.get<void>(
            `${BASE_URL}/isAuth`
        );
        if (response.status === 200) return true;
        throw new AxiosError(response.status.toString());
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.status === 401 || +axiosError.message === 401)
            return false;
        throw axiosError;
    }
};
