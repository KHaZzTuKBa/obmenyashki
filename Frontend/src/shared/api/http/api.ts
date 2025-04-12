import axios from 'axios';
import { IAuthResponse } from './auth-response';
import { API_URL } from '@/shared/config/api';

const $api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    timeout: 1000,
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
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
                const response = await axios.get<IAuthResponse>(
                    `${API_URL}/refresh`,
                    {
                        withCredentials: true,
                    }
                );
                //Установить токен
                localStorage.setItem('token', response.data.user.name);
                $api.request(originalRequest);
            } catch (e) {
                console.log(e);
            }
        }
        throw error;
    }
);

export { $api };
