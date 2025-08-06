'use client';

import { useState } from 'react';
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

import { motion } from 'framer-motion';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: FaPhone,
      title: 'Call Us',
      details: ['+91 9560069525', '+91 9560069526'],
      action: 'tel:+919560069525',
      bgColor: 'bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)]',
    },
    {
      icon: FaEnvelope,
      title: 'Email Us',
      details: ['support@borrowww.com', 'info@borrowww.com'],
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
      details: ['Borrowww Tower, Financial District', 'Mumbai, Maharashtra 400001'],
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
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Get in Touch</h2>
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
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Send us a Message</h2>
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-transparent transition-colors duration-200"
                      placeholder="Enter your full name"
                    />
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-transparent transition-colors duration-200"
                      placeholder="Enter your email"
                    />
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-transparent transition-colors duration-200"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-transparent transition-colors duration-200"
                    >
                      <option value="">Select a subject</option>
                      <option value="loan-inquiry">Loan Inquiry</option>
                      <option value="cibil-check">CIBIL Check</option>
                      <option value="customer-support">Customer Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-transparent transition-colors duration-200 resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[var(--primary-blue)] text-white py-4 px-6 rounded-lg font-semibold hover:bg-[var(--primary-blue-dark)] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
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
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
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
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
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
