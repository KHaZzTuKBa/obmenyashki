import { Product } from '@/entities/product';

export interface GetOwnProductListResponse {
    products: Product[] | null;
    message?: string;
}
