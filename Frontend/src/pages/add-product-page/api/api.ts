import { AxiosError, AxiosResponse } from 'axios';

import { $api } from '@/entities/user';

import { AddProductResponse } from '../model/types';

export const AddProduct = async (
    data: FormData
): Promise<AddProductResponse> => {
    try {
        const response: AxiosResponse<AddProductResponse> =
            await $api.post<AddProductResponse>('Product/AddProduct', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<AddProductResponse>;
        console.error('API Error:', axiosError.response?.data?.message);
        throw axiosError;
    }
};
