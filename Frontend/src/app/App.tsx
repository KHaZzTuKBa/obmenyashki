import { QueryProvider } from './providers/query';
import { AppRouter } from './providers/routing/routes';
import { StoreProvider } from '@/app/providers/store';

import './styles/global.scss';

export const App = () => {
    return (
        <StoreProvider>
            <QueryProvider>
                <AppRouter />
            </QueryProvider>
        </StoreProvider>
    );
};
