"use client";

import {motion, AnimatePresence} from "framer-motion";
import {useState} from "react";
import {
    Bell,
    X,
    MessageSquare,
    AlertCircle,
    Info,
    CheckCircle,
    Trash2,
    BookMarkedIcon as MarkAsRead,
} from "lucide-react";
import {notifications} from '@/components/dashboard/theme/top-bar/TopBarNotification';

interface NotificationCenterProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function NotificationCenter({isOpen, onClose}: NotificationCenterProps) {

    const [filter, setFilter] = useState<"all" | "unread" | "feedback">("all");

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case "success":
                return <CheckCircle className="w-5 h-5 text-green-500"/>;
            case "error":
                return <AlertCircle className="w-5 h-5 text-red-500"/>;
            case "warning":
                return <AlertCircle className="w-5 h-5 text-yellow-500"/>;
            case "info":
                return <Info className="w-5 h-5 text-blue-500"/>;
            case "feedback":
                return <MessageSquare className="w-5 h-5 text-purple-500"/>;
            default:
                return <Bell className="w-5 h-5 text-gray-500"/>;
        }
    };

    const getPriorityColor = (priority?: string) => {
        switch (priority) {
            case "high":
                return "border-l-red-500";
            case "medium":
                return "border-l-yellow-500";
            case "low":
                return "border-l-green-500";
            default:
                return "border-l-transparent";
        }
    };

    const formatTime = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return "Just now";
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    };

    const handleNotificationClick = (notification: any) => {
        if (notification.actionUrl) {
            // Navigate to the URL
            window.location.href = notification.actionUrl;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                        onClick={onClose}
                    />

                    {/* Notification Panel */}
                    <motion.div
                        initial={{opacity: 0, x: 300}}
                        animate={{opacity: 1, x: 0}}
                        exit={{opacity: 0, x: 300}}
                        transition={{type: "spring", damping: 25, stiffness: 200}}
                        className="fixed top-0 right-0 h-full w-full max-w-md dark:bg-[#020817] border-l border-border shadow-2xl z-[5000] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-border">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Bell className="w-5 h-5 text-primary"/>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
                                        <p className="text-sm text-muted-foreground">
                                            {"All caught up!"}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-blue-gray-900/50"
                                >
                                    <X className="w-5 h-5"/>
                                </button>
                            </div>

                            {/* Filter Tabs */}
                            <div className="flex space-x-1 bg-blue-gray-900/50 p-1 rounded-lg">
                                {[
                                    {id: "all", label: "All", count: notifications.length},
                                    {id: "unread", label: "Unread", count: 0},
                                    {
                                        id: "feedback",
                                        label: "Feedback",
                                        count: 0,
                                    },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setFilter(tab.id as any)}
                                        className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                                            filter === tab.id
                                                ? "bg-background text-foreground shadow-sm"
                                                : "text-muted-foreground hover:text-foreground"
                                        }`}
                                    >
                                        {tab.label}
                                        {tab.count > 0 && (
                                            <span
                                                className="ml-2 px-2 py-0.5 bg-primary/20 text-primary rounded-full text-xs">
                        {tab.count}
                      </span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Actions */}
                            {notifications.length > 0 && (
                                <div className="flex items-center justify-between mt-4">
                                    <button
                                        className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <MarkAsRead className="w-4 h-4"/>
                                        <span>Mark all read</span>
                                    </button>
                                    <button
                                        className="flex items-center space-x-2 text-sm text-red-500 hover:text-red-400 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4"/>
                                        <span>Clear all</span>
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Notifications List */}
                        <div className="flex-1 overflow-y-auto">
                            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                                <div
                                    className="w-16 h-16 bg-blue-gray-900/50 rounded-full flex items-center justify-center mb-4">
                                    <Bell className="w-8 h-8 text-muted-foreground"/>
                                </div>
                                <h3 className="text-lg font-medium text-foreground mb-2">
                                    {filter === "unread" ? "No unread notifications" : "No notifications"}
                                </h3>
                                <p className="text-muted-foreground text-sm">
                                    {filter === "unread" ? "You're all caught up!" : "We'll notify you when there's something new"}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
