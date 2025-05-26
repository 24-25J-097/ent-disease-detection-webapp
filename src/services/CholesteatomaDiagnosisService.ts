import {ApiInstance} from "@/types/service/ApiService";
import ApiService from "@/services/api-service/ApiService";
import {AppResponse, AxiosAppResponse, CommonResponse} from "@/types/service/Response";
import {ApiUtils} from "@/services/api-service/ApiUtils";
import {convertToAPIFormData} from '@/utils/object-formatters';
import {CholesteatomaDiagnosisData, DiagnosisAcceptance} from '@/types/service/Diagnosis';
import {CholesteatomaReportsData} from '@/types/Charts';
import {Role} from '@/enums/access';

export class CholesteatomaDiagnosisService {

    private static api(): ApiInstance {
        return ApiService.getInstance().getApi();
    }

    public static async cholesteatomaDiagnosis(diagnosisData: CholesteatomaDiagnosisData, role?: Role): Promise<AppResponse<CommonResponse>> {
        let ep;
        if (role && role === Role.STUDENT) {
            ep = ApiUtils.studentUrl("diagnosis/cholesteatoma");
        } else {
            ep = ApiUtils.doctorUrl("diagnosis/cholesteatoma");
        }
        const formData = convertToAPIFormData(diagnosisData, true);
        const res = await CholesteatomaDiagnosisService.api().post<CholesteatomaDiagnosisData, AxiosAppResponse<CommonResponse>>(ep, formData);
        return res.data;
    }

    public static async cholesteatomaDiagnosisAccept(diagnosisAcceptance: DiagnosisAcceptance, role?: Role): Promise<AppResponse<CommonResponse>> {
        let ep;
        if (role && role === Role.STUDENT) {
            ep = ApiUtils.studentUrl("diagnosis/cholesteatoma/accept");
        } else {
            ep = ApiUtils.doctorUrl("diagnosis/cholesteatoma/accept");
        }
        const res = await CholesteatomaDiagnosisService.api().post<DiagnosisAcceptance, AxiosAppResponse<CommonResponse>>(ep, diagnosisAcceptance);
        return res.data;
    }

    public static async getCholesteatomaReports(): Promise<AppResponse<CholesteatomaReportsData>> {
        const ep = ApiUtils.doctorUrl("diagnosis/cholesteatoma/reports");
        const res = await CholesteatomaDiagnosisService.api().get(ep);
        return res.data;
    }

    public static async getAllCholesteatoma(): Promise<AppResponse<CommonResponse>> {
        const ep = ApiUtils.doctorUrl("diagnosis/cholesteatoma");
        const res = await CholesteatomaDiagnosisService.api().get(ep);
        return res.data;
    }

    public static async getCholesteatomaImage(uploadId: string): Promise<any> {
        const ep = ApiUtils.publicUrl(`diagnosis/cholesteatoma/image/${uploadId}`);
        return  await CholesteatomaDiagnosisService.api().get(ep);
    }

}
