import axios, { AxiosError } from 'axios';

import { $baseApi } from '@/shared/api';

import { getAccessToken, setAccessToken, logoutSession } from '../model';

import { refreshToken } from './refresh';

const $api = axios.create($baseApi.defaults);

$api.interceptors.request.use((config) => {
    const token = getAccessToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

$api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !error.config._isRetry) {
            originalRequest._isRetry = true;
            try {
                const response = await refreshToken();
                setAccessToken(response.data.accessToken);
                $api.request(originalRequest);
            } catch (error) {
                const axiosError = error as AxiosError;
                console.error(
                    'API Error: ',
                    axiosError.message || axiosError.response?.statusText
                );
                logoutSession();
            }
        }

        throw error;
    }
);

export { $api };
