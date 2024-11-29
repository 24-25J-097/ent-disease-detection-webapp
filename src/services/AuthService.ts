import {ApiInstance} from "@/types/service/ApiService";
import ApiService from "@/services/api-service/ApiService";
import {ForgotPswData, ResetPswData, UserLoginData, UserSignUpData} from "@/types/service/Auth";
import {AppResponse, AuthResponse, AxiosAppResponse, CommonResponse} from "@/types/service/Response";
import {ApiUtils} from "@/services/api-service/ApiUtils";
import {convertToAPIObj} from "@/utils/object-formatters";

export class AuthService {

    private static api(): ApiInstance {
        return ApiService.getInstance().getApi();
    }

    public static async csrf(): Promise<void> {
        const ep = ApiUtils.apiUrl + "/sanctum/csrf-cookie";
        await AuthService.api().get(ep);
    };

    public static async register(userSignUpData: UserSignUpData): Promise<AppResponse<AuthResponse>> {
        const ep = ApiUtils.publicUrl("register");
        const res = await AuthService.api().post<UserSignUpData, AxiosAppResponse<AuthResponse>>(ep, userSignUpData);
        return res.data;
    }

    public static async login(userLoginData: UserLoginData): Promise<AppResponse<AuthResponse>> {
        const ep = ApiUtils.publicUrl("login");
        const res = await AuthService.api().post<UserLoginData, AxiosAppResponse<AuthResponse>>(ep, userLoginData);
        return res.data;
    }

    public static async logout(): Promise<AppResponse<any>> {
        const ep = ApiUtils.publicUrl("logout");
        const res = await AuthService.api().post<any, AxiosAppResponse<any>>(ep);
        return res.data;
    }

    public static async getOwnUser(): Promise<AppResponse<any>> {
        const ep = ApiUtils.authUrl("me");
        const res = await AuthService.api().get(ep);
        return res.data;
    }

    public static async forgetPasswordSendEmail(forgotPswData: ForgotPswData): Promise<AppResponse<CommonResponse>> {
        const forgotData = convertToAPIObj(forgotPswData);
        const ep = ApiUtils.publicUrl("forgot-password");
        const res = await AuthService.api().post<string, AxiosAppResponse<CommonResponse>>(ep, forgotData);
        return res.data;
    }

    public static async resetPasswordByEmail(resetPswData: ResetPswData): Promise<AppResponse<AuthResponse>> {
        const resetData = convertToAPIObj(resetPswData);
        const ep = ApiUtils.publicUrl("reset-password");
        const res = await AuthService.api().post<ResetPswData, AxiosAppResponse<AuthResponse>>(ep, resetData);
        return res.data;
    }

}
