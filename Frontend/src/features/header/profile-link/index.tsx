import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import { UserAvatar } from '../../../entities/user/ui/user-avatar';

export const ProfileLink = () => {
    return (
        <Link to='/profile' className={styles.header__profile}>
            <UserAvatar />
        </Link>
    );
};
