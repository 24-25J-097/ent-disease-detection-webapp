import React from "react";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "../../styles/globals.scss";

import ThemeProvider from "@/providers/ThemeProvider";
import {ToastProvider} from "@/providers/ToastProvider";
import AppReduxProvider from "@/providers/AppReduxProvider";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Home",
    description: "ENT Insight - AI-Powered platform for diagnosing and learning about Ear, Nose, and Throat conditions with advanced image analysis technology.",
    openGraph: {
        title: "ENT Insight - Home",
        description: "AI-Powered Medical Conditions Analysis Platform for ENT diagnosis and education",
    },
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {

    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <AppReduxProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="light"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <main className="relative flex justify-center items-center flex-col overflow-hidden bg-blue-50">
                            <ToastProvider>
                                {children}
                            </ToastProvider>
                        </main>
                    </ThemeProvider>
                </AppReduxProvider>
            </body>
        </html>
    );
}
