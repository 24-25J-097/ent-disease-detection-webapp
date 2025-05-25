"use client";

import {NextPage} from "next";
import Link from "next/link";
import {useEffect, useState} from "react";
import ReportService from "@/services/ReportService";
import PackageService from "@/services/PackageService";
import {Package} from "@/models/Package";
import {UserService} from "@/services/UserService";
import {User} from "@/models/User";
import {RequestLog, RequestLogResponse} from "@/models/RequestLog";

const AdminDashboard: NextPage = () => {
    const [users, setUsers] = useState<User[]>([] as User[]);
    const [packageCount, setPackageCount] = useState<number>(0);
    const [requestLogs, setRequestLogs] = useState<RequestLogResponse>()
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setIsLoading(true);
                const reportService = ReportService.getInstance();
                const packageService = PackageService.getInstance();

                const userResponse = await UserService.getAllUsers();
                setUsers(userResponse);
                // Fetch packages
                const packages = await packageService.getAllPackages();
                setPackageCount(packages.length);

                // Fetch usage by package
                const requestLogs = await reportService.getAllApiUsages();
                setRequestLogs(requestLogs);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <>
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div
                                className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        <>
                            {/* Quick Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h3 className="text-lg font-semibold mb-2">Packages</h3>
                                    <p className="text-3xl font-bold text-blue-600">{packageCount}</p>
                                    <Link href="/admin/packages"
                                          className="text-sm text-blue-500 hover:underline mt-2 inline-block">
                                        Manage Packages →
                                    </Link>
                                </div>

                                <div className="bg-white rounded-lg shadow p-6">
                                    <h3 className="text-lg font-semibold mb-2">Roles</h3>
                                    <p className="text-3xl font-bold text-blue-600">5</p>
                                    {/*<p className="text-3xl font-bold text-blue-600">{usageByRole.length}</p>*/}
                                    <Link href="/admin/roles"
                                          className="text-sm text-blue-500 hover:underline mt-2 inline-block">
                                        Manage Roles →
                                    </Link>
                                </div>

                                <div className="bg-white rounded-lg shadow p-6">
                                    <h3 className="text-lg font-semibold mb-2">Users</h3>
                                    <p className="text-3xl font-bold text-blue-600">
                                        {users.length}
                                    </p>
                                    <Link href="/admin/users"
                                          className="text-sm text-blue-500 hover:underline mt-2 inline-block">
                                        Manage Users →
                                    </Link>
                                </div>

                                <div className="bg-white rounded-lg shadow p-6">
                                    <h3 className="text-lg font-semibold mb-2">Total API Usage</h3>
                                    <p className="text-3xl font-bold text-blue-600">
                                        {requestLogs?.totalRequests}
                                    </p>
                                    <Link href="/admin/reports"
                                          className="text-sm text-blue-500 hover:underline mt-2 inline-block">
                                        View Reports →
                                    </Link>
                                </div>
                            </div>

                            {/* Admin Sections */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h2 className="text-xl font-bold mb-4">Package Management</h2>
                                    <p className="text-gray-600 mb-4">
                                        Create, edit, and manage payment packages. Set pricing, daily limits, and
                                        durations.
                                    </p>
                                    <Link
                                        href="/admin/packages"
                                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 inline-block"
                                    >
                                        Manage Packages
                                    </Link>
                                </div>

                                <div className="bg-white rounded-lg shadow p-6">
                                    <h2 className="text-xl font-bold mb-4">Role Access Policy</h2>
                                    <p className="text-gray-600 mb-4">
                                        Configure access policies for different roles. Set unlimited access or require
                                        package purchase.
                                    </p>
                                    <Link
                                        href="/admin/roles"
                                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 inline-block"
                                    >
                                        Manage Roles
                                    </Link>
                                </div>

                                <div className="bg-white rounded-lg shadow p-6">
                                    <h2 className="text-xl font-bold mb-4">User Plan Management</h2>
                                    <p className="text-gray-600 mb-4">
                                        View and manage user subscription plans. Track usage and assign packages to
                                        users.
                                    </p>
                                    <Link
                                        href="/admin/users"
                                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 inline-block"
                                    >
                                        Manage Users
                                    </Link>
                                </div>

                                <div className="bg-white rounded-lg shadow p-6">
                                    <h2 className="text-xl font-bold mb-4">Usage Reports</h2>
                                    <p className="text-gray-600 mb-4">
                                        View detailed analytics on API usage, package purchases, and user activity.
                                    </p>
                                    <Link
                                        href="/admin/reports"
                                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 inline-block"
                                    >
                                        View Reports
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
