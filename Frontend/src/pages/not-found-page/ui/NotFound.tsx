import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss';

export const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/feed', { replace: true });
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
