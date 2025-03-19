import {ApiInstance} from "@/types/service/ApiService";
import ApiService from "@/services/api-service/ApiService";
import {AppResponse, AxiosAppResponse, CommonResponse} from "@/types/service/Response";
import {ApiUtils} from "@/services/api-service/ApiUtils";
import {convertToAPIFormData} from '@/utils/object-formatters';
import {PharyngitisDiagnosisAcceptance, PharyngitisDiagnosisData} from "@/types/service/PharyngitisDiagnosisData";
import {Pharyngitis} from "@/models/Pharyngitis";
import {PharyngitisReportsData} from "@/types/Charts";

export class PharyngitisAnalyzeService {

    private static api(): ApiInstance {
        return ApiService.getInstance().getApi();
    }

    public static async analyze(sinusFormData: PharyngitisDiagnosisData): Promise<AppResponse<Pharyngitis>> {
        // const ep = ApiUtils.fastApiUrl + "/api/pharyngitis/analyze";
        const ep = ApiUtils.doctorUrl("diagnosis/pharyngitis");
        console.log(ep)
        const formData = convertToAPIFormData(sinusFormData, true);
        const res = await PharyngitisAnalyzeService.api().post<PharyngitisDiagnosisData, AxiosAppResponse<Pharyngitis>>(ep, formData);
        return res.data;
    }

    public static async pharyngitisDiagnosisAccept(diagnosisAcceptance: PharyngitisDiagnosisAcceptance): Promise<AppResponse<CommonResponse>> {
        const ep = ApiUtils.doctorUrl("diagnosis/pharyngitis/accept");
        const res = await PharyngitisAnalyzeService.api().post<PharyngitisDiagnosisAcceptance, AxiosAppResponse<CommonResponse>>(ep, diagnosisAcceptance);
        return res.data;
    }

    public static async getPharyngitisReports(): Promise<AppResponse<PharyngitisReportsData>> {
        const ep = ApiUtils.doctorUrl("diagnosis/pharyngitis/reports");
        const res = await PharyngitisAnalyzeService.api().get(ep);
        return res.data;
    }

    public static async getAllPharyngitis(): Promise<AppResponse<CommonResponse>> {
        const ep = ApiUtils.doctorUrl("diagnosis/pharyngitis");
        const res = await PharyngitisAnalyzeService.api().get(ep);
        return res.data;
    }

}
