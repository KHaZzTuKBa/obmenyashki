import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useUserStore } from '@/entities/user/model';

export const NoAuthRoute = ({
    children,
    redirectTo = '/',
}: {
    children: ReactNode;
    redirectTo: string;
}) => {
    const token = useUserStore((state) => state.accessToken);

    if (token) {
        return <Navigate to={redirectTo} replace />;
    }

    return <>{children}</>;
};
