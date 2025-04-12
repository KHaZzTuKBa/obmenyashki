import { UserAvatar } from '@/entities/user/ui/user-avatar';
import { Path } from '@/shared/config/routes';
import { Link } from 'react-router-dom';
import { useUserStore } from '@/entities/user/model';

import style from './style.module.scss';

export const ProfileUserCard = () => {
    const user = useUserStore((state) => state?.user);

    if (!user) {
        return null;
    }
    return (
        <div className={style.profile__info}>
            <div className={style.profile__image}>
                <UserAvatar className={style.profile__image} />
            </div>

            <div className={style.profile__data}>
                {user.name ? <h2>{user.name}</h2> : null}
                {user.birthday ? <p>{user.birthday}</p> : null}
                {user.town ? <p>{user.town}</p> : null}
                {user.phone ? <p>{user.phone}</p> : null}
                {user.email ? <p>{user.email}</p> : null}
                <Link to={Path.EDIT_PROFILE}>Редактировать профиль</Link>
            </div>
        </div>
    );
};
