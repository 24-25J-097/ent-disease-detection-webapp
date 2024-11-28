"use client";

import React, {useEffect, useState} from 'react';
import Tippy from '@tippyjs/react';
import {Placement} from "@popperjs/core/lib/enums";
import {twc} from "@/utils/tailwind-helper";
import {SideMenuTooltipProps} from "@/types/Theme";

const SideMenuTooltip: React.FC<SideMenuTooltipProps> = ({ content, placement = 'right', className, children }) => {

    const [tooltipEnabled, setTooltipEnabled] = useState(true);
    const [tooltipContent, setTooltipContent] = useState<string | React.ReactNode>('');

    useEffect(() => {
        const findTitleElement = (element: React.ReactElement<any>): HTMLElement | null => {
            if (!element || !element.props || !element.props.children) return null;

            const children = Array.isArray(element.props.children) ? element.props.children : [element.props.children];

            for (let child of children) {
                if (!child || typeof child !== 'object') continue;

                if (child.props && child.props.className === 'side-menu__title') {
                    return child;
                }

                const found = findTitleElement(child);
                if (found) return found;
            }

            return null;
        };

        const titleElement = findTitleElement(children);

        if (titleElement && React.isValidElement(titleElement)) {
            const reactElement = titleElement as React.ReactElement<{ children: React.ReactNode }>;
            if (reactElement.props) {
                const content = reactElement.props.children?.toString().replace(/<[^>]*>?/gm, '').trim().split(',')[0];
                setTooltipContent(content);
            }
        }

    }, [children]);

    useEffect(() => {
        function handleResize() {
            const shouldEnableTooltip = window.innerWidth <= 1260 ||
                document.querySelector(".side-nav")?.classList.contains("side-nav--simple") || false;

            setTooltipEnabled(shouldEnableTooltip);
        }
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);

    }, []);

    return (
        <Tippy
            content={content || tooltipContent}
            arrow={true}
            animation="shift-away"
            theme="light-border"
            placement={placement as Placement}
            className={twc("", className)}
            disabled={!tooltipEnabled}
        >
            {children}
        </Tippy>
    );
};

export default SideMenuTooltip;
