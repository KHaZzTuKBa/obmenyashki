import { useState } from 'react';

import { ProductImage } from '@/entities/product';
import { getCurrentUserId } from '@/entities/user';
import { ContactsModal } from '@/features/view-product';
import { Button } from '@/shared/ui/Form';
import { Loader } from '@/shared/ui/Loader';

import { useSingleProduct } from '../hooks/useSingleProduct';

import style from './style.module.scss';

export const ViewProductPage = () => {
    const { data, isError, error, isPending, isSuccess } = useSingleProduct();
    const currentUserId = getCurrentUserId();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    if (isPending)
        return (
            <div className={style.product__loaderWrapper}>
                <Loader wrapperClassName={style.product__loader} />
            </div>
        );

    if (isError) {
        return (
            <div className={style.product__errorWrapper}>
                <div className={style.product__error}>
                    {error.response?.data.message ||
                        error.message ||
                        'Неизвестная ошибка'}
                </div>
            </div>
        );
    }

    return (
        <section className={style.product}>
            <div className={style.product__content}>
                {isSuccess && (
                    <>
                        <div className={style.product__mainImage}>
                            <ProductImage
                                produtcImgURLs={data?.product.imgURLs}
                            />
                        </div>
                        {data?.product.imgURLs?.length > 1 && (
                            <div className={style.product__thumbnailImages}>
                                {data?.product.imgURLs?.map((_, index) => (
                                    <div
                                        className={
                                            style.product__thumbnailImage
                                        }
                                    >
                                        <ProductImage
                                            produtcImgURLs={[
                                                data?.product.imgURLs[index],
                                            ]}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className={style.product__info}>
                            <h2 className={style.product__name}>
                                {data?.product.productTitle}
                            </h2>
                            <div className={style.product__description}>
                                {data?.product.productDescription && (
                                    <>
                                        <p className={style.product__label}>
                                            Описание:
                                        </p>
                                        <p className={style.product__text}>
                                            {data?.product.productDescription}
                                        </p>
                                    </>
                                )}

                                {data?.product.tradeFor && (
                                    <>
                                        <p className={style.product__label}>
                                            На что готов(а) обменять:
                                        </p>
                                        <p className={style.product__text}>
                                            {data?.product.tradeFor}
                                        </p>
                                    </>
                                )}

                                {/* <p className="product__label">Автор:</p>
                                <p className="product__text">Иванов Иван Иванович</p>  */}
                            </div>
                        </div>
                        <div className={style.product__buttons}>
                            {data.ownerId !== currentUserId && (
                                <>
                                    <Button
                                        color='blue'
                                        className={style.product__button}
                                    >
                                        Откликнуться
                                    </Button>
                                    <Button
                                        color='grey'
                                        className={style.product__button}
                                        onClick={() => setIsModalOpen(true)}
                                    >
                                        Контакты
                                    </Button>
                                </>
                            )}
                            {data.ownerId === currentUserId && (
                                <>
                                    <Button
                                        color='blue'
                                        className={style.product__button}
                                    >
                                        Редактировать
                                    </Button>
                                    <Button
                                        color='red'
                                        className={style.product__button}
                                    >
                                        Удалить товар
                                    </Button>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
            <ContactsModal
                userId={data.ownerId}
                isOpen={isModalOpen}
                onClose={handleModalClose}
            />
        </section>
    );
};
