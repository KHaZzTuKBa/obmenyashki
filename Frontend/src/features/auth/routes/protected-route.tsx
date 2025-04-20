import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { isAuth, getCurrentUser } from '@/entities/user';
import { Path } from '@/shared/config/routes';
import { Loader } from '@/shared/ui/Loader';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const location = useLocation();

    if (Object.keys(getCurrentUser()).length === 0) {
        return (
            <Navigate
                to={Path.LOGIN}
                replace
                state={{ path: location.pathname + location.search }}
            />
        );
    }

    const { data, isPending, isError } = useQuery({
        queryKey: ['auth-check'],
        queryFn: isAuth,
        staleTime: 5 * 60 * 1000,
        retry: 1,
        gcTime: 0,
    });

    if (isPending) {
        return <Loader wrapperClassName='h100p' />;
    }

    if (isError || !data) {
        return (
            <Navigate
                to={Path.LOGIN}
                replace
                state={{ path: location.pathname + location.search }}
            />
        );
    }

    return <>{children}</>;
};
