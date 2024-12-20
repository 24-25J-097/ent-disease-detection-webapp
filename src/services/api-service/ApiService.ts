import {Source} from "@/enums/general";
import ServiceUtils from "@/services/api-service/ServiceUtils";
import {ApiInstance} from "@/types/service/ApiService";
import * as Bowser from 'bowser';
import axios, {AxiosResponse, AxiosError} from 'axios';

class ApiService {

    private static instance: ApiService;
    private readonly api: ApiInstance;

    private constructor() {
        this.api = axios.create();
        this.setupInterceptors();
    }

    public static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    public getApi(): ApiInstance {
        return this.api;
    }

    private setupInterceptors(): void {
        this.api.interceptors.request.use((config: any) => {
            let accessToken = null;
            const defaultHeaders = {
                'Content-Type': undefined,
                'User-Agent': undefined,
                'Content-Encoding': undefined,
                Authorization: undefined,
                'Content-Length': undefined,
                Accept: undefined,
                'X-Requested-With': 'XMLHttpRequest',
            };
            if (typeof window !== 'undefined') {
                // Browser environment
                accessToken = ServiceUtils.getAccessToken();
                const browser: Bowser.Parser.ParsedResult = Bowser.parse(window.navigator.userAgent);
                config.headers = {
                    ...defaultHeaders,
                    ...(config.headers),
                    source: Source.WEB.toString(),
                    platform: `${browser.browser.name} ${browser.browser.version} ${browser.os.name} ${browser.platform.type}`
                };
            } else {
                // Server environment (SSG/ISR)
                config.headers = {
                    ...defaultHeaders,
                    ...(config.headers),
                    source: Source.WEB.toString(),
                    platform: 'Server: Next.js SSG/ISR',
                };
            }

            config = {
                ...config,
                withCredentials: true,
                withXSRFToken: true
            }

            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        });

        this.api.interceptors.response.use(
            (response: AxiosResponse<any>) => {
                if (!response.data) {
                    console.warn('Empty Response Received.');
                }
                switch (response.status) {
                    case 0:
                        console.warn('Error, Please check logs.');
                        break;
                    case 200:
                    case 201:
                        break;
                    default:
                        console.warn(JSON.parse(response.data.toString() || "{}"));
                }
                return response;
            },
            (error: AxiosError<any>) => {
                switch (error.response?.status) {
                    case 0:
                        console.warn('Error, Please check logs.');
                        break;
                    case 500:
                        console.warn('An internal server error occurred.');
                        break;
                    case 403:
                        console.warn('You are not allowed to perform this action! Forbidden.');
                        break;
                    case 401:
                        console.warn('You are not allowed to perform this action! Unauthorized.');
                        break;
                    case 400:
                        console.warn('Bad Request');
                        break;
                    case 422:
                        const message = 'message' in error.response?.data ? error.response?.data.message : error.response?.data;
                        console.warn(message);
                        break;
                    default:
                        console.warn(error);
                }
                return Promise.reject(error);
            }
        );
    }

}

export default ApiService;
