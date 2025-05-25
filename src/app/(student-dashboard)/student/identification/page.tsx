"use client";

import type React from "react";
import {NextPage} from "next";
import {motion} from "framer-motion";
import {useState} from "react";
import {Upload, Camera, FileImage, Brain, CheckCircle, AlertCircle} from "lucide-react";
import StudentDashboardHeader from '@/components/dashboard/StudentDashboardHeader';
import {conditions, sampleAnalysisResult} from '@/data/student/identification';
import {useSelector} from 'react-redux';

const IdentificationPage: NextPage = () => {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedCondition, setSelectedCondition] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<any>(null);
    const [dragActive, setDragActive] = useState(false);

    const user = useSelector((state: any) => state.auth.user);

    const handleFileSelect = (file: File) => {
        setSelectedFile(file);
        setAnalysisResult(null);
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

    const handleAnalyze = async () => {
        if (!selectedFile || !selectedCondition) return;

        setIsAnalyzing(true);

        // Simulate AI analysis
        setTimeout(() => {
            // Use the sample result but update the condition to match selected condition
            setAnalysisResult({
                ...sampleAnalysisResult,
                condition: selectedCondition
            });
            setIsAnalyzing(false);
        }, 3000);
    };

    return (
        <div className="min-h-screen">
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
                                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                                    dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                                }`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                {selectedFile ? (
                                    <div className="space-y-4">
                                        <FileImage className="w-12 h-12 text-primary mx-auto"/>
                                        <div>
                                            <p className="font-medium text-foreground">{selectedFile.name}</p>
                                            <p className="text-sm text-muted-foreground">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                        </div>
                                        <button
                                            onClick={() => setSelectedFile(null)}
                                            className="text-sm text-red-500 hover:text-red-400 transition-colors"
                                        >
                                            Remove file
                                        </button>
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
                                            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                                            className="hidden"
                                            id="file-upload"
                                        />
                                        <label
                                            htmlFor="file-upload"
                                            className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg cursor-pointer hover:bg-primary/90 transition-colors"
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
                                Select Suspected Condition
                            </h2>

                            <div className="grid grid-cols-2 gap-3">
                                {conditions.map((condition) => (
                                    <button
                                        key={condition}
                                        onClick={() => setSelectedCondition(condition)}
                                        className={`p-3 rounded-lg text-left transition-all duration-200 ${
                                            selectedCondition === condition
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-blue-gray-900 text-foreground hover:bg-blue-900"
                                        }`}
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
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-background transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isAnalyzing ? (
                                <div className="flex items-center">
                                    <div
                                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
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

                    {/* Results Section */}
                    <motion.div
                        initial={{opacity: 0, x: 20}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.6, delay: 0.4}}
                        className="space-y-6"
                    >
                        {analysisResult ? (
                            <>
                                {/* Analysis Results */}
                                <div className="glass-card rounded-2xl p-6">
                                    <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                                        <CheckCircle className="w-5 h-5 mr-2 text-green-500"/>
                                        Analysis Results
                                    </h2>

                                    <div className="space-y-4">
                                        <div
                                            className="flex items-center justify-between p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                                            <div>
                                                <p className="font-medium text-foreground">{analysisResult.condition}</p>
                                                <p className="text-sm text-muted-foreground">{analysisResult.accuracy}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-green-500">{analysisResult.confidence}%</p>
                                                <p className="text-xs text-muted-foreground">Confidence</p>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="font-medium text-foreground mb-2">Key Findings:</h3>
                                            <ul className="space-y-2">
                                                {analysisResult.findings.map((finding: string, index: number) => (
                                                    <li key={index} className="flex items-start">
                                                        <div
                                                            className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                        <span className="text-sm text-muted-foreground">{finding}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="font-medium text-foreground mb-2">Recommendations:</h3>
                                            <ul className="space-y-2">
                                                {analysisResult.recommendations.map((rec: string, index: number) => (
                                                    <li key={index} className="flex items-start">
                                                        <div
                                                            className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                        <span className="text-sm text-muted-foreground">{rec}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Feedback Section */}
                                <div className="glass-card rounded-2xl p-6">
                                    <h2 className="text-xl font-semibold text-foreground mb-4">Provide Feedback</h2>

                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-2">Rate this analysis:</p>
                                            <div className="flex space-x-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        className="w-8 h-8 text-yellow-500 hover:text-yellow-400 transition-colors"
                                                    >
                                                        ⭐
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                          <textarea
                                              placeholder="Share your thoughts on this analysis..."
                                              className="w-full p-3 bg-blue-gray-900/50 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
                                              rows={3}
                                          />
                                        </div>

                                        <button
                                            className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors">
                                            Submit Feedback
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="glass-card rounded-2xl p-6 text-center">
                                <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4"/>
                                <h2 className="text-xl font-semibold text-foreground mb-2">Ready for Analysis</h2>
                                <p className="text-muted-foreground">
                                    Upload an image and select a condition to get started with AI-powered analysis
                                </p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default IdentificationPage;
