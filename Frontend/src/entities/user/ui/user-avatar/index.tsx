import { Icon } from '@/shared/ui/Icon';
import { useUserStore } from '../../model/userStore';

// Предположим, у вас есть хук в entities/user, возвращающий данные текущего пользователя
// TODO: вытаскивать ссылку на аватар пользователя import { useCurrentUser } from '@/entities/user';

export const UserAvatar = () => {
    const userAvatarUrl = useUserStore((state) => state.user.avatarURL);
    return (
        <>
            {userAvatarUrl ? (
                <img src={userAvatarUrl} alt='Аватар пользователя' />
            ) : (
                <Icon name='user' />
            )}
        </>
    );
};
