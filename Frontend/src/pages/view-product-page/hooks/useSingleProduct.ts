import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Path } from '@/shared/config/routes';

import { getProductById, sentProductToArchive } from '../api/api';
import { GetProductByIdResponse } from '../model/types';

export const useSingleProduct = () => {
    const params = useParams<{ id: string }>();
    const productId = params.id;

    const navigate = useNavigate();

    useEffect(() => {
        if (!productId) {
            console.warn(
                'Product ID not found in URL, redirecting to /not-found'
            );
            navigate(Path.NOT_FOUND, { replace: true });
        }
    }, [productId, navigate]);

    const queryResult = useQuery<
        GetProductByIdResponse,
        AxiosError<GetProductByIdResponse>
    >({
        queryKey: ['singleProduct', productId],
        queryFn: () => {
            if (!productId) {
                throw new Error('Query function called without a product ID.');
            }
            return getProductById(productId);
        },
        enabled: !!productId,
        refetchInterval: 1 * 60 * 1000,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });

    const data = queryResult.data;

    const queryClient = useQueryClient();

    const handleSentProductToArchive = async () => {
        if (data && data.product) {
            await sentProductToArchive(data.product.id, !data.product.isActive);
            queryClient.refetchQueries({
                queryKey: ['singleProduct', productId],
            });
            queryClient.invalidateQueries({ queryKey: ['feed'] });
        }
    };

    useEffect(() => {}, [data?.product?.isActive]);

    return { ...queryResult, handleSentProductToArchive };
};
