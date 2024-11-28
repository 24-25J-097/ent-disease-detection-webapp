"use client";

import {NextPage} from "next";

const AdminDashboard: NextPage = () => {

    return (
        <>
            <div className="grid grid-cols-12 gap-6">
                <div>
                    <h1>Admin Dashboard</h1>
                    <p>Welcome, Admin!</p>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
