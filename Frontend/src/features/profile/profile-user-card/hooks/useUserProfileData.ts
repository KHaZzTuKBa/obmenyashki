import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import { getCurrentUser, setCurrentUser, User } from '@/entities/user';
import { getUser } from '@/entities/user/api';
import { GetUserResponse } from '@/entities/user/model/types';

import { UserProfileData } from '../model/types';

export const useUserProfileData = (): UserProfileData => {
    const user = getCurrentUser();

    const { data, isPending, isError, error, isSuccess } = useQuery<
        User,
        AxiosError<GetUserResponse>
    >({
        queryKey: ['user', user.id],
        queryFn: () => getUser(user).then((res) => res.data.user),

        refetchInterval: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });

    useEffect(() => {
        if (data) {
            setCurrentUser({ ...data });
        }
    }, [data]);

    return { user: data ?? user, isPending, isError, error, isSuccess };
};
