import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getOwnProductList } from '../api/api';
import { Product } from '@/entities/product';
import { AxiosError } from 'axios';

export const useUserProducts = (): UseQueryResult<Product[], AxiosError> => {
    return useQuery<Product[], AxiosError>({
        queryKey: ['ownProducts'],
        queryFn: async () => {
            const res = await getOwnProductList();
            return res.data;
        },
    });
};
