import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {SearchIcon} from "lucide-react";

const TopBarSearch: React.FC = () => {

    const [searchOpen, setSearchOpen] = useState<boolean>(false);

    return (
        <div className="search intro-x relative mr-3 sm:mr-6">
            <div className="relative hidden sm:block">
                <input
                    type="text"
                    placeholder="Search..."
                    className="disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50
                    dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed
                    [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent ease-in-out
                    text-sm placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20
                    focus:border-opacity-40 dark:border-transparent dark:focus:ring-slate-700
                    dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 group-[.form-inline]:flex-1
                    group-[.input-group]:rounded-none
                    group-[.input-group]:[&:not(:first-child)]:border-l-transparent
                    group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r
                    group-[.input-group]:z-10 w-56 rounded-full border-transparent bg-slate-300/50 pr-8
                    shadow-none transition-[width] duration-300 focus:w-72 focus:border-transparent
                    dark:bg-darkmode-400/70"
                    onFocus={() => setSearchOpen(true)}
                    onBlur={() => setSearchOpen(false)}
                />
                <SearchIcon
                    className="stroke-1.5 w-5 h-5 absolute inset-y-0 right-0 my-auto mr-3 text-slate-600 dark:text-slate-500"
                />
            </div>
            <a className="relative text-slate-600 sm:hidden" href="">
                <SearchIcon className="stroke-1.5 w-5 h-5 dark:text-slate-500" />
            </a>
            <AnimatePresence>
                {searchOpen && (
                    <motion.div
                        initial={{ opacity: 0, translateY: '1rem' }}
                        animate={{ opacity: 1, translateY: '0rem' }}
                        exit={{ opacity: 0, translateY: '1rem' }}
                        transition={{ duration: 0.15 }}
                        className="search-result absolute right-0 z-10 mt-[3px]"
                    >
                        <div className="box w-[450px] p-5">
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TopBarSearch;
