import { AxiosError, AxiosResponse } from 'axios';

import { Product } from '@/entities/product';
import { $api } from '@/entities/user/api';

export const getOwnProductList = async (): Promise<Product[]> => {
    try {
        const response: AxiosResponse<Product[]> =
            await $api.get<Product[]>(`Product/myList`);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.error(
            'API Error:',
            axiosError.response?.data || axiosError.message
        );
        throw new Error(axiosError.message);
    }
};
