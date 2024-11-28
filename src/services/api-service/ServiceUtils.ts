import { setCookie, parseCookies, destroyCookie } from 'nookies';
import {AccessKey} from "@/enums/access";

class ServiceUtils {

    public static setAccessToken(token: string, ctx?: any): void {
        setCookie(ctx, AccessKey.ENTI_TOKEN, token, {
            maxAge: 30 * 24 * 60 * 60, // 30 days
            path: '/',
        });
    }

    public static getAccessToken(ctx?: any): string | null {
        const cookies = parseCookies(ctx);
        return cookies[AccessKey.ENTI_TOKEN] || null;
    }

    public static removeAccessToken(ctx?: any): void {
        destroyCookie(ctx, AccessKey.ENTI_TOKEN, { path: '/' });
    }

    public static setUserRole(role: string, ctx?: any): void {
        setCookie(ctx, AccessKey.ENTI_ROLE, role, {
            maxAge: 30 * 24 * 60 * 60, // 30 days
            path: '/',
        });
    }

    public static getUserRole(ctx?: any): string | null {
        const cookies = parseCookies(ctx);
        return cookies[AccessKey.ENTI_ROLE] || null;
    }

    public static removeUserRole(ctx?: any): void {
        destroyCookie(ctx, AccessKey.ENTI_ROLE, { path: '/' });
    }

    public static logout(ctx?: any): void {
        ServiceUtils.removeAccessToken(ctx);
        ServiceUtils.removeUserRole(ctx);
    }

}

export default ServiceUtils;
