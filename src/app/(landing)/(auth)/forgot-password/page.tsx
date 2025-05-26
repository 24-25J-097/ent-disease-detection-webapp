"use client";

import React, {useState} from 'react';
import Link from "next/link";
import {NextPage} from "next";
import {FaCircleExclamation} from "react-icons/fa6";
import TextInput from "@/components/inputs/TextInput";
import debugLog from "@/utils/debug-console";
import {ForgotPswData} from "@/types/service/Auth";
import {useAuthService} from "@/hooks/services/useAuthService";
import {trimText} from "@/utils/string-formatters";
import {If} from "@/components/utils/If";
import {useToast} from "@/providers/ToastProvider";
import {useRouter} from "next/navigation";
import {AxiosError} from 'axios';
import {ErrorResponseData} from '@/types/Common';

const ForgotPasswordPage: NextPage = () => {

    const router = useRouter();

    const initForgotPswData: ForgotPswData = {
        email: "",
    };

    const [forgotPswData, setForgotPswData] = useState<ForgotPswData>(initForgotPswData);
    const [hasValidationErr, setHasValidationErr] = useState<boolean[]>([]);
    const [emailErrMsg, setEmailErrMsg] = useState<string>('');
    const [errors, setErrors] = useState<any>(null);
    const [status, setStatus] = useState<any>(null);
    const [isDisable, setIsDisable] = useState<boolean>(false);

    const { forgotPassword } = useAuthService({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    });

    const { notifySuccess, notifyError } = useToast();

    const validateData = (data: any): boolean[] => {
        setHasValidationErr([]);
        if (data.hasOwnProperty('email') && data.email == "") {
            const errorText = 'Please enter the email.';
            debugLog('Please enter email.');
            setEmailErrMsg(errorText);
            setTimeout(() => setEmailErrMsg(''), 3000);
            hasValidationErr.push(true);

        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            const errorText = 'Please enter valid email.';
            debugLog('Please enter valid email.');
            setEmailErrMsg(errorText);
            setTimeout(() => setEmailErrMsg(''), 3000);
            hasValidationErr.push(true);
        }
        debugLog("validateData =>", data);
        return hasValidationErr;
    }

    const handleForgotPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors(null);
        setStatus(null);

        try {
            if (!validateData(forgotPswData).includes(true)) {
                setIsDisable(true);
                const res = await forgotPassword({forgotPswData});
                setStatus(res!.message);
                notifySuccess(res!.message);
                setTimeout(() => router.push(`/password-reset?email=${forgotPswData.email}`), 3000);
            } else {
                setIsDisable(false);
                console.error('FORGOT PASSWORD FAILED: Please enter valid data :)');
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
        }
    };

    const emailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const trimmedValue = trimText(event.target.value, true).toString();
        setForgotPswData((prevState) => ({ ...prevState, email: trimmedValue }));
    };

    return (
        <section className="bg-blue-100 min-h-screen flex items-center justify-center w-full">
            <div
                className={`bg-gray-100 bg-gradient-to-r from-gray-100 via-gray-100 to-blue-200 flex rounded-2xl
                shadow-lg max-w-5xl items-center ${isDisable && "pointer-events-none"}`}
            >
                <div className="md:w-1/2 px-4 md:pr-10 md:pl-4 m-5">
                    <div className="flex items-center">
                        <h2 className="font-bold text-3xl md:text-4xl text-blue-600 mr-3">
                            <FaCircleExclamation />
                        </h2>
                        <h2 className="font-bold text-2xl md:text-3xl text-blue-600">
                            Forgot Password
                        </h2>
                    </div>
                    <p className="text-sm mt-4 text-[#002D74]">
                        Enter your email address to get instructions to reset your password
                    </p>

                    <If condition={!!errors}>
                        <div
                            className="bg-red-100 text-red-700 p-4 rounded-2xl border-l-8 border-r-8 border-x-red-200 mt-4">
                            {errors}
                        </div>
                    </If>

                    <If condition={!!status}>
                        <div
                            className="bg-emerald-200 text-emerald-900 p-4 rounded-2xl border-l-8 border-r-8 border-x-emerald-300 mt-4">
                            {status}
                        </div>
                    </If>

                    <form className="flex flex-col gap-4 mt-8" onSubmit={handleForgotPassword}>
                        <TextInput
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={forgotPswData.email}
                            onTextChange={emailChange}
                            errorMessage={emailErrMsg}
                            disabled={isDisable}
                        />
                        <button
                            className={`bg-blue-900 rounded-xl text-white py-3 hover:scale-105 duration-300 shadow-2xl 
                            ${isDisable && "pointer-events-none"}`}
                            disabled={isDisable}
                        >
                            Submit
                        </button>
                    </form>

                    <div className="border-t border-gray-400 dark:border-white mt-20">
                        <div className="mt-3 text-sm flex justify-between items-center text-gray-700">
                            <p>Don&apos;t have an account?</p>
                            <Link href={"/signup"}>
                                <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300
                            shadow-md">
                                    Register
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex w-1/2 items-center justify-center">
                    <div
                        className="w-[800px] h-[600px] mr-5 flex flex-col items-center justify-center text-center"
                    >
                        <h2 className="font-bold text-2xl md:text-4xl text-blue-600">Welcome Again!</h2>
                        <p className="text-base mx-10 mt-8 text-gray-500">
                            Log in now to access advanced tools tailored for medical analysis!
                        </p>
                        <Link href={"/login"}>
                            <button className="py-3 px-8 bg-white border-none shadow-lg rounded-xl hover:scale-110
                            mt-8 duration-300 text-gray-700">
                                Login
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ForgotPasswordPage;
