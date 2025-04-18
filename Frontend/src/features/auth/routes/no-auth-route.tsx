import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { isAuth } from '@/entities/user/api/api';

const isAuthorized: boolean = await isAuth();

export const NoAuthRoute = ({
    children,
    redirectTo = '/',
}: {
    children: ReactNode;
    redirectTo: string;
}) => {
    if (isAuthorized) {
        return <Navigate to={redirectTo} replace />;
    }

    return <>{children}</>;
};
