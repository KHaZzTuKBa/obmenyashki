import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { isAuth } from '@/entities/user/api/api';

export const NoAuthRoute = ({
    children,
    redirectTo = '/',
}: {
    children: ReactNode;
    redirectTo: string;
}) => {
    const { data, isPending } = useQuery({
        queryKey: ['auth-check'],
        queryFn: isAuth,
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });

    if (isPending) {
        return <div>Загрузка...</div>;
    }

    if (data) {
        return <Navigate to={redirectTo} replace />;
    }

    return <>{children}</>;
};
