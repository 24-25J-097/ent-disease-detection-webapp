import ApiService from './api-service/ApiService';
import {RoleAccessPolicy} from '@/models/RoleAccessPolicy';
import {ApiUtils} from "@/services/api-service/ApiUtils";
import {AxiosAppResponse} from "@/types/service/Response";

class RoleAccessPolicyService {
    private static instance: RoleAccessPolicyService;
    private readonly apiService: ApiService;


    private constructor() {
        this.apiService = ApiService.getInstance();
    }

    public static getInstance(): RoleAccessPolicyService {
        if (!RoleAccessPolicyService.instance) {
            RoleAccessPolicyService.instance = new RoleAccessPolicyService();
        }
        return RoleAccessPolicyService.instance;
    }

    public async getAllRoleAccessPolicies(): Promise<RoleAccessPolicy[]> {
        const ep = ApiUtils.adminUrl("role-access-policies");
        const response = await this.apiService.getApi().get<null, AxiosAppResponse<RoleAccessPolicy[]>>(ep);
        return response.data.data;
    }

    // public async getRoleAccessPolicy(id: string): Promise<RoleAccessPolicy> {
    //     const ep = ApiUtils.adminUrl(`role-access-policies/${id}`);
    //     const response = await this.apiService.getApi().get<null, AxiosAppResponse<RoleAccessPolicy>>(ep);
    //     return response.data.data;
    // }

    public async getRoleAccessPolicyByRoleId(role: string): Promise<RoleAccessPolicy> {
        const ep = ApiUtils.adminUrl(`role-access-policies/${role}`);
        const response = await this.apiService.getApi().get<null, AxiosAppResponse<RoleAccessPolicy>>(ep);
        return response.data.data;
    }

    public async createRoleAccessPolicy(policyData: Omit<RoleAccessPolicy, '_id' | 'createdAt' | 'updatedAt' | 'role'>): Promise<RoleAccessPolicy> {
        const ep = ApiUtils.adminUrl(`role-access-policies`);
        const response = await this.apiService.getApi().post<null, AxiosAppResponse<RoleAccessPolicy>>(ep, policyData);
        return response.data.data;
    }

    public async updateRoleAccessPolicy(role: string, policyData: Partial<Omit<RoleAccessPolicy, '_id' | 'createdAt' | 'updatedAt' | 'role'>>): Promise<RoleAccessPolicy> {

        const ep = ApiUtils.adminUrl(`role-access-policies/${role}`);
        const response = await this.apiService.getApi().put<null, AxiosAppResponse<RoleAccessPolicy>>(ep, policyData);
        return response.data.data;
    }
}

export default RoleAccessPolicyService;