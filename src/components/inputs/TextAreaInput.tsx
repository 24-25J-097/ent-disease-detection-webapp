import React from 'react';
import {If} from "@/components/utils/If";
import {TextAreaInputProps} from "@/types/FormInputs";

const TextAreaInput: React.FC<TextAreaInputProps> = ({
                                                         id,
                                                         name,
                                                         placeholder,
                                                         value,
                                                         onTextChange,
                                                         errorMessage,
                                                         disabled,
                                                         label,
                                                     }) => {

    return (
        <div>
            <If condition={!!label}>
                <label htmlFor={id} className="block mb-2 font-medium">
                    {label}
                </label>
            </If>
            <textarea
                id={id}
                value={value}
                name={name}
                onChange={onTextChange}
                placeholder={placeholder}
                disabled={disabled}
                className={`disabled:bg-slate-100 disabled:cursor-not-allowed
                    dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100
                    [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50
                    [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm
                    shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4
                    focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40
                    dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700
                    dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 group-[.form-inline]:flex-1
                    group-[.input-group]:rounded-none
                    group-[.input-group]:[&:not(:first-child)]:border-l-transparent
                    group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r
                    group-[.input-group]:z-10 form-control
                    ${!!errorMessage ? "border border-red-500" : "border border-slate-200"}`}
            />
            <If condition={!!errorMessage}>
                <small className="text-red-500 px-2">{errorMessage}</small>
            </If>
        </div>
    );

};

export default TextAreaInput;
