// TODO: По приколу можно сделать так чтобы ссылки куда-то вели
import { Link } from 'react-router-dom';

import style from './style.module.scss';

export const ProfileFeaturesCard = () => {
    return (
        <div className={style.profile__features}>
            <ul className={style.features}>
                <li className={style.features__item}>
                    <Link to='/#!'>Купить продвижение</Link>
                </li>
                <li className={style.features__item}>
                    <Link to='/#!'>Правила пользования платформой</Link>
                </li>
                <li className={style.features__item}>
                    <Link to='/#!'>Связь с администрацией</Link>
                </li>
                <li className={style.features__item}>
                    <Link to='/#!'>Тех. поддержка</Link>
                </li>
            </ul>
        </div>
    );
};
