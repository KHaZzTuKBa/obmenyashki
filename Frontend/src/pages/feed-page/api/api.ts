import { AxiosError } from 'axios';

import { $api } from '@/entities/user';

import { FeedApiResponse, SortBy } from '../model/types';

export const fetchFeedData = async (
    query: string,
    bunchNumber: number,
    bunchSize: number,
    sortBy: SortBy
): Promise<FeedApiResponse> => {
    const endpoint = 'Product/GetListOfProducts';

    const params: {
        q?: string;
        BunchNumber: number;
        BunchSize: number;
        SortBy: SortBy;
    } = {
        BunchNumber: bunchNumber > 0 ? bunchNumber : 1,
        BunchSize: bunchSize || 20,
        SortBy: sortBy || 'ASC',
    };

    if (query) {
        params.q = query;
    }

    try {
        const response = await $api.get<FeedApiResponse>(endpoint, { params });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<FeedApiResponse>;
        console.error(
            'API Error: ',
            axiosError.response?.data.message || axiosError.message
        );
        throw axiosError;
    }
};
