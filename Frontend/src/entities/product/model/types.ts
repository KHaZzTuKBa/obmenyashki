export interface Product {
    id: string;
    productTitle: string;
    productDescription: string;
    publishDate: string;
    imgURLs: string[];
    tradeFor?: string;
    isActive: boolean;
}
