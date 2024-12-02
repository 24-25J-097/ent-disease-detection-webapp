"use client";

import {motion} from 'framer-motion';
import React from 'react';
import Image from 'next/image';
import {LoadingModalProps} from '@/types/Modals';

const LoadingModal: React.FC<LoadingModalProps> = ({ isOpen, text, imagePath }) => {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <motion.div
                className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
            >
                {imagePath && (
                    <Image
                        src={imagePath}
                        alt="Loading Image"
                        className="w-48 h-full mb-4"
                        width={1000}
                        height={1000}
                    />
                )}
                <p
                    className="text-lg font-semibold"
                >
                    {text}
                    <motion.span
                        animate={{
                            opacity: [0, 1, 0],
                            transition: {
                                duration: 1,
                                repeat: Infinity,
                                repeatType: 'loop',
                                delay: 0.5
                            }
                        }}
                    >.</motion.span>
                    <motion.span
                        animate={{
                            opacity: [0, 1, 0],
                            transition: {
                                duration: 1,
                                repeat: Infinity,
                                repeatType: 'loop',
                                delay: 1
                            }
                        }}
                    >.</motion.span>
                    <motion.span
                        animate={{
                            opacity: [0, 1, 0],
                            transition: {
                                duration: 1,
                                repeat: Infinity,
                                repeatType: 'loop',
                                delay: 1.5
                            }
                        }}
                    >.</motion.span>
                    <motion.span
                        animate={{
                            opacity: [0, 1, 0],
                            transition: {
                                duration: 1,
                                repeat: Infinity,
                                repeatType: 'loop',
                                delay: 2
                            }
                        }}
                    >.</motion.span>
                </p>
            </motion.div>
        </div>
    );
};

export default LoadingModal;
