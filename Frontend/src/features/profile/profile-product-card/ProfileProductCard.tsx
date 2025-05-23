import { Link } from 'react-router-dom';

import { Product } from '@/entities/product/model/types';
import { ProductImage } from '@/entities/product/ui/product-image';
import { getViewItemPath } from '@/shared/config/routes';

import styles from './style.module.scss';

export const ProfileProductCard = ({ product }: { product: Product }) => {
    return (
        <Link to={getViewItemPath(product.id)}>
            <li className={styles.product__item}>
                <div className={styles.product__image}>
                    <ProductImage produtcImgURL={product.imgURLs[0]} />
                </div>
                <p className={styles.product__name}>{product.productTitle}</p>
            </li>
        </Link>
    );
};
