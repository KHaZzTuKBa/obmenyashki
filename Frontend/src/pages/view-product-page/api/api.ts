import { AxiosError } from 'axios';

import { $api } from '@/entities/user';

import { GetProductByIdResponse } from '../model/types';

export const getProductById = async (
    productId: string
): Promise<GetProductByIdResponse> => {
    const endpoint = 'Product/GetProductById';

    try {
        const response = await $api.get<GetProductByIdResponse>(
            `${endpoint}?ProductId=${productId}`
        );
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<GetProductByIdResponse>;
        console.error(
            'API Error: ',
            axiosError.response?.data.message || axiosError.message
        );
        throw axiosError;
    }
};
