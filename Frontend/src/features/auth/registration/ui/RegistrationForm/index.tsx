import { AxiosError } from 'axios';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { setAccessToken, setCurentUser } from '@/entities/user';
import { registerUser } from '@/features/auth/api/api';
import { AuthResponse } from '@/features/auth/model/types';
import { Path } from '@/shared/config/routes';
import { Input, Button } from '@/shared/ui/Form';

import { formatPhoneNumber } from '../../lib/formatPhoneNumber';

import styles from './style.module.scss';

interface RegisterFormData {
    name: string;
    phone: string;
    email: string;
    password: string;
}

export const RegistrationForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const fromPath = location.state?.from?.pathname || '/';

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        control,
    } = useForm<RegisterFormData>({ mode: 'all' });

    const submit: SubmitHandler<RegisterFormData> = async (data) => {
        data.phone = `+7${data.phone.replace(/\D/g, '').slice(1, 11)}`;

        try {
            const response = await registerUser(
                data.name,
                data.phone,
                data.email,
                data.password
            );
            setAccessToken(response.accessToken);
            setCurentUser(response.user);
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
                <h2 className={styles.header}>Регистрация</h2>

                <label className={styles.label}>
                    Имя:
                    <Input
                        {...register('name', {
                            required: 'Это поле обязательно для заполнения',
                            minLength: {
                                value: 2,
                                message:
                                    'Имя должно содержать минимум 2 символа',
                            },
                            maxLength: {
                                value: 16,
                                message:
                                    'Имя может содержать максимум 16 символов',
                            },
                            pattern: {
                                value: /^(?:[А-ЯЁа-яё\s]+|[A-Za-z\s]+)$/u,
                                message:
                                    'Имя должно состоять из букв латиницы или кириллицы',
                            },
                            setValueAs: (val) => val.trim(),
                        })}
                        type='text'
                        className={styles.input}
                        color='green'
                        placeholder='Иван Иванович'
                    />
                    {errors.name?.message && (
                        <p className={styles.error}>{errors.name?.message}</p>
                    )}
                </label>
                <label className={styles.label}>
                    Email:
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
                        placeholder='test@example.com'
                    />
                    {errors.email?.message && (
                        <p className={styles.error}>{errors.email?.message}</p>
                    )}
                </label>

                <label className={styles.label}>
                    Телефон:
                    <Controller
                        name='phone'
                        control={control}
                        defaultValue=''
                        render={({ field }) => (
                            <Input
                                {...field}
                                type='tel'
                                className={styles.input}
                                color='green'
                                placeholder='+7 (XXX)-XX-XX'
                                onChange={(e) => {
                                    const formatted = formatPhoneNumber(
                                        e.target.value
                                    );
                                    field.onChange(formatted);
                                }}
                            />
                        )}
                        rules={{
                            required: 'Это поле обязательно для заполнения',
                            validate: (value) =>
                                value.replace(/\D/g, '').length === 11 ||
                                'Некорректный номер',
                        }}
                    />
                    {errors.phone?.message && (
                        <p className={styles.error}>{errors.phone?.message}</p>
                    )}
                </label>

                <label className={styles.label}>
                    Пароль:
                    <Input
                        {...register('password', {
                            required: 'Это поле обязательно для заполнения',
                            minLength: {
                                value: 8,
                                message: 'Минимальная длина пароля 8 символов',
                            },
                            pattern: {
                                value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/,
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
                    Зарегистрироваться
                </Button>

                <p className={styles.form__login}>
                    Уже есть аккаунт? <Link to={Path.LOGIN}>Войти</Link>
                </p>
            </form>
        </>
    );
};
