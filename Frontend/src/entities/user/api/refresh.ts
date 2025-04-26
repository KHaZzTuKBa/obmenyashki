import { AxiosResponse } from 'axios';

import { $baseApi } from '@/shared/api';

interface RefreshResponse {
    accessToken: string | null;
}

export const refreshToken = (): Promise<AxiosResponse<RefreshResponse>> => {
    return $baseApi.get<RefreshResponse>('User/refreshToken');
};
