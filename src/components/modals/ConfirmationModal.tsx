import React from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {CircleAlert} from "lucide-react";
import {ConfirmationModalProps} from "@/types/Modals";

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
                                                                 isVisible,
                                                                 onClose,
                                                                 onConfirmed,
                                                                 title,
                                                                 message,
                                                                 btnText,
                                                             }) => {

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] rounded"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.3}}
                >
                    <motion.div
                        className="bg-white dark:bg-darkmode-600 rounded-md shadow-md p-6 sm:w-[460px] w-[90%] mx-auto"
                        initial={{scale: 0.30}}
                        animate={{scale: 1}}
                        exit={{scale: 0.30}}
                        transition={{duration: 0.6}}
                    >
                        <div className="text-center">
                            <CircleAlert className="text-theme-1 mx-auto mt-3 h-16 w-16"/>
                            <motion.h3
                                className="mt-5 text-3xl"
                                animate={{opacity: [1, 0, 1]}}
                                transition={{
                                    repeat: 0,
                                    duration: 2,
                                    ease: "easeInOut",
                                }}
                            >
                                {title}
                            </motion.h3>
                            <motion.p
                                className="mt-2 text-slate-500"
                                animate={{scale: [1, 1.3, 1]}}
                                transition={{
                                    repeat: 0,
                                    duration: 3,
                                    ease: "easeInOut",
                                }}
                            >
                                {message}
                            </motion.p>
                        </div>
                        <div className="mt-6 flex justify-center gap-x-3">
                            <button
                                onClick={onClose}
                                className="transition duration-200 border border-slate-200 shadow-sm inline-flex
                                items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4
                                focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none
                                dark:focus:ring-slate-700 dark:focus:ring-opacity-50
                                [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90
                                w-24 text-slate-500 dark:border-darkmode-100/40
                                dark:text-slate-300 [&:hover:not(:disabled)]:bg-secondary/20
                                [&:hover:not(:disabled)]:dark:bg-darkmode-100/10"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirmed}
                                className="transition duration-200 border shadow-sm inline-flex items-center
                                justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4
                                focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-opacity-50
                                [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90
                                w-24 bg-primary border-primary text-white dark:border-primary focus:ring-primary
                                dark:focus:ring-slate-700"
                            >
                                {btnText}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmationModal;
