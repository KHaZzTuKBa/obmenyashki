import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export const useModal = (modalUI: ReactNode, isOpen: boolean) => {
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

    return createPortal(modalUI, elRef.current!);
};
