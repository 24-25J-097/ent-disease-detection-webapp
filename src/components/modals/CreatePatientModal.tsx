"use client";

import React, {useState} from "react";
import ReactModal from "react-modal";
import {useToast} from '@/providers/ToastProvider';
import {motion} from "framer-motion";
import {Button} from '@/components/ui/button';
import {AxiosError} from 'axios';
import {ErrorResponseData} from '@/types/Common';
import LoadingModal from '@/components/loaders/LoadingModal';
import {PatientService} from '@/services/PatientService';
import {PatientData} from '@/types/service/Patient';

interface CreatePatientModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const CreatePatientModal: React.FC<CreatePatientModalProps> = ({isOpen, onClose, onSuccess}) => {

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [dateOfBirth, setDateOfBirth] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<any>(null);
    const [validationErrors, setValidationErrors] = useState<{
        firstName?: string; lastName?: string; email?: string; phone?: string; dateOfBirth?: string; gender?: string;
    }>({});

    const {notifySuccess, notifyError} = useToast();

    const validateForm = () => {
        const newErrors: any = {};
        let isValid = true;

        if (!firstName.trim()) {
            newErrors.firstName = "First name is required";
            isValid = false;
        }

        if (!lastName.trim()) {
            newErrors.lastName = "Last name is required";
            isValid = false;
        }

        if (!email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is invalid";
            isValid = false;
        }

        if (!phone.trim()) {
            newErrors.phone = "Phone number is required";
            isValid = false;
        }

        if (!dateOfBirth) {
            newErrors.dateOfBirth = "Date of birth is required";
            isValid = false;
        }

        if (!gender) {
            newErrors.gender = "Gender is required";
            isValid = false;
        }

        setValidationErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors(null);

        if (!validateForm()) {
            return;
        }

        try {
            setIsLoading(true);

            const patientData: PatientData = {
                firstName,
                lastName,
                email,
                phone,
                address,
                dateOfBirth,
                gender
            };

            const response = await PatientService.createPatient(patientData);

            notifySuccess("Patient created successfully");
            onSuccess();
            resetForm();
            onClose();
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponseData>;
            const errMsg = axiosError?.response?.data?.message || axiosError?.response?.data?.error || "An error occurred.";
            if (axiosError?.response?.status && axiosError.response.status >= 500) {
                setErrors("An unexpected error occurred. Please try again.");
            } else {
                setErrors(errMsg);
                notifyError(errMsg);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setDateOfBirth("");
        setGender("");
        setValidationErrors({});
        setErrors(null);
    };

    return (<>
            <ReactModal
                isOpen={isOpen}
                onRequestClose={onClose}
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9000]"
                overlayClassName="fixed inset-0 bg-black bg-opacity-80 z-[9000]"
            >
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-blue-600">Create New Patient</h2>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 text-2xl"
                        >
                            &times;
                        </button>
                    </div>

                    {errors && (<motion.div
                            className="bg-red-100 text-red-700 p-4 rounded-md mb-4 border-l-4 border-red-500"
                            initial={{opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.3}}
                        >
                            {errors}
                        </motion.div>)}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">First Name *</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className={`w-full p-2 border rounded-md ${validationErrors.firstName ? "border-red-500" : "border-gray-300"}`}
                                placeholder="Enter first name"
                            />
                            {validationErrors.firstName && (
                                <p className="text-red-500 text-sm mt-1">{validationErrors.firstName}</p>)}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Last Name *</label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className={`w-full p-2 border rounded-md ${validationErrors.lastName ? "border-red-500" : "border-gray-300"}`}
                                placeholder="Enter last name"
                            />
                            {validationErrors.lastName && (
                                <p className="text-red-500 text-sm mt-1">{validationErrors.lastName}</p>)}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Email *</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full p-2 border rounded-md ${validationErrors.email ? "border-red-500" : "border-gray-300"}`}
                                placeholder="Enter email address"
                            />
                            {validationErrors.email && (
                                <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>)}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Phone *</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className={`w-full p-2 border rounded-md ${validationErrors.phone ? "border-red-500" : "border-gray-300"}`}
                                placeholder="Enter phone number"
                            />
                            {validationErrors.phone && (
                                <p className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>)}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Address</label>
                            <textarea
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Enter address (optional)"
                                rows={2}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Date of Birth *</label>
                            <input
                                type="date"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                className={`w-full p-2 border rounded-md ${validationErrors.dateOfBirth ? "border-red-500" : "border-gray-300"}`}
                            />
                            {validationErrors.dateOfBirth && (
                                <p className="text-red-500 text-sm mt-1">{validationErrors.dateOfBirth}</p>)}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Gender *</label>
                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className={`w-full p-2 border rounded-md ${validationErrors.gender ? "border-red-500" : "border-gray-300"}`}
                            >
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {validationErrors.gender && (
                                <p className="text-red-500 text-sm mt-1">{validationErrors.gender}</p>)}
                        </div>

                        <div className="flex justify-end space-x-2 pt-2">
                            <Button
                                type="button"
                                onClick={() => {
                                    resetForm();
                                    onClose();
                                }}
                                className="bg-gray-300 text-gray-700 hover:bg-gray-400"
                            >
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                                Create Patient
                            </Button>
                        </div>
                    </form>
                </div>
            </ReactModal>
            <LoadingModal isOpen={isLoading} text={"Creating patient..."} imagePath={"/images/loading-circle.gif"}/>
        </>);
};

export default CreatePatientModal;