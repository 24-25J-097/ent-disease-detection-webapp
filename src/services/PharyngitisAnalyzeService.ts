import {ApiInstance} from "@/types/service/ApiService";
import ApiService from "@/services/api-service/ApiService";
import {AppResponse, AxiosAppResponse} from "@/types/service/Response";
import {ApiUtils} from "@/services/api-service/ApiUtils";
import {convertToAPIFormData} from '@/utils/object-formatters';
import {CholesteatomaDiagnosisData} from '@/types/service/Diagnosis';
import {PharyngitisRequest, PharyngitisResult} from "@/types/service/PharyngitisResult";

export class PharyngitisAnalyzeService {

    private static api(): ApiInstance {
        return ApiService.getInstance().getApi();
    }

    public static async analyze(sinusFormData: PharyngitisRequest): Promise<AppResponse<PharyngitisResult>> {
        const ep = ApiUtils.fastApiUrl + "/api/pharyngitis/analyze";
        console.log(ep)
        const formData = convertToAPIFormData(sinusFormData, true);
        const res = await PharyngitisAnalyzeService.api().post<CholesteatomaDiagnosisData, AxiosAppResponse<PharyngitisResult>>(ep, formData);
        return res.data;
    }
}
