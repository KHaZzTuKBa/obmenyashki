import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { logoutUser } from '../api';

import { User } from './types';

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

            setUser: (partialUser) =>
                set((state) => ({
                    user: { ...state.user, ...partialUser },
                })),
            setAccessToken: (accessToken) => set({ accessToken }),
            logout: () => {
                if (getAccessToken()) logoutUser();
                set({
                    user: {} as User,
                    accessToken: null,
                });
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

export const setCurrentUser = (user: User) =>
    useCurentUserStore.getState().setUser(user);
export const getCurrentUser = () => useCurentUserStore.getState().user;

export const getCurrentUserId = () => useCurentUserStore.getState().user.id;
export const getCurrentUserAvatar = () =>
    useCurentUserStore.getState().user.avatarURL;

export const getAccessToken = () => useCurentUserStore.getState().accessToken;
export const setAccessToken = (token: string | null) =>
    useCurentUserStore.getState().setAccessToken(token);

export const logoutSession = () => useCurentUserStore.getState().logout();
