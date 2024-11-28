import React from "react";
import {Placement} from "@popperjs/core/lib/enums";
import {ColorThemes, MenuTypes, ThemeModes} from "@/enums/theme";

export type SideMenuTooltipProps = {
    content?: string;
    placement?: Placement;
    className?: string;
    children: React.ReactElement<any>;
}

export type MenuType = MenuTypes.SIDE | MenuTypes.SIMPLE | MenuTypes.TOP;
export type ThemeMode = ThemeModes.LIGHT | ThemeModes.DARK | ThemeModes.SYSTEM;
export type ColorTheme = ColorThemes.DEFAULT;

export type ThemeState = {
    menuType: MenuType;
    color: ColorTheme;
    themeMode: ThemeMode;
}

export type SettingsModalProps = {
    isOpen: boolean;
    onClose: () => void;
}
