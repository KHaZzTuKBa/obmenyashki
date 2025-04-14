import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from './types';
import { logoutUser } from '../api';

interface UserStore {
    user: User;
    accessToken: string | null;
    setUser: (user: User) => void;
    setAccessToken: (accessToken: string | null) => void;
    logout: () => void;
}

const useCurentUserStore = create<UserStore>()(
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
            name: 'currentUserSession',
            partialize: (state) => ({
                user: state.user,
                accessToken: state.accessToken,
            }),
        }
    )
);

export const setCurentUser = (user: User) =>
    useCurentUserStore.getState().setUser(user);
export const getCurentUser = () => useCurentUserStore.getState().user;

export const getAccessToken = () => useCurentUserStore.getState().accessToken;
export const setAccessToken = (token: string | null) =>
    useCurentUserStore.getState().setAccessToken(token);

export const logoutSession = () => useCurentUserStore.getState().logout();
