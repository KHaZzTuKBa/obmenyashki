import { useQuery } from '@tanstack/react-query';
import { getProductListByUserId } from '@/entities/product/model';
import { useUserStore } from '@/entities/user/model';

export const useUserProducts = () => {
    const id = useUserStore((s) => s.user.id);
    return useQuery({
        queryKey: ['userProducts', id],
        queryFn: () => getProductListByUserId(id),
        select: (data) => data.data,
    });
};
