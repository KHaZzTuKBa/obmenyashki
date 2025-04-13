import { $api } from '@/shared/api';
import type { Product } from './types';
import { API_URL } from '@/shared/config/api';
import { AxiosResponse } from 'axios';

const BASE_URL = `${API_URL}/Product`;

export const getProductListByUserId = (
    id: string
): Promise<AxiosResponse<Product[]>> => {
    return $api.get<Product[]>(`${BASE_URL}/getListOfUser/${id}`);
};
