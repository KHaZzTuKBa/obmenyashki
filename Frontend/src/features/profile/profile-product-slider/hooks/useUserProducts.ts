import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getCurrentUserId } from '@/entities/user';

import { getOwnProductList } from '../api/api';
import { GetOwnProductListResponse } from '../model/types';

export const useUserProducts = (): UseQueryResult<
    GetOwnProductListResponse,
    AxiosError<GetOwnProductListResponse>
> => {
    const userId = getCurrentUserId();
    return useQuery<
        GetOwnProductListResponse,
        AxiosError<GetOwnProductListResponse>
    >({
        queryKey: ['ownProducts', userId],
        queryFn: () => getOwnProductList(userId),
        refetchInterval: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};
