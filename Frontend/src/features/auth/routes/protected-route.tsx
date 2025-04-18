import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { getAccessToken } from '@/entities/user/model';
import { Path } from '@/shared/config/routes';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const location = useLocation();
    const token = getAccessToken();

    if (!token) {
        return <Navigate to={Path.LOGIN} replace state={{ from: location }} />;
    }
    return <>{children}</>;
};
