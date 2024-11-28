import React, {useState} from 'react';
import {If} from "@/components/utils/If";
import {Eye, EyeOff} from "lucide-react";
import {PasswordInputProps} from "@/types/FormInputs";

const PasswordInput: React.FC<PasswordInputProps> = ({
                                                         name,
                                                         placeholder,
                                                         password,
                                                         onPasswordChange,
                                                         errorMessage,
                                                         disabled,
                                                         label,
                                                         design = "default",
                                                     }) => {

    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    const getInput = () => {
        switch (design) {
            case "regular-form":
                const id = name + Math.floor(Math.random() * 10);
                return (
                    <>
                        <div className="relative">
                            <label htmlFor={id} className="inline-block mb-2">
                                {label}
                            </label>
                            <input
                                id={id}
                                type={passwordVisible ? 'text' : 'password'}
                                name={name}
                                placeholder={placeholder}
                                value={password}
                                onChange={onPasswordChange}
                                disabled={disabled}
                                className={`w-full text-sm shadow-sm rounded-md placeholder:text-slate-400/90
                        transition duration-200 ease-in-out focus:ring-4 focus:ring-primary focus:ring-opacity-20
                        focus:border-primary dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700
                        dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 
                        ${!!errorMessage ? "border border-red-500" : "border border-slate-200"}`}
                            />
                            {passwordVisible ? (
                                <EyeOff
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                    className="absolute top-[48px] right-3 -translate-y-1/2 cursor-pointer text-gray-400"
                                />
                            ) : (
                                <Eye
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                    className="absolute top-[48px] right-3 -translate-y-1/2 cursor-pointer text-gray-400"
                                />
                            )}
                        </div>
                        <If condition={!!errorMessage}>
                            <small className="text-red-500 px-2">{errorMessage}</small>
                        </If>
                    </>
                );
            default:
                return (
                    <>
                        <div className="relative">
                            <input
                                id={name + Math.floor(Math.random() * 10)}
                                className={`py-3 px-4 rounded-xl w-full shadow-sm ${!!errorMessage ? "border border-red-500" : "border-none"}`}
                                type={passwordVisible ? 'text' : 'password'}
                                name={name}
                                placeholder={placeholder}
                                value={password}
                                onChange={onPasswordChange}
                                disabled={disabled}
                            />
                            {passwordVisible ? (
                                <EyeOff
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                    className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-400"
                                />
                            ) : (
                                <Eye
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                    className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-400"
                                />
                            )}
                        </div>
                        <If condition={!!errorMessage}>
                            <small className="text-red-500 px-2">{errorMessage}</small>
                        </If>
                    </>
                );
        }
    };

    return (
        <div className="flex flex-col">
            <div className="relative">
                {getInput()}
            </div>
        </div>
    );
};

export default PasswordInput;
