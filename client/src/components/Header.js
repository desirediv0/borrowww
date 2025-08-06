'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { logo } from '@/assets';
import { IconChevronDown, IconMenu2, IconUser, IconX } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Header() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCalculatorDropdownOpen, setIsCalculatorDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const calculatorItems = [
    { name: 'CIBIL Check', href: '/calculator/cibil-check', icon: '📊' },
    { name: 'EMI Calculator', href: '/calculator/emi', icon: '🧮' },
    { name: 'Balance Transfer', href: '/calculator/balance-transfer', icon: '🔄' },
    { name: 'Home Loan', href: '/calculator/home-loan', icon: '🏠' },
    { name: 'Loan Against Property', href: '/calculator/loan-against-property', icon: '🏢' },
    { name: 'Loan Comparison', href: '/calculator/comparison', icon: '⚖️' },
  ];

  const navItems = [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <>
      {/* Top Banner */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-[var(--primary-blue-dark)] text-white py-3 px-4 text-center text-sm relative"
      >
        <div className="flex items-center justify-center gap-2">
          <span className="text-pink-300">⚡</span>
          <span>Free CIBIL Score Check • Instant Loan Approval</span>
          <span className="text-pink-300">›</span>
        </div>
        <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white">
          <IconX size={16} />
        </button>
      </motion.div>

      {/* Main Header */}
      <motion.header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-24">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/">
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Image src={logo} alt="Borrowww" width={200} height={80} />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {/* Calculator Dropdown */}
              <div className="relative">
                <motion.button
                  className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
                  onClick={() => setIsCalculatorDropdownOpen(!isCalculatorDropdownOpen)}
                  onMouseEnter={() => setIsCalculatorDropdownOpen(true)}
                  whileHover={{ y: -2 }}
                >
                  <span>Calculators</span>
                  <motion.div
                    animate={{ rotate: isCalculatorDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IconChevronDown size={16} />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {isCalculatorDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50"
                      onMouseLeave={() => setIsCalculatorDropdownOpen(false)}
                    >
                      {calculatorItems.map((item, index) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
                            onClick={() => setIsCalculatorDropdownOpen(false)}
                          >
                            <span className="text-lg">{item.icon}</span>
                            <span className="font-medium">{item.name}</span>
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Other Navigation Items */}
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium block"
                  >
                    <motion.span whileHover={{ y: -2 }} className="block">
                      {item.name}
                    </motion.span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <motion.button
                className="bg-gradient-to-r from-[var(--primary-blue-dark)] to-[var(--primary-blue)] text-white px-6 py-2 rounded-full font-medium hover:bg-[var(--primary-darkgreen)] transition-colors duration-200"
                whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(45, 90, 74, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                onClick={() => router.push('/auth')}
              >
                <IconUser size={16} />
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t"
            >
              <div className="px-4 py-4 space-y-4">
                {/* Calculator Section */}
                <div>
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Calculators
                  </div>
                  <div className="space-y-2">
                    {calculatorItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Other Navigation Items */}
                <div className="border-t pt-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block text-gray-600 hover:text-gray-900 font-medium py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Auth Buttons */}
                <div className="pt-4 border-t space-y-2">
                  <button
                    className="block w-full bg-gradient-to-r from-[var(--primary-blue-dark)] to-[var(--primary-blue)] text-white px-4 py-2 rounded-full font-medium"
                    onClick={() => (window.location.href = '/auth')}
                  >
                    Apply for Loan
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
