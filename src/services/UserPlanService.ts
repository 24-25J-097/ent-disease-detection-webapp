import ApiService from './api-service/ApiService';
import {UserPlan} from '@/models/UserPlan';
import {ApiUtils} from "@/services/api-service/ApiUtils";
import {AppResponse, AxiosAppResponse} from "@/types/service/Response";

class UserPlanService {
    private static instance: UserPlanService;
    private readonly apiService: ApiService;

    private constructor() {
        this.apiService = ApiService.getInstance();
    }

    public static getInstance(): UserPlanService {
        if (!UserPlanService.instance) {
            UserPlanService.instance = new UserPlanService();
        }
        return UserPlanService.instance;
    }

    public async getAllUserPlans(): Promise<UserPlan[]> {
        const ep = ApiUtils.adminUrl("purchased-plans");
        const response = await this.apiService.getApi().get<null, AxiosAppResponse<UserPlan[]>>(ep);
        return response.data.data;
    }

    public async getUserPlan(id: string): Promise<UserPlan> {
        const ep = ApiUtils.adminUrl(`purchased-plans/${id}`);
        const response = await this.apiService.getApi().get<null, AxiosAppResponse<UserPlan>>(ep);
        return response.data.data;
    }

    public async getUserPlanByUserId(userId: string): Promise<UserPlan> {
        const ep = ApiUtils.adminUrl(`purchased-plans/user/${userId}`);
        const response = await this.apiService.getApi().get<null, AxiosAppResponse<UserPlan>>(ep);
        return response.data.data;
    }

    public async createUserPlan(userPlanData: Omit<UserPlan, '_id' | 'createdAt' | 'updatedAt' | 'user' | 'package'>): Promise<UserPlan> {
        const ep = ApiUtils.adminUrl("purchased-plans");
        const response = await this.apiService.getApi().post<null, AxiosAppResponse<UserPlan>>(ep, userPlanData);
        return response.data.data;
    }

    public async updateUserPlan(id: string, userPlanData: Partial<Omit<UserPlan, '_id' | 'createdAt' | 'updatedAt' | 'user' | 'package'>>): Promise<UserPlan> {
        const ep = ApiUtils.adminUrl(`purchased-plans/${id}`);
        const response = await this.apiService.getApi().put<null, AxiosAppResponse<UserPlan>>(ep, userPlanData);
        return response.data.data;
    }

    public async deleteUserPlan(id: string): Promise<UserPlan> {
        const ep = ApiUtils.adminUrl(`purchased-plans/${id}`);
        const response = await this.apiService.getApi().delete<null, AxiosAppResponse<UserPlan>>(ep);
        return response.data.data;
    }

}

export default UserPlanService;