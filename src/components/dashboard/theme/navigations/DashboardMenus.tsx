"use client";

import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import SideMenu from "@/components/dashboard/theme/navigations/SideMenu";
import {ChildrenProps} from "@/types/Common";
import MobileMenu from "@/components/dashboard/theme/navigations/MobileMenu";
import TopBar from "@/components/dashboard/theme/top-bar/TopBar";
import {Role} from "@/enums/access";
import {AdminMenuItems} from "@/data/dashboard/admin-menu-items";
import {MenuItem} from "@/types/Navigations";
import {MenuItems} from "@/data/dashboard/menu-items";

const DashboardMenus = ({children}: ChildrenProps) => {

    // const role = useSelector((state: any) => state.auth.role); // TODO:
    const role = "admin";

    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    useEffect(() => {
        if (role == Role.ADMIN) {
            setMenuItems(AdminMenuItems);
        } else {
            setMenuItems(MenuItems);
        }
    }, [role]);

    const getMenu = () => {
        return (
            <div className="mt-[4.7rem] flex md:mt-0 w-full">
                <SideMenu menuItems={menuItems}/>
                <div
                    className="md:max-w-auto min-h-screen min-w-0 max-w-full flex-1 rounded-[30px] bg-slate-100
                            px-4 pb-10 before:block before:h-px before:w-full before:content-[''] dark:bg-darkmode-700
                            md:px-[22px]"
                >
                    <TopBar isTopMenu={false}/>
                    {children}
                </div>
            </div>
        );
    };

    return (
        <>
            <MobileMenu/>
            {getMenu()}
        </>
    );
}

export default DashboardMenus;