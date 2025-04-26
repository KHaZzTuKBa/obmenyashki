import { Product } from '@/entities/product';

export interface GetProductByIdResponse {
    product: Product;
    ownerId: string;
    message?: string;
}
