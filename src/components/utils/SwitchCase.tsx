import React, { ReactNode } from "react";
import {CaseProps, SwitchProps} from "@/types/Utils";

export const Switch: React.FC<SwitchProps> = ({condition, children, defaultElement}) => {
    if (!children) {
        throw new Error("Children are required for a switch component");
    }
    let matchedCase: ReactNode | null = null;
    React.Children.forEach(children, (child) => {
        if (React.isValidElement<CaseProps>(child) && child.props.value === condition) {
            matchedCase = child.props.children;
        }
    });
    const defaultCase = React.Children.toArray(children).find(
        (child) => React.isValidElement<CaseProps>(child) && child.props.value === undefined
    );
    return (
        <>
            {matchedCase || defaultElement || (defaultCase as React.ReactElement)}
        </>
    );
};

export const Case: React.FC<CaseProps> = ({children}) => {
    return <>{children}</>;
};
