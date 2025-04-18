import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { isAuth } from '@/entities/user/api/api';
import { Path } from '@/shared/config/routes';

const isAuthorized = async (): Promise<boolean> => {
    const response = await isAuth();
    return response;
};

export const ProtectedRoute = async ({ children }: { children: ReactNode }) => {
    const location = useLocation();

    if (!(await isAuthorized())) {
        return <Navigate to={Path.LOGIN} replace state={{ from: location }} />;
    }
    return <>{children}</>;
};
