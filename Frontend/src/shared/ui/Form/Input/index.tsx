import React, { forwardRef } from 'react';
import style from './style.module.scss';

type ColorShceme = '' | 'blue' | 'green';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    color?: ColorShceme;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { className = '', color = '', ...restProps } = props;

    return (
        <input
            ref={ref}
            className={`${
                color
                    ? `${style.form__input} ${style.form__input}-${color}`
                    : `${style.form__input}`
            } ${className}`}
            {...restProps}
        />
    );
});

Input.displayName = 'Input';

export { Input };
