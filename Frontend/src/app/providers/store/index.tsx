import { configureStore } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

const store = configureStore({
    reducer: {},
});

export const StoreProvider = ({ children }: { children?: ReactNode }) => (
    <Provider store={store}>{children}</Provider>
);
