import { RegistrationForm } from '@/features/auth';

import styles from './style.module.scss';

export const RegisterPage = () => {
    return (
        <section className={styles.container}>
            <RegistrationForm />
        </section>
    );
};
