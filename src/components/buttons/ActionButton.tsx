import React, {FC, ReactNode, ButtonHTMLAttributes} from 'react';
import {twc} from "@/utils/tailwind-helper";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    color: 'primary' | 'secondary' | 'success' | 'warning' | 'pending' | 'danger' | 'dark' | 'normal';
    children: ReactNode;
    className?: string;
}

const ActionButton: FC<ActionButtonProps> = ({
                                                 color = "normal",
                                                 children,
                                                 onClick,
                                                 className,
                                                 ...props
                                             }) => {

    return (
        <button
            className={twc(
                'transition duration-200 border shadow-sm inline-flex items-center justify-center rounded-md ' +
                'font-medium cursor-pointer focus:ring-4 focus:ring-opacity-20 focus-visible:outline-none ' +
                'dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 ' +
                '[&:hover:not(:disabled)]:border-opacity-90 disabled:opacity-70 disabled:cursor-not-allowed ' +
                `mr-2 py-1 px-3 ${className}`,
                {
                    'bg-white border-slate-200 focus:ring-primary dark:focus:ring-slate-700': color === 'normal',
                    'bg-primary border-primary text-white dark:border-primary focus:ring-primary dark:focus:ring-slate-700': color === 'primary',
                    'bg-secondary/70 border-secondary/70 text-slate-500 dark:border-darkmode-400 dark:bg-darkmode-400 dark:text-slate-300 focus:ring-primary dark:focus:ring-slate-700': color === 'secondary',
                    'bg-success border-success text-slate-900 dark:border-success': color === 'success',
                    'bg-warning border-warning text-slate-900 dark:border-warning': color === 'warning',
                    'bg-pending border-pending text-white dark:border-pending': color === 'pending',
                    'bg-danger border-danger text-white dark:border-danger': color === 'danger',
                    'bg-dark border-dark text-white dark:bg-darkmode-800 dark:border-transparent dark:text-slate-300 [&:hover:not(:disabled)]:dark:bg-darkmode-800/70': color === 'dark',
                }
            )}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default ActionButton;
