export class ApiUtils {

    public static fastApiUrl: string = process.env.NEXT_PUBLIC_FASTAPI_BASE_URL || "";
    public static fastApiUrl2: string = process.env.NEXT_PUBLIC_FASTAPI_BASE_URL2 || "";

    public static apiUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || "";

    public static webUrl: string = process.env.NEXT_PUBLIC_WEB_URL || this.apiUrl;

    public static publicUrl(path: string): string {
        return this.apiUrl + `/api/public/` + path;
    }

    public static authUrl(path: string): string {
        return this.apiUrl + `/api/auth/` + path;
    }

    public static adminUrl(path: string): string {
        return this.apiUrl + `/api/admin/` + path;
    }

    public static doctorUrl(path: string): string {
        return this.apiUrl + `/api/doctor/` + path;
    }

}
