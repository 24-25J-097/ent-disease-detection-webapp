import React from 'react';
import {Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend} from 'recharts';
import {DiagnosisStatusChart} from '@/types/Charts';
import LoadingMessage from '@/components/loaders/LoadingMessage';

const COLORS = ['#52c41a', '#ff4d4f', '#ffa940'];

const DiagnosisStatusPieChart: React.FC<{
    diagnosisStatusData: DiagnosisStatusChart[] | null,
    chartRef: any
}> = ({diagnosisStatusData, chartRef}) => {

    const total = diagnosisStatusData
        ? diagnosisStatusData.reduce((sum, item) => sum + item.value, 0)
        : "N/A";

    return (
        <div ref={chartRef} className="bg-white p-6 shadow-lg rounded-xl border border-gray-200">
            <h2 className="text-xl font-semibold text-center mb-1 text-gray-700">Diagnosis Status Overview</h2>

            <div className="text-center text-gray-600">
                <span className="font-medium">Total Diagnoses: </span>
                <span className="font-bold text-gray-800">{total}</span>
            </div>

            {diagnosisStatusData ? (
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={diagnosisStatusData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            fill="#8884d8"
                            label={({percent}) => `${(percent * 100).toFixed(1)}%`}
                        >
                            {diagnosisStatusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value} Cases`}/>
                        <Legend verticalAlign="bottom" align="center" iconSize={14}/>
                    </PieChart>
                </ResponsiveContainer>
            ) : (
                <LoadingMessage/>
            )}
        </div>
    );
};

export default DiagnosisStatusPieChart;
