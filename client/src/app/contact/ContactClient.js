'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import {
    FaClock,
    FaEnvelope,
    FaFacebook,
    FaHeadset,
    FaInstagram,
    FaLinkedin,
    FaMapMarkerAlt,
    FaPhone,
    FaRocket,
    FaShieldAlt,
    FaTwitter,
    FaWhatsapp,
} from 'react-icons/fa';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { motion } from 'framer-motion';
import { isValidIndianNumber } from '@/utils/validation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export default function ContactClient() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    // Validation with clear error messages
    const validateForm = () => {
        const newErrors = {};

        // Name validation - only letters and spaces
        if (!formData.name.trim()) {
            newErrors.name = 'Please enter your name';
        } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
            newErrors.name = 'Name should contain only letters';
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Please enter email';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Enter valid email (example@domain.com)';
        }

        // Phone validation - strict Indian number
        if (!formData.phone.trim()) {
            newErrors.phone = 'Please enter mobile number';
        } else if (!isValidIndianNumber(formData.phone)) {
            newErrors.phone = 'Please enter a valid mobile number';
        }

        // Message validation
        if (!formData.message.trim()) {
            newErrors.message = 'Please write your message';
        }

        // Subject validation
        if (!formData.subject) {
            newErrors.subject = 'Please select a subject';
        }

        setErrors(newErrors);
        return newErrors;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Apply regex filters on change
        let filteredValue = value;
        if (name === 'name') {
            filteredValue = value.replace(/[^a-zA-Z\s]/g, '');
        } else if (name === 'phone') {
            filteredValue = value.replace(/\D/g, '');
        }

        setFormData({
            ...formData,
            [name]: filteredValue,
        });

        // Clear error on change
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate before submitting
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            toast.error(Object.values(formErrors)[0]);
            return;
        }

        if (isSubmitting) return;
        setIsSubmitting(true);

        // Trim data before sending
        const submitData = {
            ...formData,
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            message: formData.message.trim(),
        };

        console.log('Submitting form data:', submitData);

        try {
            // Robust API URL construction
            let baseUrl = API_URL;
            if (baseUrl.endsWith('/')) {
                baseUrl = baseUrl.slice(0, -1);
            }
            if (!baseUrl.endsWith('/api')) {
                baseUrl = `${baseUrl}/api`;
            }

            // SECURITY: Call encrypted endpoint - data is encrypted on server before saving
            const url = `${baseUrl}/client/contact`;

            console.log('Posting to URL:', url);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submitData),
            });

            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Response data:', data);

            if (response.ok) {
                toast.success('Thank you! We will contact you soon.');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: '',
                });
                setErrors({});
            } else {
                toast.error(data.error || 'Failed to send. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Failed to send. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        {
            icon: FaPhone,
            title: 'Call Us',
            details: ['+91 9560069525', '+91 8264111345'],
            action: 'tel:+919560069525',
            bgColor: 'bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)]',
        },
        {
            icon: FaEnvelope,
            title: 'Email Us',
            details: ['support@borrowww.com'],
            action: 'mailto:support@borrowww.com',
            bgColor: 'bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)]',
        },
        {
            icon: FaWhatsapp,
            title: 'WhatsApp',
            details: ['+91 9560069525'],
            action: 'https://wa.me/919560069525',
            bgColor: 'bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)]',
        },
        {
            icon: FaMapMarkerAlt,
            title: 'Visit Us',
            details: ['221, 2nd Floor, JMD Megapolis', 'Sector 48, Sohna Road, Gurgaon 122002'],
            action: '#',
            bgColor: 'bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)]',
        },
    ];

    const features = [
        {
            icon: FaHeadset,
            title: '24/7 Support',
            description: 'Round the clock customer support for all your queries',
        },
        {
            icon: FaShieldAlt,
            title: 'Secure & Safe',
            description: 'Bank-level security to protect your information',
        },
        {
            icon: FaRocket,
            title: 'Quick Response',
            description: 'Get responses within 2 hours during business hours',
        },
    ];

    const socialLinks = [
        { icon: FaFacebook, href: '#', label: 'Facebook' },
        { icon: FaTwitter, href: '#', label: 'Twitter' },
        { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
        { icon: FaInstagram, href: '#', label: 'Instagram' },
    ];

    return (
        <>
            {/* Hero Section - Updated to match LAP style */}
            <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-[var(--primary-blue-light)] py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center px-4 py-2 bg-[var(--primary-blue)]/10 text-[var(--primary-blue)] rounded-full text-sm font-medium mb-6">
                            <FaHeadset className="mr-2" />
                            We&apos;re here to help
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-gray-900 mb-6 tracking-tighter">
                            Let&apos;s{' '}
                            <span className="text-[var(--primary-blue)] italic tiemposfine">Connect</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Have questions about our services? Need help with your loan application? We&apos;re
                            here to help you every step of the way with personalized support.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Features Section - Updated */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="w-16 h-16 bg-[var(--primary-blue)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <feature.icon className="text-[var(--primary-blue)] text-2xl" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Info Cards - Updated */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-medium text-gray-900 mb-6">Get in Touch</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Choose your preferred way to connect with us. We&apos;re here to help you 24/7.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {contactInfo.map((info, index) => (
                            <motion.div
                                key={info.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-2xl transform group-hover:scale-105 transition-transform duration-300"></div>
                                <div className="relative bg-white p-8 rounded-2xl border-2 border-transparent group-hover:border-[var(--primary-blue)] transition-all duration-300">
                                    <div className="w-16 h-16 bg-[var(--primary-blue)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <info.icon className="text-[var(--primary-blue)] text-2xl" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                                        {info.title}
                                    </h3>
                                    <div className="space-y-2 mb-6">
                                        {info.details.map((detail, idx) => (
                                            <p key={idx} className="text-gray-600 text-center text-sm">
                                                {detail}
                                            </p>
                                        ))}
                                    </div>
                                    <motion.a
                                        href={info.action}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="block w-full text-center bg-[var(--primary-blue)] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[var(--primary-blue-dark)] transition-colors duration-200"
                                    >
                                        Contact Now
                                    </motion.a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form & Info - Updated */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl shadow-xl border border-gray-100"
                        >
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-medium text-gray-900 mb-4">Send us a Message</h2>
                                <p className="text-gray-600">We&apos;ll get back to you within 24 hours</p>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            disabled={isSubmitting}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-transparent transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                            placeholder="Enter your full name"
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            disabled={isSubmitting}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-transparent transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                            placeholder="Enter your email"
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            disabled={isSubmitting}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-transparent transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                            placeholder="Enter your phone number"
                                        />
                                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="subject"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Subject *
                                        </label>
                                        <Select
                                            value={formData.subject}
                                            onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}
                                            disabled={isSubmitting}
                                        >
                                            <SelectTrigger type="button" className="w-full h-[50px] border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-blue)]">
                                                <SelectValue placeholder="Select a subject" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white">
                                                <SelectItem value="loan-inquiry" className='border-b border-gray-200'>Loan Inquiry</SelectItem>
                                                <SelectItem value="cibil-check" className='border-b border-gray-200'>CIBIL Check</SelectItem>
                                                <SelectItem value="customer-support" className='border-b border-gray-200'>Customer Support</SelectItem>
                                                <SelectItem value="partnership" className='border-b border-gray-200'>Partnership</SelectItem>
                                                <SelectItem value="other" className='border-b border-gray-200'>Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={6}
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-transparent transition-colors duration-200 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="Tell us how we can help you..."
                                    />
                                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                    className="w-full bg-[var(--primary-blue)] text-white py-4 px-6 rounded-lg font-semibold hover:bg-[var(--primary-blue-dark)] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            Sending Message...
                                        </>
                                    ) : (
                                        'Send Message'
                                    )}
                                </motion.button>
                            </form>
                        </motion.div>

                        {/* Contact Information */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <div>
                                <h2 className="text-3xl font-medium text-gray-900 mb-6">Get in Touch</h2>
                                <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                                    Our team is here to help you with any questions about our services, loan
                                    applications, or general inquiries. We typically respond within 24 hours.
                                </p>
                            </div>

                            {/* Office Hours */}
                            <div className="bg-gradient-to-br from-[var(--primary-blue)]/5 to-white p-8 rounded-2xl border border-[var(--primary-blue)]/10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-[var(--primary-blue)]/10 rounded-full flex items-center justify-center">
                                        <FaClock className="text-[var(--primary-blue)] text-xl" />
                                    </div>
                                    <h3 className="text-2xl font-semibold text-gray-900">Office Hours</h3>
                                </div>
                                <div className="space-y-3 text-gray-600">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">Monday - Friday:</span>
                                        <span>9:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">Saturday:</span>
                                        <span>10:00 AM - 4:00 PM</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">Sunday:</span>
                                        <span>Closed</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 mt-4 p-3 bg-[var(--primary-blue)]/5 rounded-lg">
                                    * Emergency support available 24/7 for existing customers
                                </p>
                            </div>

                            {/* Social Media */}
                            <div className="bg-gradient-to-br from-[var(--primary-blue)]/5 to-white p-8 rounded-2xl border border-[var(--primary-blue)]/10">
                                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Follow Us</h3>
                                <div className="flex gap-4">
                                    {socialLinks.map((social) => (
                                        <motion.a
                                            key={social.label}
                                            href={social.href}
                                            whileHover={{ scale: 1.1, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-14 h-14 bg-[var(--primary-blue)]/10 rounded-full flex items-center justify-center text-[var(--primary-blue)] hover:bg-[var(--primary-blue)] hover:text-white transition-all duration-200"
                                        >
                                            <social.icon className="text-xl" />
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section - Updated */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-3xl p-8 text-white text-center shadow-2xl"
                    >
                        <h2 className="text-4xl font-medium text-white mb-6">Ready to Get Started?</h2>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            Don&apos;t wait! Contact us today and take the first step towards achieving your
                            financial goals.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.a
                                href="tel:+919560069525"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-[var(--primary-blue)] px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200"
                            >
                                Call Now
                            </motion.a>
                            <motion.a
                                href="https://wa.me/919560069525"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-[var(--primary-blue)] transition-colors duration-200"
                            >
                                WhatsApp Us
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
