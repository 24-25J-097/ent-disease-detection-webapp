import React from "react";

export type ChildrenProps = {
    children?: React.ReactNode;
};

export type GetLucideReactIconProps = {
    icon: string;
    className?: string;
}

export interface ErrorResponseData<T = any> {
    message: string;
    error?: string;
    data?: T;
}

export interface ContactUsEmailData {
    name: string;
    email: string;
    message: string;
    phone?: string;
    subject?: string;
    additionalInfo?: string;
    submissionTime: string;
    ipAddress: string;
    domain: string;
}
