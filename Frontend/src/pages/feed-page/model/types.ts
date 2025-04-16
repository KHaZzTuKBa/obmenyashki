import { Product } from '@/entities/product';

export interface FeedApiResponse {
    items: Product[];
    totalCount?: number;
}
