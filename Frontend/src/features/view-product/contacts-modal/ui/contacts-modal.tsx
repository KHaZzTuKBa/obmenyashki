import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getUserById } from '@/entities/user';
import { GetUserResponse, User } from '@/entities/user/model/types';
import { useModal } from '@/shared/hooks/useModal';
import { Loader } from '@/shared/ui/Loader';

import style from './style.module.scss';

export const ContactsModal = ({
    userId,
    isOpen,
    onClose,
}: {
    userId: string;
    isOpen: boolean;
    onClose: () => void;
}) => {
    const { data, isPending, isError, error, isSuccess } = useQuery<
        User,
        AxiosError<GetUserResponse>
    >({
        queryKey: ['user', userId],
        queryFn: () => getUserById(userId),
        enabled: isOpen,
    });

    const contactsModal = useModal(
        <>
            {isPending && <Loader />}

            {isError && (
                <p>
                    {' '}
                    {error.response?.data.message ||
                        error.message ||
                        'Неизвестная ошибка'}
                </p>
            )}

            {isSuccess && (
                <>
                    <div className={style.modal__contacts}>
                        <div className={style.modal__header}>
                            <h2 className={style.modal__name}>{data.name}</h2>
                            <p
                                className={
                                    `${style.modal__status}` +
                                    ` ${data.isOnline ? style.modal__status_online : style.modal__status_offline}`
                                }
                            >
                                {data.isOnline ? 'Онлайн' : 'Офлайн'}
                            </p>
                        </div>

                        {data.phone && (
                            <p className={style.modal__info}>
                                Номер телефона:{' '}
                                <a href={`tel:${data.phone}`}>{data.phone}</a>
                            </p>
                        )}

                        <div className={style.modal__button} onClick={onClose}>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div
                        className={style.modal__overlay}
                        onClick={onClose}
                    ></div>{' '}
                </>
            )}
        </>,
        isOpen
    );

    return contactsModal;
};
