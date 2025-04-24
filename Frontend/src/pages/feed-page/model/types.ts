import { Product } from '@/entities/product';

export interface FeedApiResponse {
    products: Product[];
    productsAmount: number;
    message?: string;
}

export type SortBy = 'ASC' | 'DESC';
