"use client";

import {motion} from "framer-motion";
import {Bell} from "lucide-react";

interface NotificationBellProps {
    onClick: () => void;
}

export default function NotificationBell({onClick}: NotificationBellProps) {

    const unreadCount = 1;

    return (
        <motion.button
            onClick={onClick}
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
        >
            <Bell className="w-5 h-5"/>
            {unreadCount > 0 && (
                <motion.div
                    initial={{scale: 0}}
                    animate={{scale: 1}}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center"
                >
                    {unreadCount > 99 ? "99+" : unreadCount}
                </motion.div>
            )}
            {unreadCount > 0 && (
                <motion.div
                    animate={{scale: [1, 1.2, 1]}}
                    transition={{duration: 2, repeat: Number.POSITIVE_INFINITY}}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full opacity-30"
                />
            )}
        </motion.button>
    );
}
