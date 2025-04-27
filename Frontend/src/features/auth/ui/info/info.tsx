import { Icon } from '@/shared/ui/Icon';

import style from './style.module.scss';

export const Info = ({ showDocuments }: { showDocuments: boolean }) => {
    return (
        <div className={style.obmenyashki}>
            <h1 className={style.header}>
                обме
                <span>няшки</span>
            </h1>
            <Icon name='plant' className={style.plant__image} />
            <div className={style.description}>
                Новый сервис для
                <br />
                <span>обмена вещами</span>
            </div>
            {showDocuments && (
                <div className={style.agreement}>
                    Регистрируясь на сайт “ОбмеНЯШКИ” Вы соглашаетесь с&nbsp;
                    <a className={style.agreement__link}>
                        правилами пользования
                    </a>
                    &nbsp;и&nbsp;
                    <a className={style.agreement__link}>
                        политикой конфиденциальности
                    </a>
                </div>
            )}
        </div>
    );
};
