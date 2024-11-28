import {ColorThemes} from "@/enums/theme";

export const getColorThemesTitle = (text: ColorThemes): string => {
    return text
        .toString()
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

