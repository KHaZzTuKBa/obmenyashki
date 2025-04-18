import { AxiosError } from 'axios';

import { $api } from '@/entities/user/api';

import { FeedApiResponse } from '../model/types';

export const fetchFeedData = async (
    query: string | null
): Promise<FeedApiResponse> => {
    const endpoint = '/feed';

    const params: { q?: string } = {};
    if (query) {
        params.q = query;
    }

    try {
        const response = await $api.get<FeedApiResponse>(endpoint, { params });
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
