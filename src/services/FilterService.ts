import {ApiInstance} from '@/types/service/ApiService';
import ApiService from '@/services/api-service/ApiService';
import {ApiUtils} from '@/services/api-service/ApiUtils';
import {UserFilterData} from '@/types/Filters';
import {AppResponse, CommonResponse} from '@/types/service/Response';
import {SelectInputOption} from '@/types/FormInputs';

export class FilterService {

    private static api(): ApiInstance {
        return ApiService.getInstance().getApi();
    }

    public static async filterPatients(filter: UserFilterData): Promise<AppResponse<SelectInputOption[]>> {
        const filterParams = Object.entries(filter).filter(
            ([_, value]) => value
        ).map(([key, value]) => (
            `filter[${key}]=${encodeURIComponent(value)}`
        )).join("&");

        const ep = ApiUtils.authUrl(`patients${filterParams ? `?${filterParams}` : ''}`);
        const res = await FilterService.api().get(ep);
        return res.data;
    }


}
