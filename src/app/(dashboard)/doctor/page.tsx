"use client";

import {NextPage} from "next";
import React from "react";
import {Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend, LineChart, Line} from "recharts";
import {Card} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import "react-toastify/dist/ReactToastify.css";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Navigation, Pagination} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
    ]
};

const sinusitisData = {
    name: "Sinusitis Report",
    data: [
        {month: "Jan", newPatients: 15, oldPatients: 20},
        {month: "Feb", newPatients: 10, oldPatients: 25},
        {month: "Mar", newPatients: 18, oldPatients: 30},
        {month: "Apr", newPatients: 22, oldPatients: 18},
        {month: "May", newPatients: 28, oldPatients: 15},
        {month: "Jun", newPatients: 35, oldPatients: 10},
    ]
};

const commonDiseasesData = [
    {day: "Mon", cholesteatoma: 100, sinusitis: 50, pharyngitis: 120, foreignBodies: 25},
    {day: "Tue", cholesteatoma: 120, sinusitis: 80, pharyngitis: 110, foreignBodies: 30},
    {day: "Wed", cholesteatoma: 90, sinusitis: 60, pharyngitis: 140, foreignBodies: 20},
    {day: "Thu", cholesteatoma: 130, sinusitis: 70, pharyngitis: 160, foreignBodies: 15},
    {day: "Fri", cholesteatoma: 150, sinusitis: 90, pharyngitis: 180, foreignBodies: 11},
];

const patientsList = [
    {id: 1, name: "Nimal Perera", doctor: "Dr. Janaka Wijesinghe", date: "12 Jan 2022", disease: "Cholesteatoma"},
    {id: 2, name: "Kamal Rajapaksha", doctor: "Dr. Sanduni Jayawardena", date: "13 Jan 2022", disease: "Sinusitis"},
    {id: 3, name: "Sanduni Silva", doctor: "Dr. Mahesh Abeykoon", date: "14 Jan 2022", disease: "Pharyngitis"},
    {id: 4, name: "Amal Fernando", doctor: "Dr. Nadeesha Karunaratne", date: "15 Jan 2022", disease: "Foreign Bodies"},
];

const doctorsList = [
    {name: "Dr. Janaka Wijesinghe", status: "Available"},
    {name: "Dr. Sanduni Jayawardena", status: "Available"},
    {name: "Dr. Mahesh Abeykoon", status: "Absent"},
    {name: "Dr. Nadeesha Karunaratne", status: "Absent"},
];

const DoctorDashboard: NextPage = () => {

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
                        <h2 className="text-lg font-semibold mb-3">Common Diseases Report</h2>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={commonDiseasesData}>
                                <XAxis dataKey="day"/>
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
                            <h2 className="text-lg font-semibold">Patients List</h2>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>#</TableHead>
                                        <TableHead>Patient Name</TableHead>
                                        <TableHead>Assigned Doctor</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Diseases</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {patientsList.map((patient) => (
                                        <TableRow key={patient.id}>
                                            <TableCell>{patient.id}</TableCell>
                                            <TableCell>{patient.name}</TableCell>
                                            <TableCell>{patient.doctor}</TableCell>
                                            <TableCell>{patient.date}</TableCell>
                                            <TableCell>{patient.disease}</TableCell>
                                        </TableRow>
                                    ))}
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
        </section>
    );
};

export default DoctorDashboard;
