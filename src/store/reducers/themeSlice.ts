import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ColorTheme, MenuType, ThemeMode, ThemeState} from "@/types/Theme";
import {ColorThemes, MenuTypes, ThemeModes} from "@/enums/theme";

const initialState: ThemeState = {
    menuType: MenuTypes.SIDE,
    color: ColorThemes.DEFAULT,
    themeMode: ThemeModes.LIGHT,
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setMenuType(state, action: PayloadAction<MenuType>) {
            state.menuType = action.payload;
        },
        setColor(state, action: PayloadAction<ColorTheme>) {
            state.color = action.payload;
        },
        setThemeMode(state, action: PayloadAction<ThemeMode>) {
            state.themeMode = action.payload;
        },
    },
});

export const {setMenuType, setColor, setThemeMode} = themeSlice.actions;
export default themeSlice.reducer;
