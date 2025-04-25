import { Link } from 'react-router-dom';

import { UserAvatar } from '@/entities/user/ui/user-avatar';
import { Path } from '@/shared/config/routes';
import { Loader } from '@/shared/ui/Loader';

import { useUserProfileData } from './hooks/useUserProfileData';

import style from './style.module.scss';

export const ProfileUserCard = () => {
    const { user, isPending, isError, error, isSuccess } = useUserProfileData();

    if (isError) {
        return (
            <div className={style.profile__errorWrapper}>
                <p className={style.profile__error}>
                    {error?.response?.data.message || error.status
                        ? `Ошибка соединения с сервером. Код ошибки: ${error.status}`
                        : 'Неизвестная ошибка'}
                </p>
            </div>
        );
    }

    return (
        <>
            {isPending && <Loader wrapperClassName={style.profile__loader} />}

            {isSuccess && (
                <div className={style.profile__info}>
                    <div className={style.profile__image}>
                        <UserAvatar className={style.profile__image} />
                    </div>

                    <div className={style.profile__data}>
                        <h2>{user.name}</h2>
                        {user.birthday ? <p>{user.birthday}</p> : null}
                        {user.town ? <p>{user.town}</p> : null}
                        <p>{user.phone}</p>
                        <p>{user.email}</p>
                        <Link to={Path.EDIT_PROFILE}>
                            Редактировать профиль
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
};
