import { LoginForm } from '@/features/auth';
import styles from './style.module.scss';

export const LoginPage = () => {
    return (
        <div className={styles.container}>
            <LoginForm />
        </div>
    );
};
