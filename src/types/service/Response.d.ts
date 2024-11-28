import {AxiosResponse} from "axios";
import {User} from "@/models/User";

export interface AppResponse<T> {
    success: boolean;
    data: T;
    message: string;
    error?: string;
    errorCode?: number;
    errorData?: unknown;
}

export type AxiosAppResponse<T> = AxiosResponse<AppResponse<T>>


export interface AuthResponse {
    token: string;
    user: User;
}

export interface CommonResponse<T = any> {
    status?: string;
    [key: string]: T;
}
