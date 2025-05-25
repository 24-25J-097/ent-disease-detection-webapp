import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../styles/globals.scss";
import "./globals.scss";

import ThemeProvider from "@/providers/ThemeProvider";
import { ToastProvider } from "@/providers/ToastProvider";
import InitDashboardProvider from "@/providers/InitDashboardProvider";
import AppReduxProvider from "@/providers/AppReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "ENT Insight | Student Dashboard",
    description: "ENT Insight",
};

export default function RootLayoutStudent({ children }: Readonly<{ children: React.ReactNode }>) {

    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                 <AppReduxProvider>
                    <InitDashboardProvider>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="dark"
                            enableSystem
                            disableTransitionOnChange
                        >
                            <main className="dark:bg-[#020817]">
                                <ToastProvider>
                                    <>
                                        {children}
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
