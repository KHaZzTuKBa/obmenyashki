import { Product } from '@/entities/product';
import { $api } from '@/entities/user/api';
import { AxiosResponse } from 'axios';

export const getOwnProductList = (): Promise<AxiosResponse<Product[]>> => {
    return $api.get<Product[]>(`$Product/myList`);
};
