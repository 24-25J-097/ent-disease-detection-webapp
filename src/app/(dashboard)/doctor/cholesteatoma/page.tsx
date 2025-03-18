"use client";

import {NextPage} from "next";
import React, {useEffect, useState} from "react";
import {CholesteatomaDiagnosisService} from "@/services/CholesteatomaDiagnosisService";
import {Cholesteatoma} from "@/models/Cholesteatoma";
import Image from "next/image";
import {ApiUtils} from '@/services/api-service/ApiUtils';
import LoadingMessage from '@/components/loaders/LoadingMessage';
import {OctagonAlert} from 'lucide-react';
import ReactModal from "react-modal";
import {formatToShortDateTime} from '@/utils/date-formatters';

const CholesteatomaListPage: NextPage = () => {

    const [cholesteatomaList, setCholesteatomaList] = useState<Cholesteatoma[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            await fetchCholesteatomaList();
        })();
    }, []);

    const fetchCholesteatomaList = async () => {
        setIsLoading(true);
        try {
            const response = await CholesteatomaDiagnosisService.getAllCholesteatoma();
            if (response.success && response.data) {
                setCholesteatomaList(response.data as Cholesteatoma[]);
            }
        } catch (error) {
            console.error("Error fetching cholesteatoma list:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <section className="bg-blue-50 min-h-screen px-4 py-8">
                <div className="flex py-8 justify-between">
                    <h1 className="text-slate-600 text-3xl font-bold text-center">
                        Cholesteatoma Identification List
                    </h1>
                </div>
                {isLoading ? (
                    <LoadingMessage/>
                ) : cholesteatomaList.length === 0 ? (
                    <>
                        <div className="flex justify-center items-center h-full min-h-[250px]">
                            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md text-center">
                                <div className="flex items-center justify-center mb-4">
                                    <OctagonAlert className="stroke-2 w-10 h-10 text-red-500 stroke-current"/>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-700">No Records Found</h2>
                                <p className="text-gray-500 mt-2 leading-relaxed">
                                    There are no cholesteatoma records available at the moment.
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pb-6">
                        {cholesteatomaList.map((item) => (
                            <div key={item._id} className="bg-white p-4 rounded-lg shadow-md">
                                <h2 className="text-lg font-semibold mb-2">Patient ID: {item.patientId}</h2>
                                <div className="flex gap-2">
                                    <CholesteatomaImage
                                        uploadId={item.endoscopyImage}
                                    />
                                    <div>
                                        <p className="mt-2 text-gray-700">
                                            <strong>Diagnosis: </strong>
                                            {item.diagnosisResult?.isCholesteatoma ? "Positive" : "Negative"}
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
                                            ? "text-green-600" : item.status === "failed" ? "text-red-600" : "text-yellow-600"}`}>
                                            Status: {item.status || "Pending"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </>
    );
};

const CholesteatomaImage = ({uploadId}: { uploadId: string }) => {

    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

    return (
        <>
            <Image
                src={
                    ApiUtils.publicUrl(`diagnosis/cholesteatoma/image/${uploadId}`)
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
                            ApiUtils.publicUrl(`diagnosis/cholesteatoma/image/${uploadId}`)
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

export default CholesteatomaListPage;
