import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { isAuth } from '@/entities/user/api/api';
import { Path } from '@/shared/config/routes';

const isAuthorized: boolean = await isAuth();

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const location = useLocation();

    if (!isAuthorized) {
        return <Navigate to={Path.LOGIN} replace state={{ from: location }} />;
    }
    return <>{children}</>;
};
