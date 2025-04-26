import { Product } from '@/entities/product';

export interface GetOwnProductListResponse {
    products: Product[];
    message: string;
}
