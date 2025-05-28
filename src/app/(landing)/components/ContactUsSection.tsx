'use client';

import React, {useState} from 'react';
import {motion} from 'framer-motion';
import {Facebook, Linkedin, Instagram, X} from 'lucide-react';
import Link from 'next/link';
import {AxiosError} from 'axios';
import {ContactUsEmailData, ErrorResponseData} from '@/types/Common';
import {useToast} from '@/providers/ToastProvider';
import {NotificationService} from '@/services/NotificationService';

const ContactUsSection: React.FC = () => {

    const [formData, setFormData] = useState({name: '', email: '', message: ''});
    const [fieldsErrors, setFieldsErrors] = useState<{ name?: string; email?: string; message?: string }>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<any>(null);

    const {notifySuccess, notifyError} = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const validateForm = () => {
        const newErrors: { name?: string; email?: string; message?: string } = {};

        if (!formData.name) newErrors.name = 'Name is required.';
        if (!formData.email) {
            newErrors.email = 'Email is required.';
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                newErrors.email = 'Please enter a valid email address.';
            }
        }
        if (!formData.message) newErrors.message = 'Message is required.';

        setFieldsErrors(newErrors);
        setTimeout(() => setFieldsErrors({}), 3000);
        return Object.keys(newErrors).length === 0;
    };

    const getUserIP = async () => {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip; // user's public IP
        } catch (error) {
            return 'unknown'; // fallback if API fails
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        const contactUsEmailData: ContactUsEmailData = {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            submissionTime: new Date().toISOString(),
            ipAddress: await getUserIP(),
            domain: window.location.hostname || process.env.NEXT_PUBLIC_WEB_URL || "localhost",
        };

        try {
            setIsLoading(true);
            const response = await NotificationService.sendContactUsEmail(contactUsEmailData);
            if (response.success) {
                notifySuccess(response.message);
                setFormData({name: '', email: '', message: ''});
            }
        } catch (error: any) {
            const axiosError = error as AxiosError<ErrorResponseData>;
            const errMsg = axiosError?.response?.data?.message || axiosError?.response?.data?.error || "An error occurred.";
            if (axiosError?.response?.status && axiosError.response.status >= 500) {
                setErrors("An unexpected error occurred. Please try again.");
            } else {
                setErrors(errMsg);
                notifyError(errMsg);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            id="contact"
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 1.8}}
            className="max-w-6xl w-full mb-16"
        >
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Contact Us</h2>
                <p className="text-lg text-slate-600">
                    Have questions or want to learn more? Reach out to our team
                </p>
            </div>

            <div className="glass-card-blue rounded-2xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Panel */}
                    <div>
                        <h3 className="text-xl font-semibold text-slate-800 mb-4">Get in Touch</h3>
                        <p className="text-slate-600 leading-relaxed mb-6">
                            We're here to answer any questions you might have about ENT Insight, our technology,
                            or how to get started with our platform. Feel free to reach out using any of the contact
                            methods listed.
                        </p>
                        <div className="space-y-4">
                            {/* Email */}
                            <ContactItem
                                icon={
                                    <MailIcon/>
                                }
                                title="Email"
                                value="info@entinsight.com"
                            />
                            {/* Phone */}
                            <ContactItem
                                icon={
                                    <PhoneIcon/>
                                }
                                title="Phone"
                                value="+94 76 617 1525"
                            />
                            {/* Address */}
                            <ContactItem
                                icon={
                                    <LocationIcon/>
                                }
                                title="Address"
                                value="New Kandy Road, Malabe, Sri Lanka"
                            />

                            <div className="pt-16">
                                <div className="flex space-x-4">
                                    <Link href="https://facebook.com/entinsight" target="_blank"
                                          rel="noopener noreferrer"
                                          className="p-2 bg-gradient-to-r from-blue-500 to-blue-600
                                           rounded-lg hover:scale-110 transition-transform">
                                        <Facebook className="h-4 w-4 text-white"/>
                                    </Link>
                                    <Link href="https://x.com/entinsight" target="_blank" rel="noopener noreferrer"
                                          className="p-2 bg-gradient-to-r from-black to-black-100
                                           rounded-lg hover:scale-110 transition-transform">
                                        <X className="h-4 w-4 text-white"/>
                                    </Link>
                                    <Link href="https://linkedin.com/entinsight" target="_blank"
                                          rel="noopener noreferrer"
                                          className="p-2 bg-gradient-to-r from-blue-600 to-blue-700
                                           rounded-lg hover:scale-110 transition-transform">
                                        <Linkedin className="h-4 w-4 text-white"/>
                                    </Link>
                                    <Link href="https://instagram.com/entinsight" target="_blank"
                                          rel="noopener noreferrer"
                                          className="p-2 bg-gradient-to-r from-pink-500 to-purple-600
                                           rounded-lg hover:scale-110 transition-transform">
                                        <Instagram className="h-4 w-4 text-white"/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Form */}
                    <div>
                        <h3 className="text-xl font-semibold text-slate-800 mb-4">Send Us a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <InputField
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                error={fieldsErrors.name}
                            />
                            <InputField
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                error={fieldsErrors.email}
                            />
                            <TextareaField
                                label="Message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                error={fieldsErrors.message}
                            />
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600
                              text-white font-medium py-2 px-4 rounded-lg hover:from-blue-700
                              hover:to-purple-700 transition-all duration-200"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// Helper Components
function ContactItem({icon, title, value}: { icon: React.ReactNode; title: string; value: string }) {
    return (
        <div className="flex items-start space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mt-1">
                {icon}
            </div>
            <div>
                <h4 className="font-medium text-slate-800">{title}</h4>
                <p className="text-slate-600">{value}</p>
            </div>
        </div>
    );
}

function InputField({label, name, value, onChange, type = "text", error}: any) {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
            <input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                className={`w-full px-4 py-2 border rounded-lg transition-colors
                    ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'}
                `}
                placeholder={`Your ${label.toLowerCase()}`}
            />
            {error && <small className="text-red-500 mt-1">{error}</small>}
        </div>
    );
}

function TextareaField({label, name, value, onChange, error}: any) {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full px-4 py-2 border rounded-lg transition-colors
                    ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'}
                `}
                rows={4}
                placeholder={`Your ${label.toLowerCase()}`}
            ></textarea>
            {error && <small className="text-red-500 mt-1">{error}</small>}
        </div>
    );
}

// Simple icons
const MailIcon = () => (
    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
    </svg>
);
const PhoneIcon = () => (
    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
    </svg>
);
const LocationIcon = () => (
    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>
);

export default ContactUsSection;
