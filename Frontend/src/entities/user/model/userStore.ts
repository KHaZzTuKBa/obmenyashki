import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from './types';
import { logoutUser } from '../api';

type UserStore = {
    user: User;
    accessToken: string | null;
    setUser: (user: User) => void;
    setAccessToken: (accessToken: string | null) => void;
    logout: () => void;
};

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: {} as User,
            accessToken: null,

            setUser: (user) => set({ user }),
            setAccessToken: (accessToken) => set({ accessToken }),
            logout: () => {
                set({
                    user: {} as User,
                    accessToken: null,
                });
                logoutUser();
            },
        }),
        {
            name: 'currentUser',
            partialize: (state) => ({ user: state.user }),
        }
    )
);

export const setUser = (user: User) => useUserStore.getState().setUser(user);

export const getAccessToken = () => useUserStore.getState().accessToken;
export const setAccessToken = (token: string | null) =>
    useUserStore.getState().setAccessToken(token);

export const logoutSession = () => useUserStore.getState().logout();
