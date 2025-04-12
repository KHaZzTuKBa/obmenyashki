import { useUserStore } from '@/entities/user/model';
import { useQuery } from '@tanstack/react-query';
import { getProductListByUserId } from '@/entities/product/model/api';
import { ProfileProductCard } from '@/entities/product/ui';
import { isAxiosError } from 'axios';
import { Link } from 'react-router-dom';
import { getViewItemPath } from '@/shared/config/routes';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Virtual } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

import style from './style.module.scss';

export const ProfileProductSlider = () => {
    const { id } = useUserStore((state) => state.user);
    const { data, error, isPending } = useQuery({
        queryFn: async () => await getProductListByUserId(id),
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
                    {` ${error.response?.status} ${error.message}`}
                </div>
            );
        }
        return <div>{error.message}</div>;
    }

    return (
        <div className={`${style.profile__products} ${style.products}`}>
            <h2 className={style.products__header}>Активные лоты</h2>
            <ul className={style.products__list}>
                {data?.length > 0 ? (
                    <Swiper
                        grabCursor
                        centeredSlides
                        spaceBetween={50}
                        slidesPerView={1}
                        modules={[Virtual]}
                        breakpoints={{
                            500: {
                                slidesPerView: 2,
                            },
                            651: {
                                slidesPerView: 3,
                            },
                            769: {
                                slidesPerView: 1,
                            },
                            1100: {
                                slidesPerView: 2,
                            },
                            1400: {
                                slidesPerView: 3,
                            },
                            1800: {
                                slidesPerView: 4,
                            },
                        }}
                    >
                        {data.map((item) => (
                            <SwiperSlide>
                                <Link
                                    to={getViewItemPath(item.id)}
                                    key={item.id}
                                    className={style.products__link}
                                >
                                    <ProfileProductCard product={item} />{' '}
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div>Вы еще не выставили товары.</div>
                )}
            </ul>
        </div>
    );
};
