import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import { Path } from '@/shared/config/routes';

export const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate(Path.FEED, { replace: true });
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                🤔 Упс! Этой страницы не существует.
            </h1>
            <button className={styles.button} onClick={handleGoBack}>
                Вернуться назад или на главную
            </button>
        </div>
    );
};
