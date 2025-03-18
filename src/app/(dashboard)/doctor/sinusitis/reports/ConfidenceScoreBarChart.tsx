import {
    Bar,
    BarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    Legend,
    CartesianGrid,
    LabelList,
    Label
} from 'recharts';
import React from 'react';
import {ConfidenceScoreDistributionChart} from '@/types/Charts';
import LoadingMessage from '@/components/loaders/LoadingMessage';

const ConfidenceScoreBarChart: React.FC<{
    confidenceScoresData: ConfidenceScoreDistributionChart[] | null,
    chartRef: any
}> = ({confidenceScoresData, chartRef}) => {

    return (
        <div ref={chartRef} className="bg-white p-6 shadow-lg rounded-xl border border-gray-200">
            <h2 className="text-xl font-semibold text-center text-gray-700 mb-2">
                Diagnosis Probability Distribution
            </h2>
            <p className="text-center text-gray-600 mb-2">
                Breakdown of cases based on diagnosis probability ranges.
            </p>

            {confidenceScoresData ? (
                <ResponsiveContainer width="100%" maxHeight={400}>
                    <BarChart data={confidenceScoresData} margin={{top: 10, right: 30, left: 10, bottom: 40}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis
                            dataKey="scoreRange"
                            tick={{fill: '#333', angle: -45, textAnchor: 'end', fontSize: 11} as any}
                            interval={0} // Show all labels
                            label={{
                                value: "Diagnosis Probability Range",
                                position: "insideBottom",
                                dy: 40,
                                fill: '#555'
                            }}
                        />
                        <YAxis
                            tick={{fill: '#333'}}
                            domain={[0, 'auto']}
                            // tickCount={Math.ceil(Math.max(...confidenceScoresData.map(d => d.count)) / 10) + 1}
                        >
                            <Label angle={-90} position="insideLeft" style={{textAnchor: 'middle', fill: '#555'}}>
                                Number of Cases
                            </Label>
                        </YAxis>
                        <Tooltip formatter={(value) => `${value} Cases`}/>
                        <Legend verticalAlign="top" align="center"/>
                        <Bar dataKey="count" fill="#faad14" radius={[5, 5, 0, 0]}>
                            <LabelList dataKey="count" position="top" style={{fill: '#333', fontWeight: 'bold'}}/>
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <LoadingMessage/>
            )}
        </div>
    );
};

export default ConfidenceScoreBarChart;
