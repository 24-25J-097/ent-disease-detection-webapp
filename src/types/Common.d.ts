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
    data?: T;
}
