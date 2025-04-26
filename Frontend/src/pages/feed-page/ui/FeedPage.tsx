import { useState } from 'react';

import { Product } from '@/entities/product';
import { Button } from '@/shared/ui/Form';
import { Loader } from '@/shared/ui/Loader';

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
            <div className={style.feed__header}>
                <h2>
                {query
                    ? `Результаты поиска по запросу: "${query}"`
                    : 'Лента товаров'}
            </h2>

                <Button
                    className={style.feed__button}
                    color='dark-green'
                    onClick={handeSortBy}
                >
                    {sortBy === 'ASC' ? 'Сначала старые' : 'Сначала новые'}
                </Button>
            </div>

            {isPending && <Loader />}

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

                            <div className={style.button_group}>
                                {bunchNumber > 1 && (
                                    <Button
                                        className={style.feed__button}
                                        color='dark-green'
                                        onClick={() => handleBunchNumber(-1)}
                                    >
                                    Предыдущая страница
                                    </Button>
                                )}

                                {data.productsAmount - bunchSize * bunchNumber >
                                    0 && (
                                    <Button
                                        className={style.feed__button}
                                        color='dark-green'
                                        onClick={() => handleBunchNumber(1)}
                                    >
                                    Следующая страница
                                    </Button>
                                )}
                            </div>
                        </>
                    ) : (
                        <p>
                            {query
                                ? `По запросу "${query}" ничего не найдено.`
                                : 'Объявления отсутствуют.'}
                        </p>
                    )}
                </>
            )}
        </section>
    );
};
