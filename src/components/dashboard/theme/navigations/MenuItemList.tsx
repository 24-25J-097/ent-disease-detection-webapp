"use client";

import React, {useCallback, useEffect, useRef, useState} from "react";
import {MenuItemListProps} from "@/types/Navigations";
import SideMenuTooltip from "@/components/dashboard/theme/navigations/SideMenuTooltip";
import GetLucideReactIcon from "@/components/dashboard/GetLucideReactIcon";
import {twc} from "@/utils/tailwind-helper";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {uiRandomKey} from "@/utils/utils";
import {useSelector} from "react-redux";

const MenuItemList: React.FC<MenuItemListProps> = ({item, index, menuPlace}) => {

    const pathName = usePathname();
    const [className, setClassName] = useState<string>("");
    const isTopMenu = menuPlace === 'top';

    const color = useSelector((state: any) => state.theme.color);
    const menuType = useSelector((state: any) => state.theme.menuType);
    const themeMode = useSelector((state: any) => state.theme.themeMode);
    const role = useSelector((state: any) => state.auth.role);

    const activeElementRef = useRef<HTMLElement | null>(null);
    const menuLinkRef = useRef<HTMLAnchorElement | null>(null);

    useEffect(() => {
        if (!item.isRootMenu) return;

        const splitUrlAfterRole = (url: string, role: string) => {
            const regex = new RegExp(`(.*\/${role})(\/.*)?`);
            const match = url.match(regex);
            return match ? [match[1], match[2]] : [url];
        };

        const isSubMenu = (menuLink: string, currentPath: string, role: string) => {
            const [beforeMenuLink, afterMenuLink] = splitUrlAfterRole(menuLink, role);
            const [beforeCurrentPath, afterCurrentPath] = splitUrlAfterRole(currentPath, role);
            const menuLinkSegments = afterMenuLink ? afterMenuLink.split('/') : [];
            const currentPathSegments = afterCurrentPath ? afterCurrentPath.split('/') : [];

            return (
                (menuLinkSegments.at(-1) === currentPathSegments.at(-1) ||
                    menuLinkSegments.at(-1) === currentPathSegments.at(-2)) &&
                menuLinkSegments.length > 0 &&
                currentPathSegments.length > 1
            );
        };

        const updateMenuClassAndClick = () => {
            let classes = "root-menu";
            if (
                (pathName === item.link)
                || (isSubMenu(item.link || "", pathName, String(role)))
            ) {
                classes += isTopMenu ? " top-menu--active" : " side-menu--active";
                if (menuLinkRef.current?.click) {
                    if ("click" in menuLinkRef.current) {
                        menuLinkRef.current.click();
                    }
                }
            }
            setClassName(classes);
        };

        updateMenuClassAndClick();
        activeElementRef.current = document.querySelector(
            isTopMenu ? `.top-menu[data-link="${item.link}"]` : `.side-menu[data-link="${item.link}"]`
        );

    }, [isTopMenu, item.isRootMenu, item.link, pathName, role]);

    const handleMenuClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
        const target = e.currentTarget;
        const ul = target.parentElement?.querySelector('ul');

        // Close the previously active menu if it exists and it's different from the current one
        if (activeElementRef.current) {
            let prevUl;
            let prevSubIcon;
            if ("parentElement" in activeElementRef.current) {
                prevUl = activeElementRef.current.parentElement?.querySelector('ul');
            }
            if ("querySelector" in activeElementRef.current) {
                prevSubIcon = activeElementRef.current.querySelector(isTopMenu ? '.top-menu__sub-icon' : '.side-menu__sub-icon');
            }

            if (prevUl) {
                if ("classList" in activeElementRef.current) {
                    activeElementRef.current.classList.remove(isTopMenu ? 'top-menu--open' : 'side-menu--open');
                }
                prevSubIcon?.classList.remove('transform', 'rotate-180');
                prevUl.classList.remove(isTopMenu ? 'top-menu__sub-open' : 'side-menu__sub-open');
                prevUl.style.display = 'none';
            }

            if ("classList" in activeElementRef.current) {
                activeElementRef.current.classList.remove(isTopMenu ? 'top-menu--active' : 'side-menu--active');
            }
        }

        if (target.classList.contains('root-menu')) {
            // Add active class to the clicked element
            target.classList.add(isTopMenu ? 'top-menu--active' : 'side-menu--active');
            activeElementRef.current = target;
        }

        if (ul) {
            // @ts-ignore
            const subIcon = target.querySelector<HTMLInputElement>(isTopMenu ? '.top-menu__sub-icon' : '.side-menu__sub-icon');

            if (ul.style.display === 'block' || ul.style.display === '') {
                // Close the submenu
                target.classList.remove(isTopMenu ? 'top-menu--open' : 'side-menu--open');
                subIcon?.classList.remove('transform', 'rotate-180');
                ul.classList.remove(isTopMenu ? 'top-menu__sub-open' : 'side-menu__sub-open');
                ul.style.display = 'none';
            } else {
                // Open the submenu
                target.classList.add(isTopMenu ? 'top-menu--open' : 'side-menu--open');
                subIcon?.classList.add('transform', 'rotate-180');
                ul.classList.add(isTopMenu ? 'top-menu__sub-open' : 'side-menu__sub-open');
                ul.style.display = 'block';
            }
        }
    }, [isTopMenu]);

    useEffect(() => {
        const initializeMenus = () => {
            const menus = document.querySelectorAll(isTopMenu ? '.top-menu' : '.side-menu');
            menus.forEach(menu => {
                // @ts-ignore
                menu.addEventListener('click', handleMenuClick);
            });
        };

        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            initializeMenus();
        } else {
            window.addEventListener('DOMContentLoaded', initializeMenus);
        }

        return () => {
            const menus = document.querySelectorAll(isTopMenu ? '.top-menu' : '.side-menu');
            menus.forEach(menu => {
                // @ts-ignore
                menu.removeEventListener('click', handleMenuClick);
            });
            window.removeEventListener('DOMContentLoaded', initializeMenus);
        };
    }, [color, menuType, themeMode, isTopMenu, handleMenuClick]);

    return (
        <>
            <li key={index}>
                <SideMenuTooltip>
                    <Link
                        ref={menuLinkRef as any}
                        href={((!item.isRootMenu || !item.subMenu) && item.link) ? item.link : '#'}
                        className={twc(`${isTopMenu ? "top-menu" : "side-menu"}`, `${className}`)}
                        onClick={item.isRootMenu ? handleMenuClick : undefined}
                        data-link={item.link}
                    >
                        <div className={isTopMenu ? "top-menu__icon" : "side-menu__icon"}>
                            <GetLucideReactIcon icon={item.icon} className="stroke-1.5 w-5 h-5"/>
                        </div>
                        <div className={isTopMenu ? "top-menu__title" : "side-menu__title"}>
                            {item.title}
                            {item.subMenu && (
                                <div className={isTopMenu ? "top-menu__sub-icon" : "side-menu__sub-icon"}>
                                    <GetLucideReactIcon icon="ChevronDown" className="stroke-1.5 w-5 h-5"/>
                                </div>
                            )}
                        </div>
                    </Link>
                </SideMenuTooltip>
                {item.subMenu && (
                    <ul className="sub">
                        {item.subMenu.map((subItem, subIndex) => (
                            <React.Fragment key={uiRandomKey()}>
                                <MenuItemList key={subIndex} index={subIndex} item={subItem} menuPlace={menuPlace}/>
                                {(!isTopMenu && subItem.isDivider) && <li className="side-nav__divider my-6"></li>}
                            </React.Fragment>
                        ))}
                    </ul>
                )}
            </li>
        </>
    );

};

export default MenuItemList;
