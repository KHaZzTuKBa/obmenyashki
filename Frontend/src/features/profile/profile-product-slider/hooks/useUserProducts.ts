import { getProductListByUserId } from "@/entities/product/model/api";
import { useUserStore } from "@/entities/user/model";
import { useQuery } from "@tanstack/react-query";

export const useUserProducts = () => {
    const id = useUserStore((s) => s.user?.id);
    return useQuery({
        queryKey: ['userProducts', id],
        queryFn: () => (id ? getProductListByUserId(id) : Promise.reject()),
        select: (data) => data.data,
        enabled: !!id,
    });
};