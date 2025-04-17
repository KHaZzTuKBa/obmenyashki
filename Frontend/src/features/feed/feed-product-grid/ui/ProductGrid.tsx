import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Product } from '@/entities/product';
import { FeedApiResponse } from '../model/types';
import { fetchFeedData } from '../api/api';
import { ProductItem } from '../../feed-product-item';

import style from './style.module.scss';

export const ProductGrid = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const { data, isError, error, isPending, isFetching } = useQuery<
        FeedApiResponse,
        AxiosError | Error
    >({
        queryKey: ['feed', query],
        queryFn: () => fetchFeedData(query),
        staleTime: 1000 * 60 * 5,
    });

    return (
        <>
            <h2 className={style.feed__header}>
                {query
                    ? `Результаты поиска по запросу: "${query}"`
                    : 'Лента товаров'}
            </h2>

            {isPending && <div>Загрузка...</div>}

            {isError && (
                <div>
                    Ошибка при загрузке данных:{' '}
                    {error?.message || 'Неизвестная ошибка'}
                </div>
            )}

            {data && !isError && (
                <>
                    {data.items.length > 0 ? (
                        <>
                            {query && data?.totalCount && (
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
                            {isFetching && <div>Загрузка...</div>}
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
        </>
    );
};
