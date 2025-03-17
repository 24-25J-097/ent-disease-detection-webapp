"use client";

import {NextPage} from "next";
import DiagnosisStatusPieChart from '@/app/(dashboard)/doctor/cholesteatoma/reports/DiagnosisStatusPieChart';
import CholesteatomaStagesBarChart from '@/app/(dashboard)/doctor/cholesteatoma/reports/CholesteatomaStagesBarChart';
import ConfidenceScoreBarChart from '@/app/(dashboard)/doctor/cholesteatoma/reports/ConfidenceScoreBarChart';
import DiseaseVsHealthyDoughnutChart
    from '@/app/(dashboard)/doctor/cholesteatoma/reports/DiseaseVsHealthyDoughnutChart';
import React, {useRef, useState} from 'react';
import {ChevronDown, Printer} from 'lucide-react';

const data = {
    diagnosisStatus: [
        {name: 'Diagnosed', value: 60},
        {name: 'Failed', value: 25},
        {name: 'Pending', value: 15}
    ],
    cholesteatomaStages: [
        {stage: 'Stage 1', count: 20},
        {stage: 'Stage 2', count: 25},
        {stage: 'Stage 3', count: 15}
    ],
    confidenceScores: [
        {scoreRange: '0-20%', count: 5},
        {scoreRange: '21-40%', count: 10},
        {scoreRange: '41-60%', count: 30},
        {scoreRange: '61-80%', count: 25},
        {scoreRange: '81-100%', count: 50}
    ],
    cholesteatomaVsHealthy: [
        {name: 'Cholesteatoma', value: 52},
        {name: 'Healthy', value: 48}
    ]
};


const ReportsPage: NextPage = () => {

    const diagnosisStatusPieChartRef = useRef<HTMLDivElement | null>(null);
    const diseaseVsHealthyDoughnutChartRef = useRef<HTMLDivElement | null>(null);
    const stagesBarChartRef = useRef<HTMLDivElement | null>(null);
    const confidenceScoreBarChartRef = useRef<HTMLDivElement | null>(null);

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handlePrint = (chartRef: React.RefObject<HTMLDivElement>) => {
        if (chartRef.current) {
            const printWindow = window.open('', '_blank');
            if (printWindow) {
                printWindow.document.write(`
                <html lang="en">
                <head>
                    <title>Print Report</title>
                    <style>
                        @media print {
                            body {
                                margin: 20px;
                                font-family: Arial, sans-serif;
                            }
                            .print-container {
                                width: 100%;
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                            }
                            @page {
                                size: A4 landscape;
                                margin: 10mm;
                            }
                        }
                    </style>
                </head>
                <body>
                    <div class="print-container">
                        ${chartRef.current.outerHTML}
                    </div>
                </body>
                </html>
            `);
                printWindow.document.close();
                printWindow.print();
                printWindow.close();
            }
        }
    };

    return (
        <section className="bg-blue-50 min-h-screen px-4">
            <div className="flex py-8 justify-between">
                <h1 className="text-slate-600 text-3xl font-bold text-center">
                    Cholesteatoma Reports
                </h1>
                <div>
                    <button
                        type="button"
                        className="bg-green-500 text-white py-2 px-4 w-64 rounded-md hover:bg-green-700
                        focus:outline-none flex items-center justify-between"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <div className="flex">
                            <Printer className="stroke-1.5 w-5 h-5"/>
                            <span className="mx-2">Print Reports</span>
                        </div>
                        <ChevronDown className="stroke-1.5 w-5 h-5"/>
                    </button>

                    {dropdownOpen && (
                        <div className="absolute mt-2 w-64 bg-white shadow-lg rounded-md py-2">
                            <button
                                onClick={() => handlePrint(diagnosisStatusPieChartRef)}
                                className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                            >
                                Print Diagnosis Status
                            </button>
                            <button
                                onClick={() => handlePrint(diseaseVsHealthyDoughnutChartRef)}
                                className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                            >
                                Print Cholesteatoma vs. Healthy
                            </button>
                            <button
                                onClick={() => handlePrint(stagesBarChartRef)}
                                className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                            >
                                Print Cholesteatoma Stages
                            </button>
                            <button
                                onClick={() => handlePrint(confidenceScoreBarChartRef)}
                                className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                            >
                                Print Confidence Scores
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                <DiagnosisStatusPieChart
                    diagnosisStatusData={data.diagnosisStatus}
                    chartRef={diagnosisStatusPieChartRef}
                />
                <DiseaseVsHealthyDoughnutChart
                    cholesteatomaVsHealthyData={data.cholesteatomaVsHealthy}
                    chartRef={diseaseVsHealthyDoughnutChartRef}
                />
                <CholesteatomaStagesBarChart
                    cholesteatomaStagesData={data.cholesteatomaStages}
                    chartRef={stagesBarChartRef}
                />
                <ConfidenceScoreBarChart
                    confidenceScoresData={data.confidenceScores}
                    chartRef={confidenceScoreBarChartRef}
                />
            </div>
        </section>
    );
};

export default ReportsPage;
