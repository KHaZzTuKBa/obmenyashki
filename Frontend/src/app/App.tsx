import '@/shared/styles/global.scss';

import { QueryProvider } from './providers/query';
import { AppRouter } from './providers/routing';

export const App = () => {
    return (
        <QueryProvider>
            <AppRouter />
        </QueryProvider>
    );
};
