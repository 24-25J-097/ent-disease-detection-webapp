import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import themeReducer from './reducers/themeSlice';
import authReducer from './reducers/authSlice';
import usersReducer from './reducers/usersSlice';

const persistThemeConfig = {
    key: 'theme',
    storage,
};

const persistAuthConfig = {
    key: 'auth',
    storage,
};

const persistUsersConfig = {
    key: 'users',
    storage,
};

const persistedThemeReducer = persistReducer(persistThemeConfig, themeReducer);
const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);
const persistedUsersReducer = persistReducer(persistUsersConfig, usersReducer);

export const store = configureStore({
    reducer: {
        theme: persistedThemeReducer,
        auth: persistedAuthReducer,
        users: persistedUsersReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export const persistor = persistStore(store);

export type AppStore = typeof store;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;
