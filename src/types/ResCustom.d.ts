import type { AxiosResponse } from 'axios';

export interface ResCustom<T> extends AxiosResponse {
        data: T
}