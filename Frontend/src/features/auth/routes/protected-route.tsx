import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { Path } from '@/shared/config/routes';
import { useUserStore } from '@/entities/user/model';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const location = useLocation();
    const token = useUserStore((state) => state.accessToken);

    if (!token) {
        return <Navigate to={Path.LOGIN} replace state={{ from: location }} />;
    }
    return <>{children}</>;
};
