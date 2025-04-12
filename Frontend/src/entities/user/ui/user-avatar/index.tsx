import { Icon } from '@/shared/ui/Icon';

// Предположим, у вас есть хук в entities/user, возвращающий данные текущего пользователя
// TODO: вытаскивать ссылку на аватар пользователя import { useCurrentUser } from '@/entities/user';
const userAvatar = false;
const userAvatarUrl = 'url';

export const UserAvatar = () => {
    return (
        <>
            {userAvatar ? (
                <img src={userAvatarUrl} alt='Аватар пользователя' />
            ) : (
                <Icon name='user' />
            )}
        </>
    );
};
