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
        queryKey: ['ownProducts'],
        queryFn: () => getOwnProductList(user),
    });
};
