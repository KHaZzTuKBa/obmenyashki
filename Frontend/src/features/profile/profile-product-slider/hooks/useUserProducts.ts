import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { Product } from '@/entities/product';

import { getOwnProductList } from '../api/api';

export const useUserProducts = (): UseQueryResult<Product[], AxiosError> => {
    return useQuery<Product[], AxiosError>({
        queryKey: ['ownProducts'],
        queryFn: async () => getOwnProductList(),
    });
};
