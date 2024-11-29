"use client";

import React from "react";
import {ChildrenProps} from "@/types/Common";

import {Provider as ReduxProvider} from "react-redux";
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from "@/store/store";

const AppReduxProvider = ({ children }: ChildrenProps) => {

    return (
        <>
            <ReduxProvider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    {children}
                </PersistGate>
            </ReduxProvider>
        </>
    );
};

export default AppReduxProvider;
