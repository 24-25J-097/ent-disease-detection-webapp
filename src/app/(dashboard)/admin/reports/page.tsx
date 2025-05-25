"use client";

import {NextPage} from "next";
import {useEffect, useState} from "react";
import ReportService from "@/services/ReportService";
import {PackagePurchase, RequestLogResponse, UsageByPackage, UsageByRole, UsageByUser} from "@/models/RequestLog";

const ReportsPage: NextPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [dateRange, setDateRange] = useState<{ startDate: string; endDate: string }>({
        startDate: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0]
    });

    const [topUsers, setTopUsers] = useState<UsageByUser[]>([]);
    const [usageByRole, setUsageByRole] = useState<UsageByRole[]>([]);
    const [usageByPackage, setUsageByPackage] = useState<UsageByPackage[]>([]);
    const [packagePurchases, setPackagePurchases] = useState<PackagePurchase[]>([]);
    const [requestLogs, setRequestLogs] = useState<RequestLogResponse>()

    useEffect(() => {
        fetchReportData();
    }, [dateRange]);

    const fetchReportData = async () => {
        try {
            setIsLoading(true);
            const reportService = ReportService.getInstance();

            const requestLogs = await reportService.getAllApiUsages();
            setRequestLogs(requestLogs);
            // Fetch top users
            // const topUsersData = await reportService.getTopUsers(10, dateRange);
            // setTopUsers(topUsersData);

            // Fetch usage by role
            // const roleUsageData = await reportService.getUsageByRole(dateRange);
            // setUsageByRole(roleUsageData);

            // Fetch usage by package
            // const packageUsageData = await reportService.getUsageByPackage(dateRange);
            // setUsageByPackage(packageUsageData);

            // Fetch package purchases
            const purchasesData = await reportService.getPackagePurchases(dateRange);
            setPackagePurchases(purchasesData);

            setError(null);
        } catch (err) {
            console.error("Error fetching report data:", err);
            setError("Failed to load report data. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDateRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setDateRange(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleQuickDateRange = (days: number) => {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        setDateRange({
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0]
        });
    };

    // Helper function to get color based on index
    const getColor = (index: number): string => {
        const colors = [
            'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500',
            'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
            'bg-orange-500', 'bg-cyan-500'
        ];
        return colors[index % colors.length];
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Usage Reports</h1>

            {/* Date Range Selector */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-col md:flex-row md:items-center mb-4 md:mb-0">
                        <div className="mb-2 md:mb-0 md:mr-4">
                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start
                                Date</label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={dateRange.startDate}
                                onChange={handleDateRangeChange}
                                className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div>
                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">End
                                Date</label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={dateRange.endDate}
                                onChange={handleDateRangeChange}
                                className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => handleQuickDateRange(7)}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
                        >
                            Last 7 Days
                        </button>
                        <button
                            onClick={() => handleQuickDateRange(30)}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
                        >
                            Last 30 Days
                        </button>
                        <button
                            onClick={() => handleQuickDateRange(90)}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
                        >
                            Last 90 Days
                        </button>
                    </div>
                </div>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Top Users */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Top 10 Users by API Usage</h2>
                        {topUsers.length === 0 ? (
                            <p className="text-gray-500">No data available for the selected date range.</p>
                        ) : (
                            <div className="space-y-4">
                                {topUsers.map((user, index) => (
                                    <div key={user.userDetails._id} className="flex items-center">
                                        <div className="w-8 text-gray-500 font-semibold">{index + 1}.</div>
                                        <div className="flex-1">
                                            <div className="text-sm font-medium">{user.userDetails.name}</div>
                                            <div className="text-xs text-gray-500">{user.userDetails.email}</div>
                                        </div>
                                        <div className="text-sm font-semibold">{user.count} calls</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Usage by Role */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">API Usage by Role</h2>
                        <p className="text-gray-500">No data available for the selected date range.</p>
                    </div>

                    {/* Usage by Package */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">API Usage by Package</h2>
                        <p className="text-gray-500">No data available for the selected date range.</p>
                    </div>

                    {/* Package Purchases */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Package Purchases</h2>
                        <p className="text-gray-500">No data available for the selected date range.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReportsPage;