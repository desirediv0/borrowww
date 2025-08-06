'use client';

import { useState } from 'react';
import { FaArrowLeft, FaCheck, FaEnvelope, FaPhone, FaSpinner } from 'react-icons/fa';

import Link from 'next/link';

import { AnimatePresence, motion } from 'framer-motion';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState('phone'); // 'phone', 'otp'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    if (phone.length !== 10) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
      setStep('otp');
    }, 2000);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      alert('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to dashboard or show success
      alert('Authentication successful!');
    }, 2000);
  };

  const resendOtp = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('OTP resent successfully!');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-[var(--primary-blue-light)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center text-[var(--primary-blue)] hover:text-[var(--primary-blue-dark)] transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
        </motion.div>

        {/* Auth Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
            >
              {isLogin ? (
                <FaPhone className="text-white text-2xl" />
              ) : (
                <FaEnvelope className="text-white text-2xl" />
              )}
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-gray-600">
              {isLogin ? 'Sign in to continue' : 'Get started with your account'}
            </p>
          </div>

          {/* Toggle Login/Register */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
            <motion.button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                isLogin
                  ? 'bg-white text-[var(--primary-blue)] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Login
            </motion.button>
            <motion.button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                !isLogin
                  ? 'bg-white text-[var(--primary-blue)] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Register
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            {step === 'phone' && (
              <motion.form
                key="phone"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handlePhoneSubmit}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter your 10-digit phone number"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-transparent transition-all duration-200 text-lg"
                      maxLength={10}
                      required
                    />
                    <FaPhone className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    We&apos;ll send a 6-digit OTP to verify your number
                  </p>
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading || phone.length !== 10}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 ${
                    isLoading || phone.length !== 10
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-blue-dark)] hover:shadow-lg hover:scale-105'
                  }`}
                  whileHover={!isLoading && phone.length === 10 ? { scale: 1.02 } : {}}
                  whileTap={!isLoading && phone.length === 10 ? { scale: 0.98 } : {}}
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      Send OTP
                      <FaArrowLeft className="rotate-180" />
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}

            {step === 'otp' && (
              <motion.form
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleOtpSubmit}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Enter OTP</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter 6-digit OTP"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-transparent transition-all duration-200 text-lg text-center tracking-widest"
                      maxLength={6}
                      required
                    />
                    <FaCheck className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">OTP sent to +91 {phone}</p>
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading || otp.length !== 6}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 ${
                    isLoading || otp.length !== 6
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-blue-dark)] hover:shadow-lg hover:scale-105'
                  }`}
                  whileHover={!isLoading && otp.length === 6 ? { scale: 1.02 } : {}}
                  whileTap={!isLoading && otp.length === 6 ? { scale: 0.98 } : {}}
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      {isLogin ? 'Sign In' : 'Create Account'}
                      <FaArrowLeft className="rotate-180" />
                    </>
                  )}
                </motion.button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={resendOtp}
                    disabled={isLoading}
                    className="text-[var(--primary-blue)] hover:text-[var(--primary-blue-dark)] font-medium transition-colors"
                  >
                    Didn&apos;t receive OTP? Resend
                  </button>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setStep('phone');
                      setOtp('');
                      setOtpSent(false);
                    }}
                    className="text-gray-500 hover:text-gray-700 font-medium transition-colors"
                  >
                    Change Phone Number
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Terms */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              By continuing, you agree to our{' '}
              <Link href="#" className="text-[var(--primary-blue)] hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="#" className="text-[var(--primary-blue)] hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
