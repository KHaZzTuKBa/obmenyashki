import { $baseApi } from '@/shared/api';
import { getAccessToken, setAccessToken, logoutSession } from '../model';
import { refreshTokenApi } from './refresh';
import axios from 'axios';

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
                const response = await refreshTokenApi();
                setAccessToken(response.data.token);
                $api.request(originalRequest);
            } catch (e) {
                console.log(e);
                logoutSession();
            }
        }

        throw error;
    }
);

export { $api };
