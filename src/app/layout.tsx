import React from "react";
import type {Metadata, Viewport} from "next";
import {Inter} from "next/font/google";

const inter = Inter({subsets: ["latin"]});

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    themeColor: [
        {media: "(prefers-color-scheme: light)", color: "#f0f9ff"},
        {media: "(prefers-color-scheme: dark)", color: "#1e293b"}
    ]
};

export const metadata: Metadata = {
    metadataBase: new URL("https://entinsight.com"),
    title: {
        template: "%s | ENT Insight",
        default: "ENT Insight - AI-Powered ENT Diagnosis Platform"
    },
    description: "ENT Insight is an AI-powered platform for diagnosing and learning about Ear, Nose, and Throat conditions with advanced image analysis technology.",
    keywords: ["ENT", "otolaryngology", "AI diagnosis", "medical education", "healthcare technology", "ear nose throat"],
    authors: [{name: "ENT Insight Team"}],
    creator: "ENT Insight",
    publisher: "ENT Insight",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://entinsight.com",
        siteName: "ENT Insight",
        title: "ENT Insight - AI-Powered ENT Diagnosis Platform",
        description: "Advanced AI technology for ENT diagnosis and medical education",
        images: [
            {
                url: "/images/ent-insight-og.png",
                width: 1200,
                height: 630,
                alt: "ENT Insight Platform",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "ENT Insight - AI-Powered ENT Diagnosis Platform",
        description: "Advanced AI technology for ENT diagnosis and medical education",
        images: ["/images/ent-insight-og.png"],
        creator: "@entinsight",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        icon: [
            {url: "/favicon.ico"},
            {url: "/icons/icon-16x16.png", sizes: "16x16", type: "image/png"},
            {url: "/icons/icon-32x32.png", sizes: "32x32", type: "image/png"},
        ],
        apple: [
            {url: "/icons/apple-icon-180x180.png", sizes: "180x180", type: "image/png"},
        ],
        other: [
            {
                rel: "mask-icon",
                url: "/icons/safari-pinned-tab.svg",
            },
        ],
    },
    manifest: "/manifest.json",
    verification: {
        google: "google-site-verification=your-verification-code",
    },
    alternates: {
        canonical: "https://entinsight.com",
        languages: {
            "en-US": "https://entinsight.com/en-US",
        },
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                {children}
            </body>
        </html>
    );
}
