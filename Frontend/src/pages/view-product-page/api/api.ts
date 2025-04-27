import { AxiosError } from 'axios';

import { $api } from '@/entities/user';

import {
    GetProductByIdResponse,
    SentProductToArchiveResponse,
} from '../model/types';

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

export const sentProductToArchive = async (
    productId: string,
    isActive: boolean
): Promise<SentProductToArchiveResponse> => {
    const endpoint = 'Product/ChangeProductStatus';

    try {
        const response = await $api.patch<SentProductToArchiveResponse>(
            endpoint,
            { productId, isActive }
        );
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<SentProductToArchiveResponse>;
        console.error(
            'API Error: ',
            axiosError.response?.data.message || axiosError.message
        );
        throw axiosError;
    }
};
