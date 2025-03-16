"use client";

import React, {useCallback, useEffect, useRef, useState} from "react";
import {MenuItemListProps} from "@/types/Navigations";
import SideMenuTooltip from "@/components/dashboard/theme/navigations/SideMenuTooltip";
import GetLucideReactIcon from "@/components/dashboard/GetLucideReactIcon";
import {twc} from "@/utils/tailwind-helper";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {uiRandomKey} from "@/utils/utils";

const MenuItemList: React.FC<MenuItemListProps> = ({item, index}) => {

    const pathName = usePathname();
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const menuLinkRef = useRef<HTMLAnchorElement | null>(null);

    // Function to check if the menu item or its submenu is active
    const isMenuActive = useCallback(() => {
        if (pathName === item.link) return true;

        // Handle submenu activation
        if (item.subMenu) {
            return item.subMenu.some((subItem) => pathName.includes(subItem.link ?? ""));
        }
        return false;
    }, [pathName, item]);

    useEffect(() => {
        const active = isMenuActive();
        setIsActive(active);
        setIsOpen(active); // Keep submenu open if any child is active
    }, [isMenuActive]);

    const handleMenuClick = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            if (!item.isRootMenu || !item.subMenu) return;
            e.preventDefault();
            setIsOpen((prev) => !prev); // Toggle open state
        },
        [item.isRootMenu, item.subMenu]
    );

    return (
        <li key={index}>
            <SideMenuTooltip>
                <Link
                    ref={menuLinkRef}
                    href={(!item.isRootMenu || !item.subMenu) && item.link ? item.link : "#"}
                    className={twc("side-menu", {
                        "side-menu--active": isActive,
                        "side-menu--open": isOpen,
                    })}
                    onClick={item.isRootMenu ? handleMenuClick : undefined}
                    data-link={item.link}
                >
                    <div className="side-menu__icon">
                        <GetLucideReactIcon icon={item.icon} className="stroke-1.5 w-5 h-5"/>
                    </div>
                    <div className="side-menu__title">
                        {item.title}
                        {item.subMenu && (
                            <div
                                className={`side-menu__sub-icon ${
                                    isOpen ? "transform rotate-180" : ""
                                }`}
                            >
                                <GetLucideReactIcon icon="ChevronDown" className="stroke-1.5 w-5 h-5"/>
                            </div>
                        )}
                    </div>
                </Link>
            </SideMenuTooltip>

            {item.subMenu && (
                <ul className={`sub ${isOpen ? "side-menu__sub-open" : "hidden"}`}>
                    {item.subMenu.map((subItem, subIndex) => (
                        <React.Fragment key={uiRandomKey()}>
                            <MenuItemList key={subIndex} index={subIndex} item={subItem}/>
                            {subItem.isDivider && <li className="side-nav__divider my-6"></li>}
                        </React.Fragment>
                    ))}
                </ul>
            )}
        </li>
    );
};

export default MenuItemList;
