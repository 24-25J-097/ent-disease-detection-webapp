import React from 'react';
import {If} from "@/components/utils/If";
import {TextInputProps} from "@/types/FormInputs";

const TextInput: React.FC<TextInputProps> = ({
                                                 type,
                                                 name,
                                                 placeholder,
                                                 value,
                                                 onTextChange,
                                                 errorMessage,
                                                 disabled,
                                                 design = "default",
                                                 label,
                                                 inputClassName,
                                             }) => {

    switch (design) {
        case "regular-form":
            const id = name + Math.floor(Math.random() * 10);
            return (
                <div>
                    <If condition={!!label}>
                        <label htmlFor={id} className="inline-block mb-2">
                            {label}
                        </label>
                    </If>
                    <input
                        id={id}
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        value={value}
                        onChange={onTextChange}
                        disabled={disabled}
                        className={`w-full text-sm shadow-sm rounded-md placeholder:text-slate-400/90
                        transition duration-200 ease-in-out focus:ring-4 focus:ring-primary focus:ring-opacity-20
                        focus:border-primary dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700
                        dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ${inputClassName}
                        ${!!errorMessage ? "border border-red-500" : "border border-slate-200"}`}
                    />
                    <If condition={!!errorMessage}>
                        <small className="text-red-500 px-2">{errorMessage}</small>
                    </If>
                </div>
            );
        default:
            return (
                <div className="flex flex-col">
                    <input
                        id={name + Math.floor(Math.random() * 10)}
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        value={value}
                        onChange={onTextChange}
                        disabled={disabled}
                        className={`py-3 px-4 rounded-xl shadow-sm ${!!errorMessage ? "border border-red-500" : "border-none"}`}
                    />
                    <If condition={!!errorMessage}>
                        <small className="text-red-500 px-4">{errorMessage}</small>
                    </If>
                </div>
            );
    }

};

export default TextInput;
