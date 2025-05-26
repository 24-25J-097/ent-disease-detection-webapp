import {ApiInstance} from "@/types/service/ApiService";
import ApiService from "@/services/api-service/ApiService";
import {AppResponse, AxiosAppResponse, CommonResponse} from "@/types/service/Response";
import {ApiUtils} from "@/services/api-service/ApiUtils";
import {PatientData} from '@/types/service/Patient';

export class PatientService {

    private static api(): ApiInstance {
        return ApiService.getInstance().getApi();
    }

    public static async createPatient(patientData: PatientData): Promise<AppResponse<CommonResponse>> {
        const ep = ApiUtils.doctorUrl("patients");
        const res = await PatientService.api().post<PatientData, AxiosAppResponse<CommonResponse>>(ep, patientData);
        return res.data;
    }

    public static async getPatient(patientId: string): Promise<AppResponse<CommonResponse>> {
        const ep = ApiUtils.doctorUrl(`patients/${patientId}`);
        const res = await PatientService.api().get(ep);
        return res.data;
    }

    public static async updatePatient(patientId: string, patientData: Partial<PatientData>): Promise<AppResponse<CommonResponse>> {
        const ep = ApiUtils.doctorUrl(`patients/${patientId}`);
        const res = await PatientService.api().put<Partial<PatientData>, AxiosAppResponse<CommonResponse>>(ep, patientData);
        return res.data;
    }

    public static async deletePatient(patientId: string): Promise<AppResponse<CommonResponse>> {
        const ep = ApiUtils.doctorUrl(`patients/${patientId}`);
        const res = await PatientService.api().delete(ep);
        return res.data;
    }

    public static async getAllPatients(): Promise<PatientData[]> {
        const ep = ApiUtils.doctorUrl("patients");
        const res = await PatientService.api().get<null, AxiosAppResponse<PatientData[]>>(ep);
        return res.data.data;
    }
}
