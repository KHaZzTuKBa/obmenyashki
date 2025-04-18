import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { fetchFeedData } from '../api/api';
import { FeedApiResponse } from '../model/types';

export const useSearchFeed = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const queryResult = useQuery<FeedApiResponse, AxiosError | Error>({
        queryKey: ['feed', query],
        queryFn: () => fetchFeedData(query),
        staleTime: 1000 * 60 * 5,
    });

    return { query, ...queryResult };
};
