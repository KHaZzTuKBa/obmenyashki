import  { AxiosResponse } from 'axios';
import { $baseApi } from '@/shared/api';
import  { RefreshResponse } from '../model/types';

export const refreshTokenApi = (): Promise<AxiosResponse<RefreshResponse>> => {
    return $baseApi.get<RefreshResponse>('/refresh');
};
