import { UserAvatar } from '@/entities/user/ui/user-avatar';
import { Path } from '@/shared/config/routes';
import { Link } from 'react-router-dom';
import style from './style.module.scss';
import { useUserStore } from '@/entities/user/model';

export const ProfileUserCard = () => {
    const { name, birthday, town, phone, email } = useUserStore(
        (state) => state.user
    );
    return (
        <div className={style.profile__info}>
            <div className={style.profile__image}>
                <UserAvatar className={style.profile__image} />
            </div>

            <div className={style.profile__data}>
                <h2>{name}</h2>
                {birthday ? <p>{birthday}</p> : null}
                {town ? <p>{town}</p> : null}
                <p>{phone}</p>
                <p>{email}</p>
                <Link to={Path.EDIT_PROFILE}>Редактировать профиль</Link>
            </div>
        </div>
    );
};
