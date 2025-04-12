import { Icon } from '@/shared/ui/Icon';
import { useUserStore } from '@/entities/user/model';

export const UserAvatar = ({ className = '' }: { className?: string }) => {
    const userAvatarURL = useUserStore((state) => state.user?.avatarURL);
    return (
        <>
            {userAvatarURL ? (
                <img
                    src={userAvatarURL}
                    alt='Аватар пользователя'
                    className={className}
                />
            ) : (
                <Icon name='user' className={className} />
            )}
        </>
    );
};
