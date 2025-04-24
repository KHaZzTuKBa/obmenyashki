import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import style from './style.module.scss';

type ModalAppearece = undefined | 'green' | 'red';

export const ModalWindow = ({
    message,
    buttonText,
    appearece,
    isOpen,
    onClose,
}: {
    message: string;
    buttonText: string;
    appearece: ModalAppearece;
    isOpen: boolean;
    onClose: () => void;
}) => {
    const elRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        elRef.current = document.createElement('div');
        let modalRoot = document.getElementById('modal');

        if (!modalRoot) {
            modalRoot = document.createElement('div');
            modalRoot.id = 'modal';
            document.body.appendChild(modalRoot);
        }

        modalRoot.appendChild(elRef.current!);

        return () => {
            if (elRef.current) {
                modalRoot?.removeChild(elRef.current);
            }
        };
    }, []);

    if (!isOpen) return null;

    return createPortal(
        <div className={appearece}>
            <div
                className={style.modal__window}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className={style.modal__message}>{message}</h2>
                <button className={style.modal__button} onClick={onClose}>
                    {buttonText}
                </button>
            </div>
            <div className={style.modal__overlay} onClick={onClose}></div>
        </div>,
        elRef.current!
    );
};
