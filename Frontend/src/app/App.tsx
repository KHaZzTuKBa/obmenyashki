import { QueryProvider } from './providers/query';
import { AppRouter } from './providers/routing';

import './styles/global.scss';

export const App = () => {
    return (
        <QueryProvider>
            <AppRouter />
        </QueryProvider>
    );
};
