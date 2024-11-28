"use client";

import React from "react";
import { ChildrenProps } from "@/types/Common";

const InitDashboardProvider = ({ children }: ChildrenProps) => {

    return (
        <>
            {children}
        </>
    );
};

export default InitDashboardProvider;
