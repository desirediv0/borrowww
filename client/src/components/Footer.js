'use client';

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
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Logo and Description */}
          <motion.div
            className="col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="flex items-center gap-2 mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
              </div>
              <span className="text-xl font-semibold">Borrowww</span>
            </motion.div>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              India's leading CIBIL score checking and loan provider platform. Get instant loan
              approval with competitive rates and transparent process.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors duration-200"
                  whileHover={{ scale: 1.1, y: -2 }}
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
          </motion.div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <h3 className="font-semibold text-white mb-4">{category}</h3>
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
                      className="text-gray-400 hover:text-white transition-colors duration-200"
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

        {/* Bottom Footer */}
        <motion.div
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 Borrowww Finance. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm">
            <motion.a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-200"
              whileHover={{ y: -2 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-200"
              whileHover={{ y: -2 }}
            >
              Terms of Service
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-200"
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
