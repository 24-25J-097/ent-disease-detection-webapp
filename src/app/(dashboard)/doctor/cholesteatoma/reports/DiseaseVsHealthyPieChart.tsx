import {Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend} from 'recharts';
import {DiseaseVsHealthyChart} from '@/types/Charts';
import React from 'react';
import LoadingMessage from '@/components/loaders/LoadingMessage';

const CHART_COLORS = ['#ff4d4f', '#40a9ff'];

const DiseaseVsHealthyPieChart: React.FC<{
    cholesteatomaVsHealthyData: DiseaseVsHealthyChart[] | null,
    chartRef: any
}> = ({cholesteatomaVsHealthyData, chartRef}) => {

    return (
        <div ref={chartRef} className="bg-white p-5 shadow-md rounded-xl border border-gray-200">
            <h2 className="text-lg font-semibold text-center">Cholesteatoma vs. Healthy</h2>
            <p className="text-sm text-gray-500 text-center mb-3">
                Proportion of diagnosed cases vs. healthy patients
            </p>
            {cholesteatomaVsHealthyData ? (
                <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                        <Pie
                            data={cholesteatomaVsHealthyData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            // paddingAngle={5}
                            label={({percent}) => `${(percent * 100).toFixed(1)}%`}
                        >
                            {cholesteatomaVsHealthyData.map((entry, index) => (
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

export default DiseaseVsHealthyPieChart;
