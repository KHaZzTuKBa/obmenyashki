import { AxiosError, AxiosResponse } from 'axios';

import { $baseApi } from '@/shared/api';

import { getAccessToken, User } from '../model';
import { GetUserResponce, UpdateUserResponce } from '../model/types';

import { $api } from './instance';

export const getUser = (
    user: User
): Promise<AxiosResponse<GetUserResponce>> => {
    return $api.get<GetUserResponce>(`User/getUser/?Id=${user.id}`);
};

export const updateUser = (
    user: User
): Promise<AxiosResponse<UpdateUserResponce>> => {
    return $api.patch<UpdateUserResponce>(`User/updateUser`, user);
};

export const logoutUser = (): Promise<AxiosResponse<void>> => {
    return $baseApi.get<void>('User/logout', {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });
};

export const isAuth = async (): Promise<boolean> => {
    try {
        const response: AxiosResponse<void> =
            await $api.get<void>(`User/isAuth`);
        if (response.status === 200) return true;
        throw new AxiosError(response.status.toString());
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.status === 401 || +axiosError.message === 401)
            return false;
        throw error;
    }
};
