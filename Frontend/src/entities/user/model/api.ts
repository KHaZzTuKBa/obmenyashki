import { $api } from '@/shared/api';
import { User } from './types';
import { API_URL } from '@/shared/config/api';

export const getUser = (user: User) => {
    return $api.get<User>(`${API_URL}/getUser/${user.id}`);
};

export const updateUser = (user: User) => {
    return $api.patch<User>(`${API_URL}/updateUser/${user.id}`, user);
};
