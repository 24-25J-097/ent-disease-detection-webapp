"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useTheme} from "next-themes";

interface ToastContextProps {
    notifySuccess: (message: string) => void;
    notifyError: (message: string) => void;
    notifyWarn: (message: string) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const { theme } = useTheme();

    const [currentTheme, setCurrentTheme] = useState<string>("system");

    useEffect(() => {
        if (theme === "dark") {
            setCurrentTheme("dark");
        } else if (theme === "light") {
            setCurrentTheme("light");
        } else {
            setCurrentTheme("system");
        }
    }, [theme]);

    const toastOptions: ToastOptions = {};

    const notifySuccess = (message: string) => {
        toast.success(message, toastOptions);
    };

    const notifyError = (message: string) => {
        toast.error(message, toastOptions);
    };

    const notifyWarn = (message: string) => {
        toast.warn(message, toastOptions);
    };

    return (
        <ToastContext.Provider value={{ notifySuccess, notifyError, notifyWarn }}>
            {children}
            <ToastContainer
                position="top-right"
                autoClose={10000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={currentTheme}
            />
        </ToastContext.Provider>
    );
};

export const useToast = (): ToastContextProps => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};
