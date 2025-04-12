import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const location = useLocation();
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to='/login' replace state={{ from: location }} />;
    }
    return <>{children}</>;
};
