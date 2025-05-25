"use client";

import {NextPage} from "next";
import {useEffect, useState} from "react";
import Link from "next/link";
import PackageService from "@/services/PackageService";
import {Package} from "@/models/Package";

const PackagesPage: NextPage = () => {
    const [packages, setPackages] = useState<Package[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                setIsLoading(true);
                const packageService = PackageService.getInstance();
                const data = await packageService.getAllPackages();
                setPackages(data);
                setError(null);
            } catch (err) {
                console.error("Error fetching packages:", err);
                setError("Failed to load packages. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchPackages();
    }, []);

    const handleToggleStatus = async (id: string) => {
        try {
            const packageService = PackageService.getInstance();
            await packageService.togglePackageStatus(id);

            // Update the local state
            setPackages(prevPackages =>
                prevPackages.map(pkg =>
                    pkg._id === id ? {...pkg, isActive: !pkg.isActive} : pkg
                )
            );
        } catch (err) {
            console.error("Error toggling package status:", err);
            setError("Failed to update package status. Please try again.");
        }
    };

    const handleDeletePackage = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this package?")) {
            try {
                const packageService = PackageService.getInstance();
                await packageService.deletePackage(id);

                // Remove from local state
                setPackages(prevPackages =>
                    prevPackages.filter(pkg => pkg._id !== id)
                );
            } catch (err) {
                console.error("Error deleting package:", err);
                setError("Failed to delete package. Please try again.");
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Package Management</h1>
                <Link
                    href="/admin/packages/create"
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Create New Package
                </Link>
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
            ) : packages.length === 0 ? (
                <div className="bg-gray-100 p-6 rounded-lg text-center">
                    <p className="text-gray-600">No packages found. Create your first package to get started.</p>
                </div>
            ) : (
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Daily Limit
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Duration (days)
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {packages.map((pkg) => (
                            <tr key={pkg._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{pkg.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">${pkg.price.toFixed(2)}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{pkg.dailyRequestLimit}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{pkg.durationInDays}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                pkg.isActive
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                        >
                                            {pkg.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleToggleStatus(pkg._id)}
                                            className={`${
                                                pkg.isActive
                                                    ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                                            } px-2 py-1 rounded`}
                                        >
                                            {pkg.isActive ? 'Deactivate' : 'Activate'}
                                        </button>
                                        <Link
                                            href={`/admin/packages/${pkg._id}/edit`}
                                            className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-2 py-1 rounded"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDeletePackage(pkg._id)}
                                            className="bg-red-100 text-red-800 hover:bg-red-200 px-2 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PackagesPage;