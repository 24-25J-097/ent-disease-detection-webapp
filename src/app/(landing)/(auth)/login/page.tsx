"use client";

import {NextPage} from "next";
import React, {useState} from "react";
import Link from "next/link";
import GoogleIcon from "@/components/icons/GoogleIcon";
import {useAuthService} from "@/hooks/services/useAuthService";
import debugLog from "@/utils/debug-console";
import {UserLoginData} from "@/types/service/Auth";
import {If} from "@/components/utils/If";
import {trimText} from "@/utils/string-formatters";
import TextInput from "@/components/inputs/TextInput";
import PasswordInput from "@/components/inputs/PasswordInput";
import {useToast} from "@/providers/ToastProvider";
import {SignedUpAs, Source} from '@/enums/general';
import Image from 'next/image';
import useRouterApp from '@/hooks/useRouterApp';
import {AxiosError} from 'axios';
import {ErrorResponseData} from '@/types/Common';

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
    const [isDisable, setIsDisable] = useState<boolean>(false);

    const {login} = useAuthService({
        middleware: 'guest',
        redirectIfAuthenticated: '/',
    });

    const router = useRouterApp();
    const {notifySuccess, notifyError} = useToast();

    const validateData = (data: any): boolean[] => {
        setHasValidationErr([]);
        if (data.hasOwnProperty('email') && data.email == "") {
            const errorText = 'Please enter your official email.';
            debugLog('Please enter your official email.');
            setEmailErrMsg(errorText);
            setTimeout(() => setEmailErrMsg(''), 3000);
            hasValidationErr.push(true);

        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            const errorText = 'Please enter a valid email.';
            debugLog('Please enter a valid email.');
            setEmailErrMsg(errorText);
            setTimeout(() => setEmailErrMsg(''), 3000);
            hasValidationErr.push(true);
        }
        if (data.hasOwnProperty('password') && data.password == "") {
            const errorText = 'Please enter the password.';
            debugLog('Please enter the password.');
            setPasswordErrMsg(errorText);
            setTimeout(() => setPasswordErrMsg(''), 3000);
            hasValidationErr.push(true);

        } else if (data.password && data.password.toString().length < 8) {
            const errorText = 'Password must be at least 8 characters long.';
            debugLog('Password must be at least 8 characters long.');
            setPasswordErrMsg(errorText);
            setTimeout(() => setPasswordErrMsg(''), 3000);
            hasValidationErr.push(true);
        }
        debugLog("validateData =>", data);
        return hasValidationErr;
    };

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors(null);

        try {
            if (!validateData(userLoginData).includes(true)) {
                setIsDisable(true);
                const res = await login({userLoginData});
                notifySuccess(res!.message);
            } else {
                setIsDisable(false);
                console.error('LOGIN FAILED: Please enter valid data :)');
            }
        } catch (error) {
            setIsDisable(false);
            const axiosError = error as AxiosError<ErrorResponseData>;
            const errMsg = axiosError?.response?.data?.message || axiosError?.response?.data?.error || "An error occurred.";
            if (axiosError?.response?.status && axiosError.response.status >= 500) {
                setErrors("An unexpected error occurred. Please try again.");
            } else {
                setErrors(errMsg);
                notifyError(errMsg);
            }
            if (errMsg === "Student logins are not allowed through this form.") {
                setTimeout(() => router.push(`/students/login`), 1500);
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
        <section className="bg-blue-50 min-h-screen flex items-center justify-center w-full">
            <div
                className={`bg-gradient-to-r from-blue-50/80 via-gray-100 to-blue-200 flex rounded-2xl
                shadow-lg max-w-5xl items-center ${isDisable && "pointer-events-none"}`}
            >
                <div className="md:w-1/2 px-4 md:pr-10 md:pl-4 mx-5 my-10">
                    <h2 className="font-bold text-2xl md:text-3xl text-blue-700 text-center">
                        Healthcare Professional Login
                    </h2>
                    <p className="text-sm mt-4 text-[#002D74]">
                        Access our advanced clinical decision support system with your healthcare credentials.
                    </p>

                    <If condition={!!errors}>
                        <div
                            className="bg-red-100 text-red-700 p-4 rounded-2xl border-l-8 border-r-8
                            border-x-red-200 mt-4"
                        >
                            {errors}
                        </div>
                    </If>

                    <form className="flex flex-col gap-4 mt-6" onSubmit={handleLogin}>
                        <TextInput
                            type="email"
                            name="email"
                            placeholder="Official Email"
                            value={userLoginData.email}
                            onTextChange={emailChange}
                            errorMessage={emailErrMsg}
                            disabled={isDisable}
                        />
                        <PasswordInput
                            name="password"
                            placeholder="Secure Password"
                            password={userLoginData.password}
                            onPasswordChange={passwordChange}
                            errorMessage={passwordErrMsg}
                            disabled={isDisable}
                        />
                        <div className="flex items-center mt-2">
                            <input
                                type="checkbox"
                                name="remember"
                                id="remember"
                                checked={userLoginData.remember}
                                onChange={(event) =>
                                    setUserLoginData((prevState) => ({...prevState, remember: event.target.checked}))
                                }
                                disabled={isDisable}
                                className={`h-4 w-4 shadow-sm rounded-md transition duration-200 ease-in-out
                                focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary`}
                            />
                            <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                                Remember Me
                            </label>
                        </div>
                        <button
                            className={`bg-blue-900 rounded-xl text-white py-3 hover:scale-105 duration-300 shadow-2xl 
                            ${isDisable && "pointer-events-none"}`}
                            disabled={isDisable}
                        >
                            Login to Platform
                        </button>
                    </form>

                    <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
                        <hr className="border-gray-400 dark:border-white"/>
                        <p className="text-center text-sm">OR</p>
                        <hr className="border-gray-400 dark:border-white"/>
                    </div>

                    <button
                        className="bg-white border py-3 w-full rounded-xl mt-5 flex justify-center items-center
                        text-sm hover:scale-105 duration-300 text-gray-700 shadow-md"
                    >
                        <GoogleIcon/>
                        Sign In with Google
                    </button>

                    <div className="mt-5 text-xs md:text-sm border-b md:border-none border-gray-400 dark:border-white
                    py-4 text-gray-700 text-center underline hover:scale-110 hover:font-bold duration-300">
                        <Link href={"/forgot-password"}>Forgot your password?</Link>
                    </div>

                    <div className="md:hidden mt-6 border-t">
                        <div className="mt-3 text-sm flex justify-between items-center text-gray-700">
                            <p>Don&apos;t have an account?</p>
                            <Link href={"/signup"}>
                                <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300
                                shadow-md">
                                    Register Institution
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex w-1/2 items-center justify-center">
                    <div
                        className="w-[800px] h-[600px] mr-5 flex flex-col items-center justify-center text-center"
                    >
                        <div className="w-60">
                            <Image
                                src={"/images/ent-insight-txt-logo.png"}
                                alt="Logo"
                                className="w-full cursor-pointer"
                                width={1000}
                                height={1000}
                                onClick={() => router.push("/")}
                            />
                        </div>
                        <h2 className="font-bold text-2xl md:text-4xl text-blue-600">Clinical Decision Support</h2>
                        <p className="text-base mx-10 mt-8 text-gray-600">
                            Access advanced diagnostic tools and clinical decision support for healthcare professionals.
                        </p>
                        <Link href={"/signup"}>
                            <button className="py-3 px-8 bg-white border-none shadow-lg rounded-xl hover:scale-110
                            mt-8 duration-300 text-gray-700">
                                Register Institution
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;
