import { create } from 'zustand';
import { User } from './types';

type State = {
    user: User;
};

type Actions = {
    setUser: (userData: User) => void;
};

export const useUserStore = create<State & Actions>((set) => ({
    user: { id: 0, email: '', phone: '', name: '', avatarURL: undefined },
    setUser: (userData: User) =>
        set(() => ({
            user: userData,
        })),
}));
