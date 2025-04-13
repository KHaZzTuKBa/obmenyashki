import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from './types';

type UserStore = {
    user: User;
    accessToken: string;
    setUser: (user: User) => void;
    setAccessToken: (accessToken: string) => void;
    logout: () => void;
};

export const userStore = create<UserStore>()(
    persist(
        (set) => ({
            user: {} as User,
            accessToken: '',

            setUser: (user) => set({ user }),
            setAccessToken: (accessToken: string) => set({ accessToken }),
            logout: () =>
                set({
                    user: {} as User,
                    accessToken: '',
                }),
        }),
        {
            name: 'currentUser',
            partialize: (state) => ({ user: state.user }),
        }
    )
);

// TODO: глупость, надо избавиться
export const useUserStore = userStore;
