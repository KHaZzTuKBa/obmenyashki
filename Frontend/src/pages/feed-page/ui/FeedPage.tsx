import { useState } from 'react';

import { Product } from '@/entities/product';

import { useSearchFeed } from '../hooks/useSearchFeed';
import { SortBy } from '../model/types';

import { ProductItem } from './feed-product-item/ProductItem';

import style from './style.module.scss';

export const FeedPage = () => {
    const [bunchNumber, setBunchNumber] = useState<number>(1);
    const [bunchSize] = useState<number>(20);
    const [sortBy, setSortBy] = useState<SortBy>('ASC');
    const { query, data, isError, error, isPending, isSuccess } = useSearchFeed(
        bunchNumber,
        bunchSize,
        sortBy
    );

    const handleBunchNumber = (val: number) => {
        switch (val) {
            case 1:
                setBunchNumber((prev) => prev + 1);
                break;
            case -1:
                if (bunchNumber > 1) setBunchNumber((prev) => prev - 1);
                break;
        }
    };

    const handeSortBy = () => {
        switch (sortBy) {
            case 'ASC':
                setSortBy('DESC');
                break;
            case 'DESC':
                setSortBy('ASC');
                break;
        }
    };

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
                    {error.response?.data.message || 'Неизвестная ошибка'}
                </div>
            )}

            {isSuccess && (
                <>
                    {data.products.length > 0 ? (
                        <>
                            <ul className={style.feed__body}>
                                {data.products.map((item: Product) => (
                                    <li
                                        key={item.id}
                                        className={style.feed__item}
                                    >
                                        <ProductItem item={item} />
                                    </li>
                                ))}
                            </ul>
                            <div>
                                <button onClick={() => handleBunchNumber(-1)}>
                                    Предидущая страница
                                </button>
                                <button onClick={() => handleBunchNumber(1)}>
                                    Следующая страница
                                </button>
                            </div>
                            <button onClick={handeSortBy}>
                                Сортировка:{' '}
                                {sortBy === 'ASC'
                                    ? 'сначала старые'
                                    : 'сначала новые'}
                            </button>
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
