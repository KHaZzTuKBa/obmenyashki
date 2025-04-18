import { Link } from 'react-router-dom';

import { Path } from '@/shared/config/routes';

import logoURL from './logo.svg';

import style from './style.module.scss';

export const Logo = () => {
    return (
        <Link to={Path.HOME} className={style.header__logo}>
            <img src={logoURL} alt='Обменяшки' />
        </Link>
    );
};
