"use client";

import {NextPage} from "next";
import React, {useEffect, useState} from "react";
import {PharyngitisAnalyzeService} from "@/services/PharyngitisAnalyzeService";
import {Pharyngitis} from "@/models/Pharyngitis";
import Image from "next/image";
import {ApiUtils} from '@/services/api-service/ApiUtils';
import LoadingMessage from '@/components/loaders/LoadingMessage';
import {OctagonAlert} from 'lucide-react';
import ReactModal from "react-modal";
import {formatToShortDateTime} from '@/utils/date-formatters';
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

const PharyngitisListPage: NextPage = () => {

    const [pharyngitisList, setPharyngitisList] = useState<Pharyngitis[]>([]);
    const [filteredPharyngitisList, setFilteredPharyngitisList] = useState<Pharyngitis[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [statusFilter, setStatusFilter] = useState<string>("");
    const [stageFilter, setStageFilter] = useState<string>("");
    const [patientIdSearch, setPatientIdSearch] = useState<string>("");

    useEffect(() => {
        (async () => {
            await fetchPharyngitisList();
        })();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [statusFilter, stageFilter, pharyngitisList, patientIdSearch]);

    const fetchPharyngitisList = async () => {
        setIsLoading(true);
        try {
            const response = await PharyngitisAnalyzeService.getAllPharyngitis();
            if (response.success && response.data) {
                setPharyngitisList(response.data as Pharyngitis[]);
            }
        } catch (error) {
            console.error("Error fetching pharyngitis list:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const applyFilters = () => {
        let filteredList = pharyngitisList;
        if (statusFilter && statusFilter !== "all") {
            filteredList = filteredList.filter(item => (
                item.status?.toLowerCase() === statusFilter.toLowerCase()
            ));
        }
        if (stageFilter && stageFilter !== "all") {
            filteredList = filteredList.filter(item => (
                item.diagnosisResult?.stage?.toLowerCase().includes(stageFilter.toLowerCase())
            ));
        }
        if (patientIdSearch) {
            filteredList = filteredList.filter(item =>
                item.patientId.toLowerCase().includes(patientIdSearch.toLowerCase())
            );
        }
        setFilteredPharyngitisList(filteredList);
    };

    return (
        <>
            <section className="bg-blue-50 min-h-screen px-4 py-8">
                <div className="flex pt-8 pb-3 justify-between">
                    <h1 className="text-slate-600 text-3xl font-bold text-center">
                        Pharyngitis Diagnosis History
                    </h1>
                    <div className="flex justify-end gap-x-3">
                        <Input
                            type="text"
                            value={patientIdSearch}
                            onChange={(e) => setPatientIdSearch(e.target.value)}
                            placeholder="Search by Patient ID"
                            className="w-60 bg-white border border-gray-300 rounded-md"
                        />
                        <Select onValueChange={setStatusFilter} value={statusFilter}>
                            <SelectTrigger className="w-40 bg-white border border-gray-300 rounded-md">
                                <SelectValue placeholder="All Status"/>
                            </SelectTrigger>
                            <SelectContent className="bg-white cursor-pointer">
                                <SelectItem className="cursor-pointer" value="all">All Status</SelectItem>
                                <SelectItem className="cursor-pointer" value="diagnosed">Diagnosed</SelectItem>
                                <SelectItem className="cursor-pointer" value="failed">Failed</SelectItem>
                                <SelectItem className="cursor-pointer" value="pending">Pending</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select onValueChange={setStageFilter} value={stageFilter}>
                            <SelectTrigger className="w-40 bg-white border border-gray-300 rounded-md">
                                <SelectValue placeholder="All Stages"/>
                            </SelectTrigger>
                            <SelectContent className="bg-white cursor-pointer">
                                <SelectItem className="cursor-pointer" value="all">All Stages</SelectItem>
                                <SelectItem className="cursor-pointer" value="Normal">Normal</SelectItem>
                                <SelectItem className="cursor-pointer" value="Moderate">Moderate</SelectItem>
                                <SelectItem className="cursor-pointer" value="Tonsillitis">Tonsillitis</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {isLoading ? (
                    <LoadingMessage/>
                ) : (pharyngitisList.length === 0 || filteredPharyngitisList.length === 0) ? (
                    <>
                        <div className="flex justify-center items-center h-full min-h-[250px] mt-6">
                            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md text-center">
                                <div className="flex items-center justify-center mb-4">
                                    <OctagonAlert className="stroke-2 w-10 h-10 text-red-500 stroke-current"/>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-700">No Records Found</h2>
                                <p className="text-gray-500 mt-2 leading-relaxed">
                                    There are no pharyngitis records available at the moment.
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div>
                        <div className="text-center mb-2">
                            <span className="text-sm font-light">
                                Showing &nbsp;
                                {filteredPharyngitisList.length === pharyngitisList.length
                                    ? `${pharyngitisList.length} items`
                                    : `${filteredPharyngitisList.length} items from ${pharyngitisList.length} items`}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
                            {filteredPharyngitisList.map((item) => (
                                <div key={item._id} className="bg-white p-4 rounded-lg shadow-md">
                                    <h2 className="text-lg font-semibold mb-2">Patient ID: {item.patientId}</h2>
                                    <div className="flex gap-2">
                                        <PharyngitisImage
                                            uploadId={item.throatImage}
                                        />
                                        <div>
                                            <p className="mt-2 text-gray-700">
                                                <strong>Diagnosis: </strong>
                                                {item.diagnosisResult?.isPharyngitis ? "Positive" : "Negative"}
                                            </p>
                                            <p className="text-gray-700">
                                                <strong>Stage: </strong>
                                                {item.diagnosisResult?.stage || "N/A"}
                                            </p>
                                            <p className="text-gray-700">
                                                <strong>Confidence Score: </strong>
                                                {
                                                    item.diagnosisResult?.confidenceScore
                                                        ? `${(item.diagnosisResult.confidenceScore * 100).toFixed(2)}%`
                                                        : "N/A"
                                                }
                                            </p>
                                            <p className="text-gray-700">
                                                <strong>Last Update: </strong>
                                                {item.updatedAt
                                                    ? formatToShortDateTime(item.updatedAt.toString())
                                                    : "N/A"}
                                            </p>
                                            <p className={`mt-2 font-semibold ${item.status === "diagnosed"
                                                ? "text-green-500" : item.status === "failed" ? "text-red-600" : "text-yellow-700"}`}
                                            >
                                                Status: {item.status || "Pending"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};

const PharyngitisImage = ({uploadId}: { uploadId: string }) => {

    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

    return (
        <>
            <Image
                src={
                    ApiUtils.publicUrl(`diagnosis/pharyngitis/image/${uploadId}`)
                    ?? "/images/placeholders/200x200.jpg"
                }
                alt="Endoscopy Image"
                width={200}
                height={200}
                className="rounded-md w-28 h-auto cursor-pointer"
                onClick={() => setModalIsOpen(true)}
                title="Open Image"
            />

            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9000]"
                overlayClassName="fixed inset-0 bg-black bg-opacity-80 z-[9000]"
            >
                <div className="bg-transparent rounded-md p-4">
                    <div className="absolute right-4 top-0 flex justify-end">
                        <button
                            onClick={() => setModalIsOpen(false)}
                            className="mt-4 bg-red-400 text-white px-2 rounded hover:bg-red-700 text-3xl"
                        >
                            &times;
                        </button>
                    </div>
                    <Image
                        src={
                            ApiUtils.publicUrl(`diagnosis/pharyngitis/image/${uploadId}`)
                            ?? "/images/placeholders/200x200.jpg"
                        }
                        alt="Zoomed Preview"
                        className="rounded-md w-auto h-screen"
                        width={1000}
                        height={1000}
                    />
                </div>
            </ReactModal>
        </>
    );
};

export default PharyngitisListPage;
