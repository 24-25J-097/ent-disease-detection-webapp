"use client";

import React from "react";
import {NextPage} from "next";

const RolesListPage: NextPage = () => {

    return (
        <>
            <div className="intro-y box mt-5 p-5">
                <div className="flex flex-col gap-4">
                    <div className="w-96">
                        <h2 className="intro-y text-lg font-medium md:mx-4">Roles List</h2>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RolesListPage;
