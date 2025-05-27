import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../styles/globals.scss";

import ThemeProvider from "@/providers/ThemeProvider";
import { ToastProvider } from "@/providers/ToastProvider";
import InitDashboardProvider from "@/providers/InitDashboardProvider";
import DashboardMenus from "@/components/dashboard/theme/navigations/DashboardMenus";
import AppReduxProvider from "@/providers/AppReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Dashboard",
    description: "ENT Insight Dashboard - Professional tools for ENT diagnosis and analysis using AI technology",
    openGraph: {
        title: "ENT Insight - Professional Dashboard",
        description: "Advanced diagnostic tools for healthcare professionals with AI-powered analysis",
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                 <AppReduxProvider>
                    <InitDashboardProvider>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="light"
                            enableSystem
                            disableTransitionOnChange
                        >
                            <main className="relative flex justify-center items-center flex-col overflow-hidden w-full">
                                <ToastProvider>
                                    <>
                                        <div
                                            className="rubick px-2 sm:pr-8 sm:pl-3 py-5 before:content-['']
                                                before:bg-gradient-to-b before:from-theme-1 before:to-theme-2
                                                dark:before:from-darkmode-800 dark:before:to-darkmode-800 before:fixed
                                                before:inset-0 before:z-[-1] w-full"
                                        >
                                            <DashboardMenus>
                                                {children}
                                            </DashboardMenus>
                                        </div>
                                    </>
                                </ToastProvider>
                            </main>
                        </ThemeProvider>
                    </InitDashboardProvider>
                </AppReduxProvider>
            </body>
        </html>
    );
}
