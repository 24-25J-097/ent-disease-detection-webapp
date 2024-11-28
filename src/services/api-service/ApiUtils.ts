export class ApiUtils {

    public static apiUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || "";

    public static webUrl: string = process.env.NEXT_PUBLIC_WEB_URL || this.apiUrl;

    public static publicUrl(path: string, apiVersion?: string): string {
        const version = apiVersion || process.env.NEXT_PUBLIC_API_VERSION;
        return this.apiUrl + `/api/${version}/` + path;
    }

    public static authUrl(path: string, apiVersion?: string): string {
        const version = apiVersion || process.env.NEXT_PUBLIC_API_VERSION;
        return this.apiUrl + `/api/${version}/auth/` + path;
    }

    public static adminUrl(path: string, apiVersion?: string): string {
        const version = apiVersion || process.env.NEXT_PUBLIC_API_VERSION;
        return this.apiUrl + `/api/${version}/admin/` + path;
    }

}
