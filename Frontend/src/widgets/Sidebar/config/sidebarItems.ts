import type { IconName } from '@/shared/ui/Icon';

export interface SidebarItemConfig {
    id: number;
    path: string;
    icon: IconName;
}

export const sidebarItems: SidebarItemConfig[] = [
    { id: 1, path: '/profile', icon: 'user' },
    { id: 2, path: '/feed', icon: 'home' },
    { id: 3, path: '/myItem/add', icon: 'goods' },
    { id: 4, path: '/chats', icon: 'chat' },
    { id: 6, path: '/settings', icon: 'settings' },
];
