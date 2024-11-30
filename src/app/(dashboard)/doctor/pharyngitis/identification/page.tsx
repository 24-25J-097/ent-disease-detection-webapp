"use client";

import React, {useState} from "react";
import {NextPage} from "next";
import {useToast} from '@/providers/ToastProvider';
import {PharyngitisAnalyzeService} from "@/services/PharyngitisAnalyzeService";
import {PharyngitisRequest, PharyngitisResult} from "@/types/service/PharyngitisResult";
import {If} from "@/components/utils/If";
import {motion} from "framer-motion";
import Image from 'next/image';
import ReactModal from "react-modal";
import {PharyngitisPredictionColors, PharyngitisPredictionText} from "@/enums/pharyngitis";

const IdentificationPage: NextPage = () => {
    const [analysisResult, setAnalysisResult] = useState<PharyngitisResult | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [hasValidationErr, setHasValidationErr] = useState<boolean[]>([false, false]);
    const [fileErrMsg, setFileErrMsg] = useState<string>("");
    const [isDisable, setIsDisable] = useState<boolean>(false);
    const [errors, setErrors] = useState<any>(null);

    const {notifySuccess, notifyError} = useToast();

    const validateFields = () => {
        setHasValidationErr([]);
        if (!file) {
            setFileErrMsg("Please choose the Throat image.");
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
        setIsDisable(true)
        event.preventDefault();
        if (!validateFields()) return;

        const formData: PharyngitisRequest = {
            file: file!
        }

        try {
            setIsDisable(true);
            const response = await PharyngitisAnalyzeService.analyze(formData);
            if (response.success && response.data) {
                const results = response.data as PharyngitisResult;
                notifySuccess(response.message);
                setIsDisable(false);
                setAnalysisResult(results);
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
            setIsDisable(false)
        }


        console.log("Form submitted with:", {file});
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
            setAnalysisResult(null)
        }
    };
    return (
        <section className="bg-blue-50 min-h-screen px-4">
            <div className="flex py-8 justify-between">
                <h1 className="text-slate-600 text-3xl font-bold mb-6 text-center">
                    Pharyngitis Identification
                </h1>

            </div>
            <div className="flex items-start justify-center gap-8">
                <div
                    className="relative bg-white rounded-xl shadow-lg p-8 w-full max-w-lg min-h-[700px] flex flex-col"
                >
                    <h3 className="text-blue-500 text-2xl font-bold mb-8 text-start">
                        Upload throat image
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
                                    hasValidationErr.includes(true) || isDisable
                                        ? "opacity-50 cursor-not-allowed"
                                        : "hover:bg-blue-700"
                                }`}
                                disabled={hasValidationErr.includes(true) || isDisable}
                            >
                                {isDisable ? "Analyzing..." : "Analyze"}
                            </button>
                        </div>
                    </form>

                    <div
                        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg min-h-[200px]
                            flex flex-col items-center mt-4"
                    >
                        <h4 className="text-blue-500 text-xl font-bold mb-4">Analyzed Result</h4>
                        {analysisResult ? (
                            <div className="w-full text-gray-700 space-y-4 text-center">
                                {/* Display Prediction with Dynamic Colors */}
                                <span
                                    className={`rounded-md py-1 px-4 text-white ${
                                        PharyngitisPredictionColors[analysisResult.prediction]
                                    }`}
                                >
                                    {PharyngitisPredictionText[analysisResult.prediction]}
                                </span>
                                {/* Display Confidence Score */}
                                {analysisResult.confidence_score !== undefined && (
                                    <p className="text-sm text-gray-500">
                                        Confidence Score: {analysisResult.confidence_score.toFixed(2)}
                                    </p>
                                )}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">No diagnosis available</p>
                        )}
                    </div>
                </div>

                <div
                    className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl min-h-[700px] h-[700px] flex flex-col items-center"
                >
                    <h4 className="text-blue-500 text-xl font-bold mb-4">
                        Throat image Preview
                    </h4>
                    {imagePreview ? (
                        <Image
                            src={imagePreview}
                            alt="Selected Preview"
                            className="rounded-md cursor-pointer"
                            width={400}
                            height={700}
                            onClick={() => setModalIsOpen(true)}
                        />
                    ) : (
                        <p className="text-gray-500 text-sm">No image selected</p>
                    )}
                </div>
            </div>


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
        </section>
    );
};

export default IdentificationPage;
