import { RegistrationForm } from '@/features/auth';
import styles from './style.module.scss';

export const RegisterPage = () => {
    return (
        <div className={styles.container}>
            <RegistrationForm />
        </div>
    );
};
