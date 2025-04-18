import { AxiosResponse } from 'axios';

import { $baseApi } from '@/shared/api';

import { getAccessToken } from '../model';
import { User } from '../model/types';

import { $api } from './instance';

export const getUser = (user: User): Promise<AxiosResponse<User>> => {
    return $api.get<User>(`User/getUser/?Id=${user.id}`);
};

export const updateUser = (user: User): Promise<AxiosResponse<User>> => {
    return $api.patch<User>(`User/updateUser`, user);
};

export const logoutUser = (): Promise<AxiosResponse<void>> => {
    return $baseApi.get<void>('User/logout', {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });
};
