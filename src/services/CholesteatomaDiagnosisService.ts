import {ApiInstance} from "@/types/service/ApiService";
import ApiService from "@/services/api-service/ApiService";
import {AppResponse, AxiosAppResponse, CommonResponse} from "@/types/service/Response";
import {ApiUtils} from "@/services/api-service/ApiUtils";
import {convertToAPIFormData} from '@/utils/object-formatters';
import {CholesteatomaDiagnosisData, DiagnosisAcceptance} from '@/types/service/Diagnosis';
import {CholesteatomaReportsData} from '@/types/Charts';

export class CholesteatomaDiagnosisService {

    private static api(): ApiInstance {
        return ApiService.getInstance().getApi();
    }

    public static async cholesteatomaDiagnosis(diagnosisData: CholesteatomaDiagnosisData): Promise<AppResponse<CommonResponse>> {
        const ep = ApiUtils.doctorUrl("diagnosis/cholesteatoma");
        const formData = convertToAPIFormData(diagnosisData, true);
        const res = await CholesteatomaDiagnosisService.api().post<CholesteatomaDiagnosisData, AxiosAppResponse<CommonResponse>>(ep, formData);
        return res.data;
    }

    public static async cholesteatomaDiagnosisAccept(diagnosisAcceptance: DiagnosisAcceptance): Promise<AppResponse<CommonResponse>> {
        const ep = ApiUtils.doctorUrl("diagnosis/cholesteatoma/accept");
        const res = await CholesteatomaDiagnosisService.api().post<DiagnosisAcceptance, AxiosAppResponse<CommonResponse>>(ep, diagnosisAcceptance);
        return res.data;
    }

    public static async getCholesteatomaReports(): Promise<AppResponse<CholesteatomaReportsData>> {
        const ep = ApiUtils.doctorUrl("diagnosis/cholesteatoma/reports");
        const res = await CholesteatomaDiagnosisService.api().get(ep);
        return res.data;
    }

}
