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
                    {/* Daily API Usage Summary */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Daily API Usage Summary</h2>
                        {!requestLogs || requestLogs.dailySummary.length === 0 ? (
                            <p className="text-gray-500">No data available for the selected date range.</p>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="text-sm font-medium">Total Requests:</div>
                                    <div className="text-lg font-bold text-blue-600">{requestLogs.totalRequests}</div>
                                </div>
                                <div className="space-y-2">
                                    {requestLogs.dailySummary.map((day, index) => {
                                        const maxCount = Math.max(...requestLogs.dailySummary.map(d => d.count));
                                        const percentage = (day.count / maxCount) * 100;

                                        return (
                                            <div key={day.date} className="flex items-center">
                                                <div className="w-24 text-sm text-gray-500">
                                                    {new Date(day.date).toLocaleDateString()}
                                                </div>
                                                <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full ${getColor(index)} rounded-full`}
                                                        style={{ width: `${percentage}%` }}
                                                    ></div>
                                                </div>
                                                <div className="w-16 text-right text-sm font-semibold ml-2">
                                                    {day.count}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Recent API Requests */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Recent API Requests</h2>
                        {!requestLogs || requestLogs.data.length === 0 ? (
                            <p className="text-gray-500">No data available for the selected date range.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endpoint</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {requestLogs.data.slice(0, 10).map((log, index) => (
                                            <tr key={log._id}>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm">
                                                    {log.user ? log.user.name : 'Unknown'}
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm">
                                                    <span className="max-w-xs truncate block">{log.endpoint}</span>
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                                        log.method === 'GET' ? 'bg-blue-100 text-blue-800' :
                                                        log.method === 'POST' ? 'bg-green-100 text-green-800' :
                                                        log.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                                                        log.method === 'DELETE' ? 'bg-red-100 text-red-800' :
                                                        'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {log.method}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                                        log.statusCode >= 200 && log.statusCode < 300 ? 'bg-green-100 text-green-800' :
                                                        log.statusCode >= 400 && log.statusCode < 500 ? 'bg-yellow-100 text-yellow-800' :
                                                        log.statusCode >= 500 ? 'bg-red-100 text-red-800' :
                                                        'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {log.statusCode}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm">
                                                    {log.responseTime}ms
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm">
                                                    {new Date(log.timestamp).toLocaleString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* Package Purchases */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Package Purchases</h2>
                        {packagePurchases.length === 0 ? (
                            <p className="text-gray-500">No data available for the selected date range.</p>
                        ) : (
                            <div className="space-y-4">
                                {packagePurchases.map((purchase, index) => {
                                    // Group purchases by package name for visualization
                                    const maxPrice = Math.max(...packagePurchases.map(p => p.packageDetails.price));
                                    const percentage = (purchase.packageDetails.price / maxPrice) * 100;

                                    return (
                                        <div key={`${purchase._id}`} className="flex items-center">
                                            <div className="w-32 text-sm text-gray-500">
                                                {new Date(purchase.purchaseDate).toLocaleDateString()}
                                            </div>
                                            <div className="w-32 text-sm font-medium">{purchase.packageDetails.name}</div>
                                            <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${getColor(index)} rounded-full`}
                                                    style={{ width: `${percentage}%` }}
                                                ></div>
                                            </div>
                                            <div className="w-16 text-right text-sm font-semibold ml-2">
                                                ${purchase.packageDetails.price}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReportsPage;
