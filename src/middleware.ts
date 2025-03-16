import {NextRequest, NextResponse} from 'next/server';
import {AccessKey, Role} from "@/enums/access";
import {toKebabCase} from "@/utils/string-formatters";

/**
 * Middleware function to handle route protection and redirection based on user authentication and role.
 *
 * @param {NextRequest} req - The incoming request object.
 * @returns {NextResponse} - The response object to handle the redirection or proceed with the request.
 */
export function middleware(req: NextRequest) {

    const url = req.nextUrl.clone();
    const token = req.cookies.get(AccessKey.ENTI_TOKEN as any)?.value;
    const role = req.cookies.get(AccessKey.ENTI_ROLE as any)?.value;

    // List of public paths that don't require authentication and should be avoided by authenticated users
    const protectedPublicPaths = ['/login', '/signup', '/forgot-password'];
    const isPublicPath = protectedPublicPaths.includes(url.pathname);

    if (!token) {
        if (isPublicPath) {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL("/login", req.url));
    } else {
        if (role) {
            const roleURL = toKebabCase(role);
            const isNotSamePath = !(url.pathname).includes(roleURL || "");

            if (isNotSamePath) {
                if (Object.values(Role).includes(role as Role)) {
                    url.pathname = `/${roleURL}`;
                } else {
                    url.pathname = '/';
                }
                return NextResponse.redirect(url);
            }
        }
    }

    return NextResponse.next();
}

/**
 * Configuration object to specify the paths that the middleware should apply to.
 *
 * @type {Object}
 * @property {Array<string>} matcher - An array of path patterns that the middleware should intercept.
 */
export const config = {
    matcher: [
        "/admin/:path*",
        "/doctor/:path*",
        "/radiologist/:path*",
        "/student/:path*",
        "/login",
        "/signup",
        "/forgot-password"
    ],
};
