import { create } from 'zustand';
import { User } from './types';

type UserStore = {
    user: User;
    accessToken: string | undefined;
    setUser: (userData: User) => void;
    setAccessToken: (token: string) => void;
    logout: () => void;
};

// TODO: Реализовать хранение ссесии через accessToken

export const userStore = create<UserStore>((set) => ({
    user: {
        id: 0,
        email: '',
        phone: '',
        name: '',
        avatarURL: undefined,
    },
    accessToken: undefined,

    setUser: (userData: User) =>
        set(() => ({
            user: userData,
        })),
    setAccessToken: (token) => set({ accessToken: token }),
    logout: () => set({ accessToken: undefined }),
}));
