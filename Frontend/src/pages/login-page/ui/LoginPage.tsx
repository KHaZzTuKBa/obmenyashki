import { Info, LoginForm } from '@/features/auth';

import styles from './style.module.scss';

export const LoginPage = () => {
    return (
        <section className={styles.container}>
            <LoginForm />
            <Info showDocuments={false} />
        </section>
    );
};
