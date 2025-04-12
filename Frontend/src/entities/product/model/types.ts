export interface Product {
    id: number;
    name: string;
    description: string;
    author: string;
    authorId: number;
    publicDate: string;
    productImgURL?: string;
    tradefor?: string;
}
