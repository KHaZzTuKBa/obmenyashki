import { useEffect, useState } from 'react';

import { ProductImage } from '@/entities/product';
import { getCurrentUserId } from '@/entities/user';
import { ContactsModal } from '@/features/view-product';
import { Button } from '@/shared/ui/Form';
import { Loader } from '@/shared/ui/Loader';

import { useSingleProduct } from '../hooks/useSingleProduct';

import style from './style.module.scss';

export const ViewProductPage = () => {
    const { data, isError, error, isPending, isSuccess } = useSingleProduct();

    const [mainImage, setMainImage] = useState<string | undefined>(
        data?.product?.imgURLs[0]
    );

    useEffect(() => {
        if (mainImage === undefined && data?.product !== undefined) {
            setMainImage(data.product?.imgURLs[0]);
        }
    }, [data]);

    const handleMainImage = (index: number) => {
        if (data?.product?.imgURLs[index]) {
            setMainImage(data.product.imgURLs[index]);
            return;
        }
        setMainImage(undefined);
    };

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

        return (
        <>
            {isPending && (
            <div className={style.product__loaderWrapper}>
                <Loader wrapperClassName={style.product__loader} />
            </div>
            )}

            {isError && (
            <div className={style.product__errorWrapper}>
                <div className={style.product__error}>
                    {error.response?.data.message ||
                        error.message ||
                        'Неизвестная ошибка'}
                </div>
            </div>
            )}

            {isSuccess && data.product && data.ownerId && (
        <section className={style.product}>
            <div className={style.product__content}>
                        <div className={style.product__mainImage}>
                            <ProductImage
                                produtcImgURLs={data.product.imgURLs}
                            />
                        </div>
                        {data.product.imgURLs.length > 1 && (
                            <div className={style.product__thumbnailImages}>
                                {data.product.imgURLs.map((el) => (
                                    <div
                                        className={
                                            style.product__thumbnailImage
                                        }
                                    >
                                        <ProductImage produtcImgURLs={[el]} />
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className={style.product__info}>
                            <h2 className={style.product__name}>
                                {data.product.productTitle}
                            </h2>
                            <div className={style.product__description}>
                                {data.product.productDescription && (
                                    <>
                                        <p className={style.product__label}>
                                            Описание:
                                        </p>
                                        <p className={style.product__text}>
                                            {data.product.productDescription}
                                        </p>
                                    </>
                                )}

                                {data.product.tradeFor && (
                                    <>
                                        <p className={style.product__label}>
                                            На что готов(а) обменять:
                                        </p>
                                        <p className={style.product__text}>
                                            {data.product.tradeFor}
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
            </div>
            <ContactsModal
                userId={data.ownerId}
                isOpen={isModalOpen}
                onClose={handleModalClose}
            />
        </section>
            )}
        </>
    );
};
