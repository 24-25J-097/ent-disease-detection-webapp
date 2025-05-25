"use client";

import React, {useState} from "react";
import {motion} from "framer-motion";
import {
    ArrowLeft,
    Building,
    Calendar,
    Check,
    Globe,
    GraduationCap,
    Mail,
    Shield,
    Sparkles,
    Stethoscope,
    User,
    X,
} from "lucide-react";
import {useRouter} from "next/navigation";
import {NextPage} from 'next';
import Image from 'next/image';
import {StudentSignUpData} from "@/types/service/Auth";
import {useAuthService} from "@/hooks/services/useAuthService";
import {useToast} from "@/providers/ToastProvider";
import {AxiosError} from 'axios';
import {ErrorResponseData} from '@/types/Common';
import TextInput from "@/components/inputs/TextInput";
import PasswordInput from "@/components/inputs/PasswordInput";
import {trimText} from "@/utils/string-formatters";
import Link from 'next/link';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    institution: string;
    studyYear: string;
    specialization: string;
    country: string;
    dateOfBirth: string;
    agreeToTerms: boolean;
    agreeToNewsletter: boolean;
}

interface FormErrors {
    [key: string]: string;
}

const studyYears = ["Pre-Med", "1st Year Medical Student", "2nd Year Medical Student", "3rd Year Medical Student", "4th Year Medical Student", "5th Year Medical Student", "6th Year Medical Student", "Resident", "Fellow", "Practicing Physician", "Other Healthcare Professional",];

const specializations = ["General Medicine", "Otolaryngology (ENT)", "Internal Medicine", "Surgery", "Pediatrics", "Emergency Medicine", "Radiology", "Pathology", "Anesthesiology", "Dermatology", "Neurology", "Psychiatry", "Other",];

const countries = ["Sri Lanka", "United States", "Canada", "United Kingdom", "Australia", "Germany", "France", "Netherlands", "Sweden", "Switzerland", "Japan", "South Korea", "Singapore", "India", "Brazil", "Other",];

const SignUpPage: NextPage = () => {

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        institution: "",
        studyYear: "",
        specialization: "",
        country: "",
        dateOfBirth: "",
        agreeToTerms: false,
        agreeToNewsletter: false,
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const router = useRouter();

    const {studentRegister} = useAuthService({
        middleware: 'guest',
        redirectIfAuthenticated: '/',
    });

    const {notifySuccess, notifyError} = useToast();

    const validateStep = (step: number): boolean => {
        const newErrors: FormErrors = {};

        if (step === 1) {
            if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
            if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
            if (!formData.email.trim()) {
                newErrors.email = "Email is required";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = "Please enter a valid email address";
            }
            if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
            if (!formData.country) newErrors.country = "Country is required";
        }

        if (step === 2) {
            if (!formData.password) {
                newErrors.password = "Password is required";
            } else if (formData.password.length < 8) {
                newErrors.password = "Password must be at least 8 characters";
            } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
                newErrors.password = "Password must contain uppercase, lowercase, and number";
            }
            if (!formData.confirmPassword) {
                newErrors.confirmPassword = "Please confirm your password";
            } else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = "Passwords do not match";
            }
        }

        if (step === 3) {
            if (!formData.institution.trim()) newErrors.institution = "Institution is required";
            if (!formData.studyYear) newErrors.studyYear = "Study year is required";
            if (!formData.specialization) newErrors.specialization = "Specialization is required";
            if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        setCurrentStep(currentStep - 1);
        setErrors({});
    };

    const handleSubmit = async () => {
        if (!validateStep(3)) return;

        setIsLoading(true);
        setApiError(null);

        try {
            const studentSignUpData: StudentSignUpData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
                dateOfBirth: formData.dateOfBirth,
                country: formData.country,
                institution: formData.institution,
                studyYear: formData.studyYear,
                specialization: formData.specialization,
                agreeToTerms: formData.agreeToTerms,
                agreeToNewsletter: formData.agreeToNewsletter
            };

            const res = await studentRegister({studentSignUpData});
            notifySuccess(res!.message);
        } catch (error) {
            setIsLoading(false);
            const axiosError = error as AxiosError<ErrorResponseData>;
            if (axiosError?.response?.status && axiosError.response.status >= 500) {
                setApiError("An unexpected error occurred. Please try again.");
            } else {
                setApiError(axiosError?.response?.data?.message || "An error occurred.");
                notifyError(axiosError?.response?.data?.message || "An error occurred.");
            }
        }
    };

    const handleInputChange = (field: keyof FormData, value: string | boolean) => {
        setFormData((prev) => ({...prev, [field]: value}));
        if (errors[field]) {
            setErrors((prev) => ({...prev, [field]: ""}));
        }
    };

    const emailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const trimmedValue = trimText(event.target.value, true).toString();
        setFormData((prev) => ({...prev, email: trimmedValue}));
        if (errors.email) {
            setErrors((prev) => ({...prev, email: ""}));
        }
    };

    const passwordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const trimmedValue = trimText(event.target.value, true).toString();
        setFormData((prev) => ({...prev, password: trimmedValue}));
        if (errors.password) {
            setErrors((prev) => ({...prev, password: ""}));
        }
    };

    const confirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const trimmedValue = trimText(event.target.value, true).toString();
        setFormData((prev) => ({...prev, confirmPassword: trimmedValue}));
        if (errors.confirmPassword) {
            setErrors((prev) => ({...prev, confirmPassword: ""}));
        }
    };

    const getPasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z\d]/.test(password)) strength++;
        return strength;
    };

    const getPasswordStrengthColor = (strength: number) => {
        if (strength <= 2) return "bg-red-500";
        if (strength <= 3) return "bg-yellow-500";
        return "bg-green-500";
    };

    const getPasswordStrengthText = (strength: number) => {
        if (strength <= 2) return "Weak";
        if (strength <= 3) return "Medium";
        return "Strong";
    };

    return (
        <div
            className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900
        flex items-center justify-center p-4"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply
                filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply
            filter blur-xl opacity-20 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80
            bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
            </div>

            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8}}
                className="relative z-10 w-full max-w-lg"
            >
                {/* Logo and Header */}
                <motion.div
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.2, duration: 0.6}}
                    className="text-center mb-8"
                >
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-20">
                            <Image
                                src={"/images/ent-insight-txt-logo.png"}
                                alt="Logo"
                                className="w-full cursor-pointer"
                                width={1000}
                                height={1000}
                                onClick={() => router.push("/")}
                            />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Join ENT Insight Academic</h1>
                    <p className="text-slate-300 text-sm">Start your AI-powered medical education journey</p>
                </motion.div>

                {/* Progress Indicator */}
                <motion.div
                    initial={{opacity: 0, scale: 0.95}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{delay: 0.3, duration: 0.6}}
                >
                    <div className="flex items-center justify-between mb-4">
                        {[1, 2, 3].map((step) => (
                            <div key={step} className="flex items-center">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm 
                            transition-all duration-300 
                            ${step <= currentStep ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                                        : "bg-slate-700 text-slate-400"}`}
                                >
                                    {step < currentStep ? <Check className="w-5 h-5"/> : step}
                                </div>
                                {step < 3 && (
                                    <div
                                        className={`w-16 h-1 mx-2 transition-all duration-300 
                                    ${step < currentStep ? "bg-gradient-to-r from-blue-500 to-purple-600"
                                            : "bg-slate-700"}`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-xs text-slate-400">
                        <span>Personal Info</span>
                        <span>Security</span>
                        <span>Academic Info</span>
                    </div>
                </motion.div>

                {/* Signup Form */}
                <motion.div
                    initial={{opacity: 0, scale: 0.95}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{delay: 0.4, duration: 0.6}}
                    className="glass-card rounded-2xl p-8"
                >
                    {apiError && (
                        <div
                            className="bg-red-100 text-red-700 p-4 rounded-2xl border-l-8
                            border-r-8 border-x-red-200 mb-6"
                        >
                            {apiError}
                        </div>
                    )}
                    {/* Step 1: Personal Information */}
                    {currentStep === 1 && (
                        <motion.div
                            initial={{opacity: 0, x: 20}}
                            animate={{opacity: 1, x: 0}}
                            exit={{opacity: 0, x: -20}}
                            className="space-y-6"
                        >
                            <div className="text-center mb-6">
                                <h2 className="text-xl font-semibold text-white mb-2">Personal Information</h2>
                                <p className="text-slate-400 text-sm">Tell us about yourself</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <TextInput
                                        type="text"
                                        name="firstName"
                                        label="First Name *"
                                        placeholder="John"
                                        value={formData.firstName}
                                        onTextChange={(e) => (
                                            handleInputChange("firstName", e.target.value)
                                        )}
                                        errorMessage={errors.firstName}
                                        disabled={isLoading}
                                        inputClassName="pl-10 pr-4 py-3 bg-slate-800/50 border rounded-xl text-white
                                    placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent
                                    transition-all duration-200"
                                        labelClassName="block text-sm font-medium text-slate-200 mb-2"
                                        icon={
                                            <User
                                                className="absolute left-3 top-1/2 transform -translate-y-1/2
                                            text-slate-400 w-5 h-5 z-10"
                                            />
                                        }
                                        design="regular-form"
                                    />
                                </div>

                                <div>
                                    <TextInput
                                        type="text"
                                        name="lastName"
                                        label="Last Name *"
                                        placeholder="Doe"
                                        value={formData.lastName}
                                        onTextChange={(e) => (
                                            handleInputChange("lastName", e.target.value)
                                        )}
                                        errorMessage={errors.lastName}
                                        disabled={isLoading}
                                        inputClassName="pl-10 pr-4 py-3 bg-slate-800/50 border rounded-xl text-white
                                    placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent
                                    transition-all duration-200"
                                        labelClassName="block text-sm font-medium text-slate-200 mb-2"
                                        icon={
                                            <User
                                                className="absolute left-3 top-1/2 transform -translate-y-1/2
                                            text-slate-400 w-5 h-5 z-10"
                                            />
                                        }
                                        design="regular-form"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="relative">
                                    <TextInput
                                        type="email"
                                        name="email"
                                        label="Email Address *"
                                        placeholder="john.doe@university.edu"
                                        value={formData.email}
                                        onTextChange={emailChange}
                                        errorMessage={errors.email}
                                        disabled={isLoading}
                                        inputClassName="pl-10 pr-4 py-3 bg-slate-800/50 border rounded-xl text-white
                                    placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent
                                    transition-all duration-200"
                                        labelClassName="block text-sm font-medium text-slate-200 mb-2"
                                        icon={
                                            <Mail
                                                className="absolute left-3 top-1/2 transform -translate-y-1/2
                                            text-slate-400 w-5 h-5 z-10"
                                            />
                                        }
                                        design="regular-form"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-slate-200 mb-2">
                                    Date of Birth *
                                </label>
                                <div className="relative">
                                    <Calendar
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5"/>
                                    <input
                                        id="dateOfBirth"
                                        type="date"
                                        value={formData.dateOfBirth}
                                        onChange={(e) => (
                                            handleInputChange("dateOfBirth", e.target.value)
                                        )}
                                        className={`w-full pl-10 pr-4 py-3 bg-slate-800/50 border rounded-xl 
                                text-white placeholder-slate-400 focus:outline-none focus:ring-2 
                                focus:border-transparent transition-all duration-200 
                                ${errors.dateOfBirth ? "border-red-500 focus:ring-red-500"
                                            : "border-slate-600 focus:ring-blue-500"}`}
                                    />
                                </div>
                                {errors.dateOfBirth && (
                                    <small className="text-red-500 px-2">
                                        {errors.dateOfBirth}
                                    </small>
                                )}
                            </div>

                            <div>
                                <label htmlFor="country" className="block text-sm font-medium text-slate-200 mb-2">
                                    Country *
                                </label>
                                <div className="relative">
                                    <Globe
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5"/>
                                    <select
                                        id="country"
                                        value={formData.country}
                                        onChange={(e) => (
                                            handleInputChange("country", e.target.value)
                                        )}
                                        className={`w-full pl-10 pr-4 py-3 bg-slate-800/50 border rounded-xl 
                                text-white focus:outline-none focus:ring-2 focus:border-transparent 
                                transition-all duration-200 ${errors.country ? "border-red-500 focus:ring-red-500"
                                            : "border-slate-600 focus:ring-blue-500"}`}
                                    >
                                        <option value="">Select your country</option>
                                        {countries.map((country) => (
                                            <option key={country} value={country} className="bg-slate-800">
                                                {country}
                                            </option>))}
                                    </select>
                                </div>
                                {errors.country && (
                                    <small className="text-red-500 px-2">
                                        {errors.country}
                                    </small>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Security */}
                    {currentStep === 2 && (
                        <motion.div
                            initial={{opacity: 0, x: 20}}
                            animate={{opacity: 1, x: 0}}
                            exit={{opacity: 0, x: -20}}
                            className="space-y-6"
                        >
                            <div className="text-center mb-6">
                                <h2 className="text-xl font-semibold text-white mb-2">Create Your Password</h2>
                                <p className="text-slate-400 text-sm">
                                    Choose a strong password to secure your account
                                </p>
                            </div>

                            <div>
                                <PasswordInput
                                    name="password"
                                    label="Password"
                                    placeholder="Enter your password"
                                    password={formData.password}
                                    onPasswordChange={passwordChange}
                                    errorMessage={errors.password}
                                    disabled={isLoading}
                                    inputClassName="px-4 py-3 bg-slate-800/50 border rounded-xl text-white
                                    placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent
                                    transition-all duration-200"
                                    labelClassName="block text-sm font-medium text-slate-200 mb-2"
                                    design="regular-form"
                                />
                                {formData.password && (<div className="mt-2">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <div className="flex-1 bg-slate-700 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full transition-all duration-300 
                                        ${getPasswordStrengthColor(getPasswordStrength(formData.password),)}`}
                                                style={{width: `${(getPasswordStrength(formData.password) / 5) * 100}%`}}
                                            />
                                        </div>
                                        <span className="text-xs text-slate-400">
                                        {getPasswordStrengthText(getPasswordStrength(formData.password))}
                                    </span>
                                    </div>
                                </div>)}
                            </div>

                            <div>
                                <PasswordInput
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    placeholder="Confirm your password"
                                    password={formData.confirmPassword}
                                    onPasswordChange={confirmPasswordChange}
                                    errorMessage={errors.confirmPassword}
                                    disabled={isLoading}
                                    inputClassName="px-4 py-3 bg-slate-800/50 border rounded-xl text-white
                                    placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent
                                    transition-all duration-200"
                                    labelClassName="block text-sm font-medium text-slate-200 mb-2"
                                    design="regular-form"
                                />
                                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                                    <p className="mt-1 text-sm text-green-400 flex items-center">
                                        <Check className="w-4 h-4 mr-1"/>
                                        Passwords match
                                    </p>)}
                            </div>

                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                                <h4 className="text-sm font-medium text-blue-300 mb-2">Password Requirements:</h4>
                                <ul className="space-y-1 text-xs text-blue-200/80">
                                    <li className="flex items-center">
                                        {formData.password.length >= 8 ? (
                                            <Check className="w-3 h-3 text-green-400 mr-2"/>) : (
                                            <X className="w-3 h-3 text-red-400 mr-2"/>)}
                                        At least 8 characters
                                    </li>
                                    <li className="flex items-center">
                                        {/[A-Z]/.test(formData.password) ? (
                                            <Check className="w-3 h-3 text-green-400 mr-2"/>) : (
                                            <X className="w-3 h-3 text-red-400 mr-2"/>)}
                                        One uppercase letter
                                    </li>
                                    <li className="flex items-center">
                                        {/[a-z]/.test(formData.password) ? (
                                            <Check className="w-3 h-3 text-green-400 mr-2"/>) : (
                                            <X className="w-3 h-3 text-red-400 mr-2"/>)}
                                        One lowercase letter
                                    </li>
                                    <li className="flex items-center">
                                        {/\d/.test(formData.password) ? (
                                            <Check className="w-3 h-3 text-green-400 mr-2"/>) : (
                                            <X className="w-3 h-3 text-red-400 mr-2"/>)}
                                        One number
                                    </li>
                                </ul>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Academic Information */}
                    {currentStep === 3 && (
                        <motion.div
                            initial={{opacity: 0, x: 20}}
                            animate={{opacity: 1, x: 0}}
                            exit={{opacity: 0, x: -20}}
                            className="space-y-6"
                        >
                            <div className="text-center mb-6">
                                <h2 className="text-xl font-semibold text-white mb-2">Academic Information</h2>
                                <p className="text-slate-400 text-sm">Help us personalize your learning experience</p>
                            </div>

                            <div>
                                <TextInput
                                    type="text"
                                    name="institution"
                                    label="Institution *"
                                    placeholder="Harvard Medical School"
                                    value={formData.institution}
                                    onTextChange={(e) => (
                                        handleInputChange("institution", e.target.value)
                                    )}
                                    errorMessage={errors.institution}
                                    disabled={isLoading}
                                    inputClassName="pl-10 pr-4 py-3 bg-slate-800/50 border rounded-xl text-white
                                    placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent
                                    transition-all duration-200"
                                    labelClassName="block text-sm font-medium text-slate-200 mb-2"
                                    icon={
                                        <Building
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2
                                            text-slate-400 w-5 h-5 z-10"
                                        />
                                    }
                                    design="regular-form"
                                />
                            </div>

                            <div>
                                <label htmlFor="studyYear" className="block text-sm font-medium text-slate-200 mb-2">
                                    Current Study Year *
                                </label>
                                <div className="relative">
                                    <GraduationCap
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5"/>
                                    <select
                                        id="studyYear"
                                        value={formData.studyYear}
                                        onChange={(e) => (
                                            handleInputChange("studyYear", e.target.value)
                                        )}
                                        className={`w-full pl-10 pr-4 py-3 bg-slate-800/50 border rounded-xl text-white 
                                focus:outline-none focus:ring-2 focus:border-transparent transition-all
                                 duration-200 ${errors.studyYear ? "border-red-500 focus:ring-red-500"
                                            : "border-slate-600 focus:ring-blue-500"}`}
                                    >
                                        <option value="">Select your study year</option>
                                        {studyYears.map((year) => (
                                            <option key={year} value={year} className="bg-slate-800">
                                                {year}
                                            </option>))}
                                    </select>
                                </div>
                                {errors.studyYear && (
                                    <small className="text-red-500 px-2">
                                        {errors.studyYear}
                                    </small>
                                )}
                            </div>

                            <div>
                                <label htmlFor="specialization"
                                       className="block text-sm font-medium text-slate-200 mb-2">
                                    Area of Interest *
                                </label>
                                <div className="relative">
                                    <Stethoscope
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5"/>
                                    <select
                                        id="specialization"
                                        value={formData.specialization}
                                        onChange={(e) => (
                                            handleInputChange("specialization", e.target.value)
                                        )}
                                        className={`w-full pl-10 pr-4 py-3 bg-slate-800/50 border rounded-xl text-white 
                                focus:outline-none focus:ring-2 focus:border-transparent transition-all 
                                duration-200 ${errors.specialization ? "border-red-500 focus:ring-red-500"
                                            : "border-slate-600 focus:ring-blue-500"}`}
                                    >
                                        <option value="">Select your specialization</option>
                                        {specializations.map((spec) => (
                                            <option key={spec} value={spec} className="bg-slate-800">
                                                {spec}
                                            </option>))}
                                    </select>
                                </div>
                                {errors.specialization && (
                                    <small className="text-red-500 px-2">
                                        {errors.specialization}
                                    </small>
                                )}
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <input
                                        id="agreeToTerms"
                                        type="checkbox"
                                        checked={formData.agreeToTerms}
                                        onChange={(e) => (
                                            handleInputChange("agreeToTerms", e.target.checked)
                                        )}
                                        className="w-4 h-4 text-blue-600 bg-slate-800 border-slate-600 rounded focus:ring-blue-500 mt-1"
                                    />
                                    <label htmlFor="agreeToTerms" className="text-sm text-slate-300">
                                        I agree to the{" "}
                                        <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                                            Terms of Service
                                        </a>{" "}
                                        and{" "}
                                        <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                                            Privacy Policy
                                        </a>
                                        *
                                    </label>
                                </div>
                                {errors.agreeToTerms && (
                                    <small className="text-red-500 px-2">
                                        {errors.agreeToTerms}
                                    </small>
                                )}

                                <div className="flex items-start space-x-3">
                                    <input
                                        id="agreeToNewsletter"
                                        type="checkbox"
                                        checked={formData.agreeToNewsletter}
                                        onChange={(e) => (
                                            handleInputChange("agreeToNewsletter", e.target.checked)
                                        )}
                                        className="w-4 h-4 text-blue-600 bg-slate-800 border-slate-600 rounded
                                focus:ring-blue-500 mt-1"
                                    />
                                    <label htmlFor="agreeToNewsletter" className="text-sm text-slate-300">
                                        I would like to receive updates about new features and medical education content
                                    </label>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-600">
                        {currentStep > 1 ? (
                            <motion.button
                                type="button"
                                onClick={handleBack}
                                whileHover={{scale: 1.02}}
                                whileTap={{scale: 0.98}}
                                className="flex items-center space-x-2 px-6 py-3 text-slate-300
                                hover:text-white transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4"/>
                                <span>Back</span>
                            </motion.button>
                        ) : (
                            <Link
                                href="/students/login"
                                className="flex items-center space-x-2 px-6 py-3 text-slate-300
                                hover:text-white transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4"/>
                                <span>Sign In</span>
                            </Link>
                        )}

                        {currentStep < 3 ? (
                            <motion.button
                                type="button"
                                onClick={handleNext}
                                whileHover={{scale: 1.02}}
                                whileTap={{scale: 0.98}}
                                className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-600
                                to-purple-600 text-white rounded-xl font-medium hover:from-blue-700
                                hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500
                                focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200"
                            >
                                <span>Continue</span>
                                <Sparkles className="w-4 h-4"/>
                            </motion.button>
                        ) : (
                            <motion.button
                                type="button"
                                onClick={handleSubmit}
                                disabled={isLoading}
                                whileHover={{scale: 1.02}}
                                whileTap={{scale: 0.98}}
                                className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-600
                                 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700
                                 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500
                                 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200
                                 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <div
                                            className="w-4 h-4 border-2 border-white border-t-transparent
                                            rounded-full animate-spin"
                                        />
                                        <span>Creating Account...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Create Account</span>
                                        <Sparkles className="w-4 h-4"/>
                                    </>
                                )}
                            </motion.button>
                        )}
                    </div>

                    {/* Security Notice */}
                    <motion.div
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.8, duration: 0.6}}
                        className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl"
                    >
                        <div className="flex items-start space-x-3">
                            <Shield className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5"/>
                            <div>
                                <h6 className="text-xs font-medium text-green-300 mb-1">Your Data is Secure</h6>
                                <small className="text-xs text-green-200/80">
                                    We use enterprise-grade encryption and never share your personal information with
                                    third parties.
                                </small>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Features Preview */}
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.6, duration: 0.6}}
                    className="mt-4 text-center"
                >
                    <p className="text-slate-400 text-sm mb-4">Join thousands of medical students worldwide</p>
                    <div className="flex justify-center space-x-6 text-slate-500">
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            <span className="text-xs">AI-Powered Learning</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            <span className="text-xs">Evidence-Based Content</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                            <span className="text-xs">Interactive Experience</span>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>);
};

export default SignUpPage;
