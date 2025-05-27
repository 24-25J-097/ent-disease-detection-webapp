"use client";

import {NextPage} from "next";
import React, {useState, useEffect} from "react";
import {Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend, LineChart, Line} from "recharts";
import {Card} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import "react-toastify/dist/ReactToastify.css";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Navigation, Pagination} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {Button} from '@/components/ui/button';
import {PatientService} from "@/services/PatientService";
import {Patient} from "@/models/Patient";
import {useToast} from "@/providers/ToastProvider";
import {AxiosError} from "axios";
import {ErrorResponseData} from "@/types/Common";
import LoadingModal from "@/components/loaders/LoadingModal";
import {toTitleCase} from '@/utils/string-formatters';
import Link from 'next/link';

const summaryStats = [
    {title: "OPD Today", value: 125},
    {title: "Relieved Today", value: 56},
    {title: "In Patient Today", value: 160},
    {title: "Analyses", value: 48}
];

const cholesteatomaData = {
    name: "Cholesteatoma Report",
    data: [
        {month: "Jan", newPatients: 20, oldPatients: 15},
        {month: "Feb", newPatients: 25, oldPatients: 10},
        {month: "Mar", newPatients: 30, oldPatients: 18},
        {month: "Apr", newPatients: 18, oldPatients: 22},
        {month: "May", newPatients: 15, oldPatients: 28},
        {month: "Jun", newPatients: 10, oldPatients: 35},
        {month: "Jul", newPatients: 13, oldPatients: 22},
        {month: "Aug", newPatients: 10, oldPatients: 15},
        {month: "Sep", newPatients: 5, oldPatients: 14},
        {month: "Oct", newPatients: 7, oldPatients: 12},
        {month: "Nov", newPatients: 8, oldPatients: 20},
        {month: "Dec", newPatients: 10, oldPatients: 35},
    ]
};

const sinusitisData = {
    name: "Sinusitis Report",
    data: [
        {month: "Jan", newPatients: 5, oldPatients: 3},
        {month: "Feb", newPatients: 10, oldPatients: 25},
        {month: "Mar", newPatients: 4, oldPatients: 16},
        {month: "Apr", newPatients: 22, oldPatients: 18},
        {month: "May", newPatients: 8, oldPatients: 15},
        {month: "Jun", newPatients: 23, oldPatients: 10},
        {month: "Jul", newPatients: 12, oldPatients: 24},
        {month: "Aug", newPatients: 10, oldPatients: 4},
        {month: "Sep", newPatients: 11, oldPatients: 2},
        {month: "Oct", newPatients: 15, oldPatients: 7},
        {month: "Nov", newPatients: 4, oldPatients: 14},
        {month: "Dec", newPatients: 2, oldPatients: 16},
    ]
};

const commonDiseasesMonthly = [
    {month: "Jan", cholesteatoma: 100, sinusitis: 50, pharyngitis: 120, foreignBodies: 25},
    {month: "Feb", cholesteatoma: 120, sinusitis: 80, pharyngitis: 110, foreignBodies: 30},
    {month: "Mar", cholesteatoma: 90, sinusitis: 60, pharyngitis: 140, foreignBodies: 20},
    {month: "Apr", cholesteatoma: 130, sinusitis: 70, pharyngitis: 160, foreignBodies: 15},
    {month: "May", cholesteatoma: 150, sinusitis: 90, pharyngitis: 180, foreignBodies: 11},
    {month: "Jun", cholesteatoma: 140, sinusitis: 85, pharyngitis: 150, foreignBodies: 18},
    {month: "Jul", cholesteatoma: 160, sinusitis: 95, pharyngitis: 170, foreignBodies: 22},
    {month: "Aug", cholesteatoma: 170, sinusitis: 100, pharyngitis: 160, foreignBodies: 24},
    {month: "Sep", cholesteatoma: 180, sinusitis: 110, pharyngitis: 140, foreignBodies: 27},
    {month: "Oct", cholesteatoma: 190, sinusitis: 120, pharyngitis: 130, foreignBodies: 20},
    {month: "Nov", cholesteatoma: 200, sinusitis: 130, pharyngitis: 120, foreignBodies: 23},
    {month: "Dec", cholesteatoma: 210, sinusitis: 140, pharyngitis: 110, foreignBodies: 26},
];

const commonDiseasesWeekly = [
    {day: "Mon", cholesteatoma: 3, sinusitis: 1, pharyngitis: 5, foreignBodies: 1},
    {day: "Tue", cholesteatoma: 2, sinusitis: 2, pharyngitis: 4, foreignBodies: 2},
    {day: "Wed", cholesteatoma: 4, sinusitis: 1, pharyngitis: 6, foreignBodies: 1},
    {day: "Thu", cholesteatoma: 5, sinusitis: 3, pharyngitis: 3, foreignBodies: 0},
    {day: "Fri", cholesteatoma: 3, sinusitis: 2, pharyngitis: 2, foreignBodies: 1},
    {day: "Sat", cholesteatoma: 2, sinusitis: 1, pharyngitis: 5, foreignBodies: 2},
    {day: "Sun", cholesteatoma: 4, sinusitis: 2, pharyngitis: 3, foreignBodies: 1},
];


// Mock data for reference
// const patientsList = [
//     {id: 1, name: "Nimal Perera", doctor: "Dr. Janaka Wijesinghe", date: "12 Jan 2022", disease: "Cholesteatoma"},
//     {id: 2, name: "Kamal Rajapaksha", doctor: "Dr. Sanduni Jayawardena", date: "13 Jan 2022", disease: "Sinusitis"},
//     {id: 3, name: "Sanduni Silva", doctor: "Dr. Mahesh Abeykoon", date: "14 Jan 2022", disease: "Pharyngitis"},
//     {id: 4, name: "Amal Fernando", doctor: "Dr. Nadeesha Karunaratne", date: "15 Jan 2022", disease: "Foreign Bodies"},
// ];

const doctorsList = [
    {name: "Dr. Janaka Wijesinghe", status: "Available"},
    {name: "Dr. Sanduni Jayawardena", status: "Available"},
    {name: "Dr. Mahesh Abeykoon", status: "Absent"},
    {name: "Dr. Nadeesha Karunaratne", status: "Absent"},
];

const DoctorDashboard: NextPage = () => {

    const [isMonthly, setIsMonthly] = useState<boolean>(true);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const {notifyError, notifySuccess} = useToast();

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    useEffect(() => {
        const fetchPatients = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const patients = await PatientService.getAllPatients();
                if (patients) {
                    setPatients(patients);
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

        fetchPatients().then();
    }, [notifyError]);

    return (
        <section className="bg-blue-50 min-h-screen px-4">
            <div className="flex py-8 justify-between">
                <h1 className="text-slate-600 text-3xl font-bold text-center">
                    Dashboard
                </h1>
            </div>
            <div className="space-y-6">
                <div className="grid grid-cols-4 gap-4">
                    {summaryStats.map((stat, idx) => (
                        <Card key={idx} className="p-4 text-center bg-white shadow-md">
                            <h2 className="text-lg font-semibold">{stat.title}</h2>
                            <p className="text-xl font-bold text-blue-500">{stat.value}</p>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div id="report-slider" className="w-full">
                        <Card className="p-4 bg-white shadow-md">
                            <Swiper
                                modules={[Autoplay, Navigation, Pagination]}
                                spaceBetween={20}
                                slidesPerView={1}
                                autoplay={{delay: 3000, disableOnInteraction: false}}
                                pagination={{clickable: true}}
                                loop
                            >
                                {[cholesteatomaData, sinusitisData].map((data, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="mb-8">
                                            <h2 className="text-lg font-semibold mb-3">{data.name}</h2>
                                            <ResponsiveContainer width="100%" height={250}>
                                                <LineChart data={data.data}>
                                                    <XAxis dataKey="month"/>
                                                    <YAxis/>
                                                    <Tooltip/>
                                                    <Legend/>
                                                    <Line
                                                        type="monotone"
                                                        dataKey="newPatients"
                                                        stroke="#118ef5"
                                                        name="New Patients"
                                                    />
                                                    <Line
                                                        type="monotone"
                                                        dataKey="oldPatients"
                                                        stroke="#ff4d4f"
                                                        name="Old Patients"
                                                    />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </Card>
                    </div>

                    <Card className="p-4 bg-white shadow-md">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold mb-3">
                                {isMonthly ? 'Monthly' : 'Daily'} Diseases Report
                            </h2>
                            <div className="mb-4">
                                <Button
                                    onClick={() => setIsMonthly(!isMonthly)}
                                    className="text-blue-900 font-semibold"
                                >
                                    {isMonthly ? 'Daily Report' : 'Monthly Report'}
                                </Button>
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={isMonthly ? commonDiseasesMonthly : commonDiseasesWeekly}>
                                <XAxis dataKey={isMonthly ? "month" : "day"}/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend/>
                                <Bar dataKey="cholesteatoma" fill="#8884d8" name="Cholesteatoma"/>
                                <Bar dataKey="sinusitis" fill="#82ca9d" name="Sinusitis"/>
                                <Bar dataKey="pharyngitis" fill="#face5c" name="Pharyngitis"/>
                                <Bar dataKey="foreignBodies" fill="#d771ff" name="Foreign Bodies"/>
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </div>

                <div className="flex flex-row gap-4">
                    <div className="flex-1">
                        <Card className="p-4 bg-white shadow-md">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">Patients List</h2>
                                <Link href="/doctor/patients">
                                    <Button className="bg-blue-900 text-white">
                                        View All Details
                                    </Button>
                                </Link>
                            </div>
                            {error && (
                                <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">
                                    {error}
                                </div>
                            )}
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Patient ID</TableHead>
                                        <TableHead>Patient Name</TableHead>
                                        <TableHead>Gender</TableHead>
                                        <TableHead>Registered Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {patients.length > 0 ? (
                                        patients.slice(0, 5).map((patient) => (
                                            <TableRow key={patient._id}>
                                                <TableCell>{patient.patientId ?? patient._id?.substring(0, 8)}</TableCell>
                                                <TableCell>{toTitleCase(patient.name)}</TableCell>
                                                <TableCell>{toTitleCase(patient.gender)}</TableCell>
                                                <TableCell>{patient.createdAt ? formatDate(patient.createdAt) : "N/A"}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-8">
                                                {isLoading ? "Loading patients..." : "No patients found"}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </Card>
                    </div>
                    <div className="flex-1">
                        <Card className="p-4 bg-white shadow-md">
                            <h2 className="text-lg font-semibold">Doctors List</h2>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Doctor Name</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {doctorsList.map((doctor, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell>{doctor.name}</TableCell>
                                            <TableCell
                                                className={doctor.status === "Available" ? "text-green-500" : "text-red-500"}>
                                                {doctor.status}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>
                    </div>
                </div>
            </div>

            <LoadingModal isOpen={isLoading} text="Loading patients..." imagePath="/images/loading-circle.gif"/>
        </section>
    );
};

export default DoctorDashboard;
