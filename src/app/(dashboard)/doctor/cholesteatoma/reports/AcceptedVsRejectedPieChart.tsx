import {Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend} from 'recharts';
import {DiagnosisAcceptedVsRejectedChart} from '@/types/Charts';
import React from 'react';
import LoadingMessage from '@/components/loaders/LoadingMessage';

const CHART_COLORS = ['#1E90FF', '#FF5722'];  // Blue and Red

const AcceptedVsRejectedPieChart: React.FC<{
    diagnosisAcceptedVsRejected: DiagnosisAcceptedVsRejectedChart[] | null,
    chartRef: any
}> = ({diagnosisAcceptedVsRejected, chartRef}) => {

    return (
        <div ref={chartRef} className="bg-white p-5 shadow-md rounded-xl border border-gray-200">
            <h2 className="text-lg font-semibold text-center">Diagnosis Accepted vs. Rejected</h2>
            <p className="text-sm text-gray-500 text-center mb-3">
                Proportion of Accepted vs. Rejected Diagnoses
            </p>
            {diagnosisAcceptedVsRejected ? (
                <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                        <Pie
                            data={diagnosisAcceptedVsRejected}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            // paddingAngle={5}
                            label={({percent}) => `${(percent * 100).toFixed(1)}%`}
                            labelStyle={{fontSize: '12px', fontWeight: 'bold'}}
                        >
                            {diagnosisAcceptedVsRejected.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]}/>
                            ))}
                        </Pie>
                        <Tooltip/>
                        <Legend verticalAlign="bottom" align="center" wrapperStyle={{marginTop: 10}}/>
                    </PieChart>
                </ResponsiveContainer>
            ) : (
                <LoadingMessage/>
            )}
        </div>
    );
};

export default AcceptedVsRejectedPieChart;
