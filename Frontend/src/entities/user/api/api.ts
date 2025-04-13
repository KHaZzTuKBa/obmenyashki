import { $api } from './instance';
import { User } from '../model/types';
import { AxiosResponse } from 'axios';

export const getUser = (user: User): Promise<AxiosResponse<User>> => {
    return $api.get<User>(`/getUser/${user.id}`);
};

export const updateUser = (user: User): Promise<AxiosResponse<User>> => {
    return $api.patch<User>(`/updateUser/${user.id}`, user);
};

export const logoutUser = (): Promise<void> => {
    return $api.get('/logout');
};
