import React, {FC, ReactNode, ButtonHTMLAttributes} from 'react';
import {twc} from "@/utils/tailwind-helper";

interface TextButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
}

const TextButton: FC<TextButtonProps> = ({
                                                 children,
                                                 onClick,
                                                 className,
                                                 ...props
                                             }) => {

    return (
        <button
            className={twc(
                'transition duration-200 border items-center justify-center py-2 rounded-md cursor-pointer ' +
                'focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none ' +
                'dark:focus:ring-slate-700 dark:focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed ' +
                'min-w-0 sm:min-w-[40px] shadow-none font-normal flex border-transparent text-slate-800 sm:mr-2 ' +
                'dark:text-slate-300 px-1 sm:px-3', className
            )}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default TextButton;
