import { Path } from '@/shared/config/routes';
import type { IconName } from '@/shared/ui/Icon';

export interface SidebarItemConfig {
    id: number;
    path: string;
    icon: IconName;
}

export const sidebarItems: SidebarItemConfig[] = [
    { id: 1, path: Path.PROFILE, icon: 'user' },
    { id: 2, path: Path.FEED, icon: 'home' },
    { id: 3, path: Path.MY_ITEM_ADD, icon: 'goods' },
    { id: 4, path: Path.CHATS, icon: 'chat' },
    { id: 5, path: '/settings', icon: 'settings' },
];
