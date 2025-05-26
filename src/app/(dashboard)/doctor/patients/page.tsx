"use client";

import {NextPage} from "next";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Card} from '@/components/ui/card';
import {Button} from "@/components/ui/button";
import React, {useEffect, useState} from "react";
import {PatientService} from "@/services/PatientService";
import {useToast} from "@/providers/ToastProvider";
import {AxiosError} from "axios";
import {ErrorResponseData} from "@/types/Common";
import LoadingModal from "@/components/loaders/LoadingModal";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {PatientData} from "@/types/service/Patient";
import CreatePatientModal from "@/components/modals/CreatePatientModal";

const calculateAge = (dateOfBirth: string): number => {
    const dob = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    return age;
};

const PatientsPage: NextPage = () => {
    const [patients, setPatients] = useState<PatientData[]>([]);
    const [filteredPatients, setFilteredPatients] = useState<PatientData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [createPatientModalOpen, setCreatePatientModalOpen] = useState<boolean>(false);

    // Filter states
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [genderFilter, setGenderFilter] = useState<string>("all");

    const { notifyError, notifySuccess } = useToast();

    useEffect(() => {
        const fetchPatients = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const patients = await PatientService.getAllPatients();
                if (patients) {
                    setPatients(patients);
                    setFilteredPatients(patients);
                } else {
                    setError("Failed to fetch patients");
                    notifyError("Failed to fetch patients");
                }
            } catch (error) {
                const axiosError = error as AxiosError<ErrorResponseData>;
                const errMsg = axiosError?.response?.data?.message || axiosError?.response?.data?.error || "An error occurred.";
                setError(errMsg);
                notifyError(errMsg);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPatients();
    }, [notifyError]);

    // Apply filters whenever filter values change
    useEffect(() => {
        if (!patients.length) return;

        let result = [...patients];

        // Apply search filter
        if (searchTerm) {
            const search = searchTerm.toLowerCase();
            result = result.filter(patient => 
                `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(search) ||
                patient.email.toLowerCase().includes(search) ||
                patient.phone.toLowerCase().includes(search)
            );
        }

        // Apply gender filter
        if (genderFilter && genderFilter !== 'all') {
            result = result.filter(patient => 
                patient.gender.toLowerCase() === genderFilter.toLowerCase()
            );
        }

        setFilteredPatients(result);
    }, [patients, searchTerm, genderFilter]);

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    return (
        <section className="bg-blue-50 min-h-screen px-4">
            <div className="flex py-8 justify-between items-center">
                <h1 className="text-slate-600 text-3xl font-bold text-center">Patient List</h1>
                <Button 
                    className="bg-blue-900 text-white"
                    onClick={() => setCreatePatientModalOpen(true)}
                >
                    Add New Patient
                </Button>
            </div>

            {/* Filters */}
            <Card className="p-6 bg-white shadow-md mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                        <Input
                            type="text"
                            placeholder="Search by name, email, or phone"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div className="w-full md:w-48">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <Select value={genderFilter} onValueChange={setGenderFilter}>
                            <SelectTrigger>
                                <SelectValue placeholder="All Genders" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Genders</SelectItem>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </Card>

            <div>
                <Card className="p-6 bg-white shadow-md">
                    {error && (
                        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">
                            {error}
                        </div>
                    )}

                    <Table className="w-full border-collapse">
                        <TableHeader>
                            <TableRow className="bg-gray-100">
                                <TableHead className="text-left p-3">Patient ID</TableHead>
                                <TableHead className="text-left p-3">Name</TableHead>
                                <TableHead className="text-left p-3">Email</TableHead>
                                <TableHead className="text-left p-3">Phone</TableHead>
                                <TableHead className="text-left p-3">Age</TableHead>
                                <TableHead className="text-left p-3">Gender</TableHead>
                                <TableHead className="text-left p-3">Created Date</TableHead>
                                {/*<TableHead className="text-center p-3">Actions</TableHead>*/}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredPatients.length > 0 ? (
                                filteredPatients.map((patient) => (
                                    <TableRow key={patient._id} className="border-b hover:bg-gray-50">
                                        <TableCell className="p-3">{patient.patientId ?? patient._id?.substring(0, 8)}</TableCell>
                                        <TableCell className="p-3">{`${patient.firstName} ${patient.lastName}`}</TableCell>
                                        <TableCell className="p-3">{patient.email}</TableCell>
                                        <TableCell className="p-3">{patient.phone}</TableCell>
                                        <TableCell className="p-3">{calculateAge(patient.dateOfBirth)}</TableCell>
                                        <TableCell className="p-3">{patient.gender}</TableCell>
                                        <TableCell className="p-3">{formatDate(patient.createdAt!)}</TableCell>
                                        {/*<TableCell className="p-3 text-center">
                                            <Button
                                                variant="outline"
                                                className="text-blue-600 border-blue-600 mr-2"
                                            >
                                                View
                                            </Button>
                                            <Button variant="destructive">Manage</Button>
                                        </TableCell>*/}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center py-8">
                                        {isLoading ? "Loading patients..." : "No patients found"}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Card>
            </div>

            <LoadingModal isOpen={isLoading} text="Loading patients..." imagePath="/images/loading-circle.gif" />

            <CreatePatientModal
                isOpen={createPatientModalOpen}
                onClose={() => setCreatePatientModalOpen(false)}
                onSuccess={() => {
                    // Refresh the patients list after creating a new patient
                    const fetchPatients = async () => {
                        setIsLoading(true);
                        setError(null);
                        try {
                            const patients = await PatientService.getAllPatients();
                            if (patients) {
                                setPatients(patients);
                                setFilteredPatients(patients);
                                notifySuccess("Patient list refreshed successfully");
                            } else {
                                setError("Failed to fetch patients");
                                notifyError("Failed to fetch patients");
                            }
                        } catch (error) {
                            const axiosError = error as AxiosError<ErrorResponseData>;
                            const errMsg = axiosError?.response?.data?.message || axiosError?.response?.data?.error || "An error occurred.";
                            setError(errMsg);
                            notifyError(errMsg);
                        } finally {
                            setIsLoading(false);
                        }
                    };
                    fetchPatients();
                }}
            />
        </section>
    );
};

export default PatientsPage;
