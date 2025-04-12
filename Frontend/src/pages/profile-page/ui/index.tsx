import { ProfileUserCard } from '@/features/profile';

import style from './style.module.scss';

export const ProfilePage = () => {
    return (
        <div className={style.profile}>
            <ProfileUserCard />
            <div className='profile__features'>
                <ul className='features'>
                    <li className='features__item'>
                        <a href='#!'>Купить продвижение</a>
                    </li>
                    <li className='features__item'>
                        <a href='#!'>Правила пользования платформой</a>
                    </li>
                    <li className='features__item'>
                        <a href='#!'>Связь с администрацией</a>
                    </li>
                    <li className='features__item'>
                        <a href='#!'>Тех. поддержка</a>
                    </li>
                </ul>
            </div>

            <div className='profile__goods goods'>
                <h2 className='goods__header'>Активные лоты</h2>
                <ul className='goods__list'>
                    <div className='goods__wrapper'>
                        <li className='goods__item swiper-slide'>
                            <div className='goods__image'>
                                <img src='#!' alt='' />
                            </div>
                            <p className='goods__name'>Товар</p>
                        </li>
                        <li className='goods__item swiper-slide'>
                            <div className='goods__image'>
                                <img src='#!' alt='' />
                            </div>
                            <p className='goods__name'>Товар</p>
                        </li>
                        <li className='goods__item swiper-slide'>
                            <div className='goods__image'>
                                <img src='#!' alt='' />
                            </div>
                            <p className='goods__name'>Товар</p>
                        </li>
                        <li className='goods__item swiper-slide'>
                            <div className='goods__image'>
                                <img src='#!' alt='' />
                            </div>
                            <p className='goods__name'>Товар</p>
                        </li>
                        <li className='goods__item swiper-slide'>
                            <div className='goods__image'>
                                <img src='#!' alt='' />
                            </div>
                            <p className='goods__name'>Товар</p>
                        </li>
                        <li className='goods__item swiper-slide'>
                            <div className='goods__image'>
                                <img src='#!' alt='' />
                            </div>
                            <p className='goods__name'>Товар</p>
                        </li>
                        <li className='goods__item swiper-slide'>
                            <div className='goods__image'>
                                <img src='#!' alt='' />
                            </div>
                            <p className='goods__name'>Товар</p>
                        </li>
                        <li className='goods__item swiper-slide'>
                            <div className='goods__image'>
                                <img src='#!' alt='' />
                            </div>
                            <p className='goods__name'>Товар</p>
                        </li>
                        <li className='goods__item swiper-slide'>
                            <div className='goods__image'>
                                <img src='#!' alt='' />
                            </div>
                            <p className='goods__name'>Товар</p>
                        </li>
                        <li className='goods__item swiper-slide'>
                            <div className='goods__image'>
                                <img src='#!' alt='' />
                            </div>
                            <p className='goods__name'>Товар</p>
                        </li>
                    </div>
                </ul>
            </div>
        </div>
    );
};
