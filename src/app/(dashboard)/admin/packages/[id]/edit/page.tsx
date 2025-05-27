"use client";

import {NextPage} from "next";
import {useState, useEffect} from "react";
import {useRouter, useParams} from "next/navigation";
import Link from "next/link";
import PackageService from "@/services/PackageService";
import {Package} from "@/models/Package";

const EditPackagePage: NextPage = () => {
    const router = useRouter();
    const params = useParams();
    const packageId: string = params.id as string;

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        dailyLimit: "",
        duration: "",
        isActive: true
    });

    useEffect(() => {
        const fetchPackage = async () => {
            try {
                setIsLoading(true);
                const packageService = PackageService.getInstance();
                const packageData = await packageService.getPackage(packageId);

                setFormData({
                    name: packageData.name,
                    price: packageData.price.toString(),
                    dailyLimit: packageData.dailyRequestLimit.toString(),
                    duration: packageData.durationInDays.toString(),
                    isActive: packageData.isActive
                });

                setError(null);
            } catch (err) {
                console.error("Error fetching package:", err);
                setError("Failed to load package data. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        if (packageId) {
            fetchPackage();
        }
    }, [packageId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, type, checked} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form
        if (!formData.name.trim()) {
            setError("Package name is required");
            return;
        }

        if (isNaN(Number(formData.price)) || Number(formData.price) < 0) {
            setError("Price must be a valid number");
            return;
        }

        if (isNaN(Number(formData.dailyLimit)) || Number(formData.dailyLimit) < 1) {
            setError("Daily limit must be a valid number greater than 0");
            return;
        }

        if (isNaN(Number(formData.duration)) || Number(formData.duration) < 1) {
            setError("Duration must be a valid number greater than 0");
            return;
        }

        try {
            setIsSubmitting(true);
            setError(null);

            const packageService = PackageService.getInstance();
            await packageService.updatePackage(packageId, {
                name: formData.name,
                price: Number(formData.price),
                dailyRequestLimit: Number(formData.dailyLimit),
                durationInDays: Number(formData.duration),
                isActive: formData.isActive
            });

            // Redirect to packages list
            router.push("/admin/packages");
        } catch (err) {
            console.error("Error updating package:", err);
            setError("Failed to update package. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Edit Package</h1>
                <Link
                    href="/admin/packages"
                    className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                >
                    Back to Packages
                </Link>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <div className="bg-white shadow-md rounded-lg p-6">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                            Package Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="e.g., Basic, Pro, Unlimited"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
                            Price ($)
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="e.g., 9.99"
                            min="0"
                            step="0.01"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="dailyLimit" className="block text-gray-700 text-sm font-bold mb-2">
                            Daily API Call Limit
                        </label>
                        <input
                            type="number"
                            id="dailyLimit"
                            name="dailyLimit"
                            value={formData.dailyLimit}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="e.g., 100"
                            min="1"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="duration" className="block text-gray-700 text-sm font-bold mb-2">
                            Duration (days)
                        </label>
                        <input
                            type="number"
                            id="duration"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="e.g., 30"
                            min="1"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={formData.isActive}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <span className="text-gray-700 text-sm font-bold">Active</span>
                        </label>
                    </div>

                    <div className="flex items-center justify-end">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPackagePage;