'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaCreditCard,
  FaExchangeAlt,
  FaPercentage,
  FaRupeeSign,
  FaTimesCircle,
} from 'react-icons/fa';

import { motion } from 'framer-motion';

export default function BalanceTransferCalculator() {
  const router = useRouter();
  const [currentLoan, setCurrentLoan] = useState({
    amount: 500000,
    rate: 15.5,
    tenure: 5,
    emi: 0,
    totalInterest: 0,
  });

  const [newLoan, setNewLoan] = useState({
    amount: 500000,
    rate: 12.5,
    tenure: 5,
    emi: 0,
    totalInterest: 0,
    transferFee: 2,
  });

  const [savings, setSavings] = useState({
    monthly: 0,
    total: 0,
    percentage: 0,
  });

  const calculateEMI = (principal, rate, tenure) => {
    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;

    if (monthlyRate === 0) return principal / months;

    return (
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)
    );
  };

  const calculateSavings = useCallback(() => {
    // Calculate current loan EMI and total interest
    const currentEMI = calculateEMI(currentLoan.amount, currentLoan.rate, currentLoan.tenure);
    const currentTotalInterest = currentEMI * currentLoan.tenure * 12 - currentLoan.amount;

    // Calculate new loan EMI and total interest
    const newEMI = calculateEMI(newLoan.amount, newLoan.rate, newLoan.tenure);
    const newTotalInterest = newEMI * newLoan.tenure * 12 - newLoan.amount;
    const transferFeeAmount = (newLoan.amount * newLoan.transferFee) / 100;

    // Calculate savings
    const monthlySavings = currentEMI - newEMI;
    const totalSavings = currentTotalInterest + transferFeeAmount - newTotalInterest;

    setCurrentLoan((prev) => ({
      ...prev,
      emi: currentEMI,
      totalInterest: currentTotalInterest,
    }));

    setNewLoan((prev) => ({
      ...prev,
      emi: newEMI,
      totalInterest: newTotalInterest,
    }));

    setSavings({
      monthly: monthlySavings,
      total: totalSavings,

      percentage: currentTotalInterest
        ? ((currentTotalInterest - newTotalInterest) / currentTotalInterest) * 100
        : 0,
    });
  }, [
    currentLoan.amount,
    currentLoan.rate,
    currentLoan.tenure,
    newLoan.amount,
    newLoan.rate,
    newLoan.tenure,
    newLoan.transferFee,
  ]);

  useEffect(() => {
    calculateSavings();
  }, [calculateSavings]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-[var(--primary-blue-light)] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center px-4 py-2 bg-[var(--primary-blue)]/10 text-[var(--primary-blue)] rounded-full text-sm font-medium mb-6">
              <FaCreditCard className="mr-2" />
              Balance Transfer Calculator
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-gray-900 mb-4 sm:mb-6 tracking-tight">
              Balance{' '}
              <span className="text-[var(--primary-blue)] italic tiemposfine">Transfer</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Compare your current loan with balance transfer options and see how much you can save
              monthly and overall
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile: Stack vertically, Desktop: Side by side with arrow */}
          <div className="space-y-8 lg:space-y-0">
            {/* Top Row: Current Loan and New Loan */}
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Current Loan */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border-2 border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <FaTimesCircle className="text-white text-xl" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Current Loan</h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Outstanding Amount
                    </label>
                    <div className="relative">
                      <FaRupeeSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        value={currentLoan.amount}
                        onChange={(e) =>
                          setCurrentLoan((prev) => ({ ...prev, amount: Number(e.target.value) }))
                        }
                        className="w-full pl-8 pr-3 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)] transition-all duration-200 text-sm bg-gray-50 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interest Rate (%)
                    </label>
                    <div className="relative">
                      <FaPercentage className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        value={currentLoan.rate}
                        onChange={(e) =>
                          setCurrentLoan((prev) => ({ ...prev, rate: Number(e.target.value) }))
                        }
                        className="w-full pl-8 pr-3 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)] transition-all duration-200 text-sm bg-gray-50 focus:bg-white"
                        step="0.1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Remaining Tenure (Years)
                    </label>
                    <div className="relative">
                      <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        value={currentLoan.tenure}
                        onChange={(e) =>
                          setCurrentLoan((prev) => ({ ...prev, tenure: Number(e.target.value) }))
                        }
                        className="w-full pl-8 pr-3 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)] transition-all duration-200 text-sm bg-gray-50 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-5 sm:p-6 border-2 border-red-200 md:col-span-2">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium text-sm sm:text-base">
                          Monthly EMI:
                        </span>
                        <span className="text-lg sm:text-xl font-semibold text-red-600">
                          {formatCurrency(currentLoan.emi)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium text-sm sm:text-base">
                          Total Interest:
                        </span>
                        <span className="text-lg sm:text-xl font-semibold text-red-600">
                          {formatCurrency(currentLoan.totalInterest)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Transfer Arrow - Mobile: Between cards, Desktop: Hidden (shown separately) */}
              <div className="flex items-center justify-center lg:hidden my-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-full flex items-center justify-center shadow-xl">
                  <FaExchangeAlt className="text-white text-2xl" />
                </div>
              </div>

              {/* New Loan */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border-2 border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <FaCheckCircle className="text-white text-xl" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">New Loan</h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transfer Amount
                    </label>
                    <div className="relative">
                      <FaRupeeSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        value={newLoan.amount}
                        onChange={(e) =>
                          setNewLoan((prev) => ({ ...prev, amount: Number(e.target.value) }))
                        }
                        className="w-full pl-8 pr-3 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)] transition-all duration-200 text-sm bg-gray-50 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Interest Rate (%)
                    </label>
                    <div className="relative">
                      <FaPercentage className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        value={newLoan.rate}
                        onChange={(e) =>
                          setNewLoan((prev) => ({ ...prev, rate: Number(e.target.value) }))
                        }
                        className="w-full pl-8 pr-3 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)] transition-all duration-200 text-sm bg-gray-50 focus:bg-white"
                        step="0.1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Tenure (Years)
                    </label>
                    <div className="relative">
                      <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        value={newLoan.tenure}
                        onChange={(e) =>
                          setNewLoan((prev) => ({ ...prev, tenure: Number(e.target.value) }))
                        }
                        className="w-full pl-8 pr-3 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)] transition-all duration-200 text-sm bg-gray-50 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transfer Fee (%)
                    </label>
                    <input
                      type="number"
                      value={newLoan.transferFee}
                      onChange={(e) =>
                        setNewLoan((prev) => ({ ...prev, transferFee: Number(e.target.value) }))
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50 focus:bg-white text-base"
                      step="0.1"
                    />
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5 sm:p-6 border-2 border-green-200 md:col-span-2">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium text-sm sm:text-base">
                          Monthly EMI:
                        </span>
                        <span className="text-lg sm:text-xl font-semibold text-green-600">
                          {formatCurrency(newLoan.emi)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium text-sm sm:text-base">
                          Total Interest:
                        </span>
                        <span className="text-lg sm:text-xl font-semibold text-green-600">
                          {formatCurrency(newLoan.totalInterest)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Desktop: Transfer Arrow in center */}
            <div className="hidden lg:flex items-center justify-center -my-8">
              <div className="w-20 h-20 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-full flex items-center justify-center shadow-xl z-10">
                <FaExchangeAlt className="text-white text-3xl" />
              </div>
            </div>
          </div>

          {/* Savings Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-3xl p-6 sm:p-8 text-white shadow-2xl"
          >
            <h3 className="text-2xl sm:text-3xl font-medium mb-6 sm:mb-8 text-center">
              Your Savings Summary
            </h3>
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              <div className="text-center bg-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-medium mb-2">
                  {formatCurrency(savings.monthly)}
                </div>
                <div className="text-white/90 font-medium text-sm sm:text-base">
                  Monthly Savings
                </div>
              </div>
              <div className="text-center bg-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-medium mb-2">
                  {formatCurrency(savings.total)}
                </div>
                <div className="text-white/90 font-medium text-sm sm:text-base">Total Savings</div>
              </div>
              <div className="text-center bg-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-medium mb-2">
                  {savings.percentage.toFixed(1)}%
                </div>
                <div className="text-white/90 font-medium text-sm sm:text-base">
                  Interest Savings
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-3xl p-8 text-white text-center shadow-2xl"
          >
            <h3 className="text-2xl sm:text-3xl font-medium mb-4">Ready to Get Started?</h3>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Transfer your loan to a lower interest rate. Our experts will help you find the best
              balance transfer offers from top banks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/calculator/home-loan')}
                className="bg-white text-[var(--primary-blue)] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg"
              >
                Apply for Loan
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/contact')}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[var(--primary-blue)] transition-all duration-200"
              >
                Contact an Expert
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
