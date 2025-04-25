import { useModal } from '@/shared/hooks/useModal';

import style from './style.module.scss';

type ModalAppearance = undefined | 'green' | 'red';

export const ModalWindow = ({
    message,
    buttonText,
    appearance,
    isOpen,
    onClose,
}: {
    message: string;
    buttonText: string;
    appearance: ModalAppearance;
    isOpen: boolean;
    onClose: () => void;
}) => {
    const modalWindow = useModal(
        <div className={appearance}>
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
        isOpen
    );

    return modalWindow;
};
