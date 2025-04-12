import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

export const NoAuthRoute = ({
    children,
    redirectTo = '/',
}: {
    children: ReactNode;
    redirectTo: string;
}) => {
    const token = localStorage.getItem('token');

    if (token) {
        return <Navigate to={redirectTo} replace />;
    }

    return <>{children}</>;
};
