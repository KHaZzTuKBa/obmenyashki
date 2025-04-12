import { Link } from 'react-router-dom';
import logoURL from './logo.svg';

import style from './style.module.scss';

export const Logo = () => {
    return (
        <Link to='/' className={style.header__logo}>
            <img src={logoURL} alt='Обменяшки' />
        </Link>
    );
};
