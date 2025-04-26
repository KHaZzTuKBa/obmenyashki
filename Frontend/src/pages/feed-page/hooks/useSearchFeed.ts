import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSearchParams } from 'react-router-dom';

import { fetchFeedData } from '../api/api';
import { FeedApiResponse, SortBy } from '../model/types';

export const useSearchFeed = (
    bunchNumber: number,
    bunchSize: number,
    sortBy: SortBy
) => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';

    const queryResult = useQuery<FeedApiResponse, AxiosError<FeedApiResponse>>({
        queryKey: ['feed', query, bunchNumber, bunchSize, sortBy],
        queryFn: () => fetchFeedData(query, bunchNumber, bunchSize, sortBy),
        refetchInterval: 1 * 60 * 1000,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });

    return { query, ...queryResult };
};
