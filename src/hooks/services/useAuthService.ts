import useSWR from 'swr';
import {useCallback, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {IApiRequest, IUseAuth} from "@/types/Hooks";
import {User} from "@/models/User";
import {useDispatch} from "react-redux";
import {clearUserSession, setRole, setToken, setUser} from "@/store/reducers/authSlice";
import {AuthService} from "@/services/AuthService";
import {toKebabCase} from "@/utils/string-formatters";

export const useAuthService = ({middleware, redirectIfAuthenticated}: IUseAuth) => {

    const dispatch = useDispatch();
    const router = useRouter();

    const fetchUser = useCallback(async () => {
        try {
            const response = await AuthService.getOwnUser();
            return response.data;
        } catch (error) {
            throw error;
        }
    }, []);

    const {data: userData, error, mutate} = useSWR<User>('/auth/user', fetchUser, {
        revalidateOnFocus: false,
    });

    const user = userData ? userData["user"] : null;

    const register = useCallback(async ({userSignUpData}: IApiRequest) => {
        await AuthService.csrf();

        try {
            const response = await AuthService.register(userSignUpData);
            if (response.success) {
                if (response.message && response.data) {
                    dispatch(setToken(response.data.token));
                    dispatch(setUser(response.data.user));
                    dispatch(setRole(response.data.user.role));
                    await mutate();
                    return response;
                }
            }
        } catch (error) {
            throw error;
        }
    }, [dispatch, mutate]);

    const login = useCallback(async ({userLoginData}: IApiRequest) => {
        await AuthService.csrf();

        try {
            const response = await AuthService.login(userLoginData);
            if (response.success) {
                if (response.message && response.data) {
                    dispatch(setToken(response.data.token));
                    dispatch(setUser(response.data.user));
                    dispatch(setRole(response.data.user.role));
                    await mutate();
                    return response;
                }
            }
        } catch (error) {
            throw error;
        }
    }, [dispatch, mutate]);

    const logout = useCallback(async () => {
        try {
            const response = await AuthService.logout();
            if (response.success) {
                dispatch(clearUserSession());
            }
        } catch (error) {
            throw error;
        }
        router.push('/login');
    }, [dispatch, router]);

    const forgotPassword = useCallback(async ({forgotPswData}: IApiRequest) => {
        await AuthService.csrf();

        try {
            const response = await AuthService.forgetPasswordSendEmail(forgotPswData);
            if (response.success) {
                return response;
            }
        } catch (error) {
            throw error;
        }
    }, []);

    const resetPassword = useCallback(async ({resetPswData}: IApiRequest) => {
        await AuthService.csrf();

        try {
            const response = await AuthService.resetPasswordByEmail(resetPswData);
            if (response.success) {
                dispatch(clearUserSession());
                return response;
            }
        } catch (error) {
            throw error;
        }
    }, [dispatch]);


    useEffect(() => {
        if (user) {
            dispatch(setUser(user));
            dispatch(setRole(user.role));
        } else if (error) {
            dispatch(clearUserSession());
        }
    }, [error, dispatch, user]);

    useEffect(() => {
        const handleRedirect = async () => {
            if (middleware === 'guest' && redirectIfAuthenticated && user) {
                router.push(`/${toKebabCase(user.role)}${redirectIfAuthenticated}`);
            }
            if (window.location.pathname === '/verify-email' && user?.email_verified_at) {
                if (redirectIfAuthenticated) {
                    router.push(redirectIfAuthenticated);
                }
            }
            if (middleware === 'auth' && error) {
                await logout();
            }
        };
        handleRedirect().catch(err => {
            console.error('Error during redirect:', err);
        });
    }, [error, middleware, redirectIfAuthenticated, router, dispatch, logout, user]);

    return {
        user,
        register,
        login,
        logout,
        forgotPassword,
        resetPassword,
    };
};
