export interface Product {
    id: string;
    productTitle: string;
    productDescription: string;
    publishDate: string;
    productImgURL: string | null;
    tradeFor?: string;
    isActive: boolean;
}
