import axios from 'axios';

// TODO: AuthResponse здесь тоже не по FSD
import type { AuthResponse } from '@/entities/user/model';

// TODO: userStore здесь не по FSD
import { userStore } from '@/entities/user/model/userStore';

import { API_URL } from '@/shared/config/api';

const $api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    timeout: 1000,
});

$api.interceptors.request.use((config) => {
    const token = userStore.getState().accessToken;
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
                const response = await axios.get<AuthResponse>(
                    `${API_URL}/refresh`,
                    {
                        withCredentials: true,
                    }
                );
                userStore.getState().setAccessToken(response.data.token);
                $api.request(originalRequest);
            } catch (e) {
                console.log(e);
            }
        }
        throw error;
    }
);

export { $api };
