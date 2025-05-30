"use client";

import {motion} from "framer-motion";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {
    ArrowRight,
    ArrowUp,
    BookOpen,
    Brain,
    Building2,
    CheckCircle,
    GraduationCap,
    Shield,
    Sparkles,
    Star,
    TrendingUp,
} from "lucide-react";
import {NextPage} from 'next';
import useRouterApp from '@/hooks/useRouterApp';
import Image from 'next/image';
import {features, medicalConditions, stats} from '@/data/landing/home';
import ContactUsSection from '@/app/(landing)/components/ContactUsSection';

const HomePage: NextPage = () => {

    const router = useRouterApp();

    const [hoveredCondition, setHoveredCondition] = useState<number | null>(null);
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show button when the page is scrolled down 300px
            setShowScrollTop(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (<div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
            <div
                className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply
                    filter blur-xl opacity-10 animate-pulse"></div>
            <div
                className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply
                     filter blur-xl opacity-10 animate-pulse delay-1000"></div>
            <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80
                    bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse delay-500"></div>
        </div>

        {/* Top Navigation Bar */}
        <motion.nav
            initial={{opacity: 0, y: -20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8}}
            className="relative z-20 w-full px-4 py-4"
        >
            <div className="max-w-7xl mx-auto">
                <div className="glass-card-blue rounded-2xl px-6 py-3 border border-white/10">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-3">
                            <div className="w-10">
                                <Image
                                    src={"/images/ent-insight-logo-b.png"}
                                    alt="ENT Insight Logo"
                                    className="w-full cursor-pointer"
                                    width={100}
                                    height={100}
                                    onClick={() => router.push("/")}
                                />
                            </div>
                            <span
                                className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                  ENT Insight
                                </span>
                        </Link>

                        {/* Navigation Links */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link
                                href={"#features"}
                                className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium"
                            >
                                Features
                            </Link>
                            <Link
                                href={"#conditions"}
                                className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium"
                            >
                                Conditions
                            </Link>
                            <Link href={"#about"}
                                  className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium">
                                About
                            </Link>
                            <Link href={"#contact"}
                                  className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium">
                                Contact
                            </Link>
                            <Link
                                href="https://research.entinsight.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium flex items-center space-x-1"
                            >
                                <BookOpen className="w-4 h-4"/>
                                <span>Research</span>
                            </Link>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-3">
                            <Link
                                href="/students/login"
                                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white
                                    px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700
                                    hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
                            >
                                <GraduationCap className="w-4 h-4"/>
                                <span>Student</span>
                            </Link>
                            <Link
                                href="/login"
                                className="bg-white text-slate-800 text-sm font-semibold py-2 px-4 rounded-lg
                                shadow-lg border border-slate-200 hover:bg-slate-50 transition-all duration-200
                                flex items-center justify-center space-x-2"
                            >
                                <Building2 className="w-4 h-4"/>
                                <span>Professional Access</span>
                            </Link>

                            {/* Mobile Menu Button */}
                            <button className="md:hidden p-2 text-slate-600 hover:text-slate-800 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M4 6h16M4 12h16M4 18h16"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.nav>

        <div className="relative z-10 flex flex-col items-center px-4 py-10">
            {/* Logo Section */}
            <motion.div
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8}}
                className="mb-8"
            >
                <div className="flex items-center justify-center">
                    <div className="w-60">
                        <Image
                            src={"/images/ent-insight-txt-logo.png"}
                            alt="ENT Insight Logo"
                            className="w-full cursor-pointer"
                            width={1000}
                            height={1000}
                            onClick={() => router.push("/")}
                        />
                    </div>
                </div>
                <p className="text-center text-slate-600">
                    AI-Powered Medical Conditions Analysis Platform
                </p>
            </motion.div>

            {/* Hero Section */}
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, delay: 0.2}}
                className="text-center max-w-4xl mb-16"
            >
                <h2 className="text-5xl font-extrabold text-slate-800 mb-8 leading-tight">
                    Revolutionizing Diagnosis & Learning with{" "}
                    <span
                        className="text-6xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                    >
                          Artificial Intelligence
                        </span>
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed mb-10">
                    The Ear, Nose, and Throat (ENT) clinical environment is among the most diverse in healthcare.
                    Leveraging
                    advanced <strong>AI-powered image analysis</strong>, ENT Insight enhances detection and
                    diagnosis of common
                    ENT conditions, offering intelligent support for medical professionals and comprehensive
                    learning for
                    students.
                </p>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
                    {stats.map((stat, index) => (<motion.div
                        key={stat.label}
                        initial={{opacity: 0, scale: 0.95}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{duration: 0.6, delay: 0.4 + index * 0.1}}
                        className="glass-card-blue rounded-xl p-4 text-center"
                    >
                        <div
                            className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg
                                    flex items-center justify-center mx-auto mb-3"
                        >
                            <stat.icon className="w-6 h-6 text-white"/>
                        </div>
                        <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                        <div className="text-sm text-slate-600">{stat.label}</div>
                    </motion.div>))}
                </div>
            </motion.div>

            {/* Access Buttons */}
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, delay: 0.6}}
                className="flex flex-col md:flex-row gap-8 mb-16 w-full max-w-2xl"
            >
                <Link href="/students/login" className="flex-1">
                    <motion.div
                        whileHover={{scale: 1.02, y: -2}}
                        whileTap={{scale: 0.98}}
                        className="glass-card-blue rounded-2xl p-8 text-center group cursor-pointer border-2
                            border-transparent hover:border-blue-500/20 transition-all duration-300 h-full"
                    >
                        <div
                            className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl
                                flex items-center justify-center mx-auto mb-4 group-hover:scale-110
                                transition-transform duration-300"
                        >
                            <GraduationCap className="w-8 h-8 text-white"/>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-3">Student Access Portal</h3>
                        <p className="text-slate-600 mb-6">
                            Join thousands of medical students learning ENT diagnosis with AI-powered tools and
                            interactive case
                            studies
                        </p>
                        <div
                            className="flex items-center justify-center space-x-2 text-blue-600 font-semibold
                                group-hover:text-blue-700 transition-colors"
                        >
                            <span>Start Learning Journey</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
                        </div>
                        <div className="mt-4 flex justify-center space-x-4 text-sm text-slate-500">
                                <span className="flex items-center">
                                  <CheckCircle className="w-4 h-4 mr-1 text-green-500"/>
                                  Free Access
                                </span>
                            <span className="flex items-center">
                                  <CheckCircle className="w-4 h-4 mr-1 text-green-500"/>
                                  AI Tutoring
                                </span>
                        </div>
                    </motion.div>
                </Link>

                <Link href="/login" className="flex-1">
                    <motion.div
                        whileHover={{scale: 1.02, y: -2}}
                        whileTap={{scale: 0.98}}
                        className="glass-card-blue rounded-2xl p-8 text-center group cursor-pointer border-2
                            border-transparent hover:border-purple-500/20 transition-all duration-300 h-full"
                    >
                        <div
                            className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500
                                rounded-2xl flex items-center justify-center mx-auto mb-4
                                group-hover:scale-110 transition-transform duration-300"
                        >
                            <Building2 className="w-8 h-8 text-white"/>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-3">Healthcare Institution Hub</h3>
                        <p className="text-slate-600 mb-6">
                            Advanced diagnostic support for hospitals and clinics with enterprise-grade AI analysis
                            and reporting
                            tools
                        </p>
                        <div
                            className="flex items-center justify-center space-x-2 text-purple-600
                                font-semibold group-hover:text-purple-700 transition-colors"
                        >
                            <span>Access Clinical Platform</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
                        </div>
                        <div className="mt-4 flex justify-center space-x-4 text-sm text-slate-500">
                                <span className="flex items-center">
                                  <Shield className="w-4 h-4 mr-1 text-green-500"/>
                                  HIPAA Compliant
                                </span>
                            <span className="flex items-center">
                                  <Star className="w-4 h-4 mr-1 text-green-500"/>
                                  Enterprise
                                </span>
                        </div>
                    </motion.div>
                </Link>
            </motion.div>

            {/* Medical Conditions Section */}
            <motion.div
                id="conditions"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, delay: 0.8}}
                className="max-w-6xl w-full mb-16"
            >
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-800 mb-4">
                        AI-Powered ENT Condition Detection
                    </h2>
                    <p className="text-lg text-slate-600">
                        Our advanced machine learning algorithms provide accurate diagnosis support for common ENT
                        conditions
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {medicalConditions.map((condition, index) => (<motion.div
                        key={condition.name}
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, delay: 1 + index * 0.1}}
                        onMouseEnter={() => setHoveredCondition(index)}
                        onMouseLeave={() => setHoveredCondition(null)}
                        className="glass-card-blue rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group"
                    >
                        <div className="flex items-start space-x-4">
                            <div
                                className={`p-3 bg-gradient-to-r ${condition.color} rounded-xl 
                                        group-hover:scale-110 transition-transform duration-300`}
                            >
                                <condition.icon className="w-6 h-6 text-white"/>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-xl font-semibold text-slate-800">
                                        {condition.name}
                                    </h3>
                                    <span
                                        className="px-3 py-1 bg-green-100 text-green-700 rounded-full
                                                text-sm font-medium"
                                    >
                                                {condition.accuracy} accuracy
                                              </span>
                                </div>
                                <p className="text-slate-600 leading-relaxed">{condition.description}</p>
                                <div className="mt-4 flex items-center space-x-4 text-sm text-slate-500">
                                              <span className="flex items-center">
                                                <Brain className="w-4 h-4 mr-1"/>
                                                AI-Powered
                                              </span>
                                    <span className="flex items-center">
                                            <TrendingUp className="w-4 h-4 mr-1"/>
                                            Clinical Grade
                                          </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>))}
                </div>
            </motion.div>

            {/* Features Section */}
            <motion.div
                id="features"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, delay: 1.2}}
                className="max-w-6xl w-full mb-16"
            >
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-800 mb-4">Why Choose ENT Insight?</h2>
                    <p className="text-lg text-slate-600">
                        Cutting-edge technology meets medical education for the next generation of healthcare
                        professionals
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (<motion.div
                        key={feature.title}
                        initial={{opacity: 0, scale: 0.95}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{duration: 0.6, delay: 1.4 + index * 0.1}}
                        className="glass-card-blue rounded-2xl p-6 text-center group hover:shadow-lg
                                transition-all duration-300"
                    >
                        <div
                            className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-2xl 
                                    flex items-center justify-center mx-auto mb-4 group-hover:scale-110 
                                    transition-transform duration-300`}
                        >
                            <feature.icon className="w-7 h-7 text-white"/>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-3">{feature.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                    </motion.div>))}
                </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, delay: 1.6}}
                className="max-w-4xl w-full text-center"
            >
                <div
                    className="glass-card-blue rounded-2xl p-8 bg-gradient-to-r from-blue-500/5
                        to-purple-500/5 border border-blue-200/20"
                >
                    <div className="flex items-center justify-center mb-6">
                        <div
                            className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600
                                rounded-2xl flex items-center justify-center"
                        >
                            <Sparkles className="w-8 h-8 text-white"/>
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800 mb-4">Ready to Revolutionize ENT Practice?</h2>
                    <p className="text-lg text-slate-600 mb-8">
                        Advancing medical education for students and providing clinical decision support for
                        healthcare professionals and hospitals.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/students/login"
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white
                                text-lg font-semibold py-4 px-8 rounded-xl shadow-lg hover:from-blue-700
                                hover:to-purple-700 transition-all duration-200 flex items-center
                                justify-center space-x-2"
                        >
                            <GraduationCap className="w-5 h-5"/>
                            <span>Start as Student</span>
                        </Link>
                        <Link
                            href="/login"
                            className="bg-white text-slate-800 text-lg font-semibold py-4 px-8 rounded-xl
                                shadow-lg border border-slate-200 hover:bg-slate-50 transition-all duration-200
                                flex items-center justify-center space-x-2"
                        >
                            <Building2 className="w-5 h-5"/>
                            <span>Healthcare Access</span>
                        </Link>
                    </div>
                </div>
            </motion.div>

            {/* About Section */}
            <motion.div
                id="about"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, delay: 1.7}}
                className="max-w-6xl w-full mb-16 mt-16"
            >
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-800 mb-4">About ENT Insight</h2>
                    <p className="text-lg text-slate-600">
                        Learn more about our mission, vision, and the team behind ENT Insight
                    </p>
                </div>

                <div className="glass-card-blue rounded-2xl p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold text-slate-800 mb-4">Our Mission</h3>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                ENT Insight is dedicated to revolutionizing the field of otolaryngology through
                                cutting-edge artificial intelligence. Our mission is to enhance diagnostic accuracy,
                                improve patient outcomes, and provide comprehensive educational resources for the
                                next
                                generation of medical professionals.
                            </p>
                            <h3 className="text-xl font-semibold text-slate-800 mb-4">Our Vision</h3>
                            <p className="text-slate-600 leading-relaxed">
                                We envision a future where AI-powered tools seamlessly integrate with clinical
                                practice,
                                making advanced diagnostic capabilities accessible to healthcare providers worldwide
                                and accelerating the learning curve for medical students specializing in ENT conditions.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-slate-800 mb-4">Our Team</h3>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                ENT Insight brings together a multidisciplinary team of medical professionals, AI
                                researchers,
                                and software engineers committed to advancing healthcare through technology. Our
                                experts combine
                                decades of clinical experience with cutting-edge machine learning expertise.
                            </p>
                            <h3 className="text-xl font-semibold text-slate-800 mb-4">Research & Innovation</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Our platform is built on extensive research and continuous innovation. We
                                collaborate with
                                leading medical institutions to validate our algorithms and ensure they meet the
                                highest
                                standards of clinical accuracy. Our commitment to ongoing research drives constant
                                improvement
                                in our diagnostic capabilities.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Contact Section */}
            <ContactUsSection/>

            <div className="mt-6">
                <Link
                    href="https://research.entinsight.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-slate-800 font-medium underline
                                transition-colors flex items-center justify-center space-x-2"
                >
                    <BookOpen className="w-4 h-4"/>
                    <span>Learn More About Our Research</span>
                </Link>
            </div>

            {/* Footer */}
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.8, delay: 2.0}}
                className="mt-10 text-center text-slate-500"
            >
                <p className="text-sm">
                    © 2025 ENT Insight. Advancing medical education through artificial intelligence.
                </p>
            </motion.div>

            {/* Scroll to Top Button */}
            {showScrollTop && (
                <motion.button
                    initial={{opacity: 0, scale: 0.5}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: 0.5}}
                    className="fixed bottom-8 right-8 p-3 rounded-full glass-card-blue shadow-lg 
                        hover:shadow-xl hover:scale-110 hover:bg-blue-100/30 transition-all duration-300 
                        z-50 border border-blue-200/30 group"
                    onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                    aria-label="Scroll to top"
                >
                    <ArrowUp
                        className="w-5 h-5 text-blue-600 group-hover:text-purple-600 transition-colors duration-300"/>
                </motion.button>
            )}
        </div>
    </div>);
};

export default HomePage;
