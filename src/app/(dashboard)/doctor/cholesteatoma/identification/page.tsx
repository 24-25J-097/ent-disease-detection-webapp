"use client";

import React, {useRef, useState} from "react";
import TextInput from "@/components/inputs/TextInput";
import TextAreaInput from "@/components/inputs/TextAreaInput";
import {NextPage} from "next";
import {If} from "@/components/utils/If";
import Image from 'next/image';
import ReactModal from "react-modal";
import {CholesteatomaDiagnosisData, DiagnosisAcceptance, DiagnosisResult} from '@/types/service/Diagnosis';
import {DiagnosisService} from '@/services/DiagnosisService';
import {useToast} from '@/providers/ToastProvider';
import {motion} from "framer-motion";
import {Cholesteatoma} from '@/models/Cholesteatoma';
import useRouterApp from '@/hooks/useRouterApp';
import {number} from 'prop-types';
import LoadingModal from '@/components/loaders/LoadingModal';

const IdentificationPage: NextPage = () => {

    const formRef = useRef(null);

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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoading2, setIsLoading2] = useState<boolean>(false);

    const router = useRouterApp();
    const {notifySuccess, notifyError} = useToast();

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
        setErrors(null);
        if (validateFields().includes(true)) return;

        const diagnosisData: CholesteatomaDiagnosisData = {
            patientId: patientId,
            additionalInfo: additionalInfo,
            endoscopyImage: file!
        };

        try {
            setIsLoading(true);
            setIsDisable(true);
            const response = await DiagnosisService.cholesteatomaDiagnosis(diagnosisData);
            if (response.success && response.data) {
                const results = response.data as Cholesteatoma;
                notifySuccess(response.message);
                setDiagnosisResult({
                    diagnosisId: results._id!,
                    isCholesteatoma: results.diagnosisResult!.isCholesteatoma!,
                    stage: results.diagnosisResult!.stage,
                    suggestions: results.diagnosisResult!.suggestions,
                    confidenceScore: results.diagnosisResult!.confidenceScore,
                    prediction: results.diagnosisResult!.prediction,
                });
            }
        } catch (error: any) {
            setIsDisable(false);
            if (error.response?.status >= 500) {
                setErrors("An unexpected error occurred. Please try again.");
            } else {
                setErrors(error.response.data.message);
                notifyError(error.response.data.message);
            }
        } finally {
            setIsLoading(false);
        }
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

    const handleDone = async (accept: boolean) => {
        try {
            setIsLoading2(true);
            setIsDisable(true);
            const data: DiagnosisAcceptance = {diagnosisId: diagnosisResult?.diagnosisId!, accept: accept};
            const response = await DiagnosisService.cholesteatomaDiagnosisAccept(data);
            if (response.success) {
                notifySuccess(response.message);
            }
        } catch (error) {
            if (error.response?.status >= 500) {
                setErrors("An unexpected error occurred. Please try again.");
            } else {
                setErrors(error.response.data.message);
                notifyError(error.response.data.message);
            }
        } finally {
            setIsDisable(false);
            setDiagnosisResult(null);
            setPatientId("");
            setAdditionalInfo("");
            setFile(null);
            setImagePreview("");
            formRef.current.reset();
            setIsLoading2(false);
            router.refresh();
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
                            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none"
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
                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
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
                                    disabled={isDisable}
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
                                    disabled={isDisable}
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
                                    disabled={hasValidationErr.includes(true) || isDisable}
                                >
                                    Diagnose
                                </button>
                            </div>
                        </form>

                        <div
                            className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg min-h-[200px]
                            flex flex-col items-center mt-4"
                        >
                            <h4 className="text-blue-500 text-xl font-bold mb-4">Diagnosis Result</h4>
                            {diagnosisResult ? (
                                diagnosisResult.prediction === 'invalid'
                                    ? <p className="text-gray-500 text-sm">
                                        <strong>Invalid: </strong>
                                        <span className="text-red-500 font-bold">
                                            An irrelevant image has been submitted.
                                        </span>
                                      </p>
                                    : <div className="w-full text-gray-700 space-y-4">
                                        <p>
                                            <strong>Cholesteatoma Identified: </strong>
                                            {diagnosisResult.isCholesteatoma
                                                ? <span
                                                    className="border border-red-500 rounded-md py-1 px-4 text-red-500"
                                                >
                                                    Yes
                                                </span>
                                                : <span
                                                    className="border border-green-300 rounded-md py-1 px-4 text-green-300"
                                                >
                                                    No
                                                </span>
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
                                        <p>
                                            <strong>Confidence Score: </strong>
                                            {diagnosisResult.confidenceScore == null
                                                ? 'N/A'
                                                : (Math.floor(diagnosisResult.confidenceScore * 100) / 100).toFixed(2)}
                                        </p>
                                        <div className="flex justify-end gap-x-2">
                                            <button
                                                type="submit"
                                                className={`bg-red-500 text-white py-1 px-6 rounded-md hover:bg-red-700 focus:outline-none`}
                                                onClick={() => handleDone(false)}
                                            >
                                                Reject
                                            </button>
                                            <button
                                                type="submit"
                                                className={`bg-green-500 text-white py-1 px-6 rounded-md hover:bg-green-700 focus:outline-none`}
                                                onClick={() => handleDone(true)}
                                            >
                                                Accept
                                            </button>
                                        </div>
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
            <LoadingModal isOpen={isLoading} text={"Analyzing"} imagePath={"/images/medical-analyzing.gif"} />
            <LoadingModal isOpen={isLoading2} imagePath={"/images/loading-circle.gif"} />
        </>
    );
};

export default IdentificationPage;
