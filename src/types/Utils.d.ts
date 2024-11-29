import React, { ReactNode } from "react";

interface IfProps {
    condition?: boolean;
    children: ReactNode;
}

interface SwitchProps {
    condition: string | number | boolean | object | any[];
    children: ReactNode;
    defaultElement?: ReactNode;
}

interface CaseProps {
    children: ReactNode;
    value?: string | number | boolean | object | any[];
}

interface MapProps<T> {
    data: T[];
    render: (item: T, index: number) => (err) => React.JSX.Element;
}

export { IfProps, SwitchProps, CaseProps, MapProps };

export type DataObject = {
    [key: string]: any;
};
