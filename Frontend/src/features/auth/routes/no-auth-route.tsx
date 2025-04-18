import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { isAuth } from '@/entities/user/api/api';

const isAuthorized = async (): Promise<boolean> => {
    const response = await isAuth();
    return response;
};

export const NoAuthRoute = async ({
    children,
    redirectTo = '/',
}: {
    children: ReactNode;
    redirectTo: string;
}) => {
    if (await isAuthorized()) {
        return <Navigate to={redirectTo} replace />;
    }

    return <>{children}</>;
};
