"use client";

import {motion} from "framer-motion";
import {LogOut, Search, Settings} from "lucide-react";
import React, {useState} from "react";
import NotificationBell from '@/components/dashboard/NotificationBell';
import NotificationCenter from '@/components/dashboard/NotificationCenter';
import Image from 'next/image';
import {router} from 'next/client';
import {useAuthService} from '@/hooks/services/useAuthService';
import {ThemeToggle} from '@/components/dashboard/ThemeToggle';
import Breadcrumb from '@/components/dashboard/Breadcrumb';

interface DashboardHeaderUser {
    name: string;
    email: string;
    avatar: string;
    progress: number;
    streak: number;
}

interface DashboardHeaderProps {
    user: DashboardHeaderUser;
}

export default function DashboardHeader({user}: DashboardHeaderProps) {

    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const {logout} = useAuthService({
        middleware: 'auth',
        redirectIfAuthenticated: '/login',
    });

    const handleLogout = async () => {
        await logout();
    };

    return (
        <motion.header
            initial={{opacity: 0, y: -20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6}}
            className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50"
        >
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <div className="w-10">
                            <Image
                                src={"/images/ent-insight-logo-w.png"}
                                alt="Logo"
                                className="w-full cursor-pointer"
                                width={1000}
                                height={1000}
                            />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-foreground">ENT Insight Academic</h1>
                            <p className="text-xs text-muted-foreground">Medical Education Platform</p>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
                        <div className="relative w-full">
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4"/>
                            <input
                                type="text"
                                placeholder="Search conditions, symptoms, or topics..."
                                className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                            />
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center space-x-4">
                        {/* Progress Indicator */}
                        <div className="hidden lg:flex items-center space-x-3">
                            <div className="text-right">
                                <p className="text-sm font-medium text-foreground">{user.progress}% Complete</p>
                                <p className="text-xs text-muted-foreground">{user.streak} day streak 🔥</p>
                            </div>
                            <div className="w-12 h-12 relative">
                                <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                                    <path
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeDasharray={`${user.progress}, 100`}
                                        className="text-primary"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xs font-medium text-foreground">{user.progress}%</span>
                                </div>
                            </div>
                        </div>

                        {/* Notifications */}
                        <NotificationBell onClick={() => setShowNotifications(true)}/>

                        {/* Settings */}
                        <button
                            className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50">
                            <Settings className="w-5 h-5"/>
                        </button>

                        <ThemeToggle/>

                        {/* User Menu */}
                        <div className="relative">
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                            >
                                <img
                                    src={user.avatar || "/images/profile.webp"}
                                    alt={user.name}
                                    className="w-8 h-8 rounded-full border-2 border-primary/20"
                                />
                                <div className="hidden md:block text-left">
                                    <p className="text-sm font-medium text-foreground">{user.name}</p>
                                    <p className="text-xs text-muted-foreground">Medical Student</p>
                                </div>
                            </button>

                            {showUserMenu && (
                                <motion.div
                                    initial={{opacity: 0, scale: 0.95, y: -10}}
                                    animate={{opacity: 1, scale: 1, y: 0}}
                                    exit={{opacity: 0, scale: 0.95, y: -10}}
                                    className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-2 z-50"
                                >
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted/50 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4 mr-3"/>
                                        Sign Out
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Breadcrumbs */}
            <div className="container mx-auto px-4 pb-2">
                <Breadcrumb />
            </div>

            <NotificationCenter isOpen={showNotifications} onClose={() => setShowNotifications(false)}/>
        </motion.header>
    );
}
