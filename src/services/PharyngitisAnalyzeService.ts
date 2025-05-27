import {ApiInstance} from "@/types/service/ApiService";
import ApiService from "@/services/api-service/ApiService";
import {AppResponse, AxiosAppResponse, CommonResponse} from "@/types/service/Response";
import {ApiUtils} from "@/services/api-service/ApiUtils";
import {convertToAPIFormData} from '@/utils/object-formatters';
import {PharyngitisDiagnosisAcceptance, PharyngitisDiagnosisData} from "@/types/service/PharyngitisDiagnosisData";
import {Pharyngitis} from "@/models/Pharyngitis";
import {PharyngitisReportsData} from "@/types/Charts";
import {Role} from '@/enums/access';

export class PharyngitisAnalyzeService {

    private static api(): ApiInstance {
        return ApiService.getInstance().getApi();
    }

    public static async analyze(sinusFormData: PharyngitisDiagnosisData, role?: Role): Promise<AppResponse<Pharyngitis>> {
        let ep;
        if (role && role === Role.STUDENT) {
            ep = ApiUtils.studentUrl("diagnosis/pharyngitis");
        } else {
            ep = ApiUtils.doctorUrl("diagnosis/pharyngitis");
        }
        const formData = convertToAPIFormData(sinusFormData, true);
        const res = await PharyngitisAnalyzeService.api().post<PharyngitisDiagnosisData, AxiosAppResponse<Pharyngitis>>(ep, formData);
        return res.data;
    }

    public static async pharyngitisDiagnosisAccept(diagnosisAcceptance: PharyngitisDiagnosisAcceptance, role?: Role): Promise<AppResponse<CommonResponse>> {
        let ep;
        if (role && role === Role.STUDENT) {
            ep = ApiUtils.studentUrl("diagnosis/pharyngitis/accept");
        } else {
            ep = ApiUtils.doctorUrl("diagnosis/pharyngitis/accept");
        }
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
