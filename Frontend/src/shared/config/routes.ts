export const Path = {
    HOME: '/',
    FEED: '/feed',
    PROFILE: '/profile',
    MY_PRODUCT_ADD: '/myItem/add',
    MY_PRODUCT_EDIT: '/myItem/edit/:id',
    VIEW_PRODUCT: '/feed/item/:id',
    CHATS: '/chats',
    CHAT: '/chats/:id',
    SETTINGS: '/settings',
    EDIT_PROFILE: '/settings/edit-profile',
    LOGIN: '/login',
    REGISTRATION: '/registration',
    NOT_FOUND: '*',
} as const;

// Функции для генерации динамических путей
export const getEditMyItemPath = (id: string) => `/myItem/edit/${id}`;
export const getViewItemPath = (id: string) => `/feed/item/${id}`;
export const getChatPath = (id: string) => `/chats/${id}`;
