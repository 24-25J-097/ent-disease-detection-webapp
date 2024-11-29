"use client";

import { NextPage } from "next";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import useRouterApp from '@/hooks/useRouterApp';

const HomePage: NextPage = () => {

    const router = useRouterApp();

    return (
        <>
            <div className="min-h-screen bg-blue-50 flex flex-col items-center px-4 py-10">
                <div className="mb-8 w-72">
                    <Image
                        src={"/images/ent-insight-txt-logo.png"}
                        alt="ENT Insight Logo"
                        className="w-full cursor-pointer"
                        width={1000}
                        height={1000}
                        onClick={() => router.push("/")}
                    />
                </div>

                <div className="text-center max-w-4xl mb-12">
                    <h1 className="text-4xl font-extrabold text-blue-700 mb-4">
                        Welcome to ENT Insight
                    </h1>
                    <p className="text-lg text-gray-700">
                        The Ear, Nose, and Throat (ENT) clinical environment is among the most diverse in healthcare.
                        Leveraging advanced **image analysis**, ENT Insight enhances detection and diagnosis of common ENT
                        conditions, offering a supportive system for medical professionals.
                    </p>
                </div>

                <div className="max-w-5xl bg-white rounded-xl shadow-md p-6 mb-12">
                    <h2 className="text-2xl font-bold text-blue-600 mb-4">
                        Medical Conditions We Address
                    </h2>
                    <ul className="text-gray-700 list-disc list-inside space-y-2">
                        <li>
                            <strong>Foreign Objects in Throat:</strong> Identification of unexpected obstructions
                            in the throat.
                        </li>
                        <li>
                            <strong>Sinusitis:</strong> Inflammation of sinus tissue caused by infections or allergies.
                        </li>
                        <li>
                            <strong>Cholesteatoma:</strong> A destructive and expanding growth in the middle ear.
                        </li>
                        <li>
                            <strong>Pharyngitis:</strong> Inflammation of the pharynx causing discomfort in the throat.
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col items-center space-y-4">
                    <Link
                        href={"/login"}
                        className="bg-blue-600 text-white text-lg font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition"
                    >
                        Login
                    </Link>
                    <Link
                        href="/docs/2024-25J-097-Proposal-Presentaion.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 text-lg font-semibold underline transition"
                    >
                        Learn More
                    </Link>
                </div>
            </div>
        </>
    );
};

export default HomePage;
