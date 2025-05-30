import {ApiInstance} from "@/types/service/ApiService";
import ApiService from "@/services/api-service/ApiService";
import {AxiosAppResponse} from "@/types/service/Response";
import {ApiUtils} from "@/services/api-service/ApiUtils";
import {User} from "@/models/User";

export class UserService {

    private static api(): ApiInstance {
        return ApiService.getInstance().getApi();
    }

    public static async getAllUsers(): Promise<User[]> {
        const ep = ApiUtils.adminUrl("users");
        const res = await UserService.api().get<null, AxiosAppResponse<User[]>>(ep);
        return res.data.data;
    }
}
