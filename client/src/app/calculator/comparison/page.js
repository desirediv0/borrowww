'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FaArrowRight,
  FaBalanceScale,
  FaBuilding,
  FaCalculator,
  FaCalendarAlt,
  FaHome,
  FaRupeeSign,
  FaUser,
} from 'react-icons/fa';

import { motion } from 'framer-motion';

export default function LoanComparisonCalculator() {
  const router = useRouter();
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [tenure, setTenure] = useState(20);
  const [selectedLoans, setSelectedLoans] = useState(['home', 'personal']);
  const [comparisonResults, setComparisonResults] = useState([]);

  const loanTypes = [
    {
      id: 'home',
      name: 'Home Loan',
      rate: 8.5,
      icon: FaHome,
      color: 'from-[#2D3E50] to-[#2D3E50]',
      description: 'For buying residential property',
      maxAmount: '₹5Cr',
      minTenure: 5,
      maxTenure: 30,
    },
    {
      id: 'lap',
      name: 'Loan Against Property',
      rate: 10.25,
      icon: FaBalanceScale,
      color: 'from-orange-500 to-orange-600',
      description: 'Loan by mortgaging your commercial or residential property',
      maxAmount: '₹10Cr',
      minTenure: 5,
      maxTenure: 20,
    },
    {
      id: 'personal',
      name: 'Personal Loan',
      rate: 11.5,
      icon: FaUser,
      color: 'from-green-500 to-green-600',
      description: 'For any personal expenses',
      maxAmount: '₹40L',
      minTenure: 1,
      maxTenure: 7,
    },
    {
      id: 'business',
      name: 'Business Loan',
      rate: 13.5,
      icon: FaBuilding,
      color: 'from-purple-500 to-purple-600',
      description: 'For business expansion',
      maxAmount: '₹2Cr',
      minTenure: 1,
      maxTenure: 10,
    },
  ];

  const calculateEMI = (principal, rate, time) => {
    const monthlyRate = rate / 12 / 100;
    const months = time * 12;

    if (monthlyRate === 0) return principal / months;

    return (
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)
    );
  };

  const calculateComparison = useCallback(() => {
    const results = selectedLoans.map((loanId) => {
      const loan = loanTypes.find((l) => l.id === loanId);
      const emi = calculateEMI(loanAmount, loan.rate, tenure);
      const totalAmount = emi * tenure * 12;
      const totalInterest = totalAmount - loanAmount;

      return {
        ...loan,
        emi,
        totalAmount,
        totalInterest,
        monthlySavings: 0,
      };
    });

    const highestEMI = Math.max(...results.map((r) => r.emi));
    const updatedResults = results.map((result) => ({
      ...result,
      monthlySavings: highestEMI - result.emi,
    }));

    setComparisonResults(updatedResults);
  }, [loanAmount, tenure, selectedLoans]);

  useEffect(() => {
    calculateComparison();
  }, [calculateComparison]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleLoanToggle = (loanId) => {
    setSelectedLoans((prev) =>
      prev.includes(loanId) ? prev.filter((id) => id !== loanId) : [...prev, loanId]
    );
  };

  const getBestLoan = () => {
    if (comparisonResults.length === 0) return null;
    return comparisonResults.reduce((best, current) => (current.emi < best.emi ? current : best));
  };

  const bestLoan = getBestLoan();

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-[var(--primary-blue-light)] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center px-4 py-2 bg-[var(--primary-blue)]/10 text-[var(--primary-blue)] rounded-full text-sm font-medium mb-6">
              <FaBalanceScale className="mr-2" />
              Loan Comparison Calculator
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-gray-900 mb-6 tracking-tighter">
              Loan <span className="text-[var(--primary-blue)] italic tiemposfine">Comparison</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Compare different loan types side by side and find the best option for your needs. Get
              detailed EMI, interest, and savings comparison.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Calculator Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 max-h-min"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-2xl flex items-center justify-center shadow-lg">
                  <FaCalculator className="text-white text-xl" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">Compare Loans</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {/* Loan Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Loan Amount
                  </label>
                  <div className="relative">
                    <FaRupeeSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full pl-8 pr-3 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)] transition-all duration-200 text-sm bg-gray-50 focus:bg-white"
                      placeholder="Enter loan amount"
                    />
                  </div>
                  <div className="mt-3">
                    <input
                      type="range"
                      min="100000"
                      max="10000000"
                      step="10000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>₹1L</span>
                      <span>₹1Cr</span>
                    </div>
                  </div>
                </div>

                {/* Tenure */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Loan Tenure (Years)
                  </label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      value={tenure}
                      onChange={(e) => setTenure(Number(e.target.value))}
                      className="w-full pl-8 pr-3 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)] transition-all duration-200 text-sm bg-gray-50 focus:bg-white"
                      placeholder="Enter tenure"
                    />
                  </div>
                  <div className="mt-3">
                    <input
                      type="range"
                      min="1"
                      max="30"
                      step="1"
                      value={tenure}
                      onChange={(e) => setTenure(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>1 Year</span>
                      <span>30 Years</span>
                    </div>
                  </div>
                </div>

                {/* Loan Type Selection */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Select Loan Types to Compare
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {loanTypes.map((loan) => (
                      <motion.button
                        key={loan.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleLoanToggle(loan.id)}
                        className={`p-4 rounded-2xl border-2 transition-all duration-200 flex items-center gap-3 ${selectedLoans.includes(loan.id)
                          ? 'border-[var(--primary-blue)] bg-[var(--primary-blue)]/5'
                          : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                          }`}
                      >
                        <div
                          className={`w-8 h-8 bg-gradient-to-br ${loan.color} rounded-lg flex items-center justify-center`}
                        >
                          <loan.icon className="text-white text-sm" />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-sm">{loan.name}</div>
                          <div className="text-xs text-gray-500">{loan.rate}%</div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Best Loan Highlight */}
              {bestLoan && (
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-3xl p-6 text-white shadow-2xl">
                  <h3 className="text-2xl font-medium mb-4">Best Option</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center`}
                    >
                      <bestLoan.icon className="text-white text-xl" />
                    </div>
                    <div>
                      <div className="text-xl font-medium">{bestLoan.name}</div>
                      <div className="text-white/80">{bestLoan.rate}% interest rate</div>
                    </div>
                  </div>
                  <div className="text-3xl font-medium mb-2">{formatCurrency(bestLoan.emi)}</div>
                  <div className="text-white/80">Lowest monthly EMI</div>
                </div>
              )}

              {/* Comparison Table */}
              {comparisonResults.length > 0 && (
                <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Comparison Results</h3>
                  <div className="space-y-4">
                    {comparisonResults.map((loan, index) => (
                      <motion.div
                        key={loan.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 bg-gradient-to-br ${loan.color} rounded-xl flex items-center justify-center`}
                            >
                              <loan.icon className="text-white text-lg" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{loan.name}</h4>
                              <p className="text-sm text-gray-600">{loan.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-medium text-[var(--primary-blue)]">
                              {formatCurrency(loan.emi)}
                            </div>
                            <div className="text-sm text-gray-600">Monthly EMI</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="text-gray-600">Interest Rate</div>
                            <div className="font-semibold">{loan.rate}%</div>
                          </div>
                          <div>
                            <div className="text-gray-600">Total Interest</div>
                            <div className="font-semibold text-red-600">
                              {formatCurrency(loan.totalInterest)}
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-600">Total Amount</div>
                            <div className="font-semibold">{formatCurrency(loan.totalAmount)}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Loan Types Info */}
      <section className="py-14 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-medium text-gray-900 mb-6">Loan Types Explained</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understand different loan types and their features to make an informed decision
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {loanTypes.map((loan, index) => (
              <motion.div
                key={loan.id}
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
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${loan.color} rounded-2xl flex items-center justify-center shadow-lg`}
                    >
                      <loan.icon className="text-white text-xl" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{loan.name}</h3>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Interest Rate:</span>
                      <span className="font-medium text-[var(--primary-blue)] text-lg">
                        {loan.rate}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Max Amount:</span>
                      <span className="font-semibold text-gray-900">{loan.maxAmount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Tenure:</span>
                      <span className="font-semibold text-gray-900">
                        {loan.minTenure}-{loan.maxTenure} years
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{loan.description}</p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-blue-dark)] text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    Learn More
                    <FaArrowRight className="text-sm" />
                  </motion.button>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-3xl p-8 text-white text-center shadow-2xl"
          >
            <h3 className="text-3xl font-medium mb-4">Ready to Apply for the Best Loan?</h3>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Get personalized loan offers from top banks based on your comparison. Our experts will
              help you find the best deal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/calculator/home-loan')}
                className="bg-white text-[var(--primary-blue)] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg"
              >
                Apply Loan
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
