"use client";

import {NextPage} from "next";
import DiagnosisStatusPieChart from '@/app/(dashboard)/doctor/pharyngitis/reports/DiagnosisStatusPieChart';
import PharyngitisStagesBarChart from '@/app/(dashboard)/doctor/pharyngitis/reports/PharyngitisStagesBarChart';
import ConfidenceScoreBarChart from '@/app/(dashboard)/doctor/pharyngitis/reports/ConfidenceScoreBarChart';
import DiseaseVsHealthyDoughnutChart
    from '@/app/(dashboard)/doctor/pharyngitis/reports/DiseaseVsHealthyDoughnutChart';
import React, {useEffect, useRef, useState} from 'react';
import {ChevronDown, Printer} from 'lucide-react';
import {PharyngitisAnalyzeService} from '@/services/PharyngitisAnalyzeService';
import {PharyngitisReportsData} from '@/types/Charts';

const ReportsPage: NextPage = () => {

    const diagnosisStatusPieChartRef = useRef<HTMLDivElement | null>(null);
    const diseaseVsHealthyDoughnutChartRef = useRef<HTMLDivElement | null>(null);
    const stagesBarChartRef = useRef<HTMLDivElement | null>(null);
    const confidenceScoreBarChartRef = useRef<HTMLDivElement | null>(null);

    const [reportsData, setReportsData] = useState<PharyngitisReportsData>(null);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            await fetchPharyngitisReportsData();
        })();
    }, []);

    const fetchPharyngitisReportsData = async () => {
        try {
            const response = await PharyngitisAnalyzeService.getPharyngitisReports();
            if (response.success && response.data) {
                setReportsData(response.data);
            }
        } catch (error) {
            console.error("Error in get pharyngitis reports data: ", error);
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
                    Pharyngitis Reports
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
                                Print Pharyngitis vs. Healthy
                            </button>
                            <button
                                onClick={() => handlePrint(stagesBarChartRef)}
                                className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                            >
                                Print Pharyngitis Stages
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 pb-6">
                <DiagnosisStatusPieChart
                    diagnosisStatusData={reportsData?.diagnosisStatus ?? null}
                    chartRef={diagnosisStatusPieChartRef}
                />
                <DiseaseVsHealthyDoughnutChart
                    pharyngitisVsHealthyData={reportsData?.pharyngitisVsHealthy ?? null}
                    chartRef={diseaseVsHealthyDoughnutChartRef}
                />
                <PharyngitisStagesBarChart
                    pharyngitisStagesData={reportsData?.pharyngitisStage ?? null}
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
