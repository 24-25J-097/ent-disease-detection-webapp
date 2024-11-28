"use client";

import {NextPage} from "next";
import serviceUtils from "@/services/api-service/ServiceUtils";

const UserDashboard: NextPage = () => {

    return (
        <>
            <div className="grid grid-cols-12 gap-6">
                <div>
                    <h1>User Dashboard</h1>
                    <p>Welcome, User!</p>
                    <p>Token: {serviceUtils.getAccessToken()}</p>
                    <p>Role: {serviceUtils.getUserRole()}</p>
                </div>
            </div>
        </>
    );
};

export default UserDashboard;
