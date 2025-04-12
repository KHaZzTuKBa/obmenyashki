import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from 'react-router-dom';
import { Path } from '@/shared/config/routes';
import { MainLayout } from '@/app/layouts/main-layout';
import { ProtectedRoute } from '@/shared/ui/Routes/protected-route';
import { NoAuthRoute } from '@/shared/ui/Routes/no-auth-route';
import { LoginPage } from '@/pages/login-page';
import { RegisterPage } from '@/pages/register-page';
import { NotFoundPage } from '@/pages/not-found-page/ui/NotFound';

const routes = [
    {
        path: Path.HOME,
        element: (
            <ProtectedRoute>
                <MainLayout />
            </ProtectedRoute>
        ),

        children: [
            {
                index: true,
                element: <Navigate to={Path.FEED} replace />,
            },
            {
                path: Path.PROFILE,
                element: <div>ProfilePage</div>,
            },
            {
                path: Path.MY_ITEM_ADD,
                element: <div>addMyItemPage</div>,
            },
            {
                path: Path.MY_ITEM_EDIT,
                element: <div>editMyItemPage</div>,
            },
            {
                path: Path.FEED,
                element: <div>feedPage</div>,
            },
            {
                path: Path.VIEW_ITEM,
                element: <div>viewItemPage</div>,
            },
            {
                path: Path.CHATS,
                element: <div>chatsPage</div>,
            },
            {
                path: Path.CHAT,
                element: <div>individualChatPage</div>,
            },
        ],
    },
    {
        path: Path.LOGIN,
        element: (
            <NoAuthRoute redirectTo={Path.FEED}>
                <LoginPage />
            </NoAuthRoute>
        ),
    },
    {
        path: Path.REGISTRATION,
        element: (
            <NoAuthRoute redirectTo={Path.FEED}>
                <RegisterPage />
            </NoAuthRoute>
        ),
    },
    {
        path: Path.NOT_FOUND,
        element: <NotFoundPage />,
    },
];

const router = createBrowserRouter(routes);

export const AppRouter = () => <RouterProvider router={router} />;
