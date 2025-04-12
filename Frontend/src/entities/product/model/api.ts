import { $api } from '@/shared/api';
import { Product } from './types';
import { API_URL } from '@/shared/config/api';

const BASE_URL = `${API_URL}/Product`;

export const getProductListByUserId = async (id: number) => {
    return $api.get<Product[]>(`${BASE_URL}/getListOfUser/${id}`);
};
