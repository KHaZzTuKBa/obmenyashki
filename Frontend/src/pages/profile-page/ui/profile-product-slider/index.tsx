import { useUserStore } from '@/entities/user/model';
import style from './style.module.scss';
import { useQuery } from '@tanstack/react-query';
import { getProductListByUserId } from '@/entities/product/model/api';
import { ProfileProductCard } from '@/entities/product/ui';
import { isAxiosError } from 'axios';
import { Link } from 'react-router-dom';
import { getViewItemPath } from '@/shared/config/routes';

export const ProfileProductSlider = () => {
    const { id } = useUserStore((state) => state.user);
    const { data, error, isPending } = useQuery({
        queryFn: () => getProductListByUserId(id),
        queryKey: ['userProductList', id],
        select: (data) => data.data,
    });

    if (isPending) {
        return (
            <div className={`${style.profile__products} ${style.products}`}>
                Загрузка...
            </div>
        );
    }

    if (error) {
        if (isAxiosError(error)) {
            return (
                <div className={`${style.profile__products} ${style.products}`}>
                    Ошибка соединения с сервером. Код ошибки:
                    {` ${error.code} ${error.message}`}
                </div>
            );
        }
        return <div>{error.message}</div>;
    }

    return (
        <div className={`${style.profile__products} ${style.products}`}>
            <h2 className={style.products__header}>Активные лоты</h2>
            <ul className={style.products__list}>
                {data.length > 0 ? (
                    data.map((item) => (
                        <Link to={getViewItemPath(item.id)} key={item.id}>
                            <ProfileProductCard product={item} />{' '}
                        </Link>
                    ))
                ) : (
                    <div>Вы еще не выставили товары.</div>
                )}
            </ul>
        </div>
    );
};
