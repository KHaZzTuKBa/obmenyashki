import { create } from 'zustand';
import { User } from './types';

type UserStore = {
    user: User | null;
    accessToken: string | null;
    setUser: (user: User | null) => void;
    setAccessToken: (accessToken: string | null) => void;
    logout: () => void;
};

export const userStore = create<UserStore>((set) => ({
    user: null,
    accessToken: null,

    setUser: (user: User | null) => set({ user }),
    setAccessToken: (accessToken: string | null) => set({ accessToken }),
    logout: () => set({ user: null, accessToken: null }),
}));

// TODO: глупость, надо избавиться
export const useUserStore = userStore;
