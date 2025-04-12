import { useSearchForm } from '@/features/header/search/model/useSearchForm'; // Импорт хука
import { Icon } from '@/shared/ui/Icon';

import styles from './style.module.scss';

export const SearchForm = () => {
    const { query, handleQueryChange, handleSubmit } = useSearchForm();
    return (
        <form className={styles.search} onSubmit={handleSubmit} role='search'>
            {/* <label className={styles.search} htmlFor="main-search"> */}
            {/* Скрываем текст лейбла визуально, но оставляем для скринридеров */}
            {/* <span className={styles.visuallyHidden}>Поиск по товарам</span> */}
            <span className={styles.search__glass}>
                <Icon name='search' />
            </span>
            <input
                className={styles.search__input}
                id='main-search'
                type='search'
                name='q'
                placeholder='Поиск'
                value={query}
                onChange={handleQueryChange}
            />
            {/* </label> */}
            {/* Можно добавить скрытую кнопку submit для лучшей доступности */}
            {/* <button type="submit" className={styles.visuallyHidden}>Найти</button> */}
        </form>
    );
};
