import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { isAuth } from '@/entities/user';

export const NoAuthRoute = ({
    children,
    redirectTo = '/',
}: {
    children: ReactNode;
    redirectTo: string;
}) => {
    const location = useLocation();

    const { data, isPending } = useQuery({
        queryKey: ['auth-check'],
        queryFn: isAuth,
        staleTime: 0,
        retry: 1,
    });

    if (isPending) {
        return <div>Загрузка...</div>;
    }

    if (data) {
        const from = (location.state as { path?: string })?.path || redirectTo;
        return <Navigate to={from} replace />;
    }

    return <>{children}</>;
};
