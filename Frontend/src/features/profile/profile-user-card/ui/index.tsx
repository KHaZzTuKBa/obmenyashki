import { UserAvatar } from '@/entities/user/ui/user-avatar';
import { Path } from '@/shared/config/routes';
import { Link } from 'react-router-dom';
import { getCurentUser } from '@/entities/user/model';

import style from './style.module.scss';

export const ProfileUserCard = () => {
    const user = getCurentUser();

    return (
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
                <Link to={Path.EDIT_PROFILE}>Редактировать профиль</Link>
            </div>
        </div>
    );
};
