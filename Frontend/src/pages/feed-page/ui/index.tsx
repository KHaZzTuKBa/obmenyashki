import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Product } from '@/entities/product';
import { FeedApiResponse } from '../model';
import { fetchFeedData } from '../api';

export const FeedPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');

    const { data, isLoading, isError, error, isFetching } = useQuery<
        FeedApiResponse,
        AxiosError | Error
    >({
        queryKey: ['feed', query],
        queryFn: () => fetchFeedData(query),
        staleTime: 1000 * 60 * 5,
    });

    return (
        <div>
            <h1>
                {query
                    ? `Результаты поиска по запросу: "${query}"`
                    : 'Лента товаров'}
            </h1>

            {(isLoading || isFetching) && <div>Загрузка...</div>}

            {isError && (
                <div>
                    Ошибка при загрузке данных:{' '}
                    {error?.message || 'Неизвестная ошибка'}
                </div>
            )}

            {data && !isError && (
                <div>
                    {data.items.length > 0 ? (
                        <ul>
                            {data.items.map((item: Product) => (
                                <li key={item.id}>
                                    <h2>{item.name}</h2>
                                    <p>{item.description}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            {query
                                ? `По запросу "${query}" ничего не найдено.`
                                : 'Товары отсутствуют.'}
                        </p>
                    )}
                    {data.totalCount && <p>Всего найдено: {data.totalCount}</p>}
                </div>
            )}
        </div>
    );
};
