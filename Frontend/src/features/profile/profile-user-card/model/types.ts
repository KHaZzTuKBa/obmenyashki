import { AxiosError } from 'axios';

import { User } from '@/entities/user';

export interface UserProfileData {
    user: User;
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
    error?: AxiosError | null;
}
