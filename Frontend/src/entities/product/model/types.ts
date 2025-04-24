export interface Product {
    id: string;
    productTitle: string;
    productDescription: string;
    publishDate: string;
    productImgURLs: string[];
    tradeFor?: string;
    isActive: boolean;
}
