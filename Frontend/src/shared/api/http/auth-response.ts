import { User } from '@/entities/user/model/types';

export type IAuthResponse = {
    user: User;
    accessToken: string;
};
