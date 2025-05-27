"use client";

import React from 'react';
import {motion} from 'framer-motion';

export interface Step {
    number: number;
    title: string;
    description: string;
}

interface StepsFlowCardProps {
    title: string;
    steps: Step[];
    isVisible: boolean;
    onAnimationComplete?: () => void;
}

const StepsFlowCard: React.FC<StepsFlowCardProps> = ({
                                                         title, steps, isVisible, onAnimationComplete
                                                     }) => {
    return (
        <>
            <motion.div
                className="absolute bg-white rounded-xl shadow-lg p-8 w-full min-h-[725px] flex flex-col items-center"
                initial={{opacity: 1, x: 0}}
                animate={{
                    opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 200, display: isVisible ? 'flex' : 'none'
                }}
                transition={{duration: 0.8}}
                onAnimationComplete={onAnimationComplete}
            >
                <h4 className="text-blue-500 text-xl font-bold mb-8">
                    {title}
                </h4>
                <div className="space-y-8 w-full">
                    {
                        steps.map((step) => (
                            <div key={step.number} className="flex items-start space-x-4">
                                <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                                  <span
                                      className="flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full"
                                  >
                                    {step.number}
                                  </span>
                                </div>
                                <div>
                                    <h5 className="font-semibold text-gray-700">{step.title}</h5>
                                    <p className="text-gray-600 text-sm">{step.description}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </motion.div>
        </>
    );
};

export default StepsFlowCard;
