'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { gif } from '@/assets';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import { User, LogOut, ChevronDown } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check auth state
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('user_token');
      const userData = localStorage.getItem('user');
      if (token && userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (e) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkAuth();
    // Listen for storage changes (login/logout from other tabs)
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user');
    setUser(null);
    setIsProfileDropdownOpen(false);
    window.location.href = '/';
  };

  const calculatorItems = [
    { name: 'Home Loan', href: '/calculator/home-loan' },
    { name: 'Loan Against Property', href: '/calculator/loan-against-property' },
    { name: 'EMI Calculator', href: '/calculator/emi' },
    { name: 'Balance Transfer', href: '/calculator/balance-transfer' },
    { name: 'Loan Comparison', href: '/calculator/comparison' },
  ];

  const navItems = [
    { name: 'Home Loan', href: '/calculator/home-loan' },
    { name: 'Loan Against Property', href: '/calculator/loan-against-property' },
    { name: 'EMI Calculator', href: '/calculator/emi' },
    { name: 'Balance Transfer', href: '/calculator/balance-transfer' },
    { name: 'Blog', href: '/blog/' },
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
          <span>Free Credit Score Check • Instant Loan Approval</span>
          <span className="text-pink-300">›</span>
        </div>
      </motion.div>

      {/* Main Header */}
      <motion.header
        className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'
          }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-24">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/">
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Image src={'/newlogo.png'} alt="Borrowww" width={150} height={80} />
              </motion.div>
            </Link>

            <Link href="/credit-check" className="md:hidden flex">
              <Image src={gif} alt="Borrowww" width={100} height={100} />
            </Link>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
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

            {/* Auth/Profile Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/credit-check">
                <Image src={gif} alt="Borrowww" width={120} height={100} />
              </Link>

              {/* Auth Section */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#2D3E50] to-[#3A6EA5] text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                  >
                    <User className="h-4 w-4" />
                    <span className="max-w-[100px] truncate">{user.firstName || user.name || 'Profile'}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {isProfileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50"
                      >
                        <Link
                          href="/profile"
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          <User className="h-4 w-4" />
                          My Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full"
                        >
                          <LogOut className="h-4 w-4" />
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href="/auth"
                  className="px-5 py-2.5 bg-gradient-to-r from-[#2D3E50] to-[#3A6EA5] text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                >
                  Login
                </Link>
              )}
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

                {/* Mobile Auth Section */}
                <div className="border-t pt-4">
                  {user ? (
                    <div className="space-y-2">
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-3 py-3 bg-gray-50 rounded-lg text-gray-700 font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-[#2D3E50] to-[#3A6EA5] rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <span>{user.firstName || user.name || 'My Profile'}</span>
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-2 px-3 py-3 text-red-600 font-medium w-full"
                      >
                        <LogOut className="h-5 w-5" />
                        Logout
                      </button>
                    </div>
                  ) : (
                    <Link
                      href="/auth"
                      className="block w-full text-center py-3 bg-gradient-to-r from-[#2D3E50] to-[#3A6EA5] text-white rounded-xl font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login / Register
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
