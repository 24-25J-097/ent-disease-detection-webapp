"use client";

import React, {useState} from "react";
import TextInput from "@/components/inputs/TextInput";
import TextAreaInput from "@/components/inputs/TextAreaInput";
import {NextPage} from "next";
import {If} from '@/components/utils/If';

const IdentificationPage: NextPage = () => {

    const [patientId, setPatientId] = useState<string>("");
    const [additionalInfo, setAdditionalInfo] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [hasValidationErr, setHasValidationErr] = useState<boolean[]>([false, false]);
    const [patientIdErrMsg, setPatientIdErrMsg] = useState<string>("");
    const [fileErrMsg, setFileErrMsg] = useState<string>("");
    const [isDisable, setIsDisable] = useState<boolean>(false);

    const validateFields = () => {
        setHasValidationErr([]);
        if (!patientId) {
            const errorText = 'Please enter the Patient ID.';
            setPatientIdErrMsg(errorText);
            setTimeout(() => setPatientIdErrMsg(''), 3000);
            hasValidationErr.push(true);
        } else if (patientId.length < 5) {
            const errorText = 'Patient ID must be at least 5 characters long.';
            setPatientIdErrMsg(errorText);
            setTimeout(() => setPatientIdErrMsg(''), 3000);
            hasValidationErr.push(true);
        }
        if (!file) {
            setFileErrMsg("Please choose the image file.");
            setTimeout(() => setFileErrMsg(''), 3000);
            hasValidationErr.push(true);
        } else if (!file.type.startsWith("image/")) {
            setFileErrMsg("Only image files are allowed.");
            setTimeout(() => setFileErrMsg(''), 3000);
            hasValidationErr.push(true);
        } else if (file.size > 10 * 1024 * 1024) {
            setFileErrMsg("Image file size must be less than 10MB.");
            setTimeout(() => setFileErrMsg(''), 3000);
            hasValidationErr.push(true);
        }
        return hasValidationErr;
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!validateFields()) return;

        const formData = new FormData();
        formData.append("patientId", patientId);
        formData.append("additionalInfo", additionalInfo);
        formData.append("image", file!);

        console.log("Form submitted with:", {patientId, additionalInfo, file});
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    return (
        <section className="bg-blue-50 min-h-screen px-4">
            <div className="flex py-8 justify-between">
                <h1 className="text-slate-600 text-3xl font-bold mb-6 text-center">
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
            <div className="flex items-center justify-center">
                <div className="relative bg-white rounded-xl shadow-lg p-8 w-full max-w-5xl">
                    <h3 className="text-blue-500 text-2xl font-bold mb-8 text-start">
                        Upload Middle Ear Endoscopy
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <TextInput
                                name="patientId"
                                label="Patient Id *"
                                type="text"
                                value={patientId}
                                placeholder="Enter Patient ID"
                                className="w-full"
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
                                className="w-full text-gray-600 p-2 border border-gray-300 rounded-md file:mr-4
                                file:py-2 file:px-4 file:border-0 file:rounded-md file:text-white file:bg-blue-600
                                file:cursor-pointer hover:file:bg-blue-700"
                            />
                            <If condition={!!fileErrMsg}>
                                <small className="text-red-500 px-2">{fileErrMsg}</small>
                            </If>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className={`bg-blue-600 text-white py-2 px-6 rounded-md focus:outline-none ${
                                    hasValidationErr.includes(true) ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                                }`}
                                disabled={hasValidationErr.includes(true)}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default IdentificationPage;
