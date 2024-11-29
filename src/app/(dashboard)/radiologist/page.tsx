"use client";

import {NextPage} from "next";
import serviceUtils from "@/services/api-service/ServiceUtils";

const RadiologistDashboard: NextPage = () => {

    return (
        <>
            <div className="grid grid-cols-12 gap-6">
                <div>
                    <h1>Radiologist Dashboard</h1>
                    <p>Welcome, Radiologist!</p>
                    <p>Token: {serviceUtils.getAccessToken()}</p>
                    <p>Role: {serviceUtils.getUserRole()}</p>
                </div>
            </div>
        </>
    );
};

export default RadiologistDashboard;
