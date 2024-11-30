import {ApiInstance} from "@/types/service/ApiService";
import ApiService from "@/services/api-service/ApiService";
import {AppResponse, AxiosAppResponse, CommonResponse} from "@/types/service/Response";
import {ApiUtils} from "@/services/api-service/ApiUtils";
import {convertToAPIFormData} from '@/utils/object-formatters';
import {CholesteatomaDiagnosisData, DiagnosisAcceptance} from '@/types/service/Diagnosis';

export class DiagnosisService {

    private static api(): ApiInstance {
        return ApiService.getInstance().getApi();
    }

    public static async cholesteatomaDiagnosis(diagnosisData: CholesteatomaDiagnosisData): Promise<AppResponse<CommonResponse>> {
        const ep = ApiUtils.doctorUrl("diagnosis/cholesteatoma");
        const formData = convertToAPIFormData(diagnosisData, true);
        const res = await DiagnosisService.api().post<CholesteatomaDiagnosisData, AxiosAppResponse<CommonResponse>>(ep, formData);
        return res.data;
    }

    public static async cholesteatomaDiagnosisAccept(diagnosisAcceptance: DiagnosisAcceptance): Promise<AppResponse<CommonResponse>> {
        const ep = ApiUtils.doctorUrl("diagnosis/cholesteatoma/accept");
        const res = await DiagnosisService.api().post<DiagnosisAcceptance, AxiosAppResponse<CommonResponse>>(ep, diagnosisAcceptance);
        return res.data;
    }
}
