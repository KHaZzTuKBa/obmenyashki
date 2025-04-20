export interface Product {
    id: string;
    productTitle: string;
    productDescription: string;
    publishDate: string;
    owner: string;
    productImgURL: string | null;
    tradeFor?: string;
    isActive: boolean;
}
