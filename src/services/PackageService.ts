import ApiService from './api-service/ApiService';
import {Package} from '@/models/Package';
import {ApiUtils} from './api-service/ApiUtils';
import {AxiosAppResponse} from "@/types/service/Response";

class PackageService {
    private static instance: PackageService;
    private readonly apiService: ApiService;
    private readonly baseUrl: string;

    private constructor() {
        this.apiService = ApiService.getInstance();
        this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
    }

    public static getInstance(): PackageService {
        if (!PackageService.instance) {
            PackageService.instance = new PackageService();
        }
        return PackageService.instance;
    }

    public async getAllPackages(): Promise<Package[]> {
        const ep = ApiUtils.adminUrl("packages");
        const response = await this.apiService.getApi().get<null, AxiosAppResponse<Package[]>>(ep);
        return response.data.data;
    }

    public async getPackage(id: string): Promise<Package> {
        const ep = ApiUtils.adminUrl(`packages/${id}`);
        const response = await this.apiService.getApi().get<null, AxiosAppResponse<Package>>(ep);
        return response.data.data;
    }

    public async createPackage(packageData: Omit<Package, '_id' | 'createdAt' | 'updatedAt'>): Promise<Package> {
        const ep = ApiUtils.adminUrl(`packages`);
        const response = await this.apiService.getApi().post<Partial<Package>, AxiosAppResponse<Package>>(ep, packageData);
        return response.data.data;
    }

    public async updatePackage(id: string, packageData: Partial<Omit<Package, '_id' | 'createdAt' | 'updatedAt'>>): Promise<Package> {
        const ep = ApiUtils.adminUrl(`packages/${id}`);
        const response = await this.apiService.getApi().put(ep, packageData);
        return response.data.data;
    }

    public async deletePackage(id: string): Promise<void> {
        const ep = ApiUtils.adminUrl(`packages/${id}`);
        await this.apiService.getApi().delete<null, AxiosAppResponse<Package>>(ep);
    }

    public async togglePackageStatus(id: string): Promise<Package> {
        const ep = ApiUtils.adminUrl(`packages/${id}/status`);
        const response = await this.apiService.getApi().patch<null, AxiosAppResponse<Package>>(ep);
        return response.data.data;
    }
}

export default PackageService;