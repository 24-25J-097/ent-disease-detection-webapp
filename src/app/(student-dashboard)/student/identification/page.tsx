"use client";

import axios, {AxiosError} from 'axios';
import {ApiUtils} from "@/services/api-service/ApiUtils";
import type React from "react";
import {useRef, useState} from "react";
import {NextPage} from "next";
import {useSelector} from 'react-redux';
import {useRouter} from "next/navigation";
import {AnimatePresence, motion} from "framer-motion";
import {
    AlertCircle,
    Brain,
    Camera,
    CheckCircle,
    Eye,
    FileImage, Loader, OctagonAlert,
    RefreshCw,
    SquareDashedMousePointer, ThumbsDown, ThumbsUp,
    Upload, Zap
} from "lucide-react";
import StudentDashboardHeader from '@/components/dashboard/StudentDashboardHeader';
import {AnalysisStep, analysisSteps, conditionImageRequirements, conditions} from '@/data/student/identification';
import Image from 'next/image';
import {CholesteatomaDiagnosisData} from '@/types/service/Diagnosis';
import {CholesteatomaDiagnosisService} from '@/services/CholesteatomaDiagnosisService';
import {Cholesteatoma} from '@/models/Cholesteatoma';
import {ErrorResponseData} from '@/types/Common';
import {useToast} from '@/providers/ToastProvider';
import {User} from '@/models/User';
import {random} from 'nanoid';
import {SinusitisDiagnosisData} from '@/types/service/SinusitisDiagnosis';
import {SinusitisAnalyzeService} from '@/services/SinusitisAnalyzeService';
import {Sinusitis} from '@/models/Sinusitis';
import {PharyngitisDiagnosisData} from '@/types/service/PharyngitisDiagnosisData';
import {PharyngitisAnalyzeService} from '@/services/PharyngitisAnalyzeService';
import ReactModal from 'react-modal';
import {Role} from '@/enums/access';
import {If} from '@/components/utils/If';

const IdentificationPage: NextPage = () => {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedCondition, setSelectedCondition] = useState<string>("");
    const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
    const [analysisResult, setAnalysisResult] = useState<any>(null);
    const [dragActive, setDragActive] = useState<boolean>(false);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [steps, setSteps] = useState<AnalysisStep[]>(analysisSteps);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [errors, setErrors] = useState<any>(null);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [showQuickFeedback, setShowQuickFeedback] = useState<boolean>(true);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const {notifyWarn, notifyError} = useToast();

    const user = useSelector((state: any) => state.auth.user) as User;

    const handleFileSelect = (file: File) => {
        setSelectedFile(file);
        setAnalysisResult(null);

        // Create image preview
        const reader = new FileReader();
        reader.onload = (e) => {
            setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };

    const runAnalysisSteps = async () => {
        // Reset steps
        setSteps(analysisSteps.map((step) => ({...step, status: "pending"})));
        setCurrentStep(0);

        for (let i = 0; i < analysisSteps.length; i++) {
            setCurrentStep(i);
            // Update the current step to processing
            setSteps((prev) => prev.map((step, index) => ({
                ...step, status: index === i ? "processing" : index < i ? "completed" : "pending",
            })),);
            // Wait for step duration
            await new Promise((resolve) => setTimeout(resolve, analysisSteps[i].duration));
            // Mark the step as completed
            setSteps((prev) => prev.map((step, index) => ({
                ...step, status: index <= i ? "completed" : "pending",
            })),);
        }
    };

    const validateFields = (): boolean[] => {
        const errors: boolean[] = [];

        // Check if a file is selected
        if (!selectedFile) {
            errors.push(true);
        } else {
            errors.push(false);
        }

        // Check if the condition is selected
        if (!selectedCondition) {
            errors.push(true);
        } else {
            errors.push(false);
        }

        return errors;
    };

    const handleAnalyze = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrors(null);
        if (validateFields().includes(true)) return;

        setIsAnalyzing(true);
        setAnalysisResult(null);

        try {
            await runAnalysisSteps();

            if (selectedCondition === "Cholesteatoma") {
                await getCholesteatomaAnalyzeResults();
            } else if (selectedCondition === "Sinusitis") {
                await getSinusitisAnalyzeResults();
            } else if (selectedCondition === "Pharyngitis") {
                await getPharyngitisAnalyzeResults();
            } else if (selectedCondition === "Foreign Objects in Throat") {
                await getForeignObjectsAnalyzeResults();
            }
        } catch (error: any) {
            const axiosError = error as AxiosError<ErrorResponseData>;
            const errMsg = axiosError?.response?.data?.message || axiosError?.response?.data?.error || "An error occurred.";
            if (axiosError?.response?.status && axiosError.response.status >= 500) {
                setErrors("An unexpected error occurred. Please try again.");
            } else {
                setErrors(errMsg);
                notifyError(errMsg);
            }
        } finally {
            setIsAnalyzing(false);
        }
    };

    const getCholesteatomaAnalyzeResults = async () => {
        const diagnosisData: CholesteatomaDiagnosisData = {
            patientId: user.studentId ?? ("student" + random(4)),
            additionalInfo: "",
            endoscopyImage: selectedFile!,
        };
        const response = await CholesteatomaDiagnosisService.cholesteatomaDiagnosis(
            diagnosisData,
            Role.STUDENT
        );
        setTimeout(() => {
            if (response.success && response.data) {
                const results = response.data as Cholesteatoma;
                setAnalysisResult({
                    diagnosisId: results._id!,
                    isCholesteatoma: results.diagnosisResult!.isCholesteatoma!,
                    stage: results.diagnosisResult!.stage,
                    suggestions: results.diagnosisResult!.suggestions,
                    confidenceScore: results.diagnosisResult!.confidenceScore,
                    prediction: results.diagnosisResult!.prediction,
                });
            }
        }, 500);
    };

    const getSinusitisAnalyzeResults = async () => {
        const diagnosisData: SinusitisDiagnosisData = {
            patientId: user.studentId ?? ("student" + random(4)),
            additionalInfo: "",
            watersViewXrayImage: selectedFile!,
        };
        const response = await SinusitisAnalyzeService.analyze(
            diagnosisData,
            Role.STUDENT
        );
        setTimeout(() => {
            if (response.success && response.data) {
                const results = response.data as Sinusitis;
                setAnalysisResult({
                    ...results.diagnosisResult!,
                    diagnosisId: results._id!,
                });
            }
        }, 500);
    };

    const getPharyngitisAnalyzeResults = async () => {
        const diagnosisData: PharyngitisDiagnosisData = {
            patientId: user.studentId ?? ("student" + random(4)),
            additionalInfo: "",
            throatImage: selectedFile!,
        };
        const response = await PharyngitisAnalyzeService.analyze(
            diagnosisData,
            Role.STUDENT
        );
        setTimeout(() => {
            if (response.success && response.data) {
                const results = response.data;
                setAnalysisResult({
                    ...results.diagnosisResult!,
                    diagnosisId: results._id!,
                });
            }
        }, 500);
    };
    const getForeignObjectsAnalyzeResults = async () => {
        try {
            // First, check if the image is valid
            const validityFormData = new FormData();
            validityFormData.append("file", selectedFile!);

            const validityResponse = await axios.post(
                ApiUtils.fastApiUrl2 + "/api/foreign/run-inference",
                validityFormData,
                {headers: {"Content-Type": "multipart/form-data"}}
            );

            const isValid = validityResponse.data.images[0]?.results[0]?.class === 1;

            if (isValid) {
                const detectionFormData = new FormData();
                detectionFormData.append("image", selectedFile!);

                const detectResponse = await axios.post(
                    ApiUtils.fastApiUrl2 + "/api/foreign/detect",
                    detectionFormData,
                    {headers: {"Content-Type": "multipart/form-data"}}
                );

                const predictions = detectResponse.data.predictions || [];
                const foreignObjects = predictions.filter(
                    (pred: any) => pred.class === 'B' || pred.class === 'D'
                ).sort(
                    (a: any, b: any) => b.confidence - a.confidence
                );

                // Calculate statistics and determine stage
                const blockages = foreignObjects.filter((pred: any) => pred.class === 'B');
                const devices = foreignObjects.filter((pred: any) => pred.class === 'D');
                const highestConfidence = foreignObjects.length > 0 ? foreignObjects[0].confidence : 0;

                // Determine a stage based on a type of foreign object
                let stage = "No foreign objects detected";
                if (blockages.length > 0) {
                    stage = "Type: Blockage";
                }
                if (devices.length > 0) {
                    stage = stage === "No foreign objects detected" ? "Type: Device" : "Type: Multiple (Blockage & Device)";
                }

                // Generate suggestions
                let suggestions = [];
                if (blockages.length > 0) {
                    suggestions.push(`Detected ${blockages.length} potential blockage(s)`);
                }
                if (devices.length > 0) {
                    suggestions.push(`Detected ${devices.length} foreign device(s)`);
                }

                const suggestionsText = foreignObjects.length > 0
                    ? `${suggestions.join('. ')}. Immediate medical attention recommended.`
                    : "No foreign objects detected. Continue monitoring if symptoms persist.";

                setAnalysisResult({
                    diagnosisId: `foreign-${Date.now()}`,
                    prediction: 'valid',
                    isForeignObject: foreignObjects.length > 0, // This will control the Yes/No badge
                    predictions: foreignObjects,
                    confidenceScore: highestConfidence,
                    stage: stage, // This will show in the Stage section
                    detectionSummary: {
                        totalObjects: foreignObjects.length, blockages: blockages.length, devices: devices.length
                    },
                    suggestions: suggestionsText
                });

            } else {
                setAnalysisResult({
                    prediction: 'invalid', suggestions: "Please upload a valid X-ray image."
                });
                notifyWarn("Please upload a valid X-ray image.");
            }
        } catch (error: any) {
            console.error("Error processing image:", error);
            if (error.response?.status && error.response.status >= 500) {
                notifyError("An unexpected error occurred. Please try again.");
            } else {
                notifyError(error.response?.data?.message || "Failed to process the image. Please try again.");
            }
            setAnalysisResult(null);
        }
    };

    const handleRest = async () => {
        setSelectedFile(null);
        setAnalysisResult(null);
        setSelectedCondition("");
        setImagePreview("");
        setSteps(analysisSteps.map((step) => ({...step, status: "pending"})));
        setCurrentStep(0);
        setErrors(null);
        setIsAnalyzing(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        router.refresh();
    };

    const getStepIcon = (step: AnalysisStep) => {
        if (step.status === "completed") {
            return <CheckCircle className="w-5 h-5 text-green-500"/>;
        } else if (step.status === "processing") {
            return <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"/>;
        } else {
            return <step.icon className="w-5 h-5 text-muted-foreground"/>;
        }
    };

    const getStepColor = (step: AnalysisStep) => {
        if (step.status === "completed") return "border-green-500 bg-green-500/10";
        if (step.status === "processing") return "border-blue-500 bg-blue-500/10";
        return "border-border bg-muted/20";
    };

    const generateResults = (): React.ReactElement => {

        const StatusBadge: React.FC<{ isPositive: boolean; children: React.ReactNode }> = ({isPositive, children}) => (
            <span
                className={`border rounded-md py-1 px-4 
                ${isPositive ? 'border-red-500 text-red-500'
                    : 'border-green-300 text-green-300'}`}
            >
                {children}
            </span>
        );

        const InfoItem: React.FC<{ color: string; title: string; content: string | null | undefined }> = ({
                                                                                                              color,
                                                                                                              title,
                                                                                                              content
                                                                                                          }) => (
            <div>
                <h3 className="font-medium text-foreground mb-2">{title}:</h3>
                <ul className="space-y-2">
                    <li className="flex items-start">
                        <div className={`w-2 h-2 ${color} rounded-full mt-2 mr-3 flex-shrink-0`}/>
                        <span className="text-sm text-muted-foreground">
                        {content ?? "N/A"}
                    </span>
                    </li>
                </ul>
            </div>
        );

        const ResetButton: React.FC<{ onClick: () => void }> = ({onClick}) => (
            <motion.button
                onClick={onClick}
                whileHover={{scale: 1.02}}
                whileTap={{scale: 0.98}}
                className="w-full bg-gradient-to-r from-slate-500 to-slate-600 text-white py-3 px-6
                rounded-xl font-medium hover:from-slate-600 hover:to-slate-700 focus:outline-none
                focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-background
                transition-all duration-200 flex items-center justify-center space-x-2"
            >
                <RefreshCw className="w-5 h-5"/>
                <span>Reset Analyze</span>
            </motion.button>
        );

        const QuickFeedback = () => (
            <motion.div
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -10}}
                transition={{duration: 0.6}}
                className="glass-card rounded-2xl p-4 mb-8 border border-primary/20 bg-primary/5"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div>
                            <p className="font-semibold text-foreground p-0 m-0">How was the response?</p>
                            <small className="text-muted-foreground">
                                Your quick feedback helps us improve
                            </small>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => {
                                setShowQuickFeedback(false);
                                // handleQuickFeedback("positive");
                            }}
                            className="flex items-center space-x-2 px-4 py-2 bg-green-500/10
                            dark:bg-green-500/20 text-foreground rounded-lg hover:bg-green-500/20
                            dark:hover:bg-green-500/30 transition-colors text-xs"
                        >
                            <ThumbsUp className="w-4 h-4"/>
                            <span>Good</span>
                        </button>
                        <button
                            onClick={() => {
                                setShowQuickFeedback(false);
                                // handleQuickFeedback("negative");
                            }}
                            className="flex items-center space-x-2 px-4 py-2 bg-red-500/10
                            dark:bg-red-500/20 text-foreground rounded-lg hover:bg-red-500/20
                            dark:hover:bg-red-500/30 transition-colors text-xs"
                        >
                            <ThumbsDown className="w-4 h-4"/>
                            <span>Bad</span>
                        </button>
                    </div>
                </div>
            </motion.div>
        );

        // Main render logic
        if (analysisResult.prediction === 'invalid') {
            return (
                <motion.div
                    initial={{opacity: 0, scale: 0.95}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.6}}
                    className="glass-card rounded-2xl p-6 border border-red-500/20 bg-red-500/5 space-y-2"
                >
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                            <div
                                className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                                <AlertCircle className="w-6 h-6 text-white"/>
                            </div>
                        </div>
                        <div className="flex-1 space-y-3">
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                      <span
                                          className="px-2 py-1 bg-red-500/10 text-red-500 rounded-full text-xs font-medium">
                                        Invalid
                                      </span>
                                    <h3 className="text-lg font-semibold text-foreground">
                                        Irrelevant Image Detected
                                    </h3>
                                </div>
                                <p className="text-red-500 font-medium">
                                    An irrelevant image has been submitted.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex-col space-y-3">
                        <div className="p-4 bg-blue-gray-900/50 rounded-xl border border-border">
                            <p className="text-sm text-muted-foreground">
                                <strong className="text-foreground">Please upload a valid medical image</strong> related
                                to ENT conditions for accurate analysis.
                            </p>
                            <div
                                className="mt-2 rounded-xl bg-white/5 p-4 backdrop-blur dark:bg-black/20 border border-white/10">
                                <h2 className="text-base font-semibold mb-3 text-gray-100">
                                    ✅ Accepted Image Types by Condition
                                </h2>
                                <ul className="space-y-3">
                                    {conditionImageRequirements.map(({condition, imageType}) => (<li
                                        key={condition}
                                        className={`flex items-start gap-3 
                                                p-3 rounded-lg border border-white/10 
                                                ${selectedCondition === condition ? "bg-green-200/30" : "bg-white/5"}`}
                                    >
                                        <CheckCircle className="w-4 h-4 text-green-400 mt-1" size={20}/>
                                        <div>
                                            <p className="text-sm font-light text-gray-200">
                                                {condition}: &nbsp;
                                                <span className="text-sm font-medium text-gray-300">
                                                        {imageType}
                                                    </span>
                                            </p>
                                        </div>
                                    </li>))}
                                </ul>
                            </div>
                        </div>
                        <ResetButton onClick={() => handleRest()}/>
                    </div>
                </motion.div>
            );
        }

        // Valid prediction results
        const hasCondition = analysisResult.isCholesteatoma || analysisResult.isSinusitis || analysisResult.isPharyngitis || analysisResult.isForeignObject;
        const confidencePercentage = analysisResult.confidenceScore ? (() => {
            let percent = analysisResult.confidenceScore * 100;
            if (percent > 95) percent -= 5;
            return percent.toFixed(1) + "%";
        })() : "N/A";
        const stageInfo = analysisResult.stage || analysisResult.severity;

        return (
            <div className="space-y-4">
                {/* Identification and Confidence Card */}
                <div
                    className="flex items-center justify-between p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                    <div>
                        <p className="text-sm text-muted-foreground">Identification:</p>
                        <p className="text-xl font-medium text-foreground">{selectedCondition}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold text-green-500">{confidencePercentage}</p>
                        <p className="text-xs text-muted-foreground">Confidence</p>
                    </div>
                </div>
                {/* Condition Detection */}
                <div>
                    <h3 className="font-medium text-foreground mb-2">
                        {selectedCondition}&nbsp;Found:
                    </h3>
                    <ul className="space-y-2">
                        <li className="flex items-start">
                            <div className="w-2 h-2 bg-red-300 rounded-full mt-2 mr-3 flex-shrink-0"/>
                            <StatusBadge isPositive={hasCondition}>
                                {hasCondition ? "Yes" : "No"}
                            </StatusBadge>
                        </li>
                    </ul>
                </div>
                {/* Stage Information */}
                <InfoItem
                    color="bg-blue-500"
                    title="Stage"
                    content={stageInfo}
                />
                {/* Recommendations */}
                <InfoItem
                    color="bg-purple-500"
                    title="Recommendations"
                    content={analysisResult.suggestions}
                />
                <AnimatePresence>
                    {showQuickFeedback && (
                        <QuickFeedback/>
                    )}
                </AnimatePresence>
                <div className="mt-6">
                    <ResetButton onClick={() => handleRest()}/>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-background">
            <StudentDashboardHeader user={user}/>

            <main className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6}}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-foreground mb-2">ENT Image Analysis</h1>
                    <p className="text-muted-foreground">
                        Upload medical images for AI-powered diagnosis and educational insights
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Upload Section */}
                    <motion.div
                        initial={{opacity: 0, x: -20}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.6, delay: 0.2}}
                        className="space-y-6"
                    >
                        {/* File Upload */}
                        <div className="glass-card rounded-2xl p-6">
                            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                                <Upload className="w-5 h-5 mr-2"/>
                                Upload Medical Image
                            </h2>

                            <div
                                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 
                                ${dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                {selectedFile ? (
                                    <div className="space-y-4">
                                        {/* Image Preview */}
                                        {imagePreview && (
                                            <motion.div
                                                initial={{opacity: 0, scale: 0.95}}
                                                animate={{opacity: 1, scale: 1}}
                                                transition={{duration: 0.6}}
                                                className="glass-card rounded-2xl p-6"
                                            >
                                                <h2
                                                    className="text-sm font-semibold text-foreground mb-4 flex
                                                    items-center"
                                                >
                                                    <Eye className="w-5 h-5 mr-2"/>
                                                    Image Preview
                                                </h2>
                                                <div className="relative rounded-xl overflow-hidden bg-blue-900/20">
                                                    <Image
                                                        src={imagePreview}
                                                        alt="Selected Preview"
                                                        className="rounded-md cursor-pointer"
                                                        width={1000}
                                                        height={1000}
                                                        onClick={() => setModalIsOpen(true)}
                                                        title="Open Image"
                                                    />
                                                </div>
                                            </motion.div>
                                        )}
                                        <div
                                            className="flex items-center justify-between p-4 bg-white/10
                                            backdrop-blur-md border border-white/20 rounded-xl shadow-lg"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <FileImage className="w-6 h-6 text-primary"/>
                                                <div className="flex gap-4">
                                                    <p className="font-medium text-foreground">{selectedFile.name}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    setSelectedFile(null);
                                                    setImagePreview("");
                                                    setAnalysisResult(null);
                                                }}
                                                className="flex-shrink-0 px-3 py-1.5 text-sm text-red-400
                                                hover:text-red-300 hover:bg-red-500/10 backdrop-blur-sm
                                                rounded-lg border border-red-500/20 transition-all
                                                duration-200 hover:border-red-500/40"
                                            >
                                                Remove file
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <Camera className="w-12 h-12 text-muted-foreground mx-auto"/>
                                        <div>
                                            <p className="text-foreground font-medium">Drop your image here</p>
                                            <p className="text-sm text-muted-foreground">or click to browse</p>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => (e.target.files?.[0] && handleFileSelect(e.target.files[0]))}
                                            className="hidden"
                                            id="file-upload"
                                            ref={fileInputRef}
                                        />
                                        <label
                                            htmlFor="file-upload"
                                            className="inline-block px-4 py-2 bg-primary text-primary-foreground
                                            rounded-lg cursor-pointer hover:bg-primary/90 transition-colors"
                                        >
                                            Choose File
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Condition Selection */}
                        <div className="glass-card rounded-2xl p-6">
                            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                                <Brain className="w-5 h-5 mr-2"/>
                                Select Medical Condition
                            </h2>
                            <div className="grid grid-cols-2 gap-3">
                                {conditions.map((condition) => (
                                    <button
                                        key={condition}
                                        onClick={() => setSelectedCondition(condition)}
                                        className={`p-3 rounded-lg text-left transition-all duration-200 
                                    ${selectedCondition === condition ? "bg-primary text-primary-foreground" : "bg-blue-gray-900 text-foreground hover:bg-blue-900"}`}
                                    >
                                        <span className="text-sm font-medium">{condition}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Analyze Button */}
                        <motion.button
                            onClick={handleAnalyze}
                            disabled={!selectedFile || !selectedCondition || isAnalyzing}
                            whileHover={{scale: 1.02}}
                            whileTap={{scale: 0.98}}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white
                            py-4 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                            focus:ring-offset-background transition-all duration-200 disabled:opacity-50
                            disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isAnalyzing ? (
                                <div className="flex items-center">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent
                                        rounded-full animate-spin mr-2"></div>
                                    Analyzing Image...
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <Brain className="w-5 h-5 mr-2"/>
                                    Analyze with AI
                                </div>
                            )}
                        </motion.button>
                    </motion.div>

                    {/* Analysis Section */}
                    <motion.div
                        initial={{opacity: 0, x: 20}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.6, delay: 0.4}}
                        className="space-y-6"
                    >
                        <If condition={!!errors}>
                            <div
                                className="bg-red-900/30 text-red-200 p-4 rounded-xl border border-red-500/50
                                 mb-6"
                            >
                                <p className="flex items-center">
                                    <OctagonAlert className="w-5 h-5 mr-2"/>
                                    {errors}
                                </p>
                            </div>
                        </If>
                        {/* Analysis Steps */}
                        {(isAnalyzing || analysisResult) ? (
                            <motion.div
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.6}}
                                className="glass-card rounded-2xl p-6"
                            >
                                <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                                    <Zap className="w-5 h-5 mr-2"/>
                                    Analysis Progress
                                </h2>
                                <div className="space-y-4">
                                    {steps.map((step, index) => (
                                        <motion.div
                                            key={step.id}
                                            initial={{opacity: 0, x: -20}}
                                            animate={{opacity: 1, x: 0}}
                                            transition={{duration: 0.4, delay: index * 0.1}}
                                            className={`p-4 rounded-xl border-2 transition-all 
                                            duration-300 ${getStepColor(step)}`}
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div className="flex-shrink-0">{getStepIcon(step)}</div>
                                                <div className="flex-1">
                                                    <h3
                                                        className={`font-medium ${step.status === "completed" ? "text-green-600" : step.status === "processing" ? "text-blue-600" : "text-muted-foreground"}`}
                                                    >
                                                        {step.title}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {step.description}
                                                    </p>
                                                </div>
                                                {step.status === "processing" && (<motion.div
                                                    animate={{scale: [1, 1.1, 1]}}
                                                    transition={{duration: 1, repeat: Number.POSITIVE_INFINITY}}
                                                    className="w-2 h-2 bg-blue-500 rounded-full"
                                                />)}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                                {isAnalyzing && (
                                    <div
                                        className="mt-6 p-4 bg-amber-500/10 rounded-xl border border-amber-500/20"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <Loader className="h-6 w-6 animate-spin text-amber-500"/>
                                            <div>
                                                <p className="text-sm font-medium text-amber-600">
                                                    AI Analysis in Progress</p>
                                                <p className="text-xs text-muted-foreground">
                                                    Processing your medical image with advanced algorithms
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.6}}
                                className="glass-card rounded-2xl p-6"
                            >
                                <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                                    <Zap className="w-5 h-5 mr-2"/>
                                    Analysis Steps
                                </h2>
                                <div className="space-y-4">
                                    {steps.map((step, index) => (
                                        <motion.div
                                            key={step.id}
                                            initial={{opacity: 0, x: -20}}
                                            animate={{opacity: 1, x: 0}}
                                            transition={{duration: 0.4, delay: index * 0.1}}
                                            className={`p-4 rounded-xl border-2 transition-all 
                                            duration-300 ${getStepColor(step)}`}
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div className="flex-shrink-0">{getStepIcon(step)}</div>
                                                <div className="flex-1">
                                                    <h3 className="text-muted-foreground">
                                                        {step.title}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {step.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <div
                                    className="mt-6 rounded-xl bg-white/5 p-4 backdrop-blur
                                    dark:bg-black/20 border border-white/10"
                                >
                                    <h2 className="text-base font-semibold mb-3 text-gray-100 flex items-center">
                                        <SquareDashedMousePointer className="w-5 h-5 mr-2"/>
                                        Select Image Types by Condition
                                    </h2>
                                    <ul className="space-y-3">
                                        {conditionImageRequirements.map(({condition, imageType}, index) => (
                                            <motion.li
                                                key={condition}
                                                initial={{opacity: 0, x: -20}}
                                                animate={{opacity: 1, x: 0}}
                                                transition={{duration: 0.4, delay: index * 0.1}}
                                                className={`flex items-start gap-3 
                                                p-3 rounded-lg border border-white/10 transition-all duration-300
                                                ${selectedCondition === condition ? "bg-green-200/30" : "bg-white/5"}`}
                                            >
                                                <CheckCircle className="w-4 h-4 text-green-400 mt-1" size={20}/>
                                                <div>
                                                    <p className="text-sm font-light text-gray-200">
                                                        {condition}: &nbsp;
                                                        <span className="text-sm font-medium text-gray-300">
                                                        {imageType}
                                                    </span>
                                                    </p>
                                                </div>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        )}

                        {/* Analysis Results */}
                        <AnimatePresence>
                            {analysisResult && (
                                <motion.div
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -20}}
                                    transition={{duration: 0.6}}
                                    className="glass-card rounded-2xl p-6"
                                >
                                    <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                                        <CheckCircle className="w-5 h-5 mr-2 text-green-500"/>
                                        Analysis Results
                                    </h2>
                                    {generateResults()}
                                    <div className="flex flex-col items-center mt-6">
                                        <div className="text-center">
                                            <p>
                                                <small>ENT Insight can make mistakes. Double check important
                                                    info.</small>
                                            </p>
                                            <p className="text-sm text-red-900 font-medium">
                                                <small>
                                                    AI responses are for educational purposes only. Always consult
                                                    healthcare professionals for medical advice.
                                                </small>
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Feedback Section */}
                        {analysisResult && (
                            <motion.div
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.6, delay: 0.3}}
                                className="glass-card rounded-2xl p-6"
                            >
                                <h2 className="text-xl font-semibold text-foreground mb-4">Provide Feedback</h2>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-2">Rate this analysis:</p>
                                        <div className="flex space-x-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    className="w-8 h-8 text-yellow-500 hover:text-yellow-400
                                            transition-colors"
                                                >
                                                    ⭐
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                    <textarea
                                        placeholder="Share your thoughts on this analysis..."
                                        className="w-full p-3 bg-blue-gray-900/50 border border-border rounded-lg
                                        text-foreground placeholder-muted-foreground focus:outline-none
                                        focus:ring-2 focus:ring-primary focus:border-transparent transition-all
                                        duration-200 resize-none"
                                        rows={3}
                                    />
                                    </div>
                                    <button
                                        className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg
                                    hover:bg-primary/90 transition-colors"
                                    >
                                        Submit Feedback
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </div>

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
                            src={imagePreview}
                            alt="Zoomed Preview"
                            className="rounded-md w-auto h-screen"
                            width={1000}
                            height={1000}
                        />
                    </div>
                </ReactModal>
            </main>
        </div>
    );
};

export default IdentificationPage;
