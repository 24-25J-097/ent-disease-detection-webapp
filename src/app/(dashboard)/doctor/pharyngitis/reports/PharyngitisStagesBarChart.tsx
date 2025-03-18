import React from 'react';
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
    Label, Cell
} from 'recharts';
import LoadingMessage from '@/components/loaders/LoadingMessage';
import {PharyngitisStageChart} from "@/types/Charts";

const COLORS = ['#76bbff', '#2592f4', '#005bb2'];

const stageDescriptions: { [key: string]: string } = {
    'Normal': 'No treatment needed. Stay hydrated and maintain oral hygiene.',
    'Moderate': 'Try warm gargles or lozenges. See a doctor if it worsens.',
    'Tonsillitis': 'Immediate medical care needed. Antibiotics or advanced treatment may be requiredt'
};

const PharyngitisStagesBarChart: React.FC<{
    pharyngitisStagesData: PharyngitisStageChart[] | null,
    chartRef: any
}> = ({pharyngitisStagesData, chartRef}) => {

    return (
        <div ref={chartRef} className="bg-white p-6 shadow-lg rounded-xl border border-gray-200">
            <h2 className="text-xl font-semibold text-center mb-2 text-gray-700">
                Pharyngitis Stages Overview
            </h2>
            <p className="text-center text-gray-600 mb-2">
                Distribution of cases based on severity stages.
            </p>

            {pharyngitisStagesData ? (
                <>
                    <ResponsiveContainer width="100%" maxHeight={400}>
                        <BarChart data={pharyngitisStagesData} margin={{top: 10, right: 30, left: 10, bottom: 30}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis
                                dataKey="stage"
                                tick={{fill: '#333'}}
                                label={{value: "Pharyngitis Stages", position: "insideBottom", dy: 20, fill: '#555'}}
                            />
                            <YAxis tick={{fill: '#333'}}>
                                <Label angle={-90} position="insideLeft" style={{textAnchor: 'middle', fill: '#555'}}>
                                    Number of Cases
                                </Label>
                            </YAxis>
                            <Tooltip formatter={(value) => `${value} Cases`}/>
                            <Legend verticalAlign="top" align="center"/>
                            <Bar dataKey="count" radius={[5, 5, 0, 0]}>
                                {pharyngitisStagesData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                                ))}
                                <LabelList dataKey="count" position="top" style={{fill: '#333', fontWeight: 'bold'}}/>
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>

                    <div className="mt-4">
                        {Object.entries(stageDescriptions).map(([stage, description], index) => (
                            <div key={stage} className="flex items-center mb-2">
                        <span
                            className="inline-block w-4 h-4 mr-2 rounded-full"
                            style={{backgroundColor: COLORS[index]}}
                        ></span>
                                <p className="text-gray-700 font-medium">
                                    <strong>{stage}:</strong> {description}
                                </p>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <LoadingMessage/>
            )}
        </div>
    );
};

export default PharyngitisStagesBarChart;

