import { Link } from 'react-router-dom';
import { Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

import { Product } from '@/entities/product';
import { Path } from '@/shared/config/routes';
import { Loader } from '@/shared/ui/Loader';

import { ProfileProductCard } from '../../profile-product-card/ProfileProductCard';
import { useUserProducts } from '../hooks/useUserProducts';

import style from './style.module.scss';

export const ProfileProductSlider = () => {
    const { data, error, isPending, isError, isSuccess } = useUserProducts();

    return (
        <div className={`${style.profile__products} ${style.products}`}>
            <h2 className={style.products__header}>Ваши объявления</h2>

            {isPending && <Loader wrapperClassName={style.products__loader} />}

            {isError && (
                <p className={style.profile__error}>
                    {error.response?.data.message || error.status
                        ? `Ошибка соединения с сервером. Код ошибки: ${error.status}`
                        : 'Неизместная ошибка'}
                </p>
            )}

            {isSuccess &&
                (data.products.length > 0 ? (
                    <ul className={style.products__list}>
                        <Swiper
                            grabCursor
                            modules={[Virtual]}
                            slidesPerView={1}
                            spaceBetween={10}
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
                                900: {
                                    slidesPerView: 2,
                                    spaceBetween: 30,
                                },
                                1300: {
                                    slidesPerView: 3,
                                    spaceBetween: 50,
                                },
                                1400: {
                                    slidesPerView: 3,
                                },
                                1800: {
                                    slidesPerView: 4,
                                },
                            }}
                        >
                            {data.products.map((item: Product) => (
                                <SwiperSlide>
                                    <ProfileProductCard
                                        key={item.id}
                                        product={item}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </ul>
                ) : (
                    <p>
                        {data.message}{' '}
                        <Link
                            className={style.products__addProductLink}
                            to={Path.MY_PRODUCT_ADD}
                        >
                            Хотите создать?
                        </Link>
                    </p>
                ))}
        </div>
    );
};
