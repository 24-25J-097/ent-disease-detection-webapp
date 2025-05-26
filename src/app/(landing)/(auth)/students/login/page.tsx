"use client";

import React, {useState} from "react";
import {motion} from "framer-motion";
import {Shield, Sparkles} from "lucide-react";
import {NextPage} from 'next';
import Image from 'next/image';
import {useAuthService} from "@/hooks/services/useAuthService";
import {UserLoginData} from "@/types/service/Auth";
import {If} from "@/components/utils/If";
import {trimText} from "@/utils/string-formatters";
import TextInput from "@/components/inputs/TextInput";
import PasswordInput from "@/components/inputs/PasswordInput";
import {useToast} from "@/providers/ToastProvider";
import {SignedUpAs, Source} from '@/enums/general';
import useRouterApp from '@/hooks/useRouterApp';
import {AxiosError} from 'axios';
import {ErrorResponseData} from '@/types/Common';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Link from 'next/link';
import {Role} from '@/enums/access';

const LoginPage: NextPage = () => {

    const initUserLoginData: UserLoginData = {
        email: "",
        password: "",
        remember: false,
        source: Source.WEB,
        signedUpAs: SignedUpAs.EMAIL
    };

    const [userLoginData, setUserLoginData] = useState<UserLoginData>(initUserLoginData);
    const [hasValidationErr, setHasValidationErr] = useState<boolean[]>([]);
    const [emailErrMsg, setEmailErrMsg] = useState<string>('');
    const [passwordErrMsg, setPasswordErrMsg] = useState<string>('');
    const [errors, setErrors] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {login} = useAuthService({
        middleware: 'guest',
        redirectIfAuthenticated: '/',
    });

    const router = useRouterApp();
    const {notifySuccess, notifyError} = useToast();

    const validateData = (data: any): boolean[] => {
        setHasValidationErr([]);
        if (data.hasOwnProperty('email') && data.email == "") {
            const errorText = 'Please enter the email.';
            setEmailErrMsg(errorText);
            setTimeout(() => setEmailErrMsg(''), 3000);
            hasValidationErr.push(true);

        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            const errorText = 'Please enter a valid email.';
            setEmailErrMsg(errorText);
            setTimeout(() => setEmailErrMsg(''), 3000);
            hasValidationErr.push(true);
        }
        if (data.hasOwnProperty('password') && data.password == "") {
            const errorText = 'Please enter the password.';
            setPasswordErrMsg(errorText);
            setTimeout(() => setPasswordErrMsg(''), 3000);
            hasValidationErr.push(true);

        } else if (data.password && data.password.toString().length < 8) {
            const errorText = 'Password must be at least 8 characters long.';
            setPasswordErrMsg(errorText);
            setTimeout(() => setPasswordErrMsg(''), 3000);
            hasValidationErr.push(true);
        }
        return hasValidationErr;
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors(null);

        try {
            if (!validateData(userLoginData).includes(true)) {
                setIsLoading(true);
                const res = await login({userLoginData}, Role.STUDENT);
                notifySuccess(res!.message);
            } else {
                setIsLoading(false);
                console.error('SIGN IN FAILED: Please enter valid data :)');
            }
        } catch (error) {
            setIsLoading(false);
            const axiosError = error as AxiosError<ErrorResponseData>;
            const errMsg = axiosError?.response?.data?.message || axiosError?.response?.data?.error || "An error occurred.";
            if (axiosError?.response?.status && axiosError.response.status >= 500) {
                setErrors("An unexpected error occurred. Please try again.");
            } else {
                setErrors(errMsg);
                notifyError(errMsg);
            }
        }
    };

    const emailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const trimmedValue = trimText(event.target.value, true).toString();
        setUserLoginData((prevState) => ({...prevState, email: trimmedValue}));
    };

    const passwordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const trimmedValue = trimText(event.target.value, true).toString();
        setUserLoginData((prevState) => ({...prevState, password: trimmedValue}));
    };

    return (
        <div
            className="min-h-screen w-full bg-gradient-student flex
            items-center justify-center p-4"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full
                mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full
                mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80
                bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
            </div>

            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8}}
                className="relative z-10 w-full max-w-md"
            >
                {/* Logo and Header */}
                <motion.div
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.2, duration: 0.6}}
                    className="text-center mb-8"
                >
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-40">
                            <Image
                                src={"/images/ent-insight-txt-logo.png"}
                                alt="Logo"
                                className="w-full cursor-pointer"
                                width={1000}
                                height={1000}
                                onClick={() => router.push("/")}
                            />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">ENT Insight Academic</h1>
                    <p className="text-slate-300 text-sm">AI-Powered Medical Education Platform</p>
                </motion.div>

                {/* Login Form */}
                <motion.div
                    initial={{opacity: 0, scale: 0.95}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{delay: 0.4, duration: 0.6}}
                    className="glass-card rounded-2xl p-8 py-4"
                >
                    <If condition={!!errors}>
                        <div
                            className="bg-red-900/30 text-red-200 p-4 rounded-xl border border-red-500/50 mb-6"
                        >
                            {errors}
                        </div>
                    </If>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <TextInput
                                type="email"
                                name="email"
                                label="Email Address"
                                placeholder="john.doe@university.edu"
                                value={userLoginData.email}
                                onTextChange={emailChange}
                                errorMessage={emailErrMsg}
                                disabled={isLoading}
                                inputClassName="px-4 py-3 bg-slate-800/50 border rounded-xl text-white
                                    placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent
                                    transition-all duration-200"
                                labelClassName="block text-sm font-medium text-slate-200 mb-2"
                                design="regular-form"
                            />
                        </div>

                        <div>
                            <PasswordInput
                                name="password"
                                label="Password"
                                placeholder="Enter your password"
                                password={userLoginData.password}
                                onPasswordChange={passwordChange}
                                errorMessage={passwordErrMsg}
                                disabled={isLoading}
                                inputClassName="px-4 py-3 bg-slate-800/50 border rounded-xl text-white
                                    placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent
                                    transition-all duration-200"
                                labelClassName="block text-sm font-medium text-slate-200 mb-2"
                                design="regular-form"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={userLoginData.remember}
                                    onChange={(e) => setUserLoginData(prev => ({...prev, remember: e.target.checked}))}
                                    className="w-4 h-4 text-blue-600 bg-slate-800 border-slate-600 rounded
                                focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-slate-300">Remember me</span>
                            </label>
                            <a href="/forgot-password"
                               className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                                Forgot password?
                            </a>
                        </div>

                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={{scale: 1.02}}
                            whileTap={{scale: 0.98}}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4
                            rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none
                            focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900
                            transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex
                            items-center justify-center"
                        >
                            {isLoading ? (
                                <div className="flex items-center">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full
                                        animate-spin mr-2"></div>
                                    Signing in...
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <Sparkles className="w-5 h-5 mr-2"/>
                                    Sign In
                                </div>
                            )}
                        </motion.button>
                    </form>

                    {/* Social Login Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-1 border-t border-slate-600"></div>
                        <span className="px-4 text-sm text-slate-400">Or continue with</span>
                        <div className="flex-1 border-t border-slate-600"></div>
                    </div>

                    {/* Social Login Icons */}
                    <div className="flex items-center justify-center space-x-4">
                        <Tippy content="Sign in with Google" placement="bottom" animation="shift-away"
                               theme="light-border">
                            <motion.button
                                type="button"
                                whileHover={{scale: 1.1}}
                                whileTap={{scale: 0.95}}
                                className="w-12 h-12 flex items-center justify-center bg-white text-gray-900
                                rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500
                                focus:ring-offset-2 transition-all duration-200 shadow-md"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                            </motion.button>
                        </Tippy>

                        <Tippy content="Sign in with Microsoft" placement="bottom" animation="shift-away"
                               theme="light-border">
                            <motion.button
                                type="button"
                                whileHover={{scale: 1.1}}
                                whileTap={{scale: 0.95}}
                                className="w-12 h-12 flex items-center justify-center bg-[#0078d4] text-white
                                rounded-full hover:bg-[#106ebe] focus:outline-none focus:ring-2 focus:ring-blue-500
                                focus:ring-offset-2 transition-all duration-200 shadow-md"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path
                                        d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"/>
                                </svg>
                            </motion.button>
                        </Tippy>

                        <Tippy content="Sign in with Apple" placement="bottom" animation="shift-away"
                               theme="light-border">
                            <motion.button
                                type="button"
                                whileHover={{scale: 1.1}}
                                whileTap={{scale: 0.95}}
                                className="w-12 h-12 flex items-center justify-center bg-black text-white rounded-full
                                hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500
                                focus:ring-offset-2 transition-all duration-200 shadow-md"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path
                                        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
                                </svg>
                            </motion.button>
                        </Tippy>

                        <Tippy content="Sign in with LinkedIn" placement="bottom" animation="shift-away"
                               theme="light-border">
                            <motion.button
                                type="button"
                                whileHover={{scale: 1.1}}
                                whileTap={{scale: 0.95}}
                                className="w-12 h-12 flex items-center justify-center bg-[#0077b5] text-white
                                rounded-full hover:bg-[#005885] focus:outline-none focus:ring-2 focus:ring-blue-500
                                focus:ring-offset-2 transition-all duration-200 shadow-md"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path
                                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </motion.button>
                        </Tippy>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-slate-400 text-sm">
                            Don't have an account?{" "}
                            <Link
                                href="/students/signup"
                                className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                Sign up for free
                            </Link>
                        </p>
                    </div>
                </motion.div>

                {/* Features Preview */}
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.6, duration: 0.6}}
                    className="mt-6 text-center"
                >
                    <p className="text-slate-400 text-sm mb-4">Trusted by medical students worldwide</p>
                    <div className="flex justify-center space-x-6 text-slate-500">
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            <span className="text-xs">AI-Powered</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            <span className="text-xs">Evidence-Based</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                            <span className="text-xs">Interactive</span>
                        </div>
                    </div>
                </motion.div>

                {/* Security Notice */}
                <motion.div
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.8, duration: 0.6}}
                    className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl"
                >
                    <div className="flex items-start space-x-3">
                        <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5"/>
                        <div>
                            <h6 className="text-xs font-medium text-blue-300 mb-1">Secure Authentication</h6>
                            <small className="text-blue-200/80">
                                Your data is protected with enterprise-grade security. We never store your social
                                login credentials.
                            </small>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
