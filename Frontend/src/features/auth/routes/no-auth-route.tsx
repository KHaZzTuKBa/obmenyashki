import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { getAccessToken } from '@/entities/user/model';

export const NoAuthRoute = ({
    children,
    redirectTo = '/',
}: {
    children: ReactNode;
    redirectTo: string;
}) => {
    const token = getAccessToken();

    if (token) {
        return <Navigate to={redirectTo} replace />;
    }

    return <>{children}</>;
};
