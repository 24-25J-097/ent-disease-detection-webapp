import {ApiInstance} from "@/types/service/ApiService";
import ApiService from "@/services/api-service/ApiService";
import {AppResponse, AxiosAppResponse, CommonResponse} from "@/types/service/Response";
import {ApiUtils} from "@/services/api-service/ApiUtils";
import {convertToAPIFormData} from '@/utils/object-formatters';
import {CholesteatomaDiagnosisData} from '@/types/service/Diagnosis';
import {SinusitisRequest, SinusitisResult} from "@/types/service/SinusitisResult";

export class SinusitisAnalyzeService {

    private static api(): ApiInstance {
        return ApiService.getInstance().getApi();
    }

    public static async analyze(sinusFormData: SinusitisRequest): Promise<AppResponse<SinusitisResult>> {
        const ep = ApiUtils.fastApiUrl + "/predict";
        console.log(ep)
        const formData = convertToAPIFormData(sinusFormData, true);
        const res = await SinusitisAnalyzeService.api().post<CholesteatomaDiagnosisData, AxiosAppResponse<SinusitisResult>>(ep, formData);
        return res.data;
    }
}
