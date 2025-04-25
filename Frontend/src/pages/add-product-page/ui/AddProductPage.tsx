import { AxiosError } from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { getCurrentUserId } from '@/entities/user';
import { Button, Input } from '@/shared/ui/Form';
import { Icon } from '@/shared/ui/Icon';
import { ModalWindow } from '@/shared/ui/modal-window';

import { AddProduct } from '../api/api';
import { AddProductData, AddProductResponse } from '../model/types';

import style from './style.module.scss';

export const AddProductPage = () => {
    const [modalMessage, setModalMessage] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    // Управляем файлами в состоянии React
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    // Управляем URL превью в состоянии React
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    const MAX_FILES = 5;

    const {
        register,
        handleSubmit,
        reset: resetForm,
        trigger,
        setValue,
        formState: { errors },
    } = useForm<AddProductData>({ mode: 'all' });

    useEffect(() => {
        const urlsToRevoke = [...previewUrls];

        const newPreviewUrls = selectedFiles.map((file) =>
            URL.createObjectURL(file)
        );
        setPreviewUrls(newPreviewUrls);

        return () => {
            urlsToRevoke.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [selectedFiles]);

    useEffect(() => {
        register('images', {
            validate: () => {
                if (selectedFiles.length === 0) {
                    return 'Необходимо выбрать хотя бы одно изображение.';
                }
                for (const file of selectedFiles) {
                    if (!file.type.startsWith('image/')) {
                        return 'Допускаются только файлы изображений.';
                    }
                }
                return true;
            },
        });
    }, [register, selectedFiles]);

    const submit: SubmitHandler<AddProductData> = async (
        data: AddProductData
    ) => {
        const formData = new FormData();
        formData.append('productTitle', data.productTitle);
        formData.append('productDescription', data.productDescription || '');
        formData.append('tradeFor', data.tradeFor || '');
        formData.append('ownerId', getCurrentUserId());

        selectedFiles.forEach((file) => {
            formData.append('images', file);
        });

        try {
            const response = await AddProduct(formData);
            setSelectedFiles([]);
            resetForm();
            setModalMessage(response.message);
            setIsSuccess(true);
            setIsModalOpen(true);
        } catch (error) {
            const axiosError = error as AxiosError<AddProductResponse>;
            console.error(
                'API error: ',
                axiosError.response?.data.message || axiosError.message
            );

            setModalMessage(
                axiosError.response?.data.message ||
                    axiosError.message ||
                    'Произошла ошибка'
            );
            setIsModalOpen(true);
        } finally {
            setIsModalOpen(true);
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        const currentFileCount = selectedFiles.length;
        const availableSlots = MAX_FILES - currentFileCount;
        if (availableSlots <= 0) {
            console.warn(`Достигнут лимит в ${MAX_FILES} файлов.`);
            event.target.value = ''; // Сбрасываем input
            return; // Ничего не добавляем
        }

        const newFiles: File[] = [];
        for (let i = 0; i < files.length; i++) {
            if (newFiles.length >= availableSlots) {
                console.warn(
                    `Достигнут лимит в ${MAX_FILES} файлов. Файл ${files[i].name} и последующие не добавлены.`
                );
                break;
            }
            if (files[i].type.startsWith('image/')) {
                newFiles.push(files[i]);
            } else {
                console.warn(
                    `Файл ${files[i].name} не является изображением и был пропущен.`
                );
            }
        }

        if (newFiles.length > 0) {
            // Если до этого файлов не было, устанавливаем главный превью на первый добавленный

            const updatedFiles = [...selectedFiles, ...newFiles];
            setSelectedFiles(updatedFiles);
            setValue('images', updatedFiles, {
                shouldValidate: true,
                shouldDirty: true,
            });
            trigger('images'); // Убедимся, что валидация сработала
        }

        // Сбрасываем значение input, чтобы можно было выбрать тот же файл снова
        event.target.value = '';
    };

    const handleRemoveFile = (indexToRemove: number) => {
        const urlToRemove = previewUrls[indexToRemove];
        if (urlToRemove) {
            console.log('Revoking URL for removed file:', urlToRemove);
            URL.revokeObjectURL(urlToRemove);
        }

        // Обновляем массив файлов
        const updatedFiles = selectedFiles.filter(
            (_, index) => index !== indexToRemove
        );
        setSelectedFiles(updatedFiles); // Это вызовет useEffect для обновления previewUrls

        // Обновляем RHF
        setValue('images', updatedFiles, {
            shouldValidate: true,
            shouldDirty: true,
        });
        trigger('images');
    };

    return (
        <section className={style.product}>
            <form onSubmit={handleSubmit(submit)} className={style.form}>
                <header className={style.form__header}>
                    <h2>Добавить новый товар</h2>
                </header>
                <div className={style.form__container}>
                    <div className={style.form__left}>
                        <label className={style.form__label}>
                            <p>Введите название товара:</p>
                            <Input
                                {...register('productTitle', {
                                    required:
                                        'Это поле обязательно для заполнения',
                                    minLength: {
                                        value: 2,
                                        message:
                                            'Назавние товара должно состоять минимум из 2 символов',
                                    },
                                    setValueAs: (val) => val.trim(),
                                })}
                                className={style.form__input}
                                type='text'
                                autoComplete='productTitle'
                                color='blue'
                            />
                            {errors.productTitle?.message && (
                                <p className={style.error}>
                                    {errors.productTitle?.message}
                                </p>
                            )}
                        </label>
                        <label className={style.form__label}>
                            <p>Введите описание товара:</p>
                            <textarea
                                {...register('productDescription', {
                                    required:
                                        'Это поле обязательно для заполнения',
                                    minLength: {
                                        value: 10,
                                        message:
                                            'Описание товара должно состоять минимум из 10 символов',
                                    },
                                    setValueAs: (val) => val.trim(),
                                })}
                                className={style.form__textArea}
                                name='productDescription'
                            ></textarea>
                            {errors.productDescription && (
                                <p className={style.error}>
                                    {errors.productDescription.message}
                                </p>
                            )}
                        </label>
                        <label className={style.form__label}>
                            <p>
                                Напишите, на что бы Вы обменяли товар
                                <span className={style.asterisk}>*</span>:
                            </p>
                            <Input
                                {...register('tradeFor', {
                                    required:
                                        'Это поле обязательно для заполнения',
                                    setValueAs: (val) => val.trim(),
                                })}
                                className={style.form__input}
                                type='text'
                                color='blue'
                            />
                            {errors.tradeFor && (
                                <p className={style.error}>
                                    {errors.tradeFor.message}
                                </p>
                            )}
                            <p className={style.form__info}>
                                <span className={style.asterisk}>*</span>Данная
                                информация будет отображаться в карточке Вашего
                                товара, но пользователи также могут предлагать
                                другие варианты для обмена
                            </p>
                        </label>
                    </div>
                    <div className={style.form__right}>
                        <label className={style.form__label}>
                            Прикрепите фотографии (до {MAX_FILES} штук):
                            <div className={style.form__dragnDrop}>
                                <div className={style.form__image}>
                                    {previewUrls.length > 0 ? (
                                        <img
                                            src={previewUrls[0]}
                                            alt={`Превью`}
                                            className={style.files__image} // Используйте тот же класс или другой для img
                                        />
                                    ) : (
                                        <Icon name='camera' />
                                    )}
                                </div>
                                <input
                                    onChange={handleFileChange}
                                    className={style.form__inputFile}
                                    type='file'
                                    accept='image/png, image/jpeg'
                                    multiple
                                />
                            </div>
                        </label>
                        {errors.images && (
                            <p className={style.error}>
                                {errors.images.message}
                            </p>
                        )}
                        <div className={style.files}>
                            <div className={style.files__wrapper}>
                                {Array.from({ length: MAX_FILES }).map(
                                    (_, index) => {
                                        const url = previewUrls[index];
                                        return (
                                            <div
                                                className={style.files__item}
                                                key={index}
                                            >
                                                {url ? (
                                                    <>
                                                        <img
                                                            src={url}
                                                            alt={`Превью ${index + 1}`}
                                                            className={
                                                                style.files__image
                                                            }
                                                        />
                                                        <button
                                                            type='button'
                                                            onClick={() =>
                                                                handleRemoveFile(
                                                                    index
                                                                )
                                                            }
                                                            className={
                                                                style.files__removeButton
                                                            }
                                                            aria-label={`Удалить изображение ${index + 1}`}
                                                        >
                                                            X
                                                        </button>
                                                    </>
                                                ) : (
                                                    <Icon
                                                        name='camera'
                                                        className={
                                                            style.files__image
                                                        }
                                                    />
                                                )}
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                        <label className={style.form__labelCheckbox}>
                            <input
                                {...register('agreement', {
                                    required: 'Нажми!',
                                })}
                                className={style.form__inputCheckbox}
                                type='checkbox'
                                name='agreement'
                            />
                            Я согласен(-на) с правилами обмена
                        </label>
                        {errors.agreement && (
                            <p className={style.error}>
                                {errors.agreement.message}
                            </p>
                        )}
                        <div className={style.form__buttons}>
                            <Button
                                className={style.form__button}
                                type='submit'
                                color='dark-green'
                            >
                                Добавить товар
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
            <ModalWindow
                isOpen={isModalOpen}
                message={modalMessage}
                buttonText={'Хорошо'}
                appearance={isSuccess ? 'green' : 'red'}
                onClose={() => setIsModalOpen(false)}
            />
        </section>
    );
};
