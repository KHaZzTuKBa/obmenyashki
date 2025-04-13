import axios from 'axios';

import { API_URL } from '@/shared/config/api';

export const $baseApi = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    timeout: 5000,
});
