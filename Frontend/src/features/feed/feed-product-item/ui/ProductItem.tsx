import { Product, ProductImage } from '@/entities/product';

import style from './style.module.scss';

export const ProductItem = ({ item }: { item: Product }) => {
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
                <h3 className={style.card__title}>{item.title}</h3>
                <p className={style.card__date}>{item.publishDate}</p>
                <p className={style.card__description}>{item.description}</p>
                <button className={style.card__button}>Обменяться</button>
            </div>
        </div>
    );
};
