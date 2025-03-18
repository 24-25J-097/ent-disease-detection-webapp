import {ApiInstance} from "@/types/service/ApiService";
import ApiService from "@/services/api-service/ApiService";
import {AppResponse, AxiosAppResponse, CommonResponse} from "@/types/service/Response";
import {ApiUtils} from "@/services/api-service/ApiUtils";
import {convertToAPIFormData} from '@/utils/object-formatters';
import {SinusitisDiagnosisAcceptance, SinusitisDiagnosisData} from "@/types/service/SinusitisDiagnosis";
import {Sinusitis} from "@/models/Sinusitis";
import {SinusitisReportsData} from "@/types/Charts";

export class SinusitisAnalyzeService {

    private static api(): ApiInstance {
        return ApiService.getInstance().getApi();
    }

    public static async analyze(sinusFormData: SinusitisDiagnosisData): Promise<AppResponse<Sinusitis>> {
        // const ep = ApiUtils.fastApiUrl + "/api/sinusitis/analyze";
        const ep = ApiUtils.doctorUrl("diagnosis/sinusitis");
        console.log(ep)
        const formData = convertToAPIFormData(sinusFormData, true);
        const res = await SinusitisAnalyzeService.api().post<SinusitisDiagnosisData, AxiosAppResponse<Sinusitis>>(ep, formData);
        return res.data;
    }

    public static async sinusitisDiagnosisAccept(diagnosisAcceptance: SinusitisDiagnosisAcceptance): Promise<AppResponse<CommonResponse>> {
        const ep = ApiUtils.doctorUrl("diagnosis/sinusitis/accept");
        const res = await SinusitisAnalyzeService.api().post<SinusitisDiagnosisAcceptance, AxiosAppResponse<CommonResponse>>(ep, diagnosisAcceptance);
        return res.data;
    }

    public static async getSinusitisReports(): Promise<AppResponse<SinusitisReportsData>> {
        const ep = ApiUtils.doctorUrl("diagnosis/sinusitis/reports");
        const res = await SinusitisAnalyzeService.api().get(ep);
        return res.data;
    }

    public static async getAllSinusitis(): Promise<AppResponse<Sinusitis[]>> {
        const ep = ApiUtils.doctorUrl("diagnosis/sinusitis");
        const res = await SinusitisAnalyzeService.api().get(ep);
        return res.data;
    }
}
