"use client";

import {NextPage} from "next";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Card} from '@/components/ui/card';
import {Button} from "@/components/ui/button";
import React from "react";

const patientsList = [
    {
        id: "P-001",
        name: "Nimal Perera",
        age: 45,
        gender: "Male",
        diagnosis: "Cholesteatoma",
        admissionDate: "12 Jan 2022"
    },
    {
        id: "P-002",
        name: "Kamal Rajapaksha",
        age: 52,
        gender: "Male",
        diagnosis: "Sinusitis",
        admissionDate: "13 Jan 2022"
    },
    {
        id: "P-003",
        name: "Sanduni Silva",
        age: 38,
        gender: "Female",
        diagnosis: "Pharyngitis",
        admissionDate: "14 Jan 2022"
    },
    {
        id: "P-004",
        name: "Amal Fernando",
        age: 29,
        gender: "Male",
        diagnosis: "Foreign Bodies",
        admissionDate: "15 Jan 2022"
    },
    {
        id: "P-005",
        name: "Ruwan Senanayake",
        age: 60,
        gender: "Male",
        diagnosis: "Otitis Media",
        admissionDate: "16 Jan 2022"
    },
    {
        id: "P-006",
        name: "Mihiri Jayawardena",
        age: 33,
        gender: "Female",
        diagnosis: "Tonsillitis",
        admissionDate: "17 Jan 2022"
    },
    {
        id: "P-007",
        name: "Sunil Peris",
        age: 47,
        gender: "Male",
        diagnosis: "Hearing Loss",
        admissionDate: "18 Jan 2022"
    },
    {
        id: "P-008",
        name: "Chathurika Weerasinghe",
        age: 41,
        gender: "Female",
        diagnosis: "Rhinitis",
        admissionDate: "19 Jan 2022"
    },
    {
        id: "P-009",
        name: "Tharindu Gamage",
        age: 36,
        gender: "Male",
        diagnosis: "Ear Infection",
        admissionDate: "20 Jan 2022"
    },
    {
        id: "P-010",
        name: "Dilini Wickramasinghe",
        age: 50,
        gender: "Female",
        diagnosis: "Deviated Septum",
        admissionDate: "21 Jan 2022"
    }
];

const PatientsPage: NextPage = () => {

    return (
        <section className="bg-blue-50 min-h-screen px-4">
            <div className="flex py-8 justify-between items-center">
                <h1 className="text-slate-600 text-3xl font-bold text-center">Patient List</h1>
                <Button className="bg-blue-900 text-white">Add New Patient</Button>
            </div>

            <div>
                <Card className="p-6 bg-white shadow-md">
                    <Table className="w-full border-collapse">
                        <TableHeader>
                            <TableRow className="bg-gray-100">
                                <TableHead className="text-left p-3">Patient ID</TableHead>
                                <TableHead className="text-left p-3">Name</TableHead>
                                <TableHead className="text-left p-3">Age</TableHead>
                                <TableHead className="text-left p-3">Gender</TableHead>
                                <TableHead className="text-left p-3">Diagnosis</TableHead>
                                <TableHead className="text-left p-3">Admission Date</TableHead>
                                <TableHead className="text-center p-3">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {patientsList.map((patient) => (
                                <TableRow key={patient.id} className="border-b hover:bg-gray-50">
                                    <TableCell className="p-3">{patient.id}</TableCell>
                                    <TableCell className="p-3">{patient.name}</TableCell>
                                    <TableCell className="p-3">{patient.age}</TableCell>
                                    <TableCell className="p-3">{patient.gender}</TableCell>
                                    <TableCell className="p-3">{patient.diagnosis}</TableCell>
                                    <TableCell className="p-3">{patient.admissionDate}</TableCell>
                                    <TableCell className="p-3 text-center">
                                        <Button
                                            variant="outline"
                                            className="text-blue-600 border-blue-600 mr-2"
                                        >
                                            View
                                        </Button>
                                        <Button variant="destructive">Manage</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </section>
    );
};

export default PatientsPage;
