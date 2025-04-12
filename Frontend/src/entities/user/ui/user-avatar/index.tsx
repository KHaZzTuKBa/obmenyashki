import { Icon } from '@/shared/ui/Icon';
import { useUserStore } from '@/entities/user/model';

export const UserAvatar = () => {
    const userAvatarURL = useUserStore((state) => state.user.avatarURL);
    return (
        <>
            {userAvatarURL ? (
                <img src={userAvatarURL} alt='Аватар пользователя' />
            ) : (
                <Icon name='user' />
            )}
        </>
    );
};
