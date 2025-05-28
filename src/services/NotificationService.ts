import {ApiInstance} from '@/types/service/ApiService';
import ApiService from '@/services/api-service/ApiService';
import {ApiUtils} from '@/services/api-service/ApiUtils';
import {AppResponse, AxiosAppResponse, CommonResponse} from '@/types/service/Response';
import {ContactUsEmailData} from '@/types/Common';

export class NotificationService {

    private static api(): ApiInstance {
        return ApiService.getInstance().getApi();
    }

    public static async sendContactUsEmail(data: ContactUsEmailData): Promise<AppResponse<CommonResponse>> {
        const ep = ApiUtils.publicUrl("notification/contact-us");
        const res = await NotificationService.api().post<ContactUsEmailData, AxiosAppResponse<CommonResponse>>(ep, data);
        return res.data;
    }

}
