import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from 'react-router-dom';

import { MainLayout } from '@/app/layouts/main-layout';
import { ProtectedRoute, NoAuthRoute } from '@/features/auth';
import { AddProductPage } from '@/pages/add-product-page';
import { FeedPage } from '@/pages/feed-page';
import { LoginPage } from '@/pages/login-page';
import { NotFoundPage } from '@/pages/not-found-page';
import { ProfilePage } from '@/pages/profile-page';
import { RegisterPage } from '@/pages/register-page';
import { SettingsPage } from '@/pages/settings-page';
import { Path } from '@/shared/config/routes';

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
                element: <ProfilePage />,
            },
            {
                path: Path.MY_PRODUCT_ADD,
                element: <AddProductPage />,
            },
            {
                path: Path.MY_PRODUCT_EDIT,
                element: <div>editMyItemPage</div>,
            },
            {
                path: Path.FEED,
                element: <FeedPage />,
            },
            {
                path: Path.VIEW_PRODUCT,
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
            {
                path: Path.SETTINGS,
                element: <SettingsPage />,
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
