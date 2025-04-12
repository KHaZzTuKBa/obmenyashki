import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import { UserAvatar } from '../../../entities/user/ui/user-avatar';
import { Path } from '@/shared/config/routes';

export const ProfileLink = () => {
    return (
        <Link to={Path.PROFILE} className={styles.header__profile}>
            <UserAvatar />
        </Link>
    );
};
