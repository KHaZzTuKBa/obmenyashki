import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getCurrentUser } from '@/entities/user';

import { getOwnProductList } from '../api/api';
import { GetOwnProductListResponse } from '../model/types';

export const useUserProducts = (): UseQueryResult<
    GetOwnProductListResponse,
    AxiosError
> => {
    const user = getCurrentUser();
    return useQuery<GetOwnProductListResponse, AxiosError>({
        queryKey: ['ownProducts', user.id],
        queryFn: () => getOwnProductList(user),
        refetchInterval: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};
