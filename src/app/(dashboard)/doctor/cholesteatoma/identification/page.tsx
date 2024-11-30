"use client";

import React, { useState } from "react";
import TextInput from "@/components/inputs/TextInput";
import TextAreaInput from "@/components/inputs/TextAreaInput";
import { NextPage } from "next";
import { If } from "@/components/utils/If";
import Image from 'next/image';
import ReactModal from "react-modal";
import {CholesteatomaDiagnosisData, DiagnosisResult} from '@/types/service/Diagnosis';
import {DiagnosisService} from '@/services/DiagnosisService';
import {useToast} from '@/providers/ToastProvider';
import {motion} from "framer-motion";

const IdentificationPage: NextPage = () => {

    const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);
    const [patientId, setPatientId] = useState<string>("");
    const [additionalInfo, setAdditionalInfo] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [hasValidationErr, setHasValidationErr] = useState<boolean[]>([false, false]);
    const [patientIdErrMsg, setPatientIdErrMsg] = useState<string>("");
    const [fileErrMsg, setFileErrMsg] = useState<string>("");
    const [isDisable, setIsDisable] = useState<boolean>(false);
    const [errors, setErrors] = useState<any>(null);

    const { notifySuccess, notifyError } = useToast();

    const validateFields = () => {
        setHasValidationErr([]);
        if (!patientId) {
            const errorText = "Please enter the Patient ID.";
            setPatientIdErrMsg(errorText);
            setTimeout(() => setPatientIdErrMsg(""), 3000);
            hasValidationErr.push(true);
        } else if (patientId.length < 5) {
            const errorText = "Patient ID must be at least 5 characters long.";
            setPatientIdErrMsg(errorText);
            setTimeout(() => setPatientIdErrMsg(""), 3000);
            hasValidationErr.push(true);
        }
        if (!file) {
            setFileErrMsg("Please choose the image file.");
            setTimeout(() => setFileErrMsg(""), 3000);
            hasValidationErr.push(true);
        } else if (!file.type.startsWith("image/")) {
            setFileErrMsg("Only image files are allowed.");
            setTimeout(() => setFileErrMsg(""), 3000);
            hasValidationErr.push(true);
        } else if (file.size > 10 * 1024 * 1024) {
            setFileErrMsg("Image file size must be less than 10MB.");
            setTimeout(() => setFileErrMsg(""), 3000);
            hasValidationErr.push(true);
        }
        return hasValidationErr;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!validateFields()) return;

        const diagnosisData: CholesteatomaDiagnosisData = {
            patientId: patientId,
            additionalInfo: additionalInfo,
            endoscopyImage: file!
        }

        try {
            setIsDisable(true);
            const response = await DiagnosisService.cholesteatomaDiagnosis(diagnosisData);
            if (response.success && response.data) {
                const results = response.data as DiagnosisResult;
                notifySuccess(response.message);
                setIsDisable(false);
                setDiagnosisResult({
                    isCholesteatoma: results.isCholesteatoma,
                    stage: results.stage,
                    suggestions: results.suggestions,
                });
            }
        } catch (error:any) {
            setIsDisable(false);
            if (error.response?.status >= 500) {
                setErrors("An unexpected error occurred. Please try again.");
            } else {
                setErrors(error.response.data.message);
                notifyError(error.response.data.message);
            }
        }

        // const formData = new FormData();
        // formData.append("patientId", patientId);
        // formData.append("additionalInfo", additionalInfo);
        // formData.append("endoscopyImage", file!);

        console.log("Form submitted with:", {patientId, additionalInfo, file});
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedFile = event.target.files![0];
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    return (
        <>
            <section className="bg-blue-50 min-h-screen px-4">
                <div className="flex py-8 justify-between">
                    <h1 className="text-slate-600 text-3xl font-bold text-center">
                        Cholesteatoma Identification
                    </h1>
                    <div>
                        <button
                            type="button"
                            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none"
                            onClick={() => alert("Redirecting to Patient List...")}
                        >
                            Patient List
                        </button>
                    </div>
                </div>
                <div className="flex items-start justify-center gap-8">
                    <div
                        className="relative bg-white rounded-xl shadow-lg p-8 w-full max-w-lg min-h-[700px] flex flex-col"
                    >
                        <h3 className="text-blue-500 text-2xl font-bold mb-8 text-start">
                            Upload Middle Ear Endoscopy
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <If condition={!!errors}>
                                <motion.div
                                    className="bg-red-100 text-red-700 p-4 rounded-2xl border-l-8 border-r-8 border-x-red-200"
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{duration: 0.5}}
                                >
                                    {errors}
                                </motion.div>
                            </If>
                            <div>
                                <TextInput
                                    name="patientId"
                                    label="Patient Id *"
                                    type="text"
                                    value={patientId}
                                    placeholder="Enter Patient ID"
                                    inputClassName="w-full"
                                    onTextChange={(e) => setPatientId(e.target.value)}
                                    design="regular-form"
                                    errorMessage={patientIdErrMsg}
                                    disabled={isDisable}
                                />
                            </div>
                            <div>
                                <TextAreaInput
                                    id="additional-info"
                                    name="additionalInfo"
                                    label="Additional Information"
                                    placeholder="Enter any additional details (optional)"
                                    value={additionalInfo}
                                    onTextChange={(e) => setAdditionalInfo(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">
                                    Upload Image
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className={`w-full text-gray-600 p-2 rounded-md file:mr-4
                                file:py-2 file:px-4 file:border-0 file:rounded-md file:text-white file:bg-blue-900
                                file:cursor-pointer hover:file:bg-blue-700 
                                ${!!fileErrMsg ? "border border-red-500" : "border border-gray-300"}`}
                                />
                                <If condition={!!fileErrMsg}>
                                    <small className="text-red-500 px-2">{fileErrMsg}</small>
                                </If>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className={`bg-blue-600 text-white py-2 px-6 rounded-md focus:outline-none ${
                                        hasValidationErr.includes(true)
                                            ? "opacity-50 cursor-not-allowed"
                                            : "hover:bg-blue-700"
                                    }`}
                                    disabled={hasValidationErr.includes(true)}
                                >
                                    Diagnosis
                                </button>
                            </div>
                        </form>

                        <div
                            className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg min-h-[200px]
                            flex flex-col items-center mt-4"
                        >
                            <h4 className="text-blue-500 text-xl font-bold mb-4">Diagnosis Result</h4>
                            {diagnosisResult ? (
                                <div className="w-full text-gray-700 space-y-4">
                                    <p>
                                        <strong>Cholesteatoma Identified: </strong>
                                        {diagnosisResult.isCholesteatoma
                                            ? <span className="bg-red-500 rounded-md py-1 px-4 text-white">Yes</span>
                                            : <span className="bg-green-300 rounded-md py-1 px-4 text-white">No</span>
                                        }
                                    </p>
                                    <p>
                                        <strong>Current Stage: </strong>
                                        {diagnosisResult.stage}
                                    </p>
                                    <p>
                                        <strong>Suggestions: </strong>
                                        {diagnosisResult.suggestions}
                                    </p>
                                </div>
                            ) : (
                                <p className="text-gray-500 text-sm">No diagnosis available</p>
                            )}
                        </div>
                    </div>

                    <div
                        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl min-h-[700px]
                        flex flex-col items-center"
                    >
                        <h4 className="text-blue-500 text-xl font-bold mb-4">
                            Endoscopy Preview
                        </h4>
                        {imagePreview ? (
                            <Image
                                src={imagePreview}
                                alt="Selected Preview"
                                className="w-full rounded-md cursor-pointer"
                                width={100}
                                height={100}
                                onClick={() => setModalIsOpen(true)}
                            />
                        ) : (
                            <p className="text-gray-500 text-sm">No image selected</p>
                        )}
                    </div>
                </div>
            </section>

            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[5000]"
                overlayClassName="fixed inset-0 bg-black bg-opacity-80"
            >
                <div className="bg-transparent rounded-md p-4">
                    <div className="absolute right-4 top-0 flex justify-end">
                        <button
                            onClick={() => setModalIsOpen(false)}
                            className="mt-4 bg-red-400 text-white px-2 py-1 rounded hover:bg-red-700 text-3xl"
                        >
                            &times;
                        </button>
                    </div>
                    <Image
                        src={imagePreview}
                        alt="Zoomed Preview"
                        className="rounded-md"
                        width={800}
                        height={600}
                    />
                </div>
            </ReactModal>
        </>
    );
};

export default IdentificationPage;
