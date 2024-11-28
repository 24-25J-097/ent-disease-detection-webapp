"use client";

import {NextPage} from "next";
import React from "react";
import Link from "next/link";

const HomePage: NextPage = () => {

    return (
        <>
            <div className="my-20 text-center">
                <h1>Home</h1>
                <div className="my-20 flex flex-col">
                    <Link href={"/login"} className="bg-primary rounded-2xl p-5 mb-6">Login</Link>
                </div>
            </div>
        </>
    );
};

export default HomePage;
