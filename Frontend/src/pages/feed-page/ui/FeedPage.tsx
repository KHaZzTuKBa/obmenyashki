import { Product } from '@/entities/product';

import { useSearchFeed } from '../hooks/useSearchFeed';

import { ProductItem } from './feed-product-item/ProductItem';

import style from './style.module.scss';

export const FeedPage = () => {
    const { query, data, isError, error, isPending } = useSearchFeed();

    return (
        <section className={style.feed}>
            <h2 className={style.feed__header}>
                {query
                    ? `Результаты поиска по запросу: "${query}"`
                    : 'Лента товаров'}
            </h2>

            {isPending && (
                <div className={style.feed__loading}>Загрузка...</div>
            )}

            {isError && (
                <div className={style.feed__error}>
                    Ошибка при загрузке данных:{' '}
                    {error?.message || 'Неизвестная ошибка'}
                </div>
            )}

            {data && !isError && (
                <>
                    {data.items.length > 0 ? (
                        <>
                            {query && data.totalCount && (
                                <p>Всего найдено: {data.totalCount} товаров</p>
                            )}
                            <ul className={style.feed__body}>
                                {data.items.map((item: Product) => (
                                    <li
                                        key={item.id}
                                        className={style.feed__item}
                                    >
                                        <ProductItem item={item} />
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <p>
                            {query
                                ? `По запросу "${query}" ничего не найдено.`
                                : 'Товары отсутствуют.'}
                        </p>
                    )}
                </>
            )}
        </section>
    );
};
