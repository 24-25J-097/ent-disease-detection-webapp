import React from "react";
import MenuItemList from "@/components/dashboard/theme/navigations/MenuItemList";
import Image from "next/image";
import Link from "next/link";
import {uiRandomKey} from "@/utils/utils";
import {MenuProps} from "@/types/Navigations";

const SideMenu: React.FC<MenuProps> = ({ menuItems }) => {

    return (
        <>
            <nav className="side-nav hidden w-[80px] overflow-x-hidden pb-16 pr-3 md:block xl:w-[280px]">
                <Link href="/" className="flex items-center pt-4 pl-5 intro-x">
                    <Image
                        className="w-6"
                        src="/images/ent-insight-logo-w.png"
                        alt="ENT - Dashboard Logo"
                        width={100}
                        height={100}
                    />
                    <span className="hidden ml-3 text-lg text-white xl:block"> ENT Insight</span>
                </Link>
                <div className="my-6 side-nav__divider"></div>
                <ul id={uiRandomKey()}>
                {menuItems.map((item, index) => (
                        <React.Fragment key={uiRandomKey()}>
                            <MenuItemList key={index} index={index} item={item} menuPlace={"side"}/>
                            {item.isDivider && <li className="side-nav__divider my-6"></li>}
                        </React.Fragment>
                    ))}
                </ul>
            </nav>
        </>
    );
};

export default SideMenu;
