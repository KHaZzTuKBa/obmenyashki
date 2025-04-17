import { Product } from '@/entities/product/model/types';
import { ProductImage } from '@/entities/product/ui/product-image';
import styles from './style.module.scss';
import { Link } from 'react-router-dom';
import { Path } from '@/shared/config/routes';

export const ProfileProductCard = ({ product }: { product: Product }) => {
    return (
        <Link to={`${Path.VIEW_ITEM}${product.id}`}>
            <li className={styles.product__item}>
                <div className={styles.product__image}>
                    <ProductImage produtcImgURL={product.productImgURL} />
                </div>
                <p className={styles.product__name}>{product.title}</p>
            </li>
        </Link>
    );
};
