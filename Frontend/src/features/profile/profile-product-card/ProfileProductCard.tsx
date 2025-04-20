import { Link } from 'react-router-dom';

import { Product } from '@/entities/product/model/types';
import { ProductImage } from '@/entities/product/ui/product-image';
import { Path } from '@/shared/config/routes';

import styles from './style.module.scss';

export const ProfileProductCard = ({ product }: { product: Product }) => {
    return (
        <Link to={`${Path.VIEW_ITEM}${product.id}`}>
            <li className={styles.product__item}>
                <div className={styles.product__image}>
                    <ProductImage produtcImgURL={product.productImgURL} />
                </div>
                <p className={styles.product__name}>{product.productTitle}</p>
            </li>
        </Link>
    );
};
