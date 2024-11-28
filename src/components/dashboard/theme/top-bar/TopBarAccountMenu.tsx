import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Edit, Lock, HelpCircle, ToggleRight } from 'lucide-react';
import useClickOutside from "@/hooks/useClickOutside";
import Image from "next/image";
import Link from "next/link";
import {useAuthService} from '@/hooks/services/useAuthService';

const menuItems = [
    { id: 1, icon: User, label: 'Profile' },
    { id: 2, icon: Edit, label: 'Add Account' },
    { id: 3, icon: Lock, label: 'Reset Password' },
    { id: 4, icon: HelpCircle, label: 'Help' },
];

const TopBarAccountMenu: React.FC = () => {

    const [isOpenAccountMenu, setIsOpenAccountMenu] = useState<boolean>(false);

    const dropdownRef = useClickOutside(() => setIsOpenAccountMenu(false));

    const { logout } = useAuthService({
        middleware: 'auth',
        redirectIfAuthenticated: '/login',
    });

    const handleLogout = async () => {
        await logout();
    }

    return (
        <div ref={dropdownRef} data-tw-placement="bottom-end" className="dropdown relative">
            <button
                onClick={() => setIsOpenAccountMenu(!isOpenAccountMenu)}
                className="cursor-pointer image-fit zoom-in intro-x block h-8 w-8 overflow-hidden rounded-full shadow-lg"
            >
                <Image
                    src="/images/profile.webp"
                    alt="Profile"
                    className="h-full w-full object-cover"
                    width={36}
                    height={36}
                />
            </button>
            <AnimatePresence>
                {isOpenAccountMenu && (
                    <motion.div
                        initial={{opacity: 0, translateY: '1rem'}}
                        animate={{opacity: 1, translateY: '0rem'}}
                        exit={{opacity: 0, translateY: '1rem'}}
                        transition={{duration: 0.15}}
                        className="dropdown-menu absolute right-0 z-[5000] mt-2 w-56 py-2 px-5 rounded-xl bg-theme-1
                        text-white shadow-xl"
                    >
                        <div className="p-2 font-medium">
                            <div className="font-medium">Dr. Smith</div>
                            <div className="mt-0.5 text-xs text-white/70">ENT Doctor</div>
                        </div>
                        <div className="h-px my-2 bg-white/[0.08]" />
                        {menuItems.map((item) => (
                            <Link
                                key={item.id}
                                href="#"
                                className="flex cursor-pointer items-center p-2 rounded-md transition duration-300
                                ease-in-out hover:bg-white/5"
                            >
                                <item.icon className="mr-2 h-4 w-4" />
                                {item.label}
                            </Link>
                        ))}
                        <div
                            onClick={handleLogout}
                            className="flex cursor-pointer items-center p-2 rounded-md transition duration-300
                                ease-in-out hover:bg-white/5"
                        >
                            <ToggleRight className="mr-2 h-4 w-4" />
                            Logout
                        </div>
                        <div className="h-px my-2 bg-white/[0.08]" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TopBarAccountMenu;
