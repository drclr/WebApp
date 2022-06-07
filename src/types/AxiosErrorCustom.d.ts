import type { AxiosError } from 'axios';

export interface AxiosErrorCustom<T> extends AxiosError {
        response: ResCustom<T>
}