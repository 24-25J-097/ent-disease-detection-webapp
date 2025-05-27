"use client";

import React, {useEffect, useState} from "react";
import {NextPage} from "next";
import {AccessPolicyType, RoleAccessPolicy} from "@/models/RoleAccessPolicy";
import {Package} from "@/models/Package";
import RoleAccessPolicyService from "@/services/RoleAccessPolicyService";
import PackageService from "@/services/PackageService";
import {Role} from "@/enums/access";

const RolesListPage: NextPage = () => {
    const [roles, setRoles] = useState<Role[]>([Role.ADMIN, Role.DOCTOR, Role.RADIOLOGIST, Role.STUDENT, Role.PATIENT]);
    const [accessPolicies, setAccessPolicies] = useState<RoleAccessPolicy[]>([]);
    const [packages, setPackages] = useState<Package[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                // Fetch access policies
                const policyService = RoleAccessPolicyService.getInstance();
                const policiesData = await policyService.getAllRoleAccessPolicies();
                setAccessPolicies(policiesData);

                // Fetch packages for dropdown
                const packageService = PackageService.getInstance();
                const packagesData = await packageService.getAllPackages();
                setPackages(packagesData);

                setError(null);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to load roles and access policies. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const getPolicyForRole = (role: string) => {
        return accessPolicies.find(policy => policy.role === role);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Role Access Policy Management</h1>

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
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Role
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Access Policy
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Required Package
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Description
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {roles.map((role, index) => {
                            const policy = getPolicyForRole(role);

                            return (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 capitalize">{role}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 capitalize">
                                            {policy?.hasUnlimitedAccess ? "Unlimited ACCESS" : "Require Plan"}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 capitalize">
                                            {policy?.requiresPackage}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 capitalize">
                                            {policy?.description}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default RolesListPage;
