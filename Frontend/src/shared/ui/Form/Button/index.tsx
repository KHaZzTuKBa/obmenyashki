import React, { forwardRef } from 'react';
import style from './style.module.scss';

type ColorShceme =
    | ''
    | 'green'
    | 'dark-green'
    | 'red'
    | 'blue'
    | 'purple'
    | 'grey';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    color?: ColorShceme;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const { className = '', color = '', children, ...restProps } = props;

    return (
        <button
            ref={ref}
            className={`${
                color
                    ? `${style.form__button} ${style.form__button}-${color}`
                    : `${style.form__button}`
            } ${className}`}
            {...restProps}
        >
            {children}
        </button>
    );
});

Button.displayName = 'Button';

export { Button };
