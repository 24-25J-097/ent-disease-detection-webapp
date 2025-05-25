"use client";

import React, {useState} from 'react';
import {NextPage} from "next";
import Link from "next/link";
import GoogleIcon from "@/components/icons/GoogleIcon";
import {UserSignUpData} from "@/types/service/Auth";
import {useAuthService} from "@/hooks/services/useAuthService";
import debugLog from "@/utils/debug-console";
import {If} from "@/components/utils/If";
import {trimText} from "@/utils/string-formatters";
import PasswordInput from "@/components/inputs/PasswordInput";
import TextInput from "@/components/inputs/TextInput";
import {useToast} from "@/providers/ToastProvider";
import {Role} from '@/enums/access';
import Image from 'next/image';
import useRouterApp from '@/hooks/useRouterApp';
import {AxiosError} from 'axios';
import {ErrorResponseData} from '@/types/Common';

const SignUpPage: NextPage = () => {

    const initUserSignUpData: UserSignUpData = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: '',
        remember: false
    };

    const [userSignUpData, setUserSignUpData] = useState<UserSignUpData>(initUserSignUpData);
    const [hasValidationErr, setHasValidationErr] = useState<boolean[]>([]);
    const [nameErrMsg, setNameErrMsg] = useState<string>('');
    const [emailErrMsg, setEmailErrMsg] = useState<string>('');
    const [passwordErrMsg, setPasswordErrMsg] = useState<string>('');
    const [confirmPasswordErrMsg, setConfirmPasswordErrMsg] = useState<string>('');
    const [roleErrMsg, setRoleErrMsg] = useState<string>('');
    const [errors, setErrors] = useState<any>(null);
    const [isDisable, setIsDisable] = useState<boolean>(false);

    const {register} = useAuthService({
        middleware: 'guest',
        redirectIfAuthenticated: '/',
    });

    const router = useRouterApp();
    const {notifySuccess, notifyError} = useToast();

    const validateData = (data: any): boolean[] => {
        setHasValidationErr([]);
        if (data.hasOwnProperty('name') && data.name == "") {
            const errorText = 'Please enter your name.';
            debugLog('Please enter your name.');
            setNameErrMsg(errorText);
            setTimeout(() => setNameErrMsg(''), 3000);
            hasValidationErr.push(true);
        }
        if (data.hasOwnProperty('email') && data.email == "") {
            const errorText = 'Please enter your email.';
            debugLog('Please enter your email.');
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

        } else if (data.hasOwnProperty('confirmPassword') && data.confirmPassword == "") {
            const errorText = 'Please enter the password confirmation.';
            debugLog('Please enter the password confirmation.');
            setConfirmPasswordErrMsg(errorText);
            setTimeout(() => setConfirmPasswordErrMsg(''), 3000);
            hasValidationErr.push(true);

        } else if (data.password && data.password != data.confirmPassword) {
            const errorText = 'Password and Confirm Password is not match.';
            debugLog('Password and Confirm Password is not match.');
            setConfirmPasswordErrMsg(errorText);
            setTimeout(() => setConfirmPasswordErrMsg(''), 3000);
            hasValidationErr.push(true);
        }
        if (data.hasOwnProperty("role") && data.role === "") {
            const errorText = "Please select a role.";
            debugLog("Please select a role.");
            setRoleErrMsg(errorText);
            setTimeout(() => setRoleErrMsg(""), 3000);
            hasValidationErr.push(true);
        }
        debugLog("validateData =>", data);
        return hasValidationErr;
    };

    const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors(null);

        try {
            if (!validateData(userSignUpData).includes(true)) {
                setIsDisable(true);
                const res = await register({userSignUpData});
                notifySuccess(res!.message);
            } else {
                setIsDisable(false);
                console.error('SIGN UP FAILED: Please enter valid data :)');
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

    const nameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const trimmedValue = trimText(event.target.value, true).toString();
        setUserSignUpData((prevState) => ({...prevState, name: trimmedValue}));
    };

    const emailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const trimmedValue = trimText(event.target.value, true).toString();
        setUserSignUpData((prevState) => ({...prevState, email: trimmedValue}));
    };

    const passwordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const trimmedValue = trimText(event.target.value, true).toString();
        setUserSignUpData((prevState) => ({...prevState, password: trimmedValue}));
    };

    const confirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const trimmedValue = trimText(event.target.value, true).toString();
        setUserSignUpData((prevState) => ({...prevState, confirmPassword: trimmedValue}));
    };

    const roleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setUserSignUpData((prevState) => ({...prevState, role: event.target.value}));
    };

    return (
        <section className="bg-blue-50 min-h-screen flex items-center justify-center w-full">
            <div
                className={`bg-gray-100 bg-gradient-to-r from-gray-100 via-gray-100 to-blue-200 flex rounded-2xl
                shadow-lg max-w-5xl items-center ${isDisable && "pointer-events-none"}`}
            >
                <div className="md:w-1/2 px-4 md:pr-10 md:pl-4 mx-5 my-10">
                    <h2 className="font-bold text-2xl md:text-3xl text-blue-600">Sign Up</h2>
                    <p className="text-sm mt-4 text-[#002D74]">If you’re not registered yet, sign up effortlessly.</p>

                    <If condition={!!errors}>
                        <div
                            className="bg-red-100 text-red-700 p-4 rounded-2xl border-l-8 border-r-8 border-x-red-200 mt-4">
                            {errors}
                        </div>
                    </If>

                    <form className="flex flex-col gap-4 mt-6" onSubmit={handleSignUp}>
                        <TextInput
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={userSignUpData.name}
                            onTextChange={nameChange}
                            errorMessage={nameErrMsg}
                            disabled={isDisable}
                        />
                        <TextInput
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={userSignUpData.email}
                            onTextChange={emailChange}
                            errorMessage={emailErrMsg}
                            disabled={isDisable}
                        />
                        <PasswordInput
                            name="password"
                            placeholder="Password"
                            password={userSignUpData.password}
                            onPasswordChange={passwordChange}
                            errorMessage={passwordErrMsg}
                            disabled={isDisable}
                        />
                        <PasswordInput
                            name="password"
                            placeholder="Confirm Password"
                            password={userSignUpData.confirmPassword}
                            onPasswordChange={confirmPasswordChange}
                            errorMessage={confirmPasswordErrMsg}
                            disabled={isDisable}
                        />
                        <div>
                            <select
                                name="role"
                                value={userSignUpData.role}
                                onChange={roleChange}
                                className={`w-full text-sm shadow-sm py-3 px-4 rounded-xl placeholder:text-slate-400/90
                            transition duration-200 ease-in-out focus:ring-4 focus:ring-primary focus:ring-opacity-20
                            focus:border-primary 
                            ${!!roleErrMsg ? "border border-red-500" : "border border-slate-200"}`}
                                disabled={isDisable}
                            >
                                <option value="" disabled>
                                    Select Role
                                </option>
                                {Object.values(Role).filter(
                                    (role) => ![Role.ADMIN, Role.STUDENT].includes(role)
                                ).map((role) => (
                                    <option key={role} value={role}>
                                        {role.charAt(0).toUpperCase() + role.slice(1)}
                                    </option>
                                ))}
                            </select>
                            <If condition={!!roleErrMsg}>
                                <small className="text-red-500 px-2">{roleErrMsg}</small>
                            </If>
                        </div>
                        <div className="flex items-center mt-2">
                            <input
                                type="checkbox"
                                name="remember"
                                id="remember"
                                checked={userSignUpData.remember}
                                onChange={(event) =>
                                    setUserSignUpData((prevState) => ({...prevState, remember: event.target.checked}))
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
                            Sign Up
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
                        Sign Up with Google
                    </button>

                    <div className="md:hidden mt-6 border-t">
                        <div className="mt-3 text-sm flex justify-between items-center text-gray-700">
                            <p>Already have an account?</p>
                            <Link href={"/login"}>
                                <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300
                            shadow-md">
                                    Login
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

export default SignUpPage;
