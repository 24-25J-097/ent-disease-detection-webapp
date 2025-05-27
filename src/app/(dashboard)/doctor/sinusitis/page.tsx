"use client";

import {NextPage} from "next";
import React, {useEffect, useState} from "react";
import {SinusitisAnalyzeService} from "@/services/SinusitisAnalyzeService";
import {Sinusitis} from "@/models/Sinusitis";
import Image from "next/image";
import {ApiUtils} from '@/services/api-service/ApiUtils';
import LoadingMessage from '@/components/loaders/LoadingMessage';
import {OctagonAlert} from 'lucide-react';
import ReactModal from "react-modal";
import {formatToShortDateTime} from '@/utils/date-formatters';

const SinusitisListPage: NextPage = () => {

    const [sinusitisList, setSinusitisList] = useState<Sinusitis[]>([]);
    const [filteredSinusitisList, setFilteredSinusitisList] = useState<Sinusitis[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [statusFilter, setStatusFilter] = useState<string>("");
    const [stageFilter, setStageFilter] = useState<string>("");
    const [patientIdSearch, setPatientIdSearch] = useState<string>("");

    useEffect(() => {
        (async () => {
            await fetchSinusitisList();
        })();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [statusFilter, stageFilter, sinusitisList, patientIdSearch]);

    const fetchSinusitisList = async () => {
        setIsLoading(true);
        try {
            const response = await SinusitisAnalyzeService.getAllSinusitis();
            if (response.success && response.data) {
                setSinusitisList(response.data as Sinusitis[]);
            }
        } catch (error) {
            console.error("Error fetching sinusitis list:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const applyFilters = () => {
        let filteredList = sinusitisList;
        if (statusFilter) {
            filteredList = filteredList.filter(item => item.status === statusFilter);
        }
        if (stageFilter) {
            filteredList = filteredList.filter(item => (
                item.diagnosisResult?.severity?.includes(stageFilter)
            ));
        }
        if (patientIdSearch) {
            filteredList = filteredList.filter(item =>
                item.patientId.toLowerCase().includes(patientIdSearch.toLowerCase())
            );
        }
        setFilteredSinusitisList(filteredList);
    };

    return (
        <>
            <section className="bg-blue-50 min-h-screen px-4 py-8">
                <div className="flex pt-8 pb-3 justify-between">
                    <h1 className="text-slate-600 text-3xl font-bold text-center">
                        Sinusitis Identification List
                    </h1>
                    <div className="flex justify-end gap-x-3">
                        <input
                            type="text"
                            value={patientIdSearch}
                            onChange={(e) => setPatientIdSearch(e.target.value)}
                            placeholder="Search by Patient ID"
                            className="border p-2 rounded-md"
                        />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border rounded-md w-40"
                        >
                            <option value="">All Status</option>
                            <option value="diagnosed">Diagnosed</option>
                            <option value="failed">Failed</option>
                            <option value="pending">Pending</option>
                        </select>
                        <select
                            value={stageFilter}
                            onChange={(e) => setStageFilter(e.target.value)}
                            className="px-4 py-2 border rounded-md w-40"
                        >
                            <option value="">All Stages</option>
                            <option value="Mild">Healthy/Mild</option>
                            <option value="Moderate">Moderate</option>
                            <option value="Severe">Severe</option>
                        </select>
                    </div>
                </div>

                {isLoading ? (
                    <LoadingMessage/>
                ) : filteredSinusitisList.length === 0 ? (
                    <>
                        <div className="flex justify-center items-center h-full min-h-[250px] mt-6">
                            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md text-center">
                                <div className="flex items-center justify-center mb-4">
                                    <OctagonAlert className="stroke-2 w-10 h-10 text-red-500 stroke-current"/>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-700">No Records Found</h2>
                                <p className="text-gray-500 mt-2 leading-relaxed">
                                    There are no sinusitis records available at the moment.
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div>
                        <div className="text-center mb-2">
                            <span className="text-sm font-light">
                                Showing &nbsp;
                                {filteredSinusitisList.length === sinusitisList.length
                                    ? `${sinusitisList.length} items`
                                    : `${filteredSinusitisList.length} items from ${sinusitisList.length} items`}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pb-6">
                            {filteredSinusitisList.map((item) => (
                                <div key={item._id} className={`bg-white p-4 rounded-lg shadow-md ${ typeof item.accepted !== 'undefined' && !item.accepted ? '!bg-red-200 !text-white' : ''}`}>
                                    <h2 className="text-lg font-semibold mb-2">Patient ID: {item.patientId}</h2>
                                    <div className="flex gap-2 text-gray-700">
                                        <SinusitisImage
                                            uploadId={item.watersViewXrayImage}
                                        />
                                        <div>
                                            <p className="mt-2 ">
                                                <strong>Diagnosis: </strong>
                                                {item.diagnosisResult?.isSinusitis ? "Positive" : "Negative"}
                                            </p>
                                            <p className="">
                                                <strong>Severity: </strong>
                                                {item.diagnosisResult?.severity || "N/A"}
                                            </p>
                                            <p className="">
                                                <strong>Confidence Score: </strong>
                                                {
                                                    item.diagnosisResult?.confidenceScore
                                                        ? `${(item.diagnosisResult.confidenceScore * 100).toFixed(2)}%`
                                                        : "N/A"
                                                }
                                            </p>
                                            <p className="">
                                                <strong>Last Update: </strong>
                                                {item.updatedAt
                                                    ? formatToShortDateTime(item.updatedAt.toString())
                                                    : "N/A"}
                                            </p>
                                            <p className={`mt-2 font-semibold ${item.status === "diagnosed"
                                                ? "text-green-600" : item.status === "failed" ? "text-red-600" : "text-yellow-600"}`}>
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

const SinusitisImage = ({uploadId}: { uploadId: string }) => {

    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

    return (
        <>
            <Image
                src={
                    ApiUtils.publicUrl(`diagnosis/sinusitis/image/${uploadId}`)
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
                            ApiUtils.publicUrl(`diagnosis/sinusitis/image/${uploadId}`)
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

export default SinusitisListPage;
