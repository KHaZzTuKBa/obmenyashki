export interface AddProductData {
    productTitle: string;
    productDescription: string;
    tradeFor: string;
    ownerId: string;
    images: File[];
    agreement: boolean;
}

export interface AddProductResponse {
    message: string;
}
