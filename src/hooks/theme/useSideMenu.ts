import { useEffect, useRef } from 'react';
import 'tippy.js/dist/tippy.css';
import { useSelector } from 'react-redux';

export function useSideMenu() {
    const color = useSelector((state: any) => state.theme.color);
    const menuType = useSelector((state: any) => state.theme.menuType);
    const themeMode = useSelector((state: any) => state.theme.themeMode);

    const activeElementRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const handleMenuClick = function (this: HTMLElement) {
            console.log('Menu clicked:', this);
            const ul = this.parentElement?.querySelector('ul');

            if (this.classList.contains('root-menu')) {
                // Remove active class from the previously active element
                if (activeElementRef.current) {
                    if ("classList" in activeElementRef.current) {
                        activeElementRef.current.classList.remove('side-menu--active');
                    }
                }
                // Remove active class from all elements with 'side-menu--active'
                document.querySelectorAll('.side-menu.side-menu--active').forEach(activeMenu => {
                    console.log('Removing active class from:', activeMenu);
                    activeMenu.classList.remove('side-menu--active');
                });

                // Close other open menus
                document.querySelectorAll('.side-menu--open').forEach(openMenu => {
                    if (openMenu !== this) {
                        openMenu.classList.remove('side-menu--open');
                        const openUl = openMenu.parentElement?.querySelector('ul');
                        if (openUl) {
                            const subIcon = openMenu.querySelector('.side-menu__sub-icon');
                            subIcon?.classList.remove('transform', 'rotate-180');
                            openUl.classList.remove('side-menu__sub-open');
                            openUl.style.display = 'none';
                        }
                    }
                });
            }

            // Add active class to the clicked element
            this.classList.add('side-menu--active');
            console.log('Added active class to:', this);

            // Update the active element reference
            activeElementRef.current = this;

            if (ul) {
                const subIcon = this.querySelector('.side-menu__sub-icon');
                if (ul.style.display === 'block' || ul.style.display === '') {
                    // Close the submenu
                    this.classList.remove('side-menu--open');
                    subIcon?.classList.remove('transform', 'rotate-180');
                    ul.classList.remove('side-menu__sub-open');
                    ul.style.display = 'none';
                } else {
                    // Open the submenu
                    this.classList.add('side-menu--open');
                    subIcon?.classList.add('transform', 'rotate-180');
                    ul.classList.add('side-menu__sub-open');
                    ul.style.display = 'block';
                }
            }
        };

        const initializeSideMenu = () => {
            const sideMenus = document.querySelectorAll('.side-menu');
            sideMenus.forEach(menu => {
                menu.removeEventListener('click', handleMenuClick); // Remove any existing listeners
                menu.addEventListener('click', handleMenuClick);
            });
        };

        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            initializeSideMenu();
        } else {
            window.addEventListener('DOMContentLoaded', initializeSideMenu);
        }

        return () => {
            const sideMenus = document.querySelectorAll('.side-menu');
            sideMenus.forEach(menu => {
                menu.removeEventListener('click', handleMenuClick);
            });
            window.removeEventListener('DOMContentLoaded', initializeSideMenu);
        };
    }, [color, menuType, themeMode]);
}
