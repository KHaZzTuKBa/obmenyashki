import { Product } from '@/entities/product';

export interface GetProductByIdResponse {
    product: Product | null;
    ownerId: string | null;
    message: string;
}

export interface SentProductToArchiveResponse {
    message: string;
}
