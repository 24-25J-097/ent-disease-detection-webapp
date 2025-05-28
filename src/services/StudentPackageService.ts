import {AppResponse, AxiosAppResponse} from "@/types/service/Response";
import ApiService from './api-service/ApiService';
import {ApiUtils} from './api-service/ApiUtils';
import {Package} from '@/models/Package';
import {ApiInstance} from "@/types/service/ApiService";
import {UserPlan} from "@/models/UserPlan";

class StudentPackageService {
    private static api(): ApiInstance {
        return ApiService.getInstance().getApi();
    }

    public static async getActivePackages(): Promise<Package[]> {
        const ep = ApiUtils.studentUrl('packages');
        const response = await StudentPackageService.api().get<null, AxiosAppResponse<Package[]>>(ep);
        return response.data.data;
    }

    public static async getCurrentActivePlan(): Promise<UserPlan | null> {
        const ep = ApiUtils.authUrl('active-plan');
        const response = await StudentPackageService.api().get<null, AxiosAppResponse<UserPlan | null>>(ep);
        return response.data.data;
    }

    public static async purchase(packageId: string): Promise<AppResponse<UserPlan>> {
        const ep = ApiUtils.authUrl('purchase-package');
        const data = {
            "packageId": packageId,
            "paymentMethod": "credit_card",
            // "transactionId": "txn_123456789"
        }
        const response = await StudentPackageService.api().post<null, AxiosAppResponse<UserPlan>>(ep, data);
        return response.data;
    }
}

export default StudentPackageService;
