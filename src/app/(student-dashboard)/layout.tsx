import React from "react";
import type { Metadata } from "next";
import {Inter} from 'next/font/google';
import "../../styles/globals.scss";
import "./globals.scss";

import ThemeProvider from "@/providers/ThemeProvider";
import { ToastProvider } from "@/providers/ToastProvider";
import InitDashboardProvider from "@/providers/InitDashboardProvider";
import AppReduxProvider from "@/providers/AppReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Student Dashboard",
    description: "ENT Insight Student Dashboard - Interactive learning platform for ENT diagnosis with AI assistance",
    openGraph: {
        title: "ENT Insight - Student Learning Platform",
        description: "Educational platform for medical students to learn ENT diagnosis with AI-powered tools",
    },
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
                            <main className="bg-gradient-student">
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
