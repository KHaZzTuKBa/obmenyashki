import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import {
    getCurrentUser,
    getCurrentUserId,
    setCurrentUser,
    User,
} from '@/entities/user';
import { getUser } from '@/entities/user/api';
import { GetUserResponse } from '@/entities/user/model/types';

export const useUserProfileData = () => {
    const userId = getCurrentUserId();

    const queryResult = useQuery<User, AxiosError<GetUserResponse>>({
        queryKey: ['user', userId],
        queryFn: async () => getUser(userId),

        refetchInterval: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });

    const user = queryResult.data;

    useEffect(() => {
        if (user) {
            setCurrentUser(user);
        }
    }, [user]);

    return { user: user ?? getCurrentUser(), ...queryResult };
};
