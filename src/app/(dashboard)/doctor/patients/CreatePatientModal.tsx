"use client";

import React, {useState} from "react";
import ReactModal from "react-modal";
import {useToast} from '@/providers/ToastProvider';
import {motion} from "framer-motion";
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {AxiosError} from 'axios';
import {ErrorResponseData} from '@/types/Common';
import LoadingModal from '@/components/loaders/LoadingModal';
import {PatientService} from '@/services/PatientService';
import {PatientData} from '@/types/service/Patient';
import {User, Mail, Phone, MapPin, Calendar, Users, ChevronDown} from 'lucide-react';

interface CreatePatientModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const CreatePatientModal: React.FC<CreatePatientModalProps> = ({isOpen, onClose, onSuccess}) => {

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [nic, setNic] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [dateOfBirth, setDateOfBirth] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<any>(null);
    const [validationErrors, setValidationErrors] = useState<{
        name?: string; email?: string; phone?: string; nic?: string; dateOfBirth?: string; gender?: string;
    }>({});

    const {notifySuccess, notifyError} = useToast();

    const validateForm = () => {
        const newErrors: any = {};
        let isValid = true;

        if (!name.trim()) {
            newErrors.name = "Full name is required";
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

        if (!nic.trim()) {
            newErrors.nic = "NIC is required";
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

        if (!validateForm()) return;

        try {
            setIsLoading(true);
            const patientData: PatientData = {
                name,
                email,
                phone,
                address,
                dateOfBirth,
                gender,
                nic
            };
            const response = await PatientService.createPatient(patientData);
            if (response.success) {
                notifySuccess("Patient created successfully");
                onSuccess();
                resetForm();
                onClose();
            }
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
        setName("");
        setEmail("");
        setPhone("");
        setNic("");
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
            <div className="bg-white rounded-lg p-8 w-full max-w-2xl shadow-xl border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                            <User size={24} className="text-blue-600"/>
                        </div>
                        <h2 className="text-2xl font-bold text-blue-700">Create New Patient</h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full
                        p-2 transition-colors focus:outline-none"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="lucide lucide-x">
                            <path d="M18 6 6 18"></path>
                            <path d="m6 6 12 12"></path>
                        </svg>
                    </button>
                </div>

                {errors && (
                    <motion.div
                    className="bg-red-50 text-red-700 p-4 rounded-md mb-5 border border-red-200
                    shadow-sm flex items-start"
                    initial={{opacity: 0, y: -10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.3}}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                         className="text-red-500 mr-3 mt-0.5">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" x2="12" y1="8" y2="12"></line>
                        <line x1="12" x2="12.01" y1="16" y2="16"></line>
                    </svg>
                    <span>{errors}</span>
                </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="block text-gray-700 font-semibold">Full Name *</label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                    <User size={18}/>
                                </div>
                                <Input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className={`pl-10 py-5 h-11 border border-gray-300 ${validationErrors.name 
                                        ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                    placeholder="Enter patient's full name"
                                />
                            </div>
                            {validationErrors.name && (
                                <p className="text-red-500 text-sm">{validationErrors.name}</p>)}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-gray-700 font-semibold">NIC (National ID) *</label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                    <Users size={18}/>
                                </div>
                                <Input
                                    type="text"
                                    value={nic}
                                    onChange={(e) => setNic(e.target.value)}
                                    className={`pl-10 py-5 h-11 border border-gray-300 ${validationErrors.nic 
                                        ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                    placeholder="Enter NIC number"
                                />
                            </div>
                            {validationErrors.nic && (
                                <p className="text-red-500 text-sm">{validationErrors.nic}</p>)}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="block text-gray-700 font-semibold">Email *</label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                    <Mail size={18}/>
                                </div>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`pl-10 py-5 h-11 border border-gray-300 ${validationErrors.email 
                                        ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                    placeholder="Enter email address"
                                />
                            </div>
                            {validationErrors.email && (
                                <p className="text-red-500 text-sm">{validationErrors.email}</p>)}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-gray-700 font-semibold">Phone *</label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                    <Phone size={18}/>
                                </div>
                                <Input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className={`pl-10 py-5 h-11 border border-gray-300 ${validationErrors.phone 
                                        ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                    placeholder="Enter phone number"
                                />
                            </div>
                            {validationErrors.phone && (
                                <p className="text-red-500 text-sm">{validationErrors.phone}</p>)}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-gray-700 font-semibold">Address</label>
                        <div className="relative">
                            <div className="absolute left-3 top-4 text-gray-500">
                                <MapPin size={18}/>
                            </div>
                            <textarea
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full pl-10 p-3 border border-gray-300 rounded-md focus-visible:ring-0
                                focus-visible:ring-blue-500 focus-visible:outline-none transition-all min-h-[80px]"
                                placeholder="Enter address (optional)"
                                rows={2}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="block text-gray-700 font-semibold">Date of Birth *</label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                    <Calendar size={18}/>
                                </div>
                                <Input
                                    type="date"
                                    value={dateOfBirth}
                                    onChange={(e) => setDateOfBirth(e.target.value)}
                                    className={`pl-10 py-5 h-11 border border-gray-300 ${validationErrors.dateOfBirth 
                                        ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                    max={(() => {
                                        const today = new Date();
                                        return today.toISOString().split('T')[0];
                                    })()}
                                />
                            </div>
                            {validationErrors.dateOfBirth && (
                                <p className="text-red-500 text-sm">{validationErrors.dateOfBirth}</p>)}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-gray-700 font-semibold">Gender *</label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                    <Users size={18}/>
                                </div>
                                <select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className={`w-full pl-10 py-2 h-11 border rounded-md focus-visible:ring-0 
                                    focus-visible:outline-none transition-all appearance-none bg-transparent
                                    ${validationErrors.gender 
                                        ? "border-red-500 focus-visible:ring-red-500" 
                                        : "border-gray-300 focus-visible:ring-blue-500"}`}
                                >
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                                <div
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                                >
                                    <ChevronDown className="h-4 w-4 text-gray-500"/>
                                </div>
                            </div>
                            {validationErrors.gender && (
                                <p className="text-red-500 text-sm">{validationErrors.gender}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 pt-6 mt-2">
                        <Button
                            type="button"
                            onClick={() => {
                                resetForm();
                                onClose();
                            }}
                            className="bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300
                            px-6 py-2 rounded-md transition-all duration-200 font-medium"
                            variant="outline"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-md
                            shadow-md hover:shadow-lg transition-all duration-200 font-medium flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round" className="lucide lucide-user-plus">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <line x1="19" x2="19" y1="8" y2="14"></line>
                                <line x1="22" x2="16" y1="11" y2="11"></line>
                            </svg>
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
