import React from 'react';
import {
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    Legend,
    LineChart,
    CartesianGrid,
    YAxis,
    XAxis, Line
} from 'recharts';
import {DiagnosisStatusChart, SeverityMonthlyData} from '@/types/Charts';
import LoadingMessage from '@/components/loaders/LoadingMessage';

const COLORS = ['#52c41a', '#ff4d4f', '#ffa940'];

const SinusitisMonthlyLineChart: React.FC<{
    monthlySeverityTrends: SeverityMonthlyData[] | null,
    chartRef: any
}> = ({monthlySeverityTrends, chartRef}) => {

    return (
        <div ref={chartRef} className="bg-white p-6 shadow-lg rounded-xl border border-gray-200">
            <h2 className="text-xl font-semibold text-center mb-1 text-gray-700">Yearly Diagnosis Status Overview</h2>

            {monthlySeverityTrends ? (
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={monthlySeverityTrends} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="month"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <Line type="monotone" dataKey="mild" stroke="#82ca9d" name="Mild Cases"/>
                        <Line type="monotone" dataKey="moderate" stroke="#ffcc00" name="Moderate Cases"/>
                        <Line type="monotone" dataKey="severe" stroke="#ff0000" name="Severe Cases"/>
                    </LineChart>
                </ResponsiveContainer>
            ) : (
                <LoadingMessage/>
            )}
        </div>
    );
};

export default SinusitisMonthlyLineChart;
