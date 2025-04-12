import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from 'react-router-dom';
import { MainLayout } from '../../layouts/main-layout';
import { ProtectedRoute } from './protected-route';
import { LoginPage } from '@/pages/login-page';
import { RegisterPage } from '@/pages/register-page';
import { NoAuthRoute } from './no-auth-route';
import { NotFoundPage } from '@/pages/not-found-page/ui/NotFound';

const routes = [
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <MainLayout />
            </ProtectedRoute>
        ),

        children: [
            {
                index: true,
                element: <Navigate to='/feed' replace />,
            },
            {
                path: 'profile',
                element: <div>ProfilePage</div>,
            },
            {
                path: 'myItem/add',
                element: <div>addMyItemPage</div>,
            },
            {
                path: 'myItem/edit/:id',
                element: <div>editMyItemPage</div>,
            },
            {
                path: 'feed',
                element: <div>feedPage</div>,
            },
            {
                path: 'feed/item/:id',
                element: <div>viewItemPage</div>,
            },
            {
                path: 'chats',
                element: <div>chatsPage</div>,
            },
            {
                path: 'chats/:id',
                element: <div>individualChatPage</div>,
            },
        ],
    },
    {
        path: '/login',
        element: (
            <NoAuthRoute redirectTo='/feed'>
                <LoginPage />
            </NoAuthRoute>
        ),
    },
    {
        path: '/register',
        element: (
            <NoAuthRoute redirectTo='/feed'>
                <RegisterPage />
            </NoAuthRoute>
        ),
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
];

const router = createBrowserRouter(routes);

export const AppRouter = () => <RouterProvider router={router} />;
