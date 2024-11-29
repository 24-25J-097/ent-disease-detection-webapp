"use client";

import React, {useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import Link from "next/link";
import {NextPage} from "next";
import {FaArrowsRotate, FaTriangleExclamation} from "react-icons/fa6";
import TextInput from "@/components/inputs/TextInput";
import debugLog from "@/utils/debug-console";
import {ResetPswData} from "@/types/service/Auth";
import {useAuthService} from "@/hooks/services/useAuthService";
import {trimText} from "@/utils/string-formatters";
import {If} from "@/components/utils/If";
import {useToast} from "@/providers/ToastProvider";
import PasswordInput from "@/components/inputs/PasswordInput";
import {useParams, useRouter, useSearchParams} from "next/navigation";

const PasswordResetTokenPage: NextPage = () => {

    const initResetPswData: ResetPswData = {
        email: "",
        token: "",
        otp: "",
        password: "",
        passwordConfirmation: "",
    };

    const searchParams = useSearchParams();
    const params = useParams();
    const router = useRouter();
    const { notifySuccess, notifyError } = useToast();

    const [resetPswData, setResetPswData] = useState<ResetPswData>(initResetPswData);
    const [hasValidationErr, setHasValidationErr] = useState<boolean[]>([]);
    const [otpErrMsg, setOtpErrMsg] = useState<string>('');
    const [hiddenFieldErrMsg, setHiddenFieldErrMsg] = useState<string>('');
    const [passwordErrMsg, setPasswordErrMsg] = useState<string>('');
    const [confirmPasswordErrMsg, setConfirmPasswordErrMsg] = useState<string>('');
    const [errors, setErrors] = useState<any>(null);
    const [status, setStatus] = useState<any>(null);
    const [isDisable, setIsDisable] = useState<boolean>(false);

    const { resetPassword } = useAuthService({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    });

    useEffect(() => {
        const email = searchParams.get('email') || "";
        const token = (params.token || "").toString();
        setResetPswData(prevData => ({
            ...prevData,
            email: trimText(email, true).toString(),
            token: trimText(token, true).toString()
        }));
    }, [params.token, searchParams]);

    const validateData = (data: any): boolean[] => {
        setHasValidationErr([]);
        if (data.hasOwnProperty('token') && data.token == "") {
            if (data.hasOwnProperty('otp') && data.otp == "") {
                const errorText = 'Please enter received code.';
                debugLog('Please enter received code.');
                setOtpErrMsg(errorText);
                setTimeout(() => setOtpErrMsg(''), 3000);
                hasValidationErr.push(true);
            }
        }
        if (data.hasOwnProperty('email') && data.email == "") {
            const errorText = 'Email is not found, please open reset URL again.';
            debugLog('Email is not found, please open reset URL again.');
            setHiddenFieldErrMsg(errorText);
            setTimeout(() => setHiddenFieldErrMsg(''), 5000);
            hasValidationErr.push(true);

        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            const errorText = 'Email is not valid, please open reset URL again.';
            debugLog('Email is not valid, please open reset URL again.');
            setHiddenFieldErrMsg(errorText);
            setTimeout(() => setHiddenFieldErrMsg(''), 5000);
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

        } else if (data.hasOwnProperty('passwordConfirmation') && data.passwordConfirmation == "") {
            const errorText = 'Please enter the password confirmation.';
            debugLog('Please enter the password confirmation.');
            setConfirmPasswordErrMsg(errorText);
            setTimeout(() => setConfirmPasswordErrMsg(''), 3000);
            hasValidationErr.push(true);

        } else if (data.password && data.password != data.passwordConfirmation) {
            const errorText = 'Password and Confirm Password is not match.';
            debugLog('Password and Confirm Password is not match.');
            setConfirmPasswordErrMsg(errorText);
            setTimeout(() => setConfirmPasswordErrMsg(''), 3000);
            hasValidationErr.push(true);
        }
        debugLog("validateData =>", data);
        return hasValidationErr;
    }

    const handleResetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors(null);
        setStatus(null);

        try {
            if (!validateData(resetPswData).includes(true)) {
                setIsDisable(true);
                const res = await resetPassword({ resetPswData });
                setStatus(res.message);
                notifySuccess(res.message);
                setTimeout(() => router.push(`/login`), 1000);
            } else {
                setIsDisable(false);
                console.error('RESET PASSWORD FAILED: Please enter valid data :)');
            }
        } catch (error) {
            setIsDisable(false);
            if (error.response?.status >= 500) {
                setErrors("An unexpected error occurred. Please try again.");
            } else {
                setErrors(error.response?.data.message);
                notifyError(error.response?.data.message);
            }
        }
    };

    const otpChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const trimmedValue = trimText(event.target.value, true).toString();
        setResetPswData((prevState) => ({ ...prevState, otp: trimmedValue }));
    };

    const passwordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const trimmedValue = trimText(event.target.value, true).toString();
        setResetPswData((prevState) => ({ ...prevState, password: trimmedValue }));
    };

    const confirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const trimmedValue = trimText(event.target.value, true).toString();
        setResetPswData((prevState) => ({ ...prevState, passwordConfirmation: trimmedValue }));
    };

    return (
        <section className="bg-blue-100 min-h-screen flex items-center justify-center w-full">
            <motion.div
                className={`bg-gray-100 bg-gradient-to-r from-gray-100 via-gray-100 to-blue-200 flex rounded-2xl
                shadow-lg max-w-5xl items-center ${isDisable && "pointer-events-none"}`}
                initial={{opacity: 0, y: 50}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
            >
                <div className="md:w-1/2 px-4 md:pr-10 md:pl-4 m-5">
                    <div className="flex items-center">
                        <h2 className="font-bold text-3xl md:text-4xl text-blue-600 mr-3">
                            <FaArrowsRotate />
                        </h2>
                        <h2 className="font-bold text-2xl md:text-3xl text-blue-600">
                            Reset Password
                        </h2>
                    </div>
                    <p className="text-sm mt-4 text-[#002D74]">
                        Enter your new password to reset it
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

                    <form className="flex flex-col gap-4 mt-8" onSubmit={handleResetPassword}>
                        <If condition={!!hiddenFieldErrMsg}>
                            <small className="flex flex-row text-red-500 items-center">
                                <FaTriangleExclamation/>
                                <span className="px-2">{hiddenFieldErrMsg}</span>
                            </small>
                        </If>
                        <If condition={!resetPswData.token || resetPswData.token == ""}>
                            <TextInput
                                type="number"
                                name="otp"
                                placeholder="Received code"
                                value={resetPswData.otp}
                                onTextChange={otpChange}
                                errorMessage={otpErrMsg}
                                disabled={isDisable}
                            />
                        </If>
                        <PasswordInput
                            name="password"
                            placeholder="New Password"
                            password={resetPswData.password}
                            onPasswordChange={passwordChange}
                            errorMessage={passwordErrMsg}
                            disabled={isDisable}
                        />
                        <PasswordInput
                            name="password"
                            placeholder="Confirm New Password"
                            password={resetPswData.passwordConfirmation}
                            onPasswordChange={confirmPasswordChange}
                            errorMessage={confirmPasswordErrMsg}
                            disabled={isDisable}
                        />
                        <button
                            className={`bg-blue-900 rounded-xl text-white py-3 hover:scale-105 duration-300 shadow-2xl 
                            ${isDisable && "pointer-events-none"}`}
                            disabled={isDisable}
                        >
                            Reset
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
                    <motion.div
                        className="w-[800px] h-[600px] mr-5 flex flex-col
                        items-center justify-center text-center"
                        initial={{opacity: 0, scale: 0.8}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{duration: 0.5}}
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
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default PasswordResetTokenPage;
