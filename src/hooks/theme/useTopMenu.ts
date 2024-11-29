import { useEffect, useRef } from 'react';
import 'tippy.js/dist/tippy.css';
import { useSelector } from 'react-redux';

export function useTopMenu() {

    const color = useSelector((state: any) => state.theme.color);
    const menuType = useSelector((state: any) => state.theme.menuType);
    const themeMode = useSelector((state: any) => state.theme.themeMode);

    const activeElementRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const handleMenuClick = function (this: HTMLElement) {
            const ul = this.parentElement?.querySelector('ul');

            if (this.classList.contains('root-menu')) {
                // Remove active class from the previously active element
                if (activeElementRef.current) {
                    if ("classList" in activeElementRef.current) {
                        activeElementRef.current.classList.remove('top-menu--active');
                    }
                }
                // Remove active class from all elements with 'top-menu--active
                document.querySelectorAll('.top-menu.top-menu--active').forEach(activeMenu => {
                    activeMenu.classList.remove('top-menu--active');
                });
            }

            // Add active class to the clicked element
            this.classList.add('top-menu--active');

            // Update the active element reference
            activeElementRef.current = this;
        };

        const initializeTopMenu = () => {
            const topMenus = document.querySelectorAll('.top-menu');
            topMenus.forEach(menu => {
                menu.addEventListener('click', handleMenuClick);
            });
        };

        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            initializeTopMenu();
        } else {
            window.addEventListener('DOMContentLoaded', initializeTopMenu);
        }

        return () => {
            const topMenus = document.querySelectorAll('.top-menu');
            topMenus.forEach(menu => {
                menu.removeEventListener('click', handleMenuClick);
            });
            window.removeEventListener('DOMContentLoaded', initializeTopMenu);
        };
    }, [color, menuType, themeMode]);
}
