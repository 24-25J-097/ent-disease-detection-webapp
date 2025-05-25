"use client";

import {NextPage} from "next";
import {motion} from "framer-motion";
import StudentDashboardHeader from "@/components/dashboard/StudentDashboardHeader";
import BentoGrid from "@/components/dashboard/BentoGrid";
import {useSelector} from 'react-redux';

const StudentDashboard: NextPage = () => {

    const user = useSelector((state: any) => state.auth.user);

    const isConnected = false;

    return (
        <div className="min-h-screen">
            <StudentDashboardHeader user={user}/>

            <main className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6}}
                    className="mb-8"
                >
                    <div className="flex items-center justify-between mb-2">
                        <h1 className="text-3xl font-bold text-foreground">
                            Welcome back, {user?.name?.split(" ")[0]} 👋</h1>
                        {isConnected && (
                            <motion.div
                                initial={{opacity: 0, scale: 0.8}}
                                animate={{opacity: 1, scale: 1}}
                                className="flex items-center space-x-2 text-green-500 text-sm"
                            >
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
                                <span>Real-time updates active</span>
                            </motion.div>
                        )}
                    </div>
                    <p className="text-muted-foreground">Continue your ENT learning journey with AI-powered insights</p>
                </motion.div>

                <BentoGrid/>
            </main>
        </div>
    );
};

export default StudentDashboard;
