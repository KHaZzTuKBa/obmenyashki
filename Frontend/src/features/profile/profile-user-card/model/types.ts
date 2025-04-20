import { AxiosError } from 'axios';

import { User } from '@/entities/user';
import { GetUserResponse } from '@/entities/user/model/types';

export interface UserProfileData {
    user: User;
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
    error: AxiosError<GetUserResponse> | null;
}
