import { AxiosError, AxiosResponse } from 'axios';

import { User, $api } from '@/entities/user';

import { GetOwnProductListResponse } from '../model/types';

export const getOwnProductList = async (
    user: User
): Promise<GetOwnProductListResponse> => {
    try {
        const response: AxiosResponse<GetOwnProductListResponse> =
            await $api.get<GetOwnProductListResponse>(
                `Product/GetUserProducts?UserId=${user.id}`
            );
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<GetOwnProductListResponse>;
        console.error(
            'API Error:',
            axiosError.response?.data.message || axiosError.message
        );
        throw axiosError;
    }
};
