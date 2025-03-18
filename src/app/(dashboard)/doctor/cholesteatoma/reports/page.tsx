"use client";

import {NextPage} from "next";
import DiagnosisStatusPieChart from '@/app/(dashboard)/doctor/cholesteatoma/reports/DiagnosisStatusPieChart';
import CholesteatomaStagesBarChart from '@/app/(dashboard)/doctor/cholesteatoma/reports/CholesteatomaStagesBarChart';
import ConfidenceScoreBarChart from '@/app/(dashboard)/doctor/cholesteatoma/reports/ConfidenceScoreBarChart';
import DiseaseVsHealthyPieChart
    from '@/app/(dashboard)/doctor/cholesteatoma/reports/DiseaseVsHealthyPieChart';
import React, {useEffect, useRef, useState} from 'react';
import {ChevronDown, Printer} from 'lucide-react';
import {CholesteatomaDiagnosisService} from '@/services/CholesteatomaDiagnosisService';
import {CholesteatomaReportsData} from '@/types/Charts';
import AcceptedVsRejectedPieChart from '@/app/(dashboard)/doctor/cholesteatoma/reports/AcceptedVsRejectedPieChart';

const ReportsPage: NextPage = () => {

    const acceptedVsRejectedPieChartRef = useRef<HTMLDivElement | null>(null);
    const diagnosisStatusPieChartRef = useRef<HTMLDivElement | null>(null);
    const diseaseVsHealthyDoughnutChartRef = useRef<HTMLDivElement | null>(null);
    const stagesBarChartRef = useRef<HTMLDivElement | null>(null);
    const confidenceScoreBarChartRef = useRef<HTMLDivElement | null>(null);

    const [reportsData, setReportsData] = useState<CholesteatomaReportsData>(null);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            await fetchCholesteatomaReportsData();
        })();
    }, []);

    const fetchCholesteatomaReportsData = async () => {
        try {
            const response = await CholesteatomaDiagnosisService.getCholesteatomaReports();
            if (response.success && response.data) {
                setReportsData(response.data);
            }
        } catch (error) {
            console.error("Error in get cholesteatoma reports data: ", error);
        }
    };

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
                                border: 1px solid rgba(126,126,126,0.91);
                                border-radius: 24px;
                                padding-bottom: 20px;
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
                                onClick={() => handlePrint(acceptedVsRejectedPieChartRef)}
                                className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                            >
                                Print Diagnosis Accepted vs. Rejected
                            </button>
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
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 px-8 pb-8">
                <AcceptedVsRejectedPieChart
                    diagnosisAcceptedVsRejected={reportsData?.diagnosisAcceptedVsRejected ?? null}
                    chartRef={acceptedVsRejectedPieChartRef}
                />
                <DiagnosisStatusPieChart
                    diagnosisStatusData={reportsData?.diagnosisStatus ?? null}
                    chartRef={diagnosisStatusPieChartRef}
                />
                <DiseaseVsHealthyPieChart
                    cholesteatomaVsHealthyData={reportsData?.cholesteatomaVsHealthy ?? null}
                    chartRef={diseaseVsHealthyDoughnutChartRef}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 pb-8">
                <CholesteatomaStagesBarChart
                    cholesteatomaStagesData={reportsData?.cholesteatomaStages ?? null}
                    chartRef={stagesBarChartRef}
                />
                <ConfidenceScoreBarChart
                    confidenceScoresData={reportsData?.confidenceScores ?? null}
                    chartRef={confidenceScoreBarChartRef}
                />
            </div>
        </section>
    );
};

export default ReportsPage;
