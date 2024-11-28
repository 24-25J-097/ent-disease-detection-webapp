import React from "react";
import {IfProps} from "@/types/Utils";

export const If: React.FC<IfProps> = ({condition, children}) => {
    return condition ? <>{children}</> : null;
};
