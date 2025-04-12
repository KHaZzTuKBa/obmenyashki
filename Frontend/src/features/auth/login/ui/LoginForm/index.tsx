import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loginUser } from '@/entities/user/model/api';
import { isAxiosError } from 'axios';
import { Button, Input } from '@/shared/ui/Form';
import { Path } from '@/shared/config/routes';

import styles from './style.module.scss';

interface ILoginForm {
    email: string;
    password: string;
}

export const LoginForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const fromPath = location.state?.from?.pathname || '/';

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<ILoginForm>();

    const submit: SubmitHandler<ILoginForm> = async (data) => {
        try {
            const response = await loginUser(data.email, data.password);
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                navigate(fromPath, { replace: true });
            }
        } catch (e) {
            console.log(e);
            if (isAxiosError(e)) {
                setError('root', {
                    type: 'serverError',
                    message: e.message,
                });
            } else {
                console.log(e);
            }
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(submit)} className={styles.form}>
                <h2 className={styles.header}>Вход</h2>

                <label className={styles.label}>
                    Введите вашу почту:
                    <Input
                        {...register('email', {
                            required: 'Это поле обязательно для заполнения',
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Неправильный email',
                            },
                            setValueAs: (val) => val.trim(),
                        })}
                        type='email'
                        className={styles.input}
                        color='green'
                        placeholder='example@example.com'
                    />
                    {errors.email?.message && (
                        <p className={styles.error}>{errors.email?.message}</p>
                    )}
                </label>

                <label className={styles.label}>
                    Введите пароль:
                    <Input
                        {...register('password', {
                            required: 'Это поле обязательно для заполнения',
                            minLength: {
                                value: 8,
                                message: 'Минимальная длина пароля 8 символов',
                            },
                            maxLength: {
                                value: 16,
                                message:
                                    'Максимальная длина пароля 16 символов',
                            },
                            pattern: {
                                value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
                                message:
                                    'Пароль должен содержать буквы латиницы в верхнем и нижинем регистре и цифры',
                            },
                            setValueAs: (val) => val.trim(),
                        })}
                        type='password'
                        className={styles.input}
                        color='green'
                        placeholder='Пароль'
                    />
                    {errors.password?.message && (
                        <p className={styles.error}>
                            {errors.password?.message}
                        </p>
                    )}
                </label>

                {errors.root && errors.root.type === 'serverError' ? (
                    <p className={styles.error}>{errors.root?.message}</p>
                ) : null}
                <Button
                    color='dark-green'
                    type='submit'
                    className={styles.button}
                >
                    Войти
                </Button>
                <p className={styles.form__register}>
                    Еще нет аккаунта?{' '}
                    <Link to={Path.REGISTER}>Зарегистрироваться</Link>
                </p>
            </form>
        </>
    );
};
