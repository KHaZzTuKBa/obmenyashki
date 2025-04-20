import { Product } from '@/entities/product';

export interface FeedApiResponse {
    products: Product[];
    message?: string;
}

export type SortBy = 'ASC' | 'DESC';
