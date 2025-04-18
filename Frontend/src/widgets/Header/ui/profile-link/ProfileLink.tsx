import { Link } from 'react-router-dom';

import { UserAvatar } from '@/entities/user/';
import { Path } from '@/shared/config/routes';

import styles from './styles.module.scss';

export const ProfileLink = () => {
    return (
        <Link to={Path.PROFILE} className={styles.header__profile}>
            <UserAvatar />
        </Link>
    );
};
