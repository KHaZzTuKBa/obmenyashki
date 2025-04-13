import { useQuery } from '@tanstack/react-query';
import { getOwnProductList } from '../api/api';

export const useUserProducts = () => {
    return useQuery({
        queryKey: ['ownProducts'],
        queryFn: () => getOwnProductList(),
        select: (data) => data.data,
    });
};
