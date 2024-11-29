import {ApiInstance} from "@/types/service/ApiService";
import ApiService from "@/services/api-service/ApiService";
import {AppResponse, AuthResponse, AxiosAppResponse, CommonResponse} from "@/types/service/Response";
import {ApiUtils} from "@/services/api-service/ApiUtils";
import {convertToAPIFormData} from '@/utils/object-formatters';
import {CholesteatomaDiagnosisData} from '@/types/service/Diagnosis';

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
}
