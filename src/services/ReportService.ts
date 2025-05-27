import ApiService from './api-service/ApiService';
import {ApiUtils} from "@/services/api-service/ApiUtils";
import {AxiosAppResponse} from "@/types/service/Response";
import {PackagePurchase, RequestLog, RequestLogResponse, UsageByUser} from "@/models/RequestLog";

class ReportService {
    private static instance: ReportService;
    private readonly apiService: ApiService;


    private constructor() {
        this.apiService = ApiService.getInstance();
    }

    public static getInstance(): ReportService {
        if (!ReportService.instance) {
            ReportService.instance = new ReportService();
        }
        return ReportService.instance;
    }

    public async getAllApiUsages(dateRange?: { startDate: string; endDate: string }): Promise<RequestLogResponse> {
        const ep = ApiUtils.adminUrl("reports/plans/api-usage");
        const response = await this.apiService.getApi().get<null, AxiosAppResponse<RequestLogResponse>>(ep, {
            params: dateRange
        });
        return response.data.data;
    }

    public async getUsageByUser(dateRange?: { startDate: string; endDate: string }): Promise<UsageByUser[]> {
        const ep = ApiUtils.adminUrl("reports/plans/api-usage/by-user");
        const response = await this.apiService.getApi().get<null, AxiosAppResponse<UsageByUser[]>>(ep, {
            params: dateRange
        });
        return response.data.data;
    }

    // public async getUsageByRole(dateRange?: { startDate: string; endDate: string }): Promise<UsageByRole[]> {
    //     const ep = ApiUtils.adminUrl("reports/plans/api-usage/by-role");
    //     const response = await this.apiService.getApi().get<null, AxiosAppResponse<UsageByRole[]>>(ep, {
    //         params: dateRange
    //     });
    //     return response.data.data;
    // }

    // public async getUsageByPackage(dateRange?: { startDate: string; endDate: string }): Promise<UsageByPackage[]> {
    //     const ep = ApiUtils.adminUrl("reports/plans/api-usage/by-plan");
    //     const response = await this.apiService.getApi().get<null, AxiosAppResponse<UsageByPackage[]>>(ep, {
    //         params: dateRange
    //     });
    //     return response.data.data;
    // }

    public async getPackagePurchases(dateRange?: { startDate: string; endDate: string }): Promise<PackagePurchase[]> {
        const ep = ApiUtils.adminUrl("reports/plans/purchase-history");
        const response = await this.apiService.getApi().get<null, AxiosAppResponse<PackagePurchase[]>>(ep, {
            params: dateRange
        });
        return response.data.data;
    }
}

export default ReportService;