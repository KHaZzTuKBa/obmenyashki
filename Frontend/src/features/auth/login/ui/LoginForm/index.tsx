import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { setAccessToken, setCurrentUser } from '@/entities/user';
import { loginUser } from '@/features/auth/api/api';
import { AuthResponse, LoginFormData } from '@/features/auth/model/types';
import { Path } from '@/shared/config/routes';
import { Button, Input } from '@/shared/ui/Form';

import styles from './style.module.scss';

export const LoginForm = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const location = useLocation();
    const fromPath = location.state?.path || Path.HOME;

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<LoginFormData>({ mode: 'all' });

    const submit: SubmitHandler<LoginFormData> = async (
        data: LoginFormData
    ) => {
        try {
            const response = await loginUser({ ...data });
            setAccessToken(response.accessToken);
            setCurrentUser(response.user);
            queryClient.invalidateQueries({ queryKey: ['auth-check'] });
            navigate(fromPath, { replace: true });
        } catch (error) {
            const axiosError = error as AxiosError<AuthResponse>;

            setError('root', {
                type: 'serverError',
                message:
                    axiosError.response?.data.message || 'Что-то пошло не так',
            });
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
                        <p className={styles.error}>{errors.email.message}</p>
                    )}
                </label>

                <label className={styles.label}>
                    Введите пароль:
                    <Input
                        {...register('password', {
                            required: 'Это поле обязательно для заполнения',
                            setValueAs: (val) => val.trim(),
                        })}
                        type='password'
                        className={styles.input}
                        color='green'
                        placeholder='Пароль'
                    />
                    {errors.password?.message && (
                        <p className={styles.error}>
                            {errors.password.message}
                        </p>
                    )}
                </label>

                {errors.root &&
                    errors.root.type === 'serverError' &&
                    errors.root.message && (
                        <p className={styles.error}>{errors.root.message}</p>
                    )}
                <Button
                    color='dark-green'
                    type='submit'
                    className={styles.button}
                >
                    Войти
                </Button>
                <p className={styles.form__register}>
                    Еще нет аккаунта?{' '}
                    <Link to={Path.REGISTRATION} state={location.state}>
                        Зарегистрироваться
                    </Link>
                </p>
            </form>
        </>
    );
};
