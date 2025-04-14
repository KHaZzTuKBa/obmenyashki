import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Virtual } from 'swiper/modules';
import { Product } from '@/entities/product';
import { getViewItemPath, Path } from '@/shared/config/routes';
import { useUserProducts } from '../hooks/useUserProducts';
import { ProfileProductCard } from '../../profile-product-card';

import 'swiper/swiper-bundle.css';
import style from './style.module.scss';

export const ProfileProductSlider = () => {
    const { data, error, isPending } = useUserProducts();

    if (isPending) {
        return (
            <div className={`${style.profile__products} ${style.products}`}>
                <p>Загрузка...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`${style.profile__products} ${style.products}`}>
                <p>
                    Ошибка соединения с сервером. Код ошибки:
                    {` ${error.response?.status} ${error.message}`}
                </p>
            </div>
        );
    }

    return (
        <div className={`${style.profile__products} ${style.products}`}>
            <h2 className={style.products__header}>Активные лоты</h2>

            {data?.length > 0 ? (
                <ul className={style.products__list}>
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
                        {data.map((item: Product) => (
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
                </ul>
            ) : (
                <p>
                    У вас нет товаров.{' '}
                    <Link
                        className={style.products__addProductLink}
                        to={Path.MY_ITEM_ADD}
                    >
                        Хотите создать?
                    </Link>
                </p>
            )}
        </div>
    );
};
