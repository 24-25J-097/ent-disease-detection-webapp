import React, {useState} from 'react';
import Image from "next/image";
import Link from "next/link";
import { Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useClickOutside from "@/hooks/useClickOutside";

export const notifications = [
    {
        id: 1,
        name: "Dr. Smith",
        time: "08:30 AM",
        message: "New audiogram results are available for patient John Doe. Please review them in the 'Patient Reports' section.",
        imgSrc: "/images/profile.webp",
    },
    {
        id: 2,
        name: "Lab Updates",
        time: "10:45 AM",
        message: "Biopsy report for patient Emily Brown has been added. Access it through the 'Lab Results' section.",
        imgSrc: "/images/ent-insight-logo.png",
    },
    {
        id: 3,
        name: "Dr. Allen",
        time: "11:20 AM",
        message: "Patient follow-up scheduled: Jane Wilson (Chronic Sinusitis) at 3:00 PM. Please confirm availability.",
        imgSrc: "/images/profile.webp",
    },
    {
        id: 4,
        name: "Medical Alerts",
        time: "01:15 PM",
        message: "A new guideline on diagnosing Cholesteatoma has been published in the ENT Knowledge Base.",
        imgSrc: "/images/ent-insight-logo.png",
    },
    {
        id: 5,
        name: "ENT Insight System",
        time: "04:00 PM",
        message: "Your data analysis for patient James Green has been updated. Insights are available in the dashboard.",
        imgSrc: "/images/ent-insight-logo.png",
    },
];


const TopBarNotification: React.FC<{ isTopBar: boolean }> = ({ isTopBar }) => {

    const [isOpenNotifications, setIsOpenNotifications] = useState<boolean>(false);

    const dropdownRef = useClickOutside(() => setIsOpenNotifications(false));

    return (
        <div ref={dropdownRef} data-tw-placement="bottom-end" className="dropdown relative intro-x mr-auto sm:mr-6">
            <div
                onClick={() => setIsOpenNotifications(!isOpenNotifications)}
                className={`cursor-pointer relative block text-slate-600 outline-none before:absolute 
                         before:right-0 before:top-[-2px] before:h-[8px] before:w-[8px] before:rounded-full
                         before:bg-danger before:content-[''] ${isTopBar && "text-white/90"}`}
            >
                <Bell className="stroke-1.5 w-5 h-5 dark:text-slate-500"/>
            </div>
            <AnimatePresence>
                {isOpenNotifications && (
                    <motion.div
                        initial={{opacity: 0, translateY: '1rem'}}
                        animate={{opacity: 1, translateY: '0rem'}}
                        exit={{opacity: 0, translateY: '1rem'}}
                        transition={{duration: 0.15}}
                        className="dropdown-menu absolute right-0 z-[5000] mt-[3px]"
                    >
                        <div
                            className="dropdown-content rounded-xl border-transparent bg-white shadow-md
                            dark:border-transparent dark:bg-darkmode-600 mt-2 w-[280px] p-5 sm:w-[350px]"
                        >
                            <div className="mb-5 font-medium">Notifications</div>
                            {notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className="cursor-pointer relative flex items-center mt-5 first:mt-0"
                                >
                                    <div className="image-fit relative mr-1 h-12 w-12 flex-none">
                                        <Image
                                            className="rounded-full"
                                            src={notification.imgSrc}
                                            alt="Notification"
                                            width={36}
                                            height={36}
                                        />
                                        <div
                                            className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2
                                            border-white bg-success dark:border-darkmode-600">
                                        </div>
                                    </div>
                                    <div className="ml-2 overflow-hidden">
                                        <div className="flex items-center">
                                            <Link className="mr-5 truncate font-medium" href="">
                                                {notification.name}
                                            </Link>
                                            <div className="ml-auto whitespace-nowrap text-xs text-slate-400">
                                                {notification.time}
                                            </div>
                                        </div>
                                        <div className="mt-0.5 w-full truncate text-slate-500">
                                            {notification.message}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TopBarNotification;
