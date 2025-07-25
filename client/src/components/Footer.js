'use client';

import Image from 'next/image';

import logo from '@/assets/logo.svg';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconMail,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const footerLinks = {
    Services: ['CIBIL Check', 'Personal Loan', 'Home Loan', 'Business Loan'],
    Company: ['About Us', 'Careers', 'Press', 'Partners'],
    Support: ['Help Center', 'Contact Us', 'Documentation', 'Status'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Security', 'Compliance'],
  };

  const socialLinks = [
    { icon: IconBrandTwitter, href: '#', label: 'Twitter' },
    { icon: IconBrandLinkedin, href: '#', label: 'LinkedIn' },
    { icon: IconBrandGithub, href: '#', label: 'GitHub' },
    { icon: IconMail, href: '#', label: 'Email' },
  ];

  return (
    <footer className="bg-gray-200 text-gray-800 pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-10 mb-12 items-start">
          {/* Logo and Description */}
          <div className="col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-2">
              <Image
                src={logo}
                alt="Borrowww Logo"
                width={48}
                height={36}
                className="rounded-lg p-1 shadow-md bg-white border border-blue-100"
              />
              <span className="text-2xl font-bold tracking-tight text-blue-700">Borrowww</span>
            </div>
            <span className="text-blue-600 font-medium text-sm mb-1">
              CIBIL Check & Instant Loan Provider
            </span>
            <p className="text-gray-600 leading-relaxed max-w-sm text-base">
              India's leading CIBIL score checking and loan provider platform. Get instant loan
              approval with competitive rates and transparent process.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center hover:bg-blue-100 hover:scale-110 transition-all duration-200 shadow-sm border border-blue-100 text-blue-600"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <h3 className="font-semibold text-blue-700 mb-4 tracking-wide uppercase text-sm letter-spacing-1">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link, linkIndex) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + categoryIndex * 0.1 + linkIndex * 0.05 }}
                  >
                    <motion.a
                      href="#"
                      className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium text-base"
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                      {link}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-blue-200 via-gray-100 to-blue-200 mb-8" />

        {/* Bottom Footer */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-gray-500 text-sm mb-2 md:mb-0">
            © 2024 Borrowww Finance. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm">
            <motion.a
              href="#"
              className="text-gray-500 hover:text-blue-600 transition-colors duration-200 font-medium"
              whileHover={{ y: -2 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-500 hover:text-blue-600 transition-colors duration-200 font-medium"
              whileHover={{ y: -2 }}
            >
              Terms of Service
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-500 hover:text-blue-600 transition-colors duration-200 font-medium"
              whileHover={{ y: -2 }}
            >
              RBI Compliance
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
