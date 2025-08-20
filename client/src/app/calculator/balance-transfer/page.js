'use client';

import { useEffect, useState } from 'react';
import {
  FaArrowRight,
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

  useEffect(() => {
    calculateSavings();
  }, [currentLoan, newLoan]);

  const calculateEMI = (principal, rate, tenure) => {
    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;

    if (monthlyRate === 0) return principal / months;

    return (
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)
    );
  };

  const calculateSavings = () => {
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
      percentage: ((currentTotalInterest - newTotalInterest) / currentTotalInterest) * 100,
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const banks = [
    { name: 'HDFC Bank', rate: '10.99%', fee: '1-2%', maxAmount: '₹25L', logo: '/logos/hdfc.svg' },
    {
      name: 'ICICI Bank',
      rate: '11.49%',
      fee: '1-2%',
      maxAmount: '₹20L',
      logo: '/logos/icici.svg',
    },
    { name: 'SBI', rate: '11.15%', fee: '1-2%', maxAmount: '₹30L', logo: '/logos/sbi.svg' },
    { name: 'Axis Bank', rate: '11.99%', fee: '1-2%', maxAmount: '₹25L', logo: '/logos/axis.svg' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-[var(--primary-blue-light)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center px-4 py-2 bg-[var(--primary-blue)]/10 text-[var(--primary-blue)] rounded-full text-sm font-medium mb-6">
              <FaCreditCard className="mr-2" />
              Balance Transfer Calculator
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-gray-900 mb-6 tracking-tighter">
              Balance{' '}
              <span className="text-[var(--primary-blue)] italic tiemposfine">Transfer</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Compare your current loan with balance transfer options and see how much you can save
              monthly and overall
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Current Loan */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <FaTimesCircle className="text-white text-xl" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">Current Loan</h2>
              </div>

              <div className="space-y-6">
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
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
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
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
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
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border border-red-200">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">Monthly EMI:</span>
                      <span className="text-xl font-bold text-red-600">
                        {formatCurrency(currentLoan.emi)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">Total Interest:</span>
                      <span className="text-xl font-bold text-red-600">
                        {formatCurrency(currentLoan.totalInterest)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Transfer Arrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center justify-center lg:mt-20"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-full flex items-center justify-center shadow-xl">
                <FaExchangeAlt className="text-white text-3xl" />
              </div>
            </motion.div>

            {/* New Loan */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <FaCheckCircle className="text-white text-xl" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">New Loan</h2>
              </div>

              <div className="space-y-6">
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
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
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
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
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
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
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
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    step="0.1"
                  />
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">Monthly EMI:</span>
                      <span className="text-xl font-bold text-green-600">
                        {formatCurrency(newLoan.emi)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">Total Interest:</span>
                      <span className="text-xl font-bold text-green-600">
                        {formatCurrency(newLoan.totalInterest)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Savings Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-3xl p-8 text-white shadow-2xl"
          >
            <h3 className="text-3xl font-bold mb-8 text-center">Your Savings Summary</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-4xl font-bold mb-2">{formatCurrency(savings.monthly)}</div>
                <div className="text-white/90 font-medium">Monthly Savings</div>
              </div>
              <div className="text-center bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-4xl font-bold mb-2">{formatCurrency(savings.total)}</div>
                <div className="text-white/90 font-medium">Total Savings</div>
              </div>
              <div className="text-center bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-4xl font-bold mb-2">{savings.percentage.toFixed(1)}%</div>
                <div className="text-white/90 font-medium">Interest Savings</div>
              </div>
            </div>


          </motion.div>
        </div>
      </section>

      {/* Bank Offers */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Top Bank Offers</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Compare balance transfer offers from leading banks with competitive rates
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {banks.map((bank, index) => (
              <motion.div
                key={bank.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-[var(--primary-blue)]"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-2xl flex items-center justify-center shadow-lg">
                      <FaCreditCard className="text-white text-xl" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{bank.name}</h3>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Interest Rate:</span>
                      <span className="font-bold text-[var(--primary-blue)] text-lg">
                        {bank.rate}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Transfer Fee:</span>
                      <span className="font-semibold text-gray-900">{bank.fee}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Max Amount:</span>
                      <span className="font-semibold text-gray-900">{bank.maxAmount}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = '/auth'}
                    className="w-full bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-blue-dark)] text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    Login to Apply
                    <FaArrowRight className="text-sm" />
                  </motion.button>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-16 bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-3xl p-8 text-white text-center"
          >
            <h3 className="text-3xl font-bold mb-4">Ready to Save on Your Loan?</h3>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Get personalized balance transfer offers from top banks. Our experts will help you
              find the best deal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[var(--primary-blue)] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg"
              >
                Get Free Consultation
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[var(--primary-blue)] transition-all duration-200"
              >
                Compare More Banks
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
