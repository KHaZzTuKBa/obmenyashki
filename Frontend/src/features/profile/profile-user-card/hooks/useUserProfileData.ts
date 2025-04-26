import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import {
    getCurrentUser,
    getCurrentUserId,
    setCurrentUser,
    getUserById,
    User,
    GetUserResponse,
} from '@/entities/user';

export const useUserProfileData = () => {
    const userId = getCurrentUserId();

    const queryResult = useQuery<User, AxiosError<GetUserResponse>>({
        queryKey: ['user', userId],
        queryFn: async () => getUserById(userId),

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
