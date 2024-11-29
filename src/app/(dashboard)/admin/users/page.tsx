"use client";

import {NextPage} from "next";
import React from "react";

const UsersListPage: NextPage = () => {

    return (
        <>
            <div className="intro-y box mt-5 p-5">
                <div className="grid grid-cols-12 gap-6">
                    <div className="w-96">
                        <h2 className="intro-y text-lg font-medium md:mx-4">Users List</h2>
                    </div>
                </div>
            </div>
        </>
    );

};

export default UsersListPage;
