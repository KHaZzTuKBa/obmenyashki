import { Product } from '@/entities/product/model/types';
import { ProductImage } from '@/entities/product/ui/product-image';
import styles from './style.module.scss';

export const ProfileProductCard = ({ product }: { product: Product }) => {
    return (
        <li className={styles.product__item}>
            <div className={styles.product__image}>
                <ProductImage produtcImgURL={product.productImgURL} />
            </div>
            <p className={styles.product__name}>{product.name}</p>
        </li>
    );
};
