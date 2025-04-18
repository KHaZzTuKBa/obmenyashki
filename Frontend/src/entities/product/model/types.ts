export interface Product {
    id: string;
    title: string;
    description: string;
    owner: string;
    ownerId: number;
    publishDate: string;
    productImgURL?: string | null;
    tradefor?: string;
}
