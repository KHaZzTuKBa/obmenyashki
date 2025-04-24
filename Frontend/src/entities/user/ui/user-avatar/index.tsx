import { getCurrentUserAvatar } from '@/entities/user';
import { Icon } from '@/shared/ui/Icon';

export const UserAvatar = ({ className = '' }: { className?: string }) => {
    const userAvatarURL = getCurrentUserAvatar();
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
