export interface Product {
    id: string;
    name: string;
    description: string;
    author: string;
    authorId: number;
    publicDate: string;
    productImgURL?: string;
    tradefor?: string;
}
