import { AxiosError, AxiosResponse } from 'axios';

import { $baseApi } from '@/shared/api';

import { getAccessToken, User } from '../model';
import { GetUserResponse, UpdateUserResponse } from '../model/types';

import { $api } from './instance';

const BASE_URL = 'User';

export const getUser = (
    user: User
): Promise<AxiosResponse<GetUserResponse>> => {
    return $api.get<GetUserResponse>(`${BASE_URL}/getUser/?Id=${user.id}`);
};

export const updateUser = (
    user: User
): Promise<AxiosResponse<UpdateUserResponse>> => {
    return $api.patch<UpdateUserResponse>(`${BASE_URL}/updateUser`, user);
};

export const logoutUser = (): Promise<AxiosResponse<void>> => {
    return $baseApi.get<void>(`${BASE_URL}/logout`, {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });
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
        throw error;
    }
};
