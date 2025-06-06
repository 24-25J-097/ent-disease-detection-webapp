import React from 'react';
import {If} from "@/components/utils/If";
import {ToggleSwitchProps} from "@/types/FormInputs";

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
                                                       id,
                                                       label,
                                                       handleToggle,
                                                       checked,
                                                       ...props
                                                   }) => {

    return (
        <div data-tw-merge="" className="flex items-center">
            <If condition={!!label}>
                <label
                    data-tw-merge=""
                    htmlFor={id}
                    className="cursor-pointer mr-3"
                >
                    {label}
                </label>
            </If>
            <input
                id={id}
                data-tw-merge=""
                type="checkbox"
                className="transition-all duration-100 ease-in-out shadow-sm border-slate-200 cursor-pointer
                focus:ring-4 focus:ring-offset-0 focus:ring-primary focus:ring-opacity-20 dark:bg-darkmode-800
                dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50
                [&[type='radio']]:checked:bg-primary [&[type='radio']]:checked:border-primary
                [&[type='radio']]:checked:border-opacity-10 [&[type='checkbox']]:checked:bg-primary
                [&[type='checkbox']]:checked:border-primary [&[type='checkbox']]:checked:border-opacity-10
                [&:disabled:not(:checked)]:bg-slate-100 [&:disabled:not(:checked)]:cursor-not-allowed
                [&:disabled:not(:checked)]:dark:bg-darkmode-800/50 [&:disabled:checked]:opacity-70
                [&:disabled:checked]:cursor-not-allowed [&:disabled:checked]:dark:bg-darkmode-800/50 w-[38px] h-[24px]
                p-px rounded-full relative before:w-[20px] before:h-[20px] before:shadow-[1px_1px_3px_rgba(0,0,0,0.25)]
                before:transition-[margin-left] before:duration-200 before:ease-in-out before:absolute before:inset-y-0
                before:my-auto before:rounded-full before:dark:bg-darkmode-600 checked:bg-primary checked:border-primary
                checked:bg-none before:checked:ml-[14px] before:checked:bg-white"
                checked={checked}
                onChange={handleToggle}
                {...props}
            />
        </div>
    );
};

export default ToggleSwitch;
