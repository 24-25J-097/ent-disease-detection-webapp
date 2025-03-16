import React from "react";
import {
    Activity,
    BarChart2,
    ChevronDown,
    Home,
    XCircle
} from "lucide-react";
import Image from 'next/image';

const MobileMenu: React.FC = () => {

    return (
        <>
            <div className="mobile-menu group top-0 inset-x-0 fixed bg-theme-1/90 z-[60] border-b
                            border-white/[0.08] dark:bg-darkmode-800/90 md:hidden before:content-[''] before:w-full
                            before:h-screen before:z-10 before:fixed before:inset-x-0 before:bg-black/90
                            before:transition-opacity before:duration-200 before:ease-in-out before:invisible
                            before:opacity-0 [&.mobile-menu--active]:before:visible
                            [&.mobile-menu--active]:before:opacity-100">
                <div className="flex h-[70px] items-center px-3 sm:px-8">
                    <a className="mr-auto flex" href="">
                        <Image
                            className="w-6"
                            src="/images/logo.svg"
                            alt="Dashboard"
                            width={100}
                            height={100}
                        />
                    </a>
                    <a className="mobile-menu-toggler" href="#">
                        <BarChart2 className="stroke-1.5 h-8 w-8 -rotate-90 transform text-white"/>
                    </a>
                </div>
                <div className="scrollable h-screen z-20 top-0 left-0 w-[270px] -ml-[100%] bg-primary
                              transition-all duration-300 ease-in-out dark:bg-darkmode-800 [&[data-simplebar]]:fixed
                              [&_.simplebar-scrollbar]:before:bg-black/50 group-[.mobile-menu--active]:ml-0">
                    <a href="#" className="fixed top-0 right-0 mt-4 mr-4 transition-opacity duration-200
                                ease-in-out invisible opacity-0 group-[.mobile-menu--active]:visible
                                group-[.mobile-menu--active]:opacity-100">
                        <XCircle className="stroke-1.5 mobile-menu-toggler h-8 w-8 -rotate-90 transform text-white"/>
                    </a>
                    <ul className="py-2">
                        {/*BEGIN: First Child*/}
                        <li>
                            <a className="menu menu--active" href="#">
                                <div className="menu__icon">
                                    <Home className="stroke-1.5 w-5 h-5"/>
                                </div>
                                <div className="menu__title">
                                    Dashboard
                                    <div className="menu__sub-icon transform rotate-180">
                                        <ChevronDown className="stroke-1.5 w-5 h-5"/>
                                    </div>
                                </div>
                            </a>
                            <ul className="menu__sub-open">
                                <li>
                                    <a className="menu menu--active"
                                       href="">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Overview 1
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="menu"
                                       href="">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Overview 2
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="menu"
                                       href="">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Overview 3
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="menu"
                                       href="">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Overview 4
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        {/*END: First Child*/}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default MobileMenu;
