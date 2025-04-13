export const Path = {
    HOME: '/',
    FEED: '/feed',
    PROFILE: '/profile',
    MY_ITEM_ADD: '/myItem/add',
    MY_ITEM_EDIT: '/myItem/edit/:id',
    VIEW_ITEM: '/feed/item/:id',
    CHATS: '/chats',
    CHAT: '/chats/:id',
    EDIT_PROFILE: '/settings/edit-profile',
    LOGIN: '/login',
    REGISTRATION: '/registration',
    NOT_FOUND: '*',
} as const;

// Функции для генерации динамических путей
export const getEditMyItemPath = (id: string) => `/myItem/edit/${id}`;
export const getViewItemPath = (id: string) => `/feed/item/${id}`;
export const getChatPath = (id: string) => `/chats/${id}`;
