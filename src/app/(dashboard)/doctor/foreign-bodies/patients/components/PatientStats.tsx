'use client';
import React, { useMemo, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  TimeScale
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import{ Report } from '../types/types'
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  TimeScale
);

interface Prediction {
  class: 'B' | 'D';
  confidence: number;
  bbox?: number[];
}



interface PatientStatsProps {
  reports: Report[];
}

interface DetectionStats {
  batteryCount: number;
  dentalCount: number;
}

const PatientStats: React.FC<PatientStatsProps> = ({ reports }) => {
  const [displayRange, setDisplayRange] = useState(12); // Default to 12 months

  const stats = useMemo(() => {
    // Group reports by month for timeline
    const reportsByMonth = reports.reduce((acc: Record<string, number>, report) => {
      const date = new Date(report.timestamp?.seconds * 1000);
      const monthKey = date.toLocaleString('default', { 
        year: 'numeric',
        month: 'short'
      });
      acc[monthKey] = (acc[monthKey] || 0) + 1;
      return acc;
    }, {});

    // Sort months chronologically
    const sortedMonths = Object.keys(reportsByMonth).sort((a, b) => 
      new Date(a).getTime() - new Date(b).getTime()
    );

    // Get display months based on range
    const displayMonths = sortedMonths.slice(-displayRange);

    // Calculate detection statistics
    const detectionStats = reports.reduce((acc: DetectionStats, report) => {
      report.predictions.forEach((pred: Prediction) => {
        if (pred.class === 'B') acc.batteryCount++;
        if (pred.class === 'D') acc.dentalCount++;
      });
      return acc;
    }, { batteryCount: 0, dentalCount: 0 });

    return {
      timelineChartData: {
        labels: displayMonths,
        datasets: [{
          label: 'Reports by Month',
          data: displayMonths.map(month => reportsByMonth[month]),
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          borderColor: 'rgba(53, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      pieChartData: {
        labels: ['Blockage', 'Device'],
        datasets: [{
          data: [detectionStats.batteryCount, detectionStats.dentalCount],
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(53, 162, 235, 0.8)',
          ],
        }]
      },
      uniquePatients: new Set(reports.map(r => r.patientId)).size,
      totalReports: reports.length,
      totalDetections: detectionStats.batteryCount + detectionStats.dentalCount
    };
  }, [reports, displayRange]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Timeline Chart */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Reports Timeline</h3>
          <select 
            value={displayRange}
            onChange={(e) => setDisplayRange(Number(e.target.value))}
            className="p-2 border rounded-md"
          >
            <option value={6}>Last 6 Months</option>
            <option value={12}>Last 12 Months</option>
            <option value={24}>Last 24 Months</option>
            <option value={1000}>All Time</option>
          </select>
        </div>
        <div className="h-[300px]">
          <Bar
            data={stats.timelineChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: { maxTicksLimit: 8 },
                  title: {
                    display: true,
                    text: 'Number of Reports'
                  }
                },
                x: {
                  title: {
                    display: true,
                    text: 'Month'
                  },
                  ticks: {
                    maxRotation: 45,
                    minRotation: 45
                  }
                }
              },
              plugins: {
                legend: {
                  display: false
                },
                tooltip: {
                  callbacks: {
                    title: (context) => `Month: ${context[0].label}`,
                    label: (context) => `Reports: ${context.formattedValue}`
                  }
                }
              }
            }}
          />
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Detection Distribution</h3>
        <div className="h-[300px]">
          <Pie
            data={stats.pieChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { 
                  position: 'bottom',
                  labels: {
                    padding: 20,
                    font: { size: 14 }
                  }
                },
                tooltip: {
                  callbacks: {
                    label: (context) => {
                      const value = context.raw as number;
                      const total = (context.dataset.data as number[]).reduce((a, b) => a + b, 0);
                      const percentage = ((value / total) * 100).toFixed(1);
                      return `${context.label}: ${value} (${percentage}%)`;
                    }
                  }
                }
              }
            }}
          />
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="bg-white p-6 rounded-xl shadow col-span-full">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-blue-600">
              {stats.uniquePatients}
            </h4>
            <p className="text-gray-600">Total Patients</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-green-600">
              {stats.totalReports}
            </h4>
            <p className="text-gray-600">Total Reports</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-purple-600">
              {stats.totalDetections}
            </h4>
            <p className="text-gray-600">Total Detections</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientStats;