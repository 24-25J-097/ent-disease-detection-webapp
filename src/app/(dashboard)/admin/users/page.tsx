"use client";

import {NextPage} from "next";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {User} from "@/models/User";
import {UserPlan} from "@/models/UserPlan";
import {Package} from "@/models/Package";
import UserPlanService from "@/services/UserPlanService";
import PackageService from "@/services/PackageService";
import {UserService} from "@/services/UserService";

const UsersListPage: NextPage = () => {
    const [users, setUsers] = useState<User[]>([] as User[]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
    const [userPlans, setUserPlans] = useState<UserPlan[]>([]);
    const [packages, setPackages] = useState<Package[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [editingUserId, setEditingUserId] = useState<string | null>(null);
    const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
    const [duration, setDuration] = useState<number>(30);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                const response = await UserService.getAllUsers();
                setUsers(response);

                // Fetch user plans
                const userPlanService = UserPlanService.getInstance();
                const plansData = await userPlanService.getAllUserPlans();
                setUserPlans(plansData);

                // Fetch packages
                const packageService = PackageService.getInstance();
                const packagesData = await packageService.getAllPackages();
                setPackages(packagesData);

                setError(null);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to load users and plans. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (searchTerm.trim() !== "") {
            const filtered = users.filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredUsers(filtered)
        } else {
            setFilteredUsers(users);
        }
    }, [searchTerm, users]);


    const getUserPlan = (userId: string) => {
        return userPlans.find(plan => plan.user?._id === userId);
    };

    const getPackageName = (packageId: string) => {
        const pkg = packages.find(p => p._id === packageId);
        return pkg ? pkg.name : "Unknown";
    };

    const getDailyLimit = (packageId: string) => {
        const pkg = packages.find(p => p._id === packageId);
        return pkg ? pkg.dailyRequestLimit : 0;
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };


    const handleEditPlan = (userId: string) => {
        setEditingUserId(userId);
        const userPlan = getUserPlan(userId);
        setSelectedPackageId(userPlan?.packageId || null);
        setDuration(userPlan ? calculateRemainingDays(userPlan.endDate) : 30);
    };

    const handleCancelEdit = () => {
        setEditingUserId(null);
        setSelectedPackageId(null);
        setDuration(30);
    };

    const handleSavePlan = async (userId: string) => {
        if (!selectedPackageId) {
            setError("Please select a package");
            return;
        }

        try {
            const userPlanService = UserPlanService.getInstance();
            const existingPlan = getUserPlan(userId);

            const startDate = new Date().toISOString();
            const endDate = new Date();
            endDate.setDate(endDate.getDate() + duration);

            if (existingPlan) {
                // Update existing plan
                await userPlanService.updateUserPlan(existingPlan._id, {
                    packageId: selectedPackageId,
                    startDate,
                    endDate: endDate.toISOString(),
                    usageToday: 0 // Reset usage when updating plan
                });
            } else {
                // Create new plan
                await userPlanService.createUserPlan({
                    userId: userId,
                    packageId: selectedPackageId,
                    startDate,
                    endDate: endDate.toISOString(),
                    usageToday: 0,
                    isActive: false,
                    transactionId: "by-admin",
                    paymentMethod: "by-admin",
                    paymentStatus: "completed",
                });
            }

            // Refresh user plans
            const updatedPlans = await userPlanService.getAllUserPlans();
            setUserPlans(updatedPlans);

            // Reset editing state
            setEditingUserId(null);
            setSelectedPackageId(null);
            setDuration(30);
        } catch (err) {
            console.error("Error saving user plan:", err);
            setError("Failed to save user plan. Please try again.");
        }
    };

    const calculateRemainingDays = (endDateStr: string) => {
        const endDate = new Date(endDateStr);
        const today = new Date();
        const diffTime = endDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">User Plan Management</h1>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by name or email"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10"
                        />
                        <div className="absolute left-3 top-2.5">
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                            </svg>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {<div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>}
            </div>
        );
    }

    if (filteredUsers.length <= 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">User Plan Management</h1>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by name or email"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10"
                        />
                        <div className="absolute left-3 top-2.5">
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                            </svg>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {<div className="bg-gray-100 p-6 rounded-lg text-center">
                    <p className="text-gray-600">No users found matching your search criteria.</p>
                </div>}
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">User Plan Management</h1>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by name or email"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10"
                    />
                    <div className="absolute left-3 top-2.5">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                    </div>
                </div>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {<div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Current Plan
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Start Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            End Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Usage
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers && filteredUsers.map((user) => {
                        const userPlan = getUserPlan(user._id);
                        const remainingDays = userPlan ? calculateRemainingDays(userPlan.endDate) : 0;
                        const isExpired = remainingDays === 0;

                        return (
                            <tr key={user._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                            <div className="text-sm text-gray-500">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900 capitalize">{user.role}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">

                                    <div className="text-sm text-gray-900">
                                        {userPlan ? (
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    isExpired ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                                                }`}>
                                                            {getPackageName(userPlan.package?._id!)}
                                                {isExpired && " (Expired)"}
                                                        </span>
                                        ) : (
                                            <span
                                                className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">No Plan</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {userPlan ? new Date(userPlan.startDate).toLocaleDateString() : "N/A"}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {userPlan ? new Date(userPlan.endDate).toLocaleDateString() : "N/A"}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {userPlan ? (
                                            <span>
                                                        {userPlan.usageToday} / {getDailyLimit(userPlan.package?._id!)}
                                                    </span>
                                        ) : "N/A"}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    {editingUserId === user._id ? (
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleSavePlan(user._id)}
                                                className="bg-green-100 text-green-800 hover:bg-green-200 px-2 py-1 rounded"
                                                disabled={!selectedPackageId}
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
                                                className="bg-gray-100 text-gray-800 hover:bg-gray-200 px-2 py-1 rounded"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => handleEditPlan(user._id)}
                                            className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-2 py-1 rounded"
                                        >
                                            {userPlan ? "Update Plan" : "Assign Plan"}
                                        </button>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>}
        </div>
    );
};

export default UsersListPage;
