import { Link } from 'react-router-dom';

import { Product, ProductImage } from '@/entities/product';
import { getViewItemPath } from '@/shared/config/routes';
import { formatDateToEuropean } from '@/shared/lib/date/fromatDate';

import style from './style.module.scss';

export const ProductItem = ({ item }: { item: Product }) => {
    const date = formatDateToEuropean(item.publishDate);
    return (
        <div className={style.card}>
            <div className={style.card__left}>
                <ProductImage
                    className={style.card__leftImage}
                    produtcImgURL={item.productImgURL}
                />
            </div>
            <div className={style.card__right}>
                <p className={style.card__seller}>{item.owner}</p>
                <h3 className={style.card__title}>{item.productTitle}</h3>
                <p className={style.card__date}>{date}</p>
                <p className={style.card__description}>
                    {item.productDescription}
                </p>
                <Link
                    to={getViewItemPath(item.id)}
                    className={style.card__button}
                >
                    Обменяться
                </Link>
            </div>
        </div>
    );
};
