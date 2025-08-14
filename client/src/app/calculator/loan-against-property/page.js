'use client';

import { useEffect, useState } from 'react';
import {
  FaArrowRight,
  FaBuilding,
  FaCalculator,
  FaCalendarAlt,
  FaCheckCircle,
  FaPercentage,
  FaRupeeSign,
} from 'react-icons/fa';

import { motion } from 'framer-motion';

export default function LoanAgainstPropertyCalculator() {
  const [propertyValue, setPropertyValue] = useState(10000000);
  const [loanAmount, setLoanAmount] = useState(6000000);
  const [interestRate, setInterestRate] = useState(12.5);
  const [tenureYears, setTenureYears] = useState(15);
  const [tenureMonths, setTenureMonths] = useState(0);
  const [emi, setEmi] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, tenureYears, tenureMonths]);

  const calculateEMI = () => {
    const principal = loanAmount;
    const rate = interestRate / 12 / 100; // Monthly interest rate
    const totalMonths = tenureYears * 12 + tenureMonths; // Total months

    if (rate === 0) {
      setEmi(principal / totalMonths);
    } else {
      const emiValue =
        (principal * rate * Math.pow(1 + rate, totalMonths)) /
        (Math.pow(1 + rate, totalMonths) - 1);
      setEmi(emiValue);
    }

    const totalAmountValue = emi * totalMonths;
    setTotalAmount(totalAmountValue);
    setTotalInterest(totalAmountValue - principal);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const banks = [
    {
      name: 'HDFC Bank',
      rate: '12.25%',
      processingFee: '₹15,000',
      maxAmount: '₹5Cr',
      icon: FaBuilding,
      color: 'from-[#2D3E50] to-[#2D3E50]',
    },
    {
      name: 'SBI',
      rate: '12.50%',
      processingFee: '₹12,000',
      maxAmount: '₹7Cr',
      icon: FaBuilding,
      color: 'from-green-500 to-green-600',
    },
    {
      name: 'ICICI Bank',
      rate: '12.75%',
      processingFee: '₹18,000',
      maxAmount: '₹6Cr',
      icon: FaBuilding,
      color: 'from-purple-500 to-purple-600',
    },
    {
      name: 'Axis Bank',
      rate: '12.99%',
      processingFee: '₹16,000',
      maxAmount: '₹5Cr',
      icon: FaBuilding,
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const features = [
    {
      title: 'High Loan Amount',
      description: 'Get up to 60% of your property value as loan',
      icon: FaRupeeSign,
    },
    {
      title: 'Flexible Usage',
      description: 'Use funds for business, education, or any purpose',
      icon: FaCheckCircle,
    },
    {
      title: 'Lower Interest',
      description: 'Competitive rates compared to personal loans',
      icon: FaPercentage,
    },
    {
      title: 'Long Tenure',
      description: 'Repayment period up to 15 years',
      icon: FaCalendarAlt,
    },
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
              <FaBuilding className="mr-2" />
              Loan Against Property Calculator
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-gray-900 mb-6 tracking-tighter">
              Loan Against{' '}
              <span className="text-[var(--primary-blue)] italic tiemposfine">Property</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Calculate your LAP EMI and get funds against your property. Use the loan amount for
              any purpose with competitive rates.
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
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-2xl flex items-center justify-center shadow-lg">
                  <FaCalculator className="text-white text-xl" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">Calculate Your LAP</h2>
              </div>

              <div className="space-y-8">
                {/* Property Value */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Value
                  </label>
                  <div className="relative">
                    <FaRupeeSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      value={propertyValue}
                      onChange={(e) => setPropertyValue(Number(e.target.value))}
                      className="w-full pl-12 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-transparent transition-all duration-200 text-lg bg-gray-50 focus:bg-white"
                      placeholder="Enter property value"
                    />
                  </div>
                  <div className="mt-3">
                    <input
                      type="range"
                      min="1000000"
                      max="100000000"
                      step="100000"
                      value={propertyValue}
                      onChange={(e) => setPropertyValue(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>₹10L</span>
                      <span>₹10Cr</span>
                    </div>
                  </div>
                </div>

                {/* Loan Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Loan Amount Required
                  </label>
                  <div className="relative">
                    <FaRupeeSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full pl-12 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-transparent transition-all duration-200 text-lg bg-gray-50 focus:bg-white"
                      placeholder="Enter loan amount"
                    />
                  </div>
                  <div className="mt-3">
                    <input
                      type="range"
                      min="1000000"
                      max={propertyValue * 0.6}
                      step="100000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>₹10L</span>
                      <span>{formatCurrency(propertyValue * 0.6)}</span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    Max loan amount: 60% of property value
                  </div>
                </div>

                {/* Interest Rate */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Interest Rate (% per annum)
                  </label>
                  <div className="relative">
                    <FaPercentage className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full pl-12 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-transparent transition-all duration-200 text-lg bg-gray-50 focus:bg-white"
                      placeholder="Enter interest rate"
                      step="0.1"
                    />
                  </div>
                  <div className="mt-3">
                    <input
                      type="range"
                      min="10"
                      max="18"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>10%</span>
                      <span>18%</span>
                    </div>
                  </div>
                </div>

                {/* Tenure */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Loan Tenure
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Years */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Years</label>
                      <div className="relative">
                        <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                        <input
                          type="number"
                          value={tenureYears}
                          onChange={(e) => setTenureYears(Number(e.target.value))}
                          className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-transparent transition-all duration-200 text-sm bg-gray-50 focus:bg-white"
                          placeholder="Years"
                          min="0"
                          max="15"
                        />
                      </div>
                      <div className="mt-2">
                        <input
                          type="range"
                          min="0"
                          max="15"
                          step="1"
                          value={tenureYears}
                          onChange={(e) => setTenureYears(Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>0</span>
                          <span>15</span>
                        </div>
                      </div>
                    </div>

                    {/* Months */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Months</label>
                      <div className="relative">
                        <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                        <input
                          type="number"
                          value={tenureMonths}
                          onChange={(e) => setTenureMonths(Number(e.target.value))}
                          className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-transparent transition-all duration-200 text-sm bg-gray-50 focus:bg-white"
                          placeholder="Months"
                          min="0"
                          max="11"
                        />
                      </div>
                      <div className="mt-2">
                        <input
                          type="range"
                          min="0"
                          max="11"
                          step="1"
                          value={tenureMonths}
                          onChange={(e) => setTenureMonths(Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>0</span>
                          <span>11</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    Total Tenure: {tenureYears} years {tenureMonths} months (
                    {tenureYears * 12 + tenureMonths} months)
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
              {/* EMI Result */}
              <div className="bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-3xl p-8 text-white shadow-2xl">
                <h3 className="text-2xl font-bold mb-6">Your Monthly EMI</h3>
                <div className="text-5xl font-bold mb-4">{formatCurrency(emi)}</div>
                <p className="text-white/90 mb-8 font-medium">
                  Monthly payment for {tenureYears} years {tenureMonths} months at {interestRate}%
                  interest rate
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                    <div className="text-sm text-white/80 font-medium">Total Amount</div>
                    <div className="text-lg font-bold">{formatCurrency(totalAmount)}</div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                    <div className="text-sm text-white/80 font-medium">Total Interest</div>
                    <div className="text-lg font-bold">{formatCurrency(totalInterest)}</div>
                  </div>
                </div>
              </div>

              {/* Loan Breakdown */}
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Loan Breakdown</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-4 border-b border-gray-100">
                    <span className="text-gray-700 font-medium">Property Value</span>
                    <span className="font-bold text-lg">{formatCurrency(propertyValue)}</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-gray-100">
                    <span className="text-gray-700 font-medium">Loan Amount</span>
                    <span className="font-bold text-lg text-[var(--primary-blue)]">
                      {formatCurrency(loanAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-gray-100">
                    <span className="text-gray-700 font-medium">Loan to Value Ratio</span>
                    <span className="font-bold text-lg text-green-600">
                      {((loanAmount / propertyValue) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-gray-100">
                    <span className="text-gray-700 font-medium">Interest Amount</span>
                    <span className="font-bold text-lg text-red-600">
                      {formatCurrency(totalInterest)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-4">
                    <span className="text-gray-700 font-medium">Number of EMIs</span>
                    <span className="font-bold text-lg">{tenureYears * 12 + tenureMonths}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
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
              Compare LAP offers from leading banks with competitive rates
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
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${bank.color} rounded-2xl flex items-center justify-center shadow-lg`}
                    >
                      <bank.icon className="text-white text-xl" />
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
                      <span className="text-gray-600 font-medium">Processing Fee:</span>
                      <span className="font-semibold text-gray-900">{bank.processingFee}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Max Amount:</span>
                      <span className="font-semibold text-gray-900">{bank.maxAmount}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => (window.location.href = '/auth')}
                    className="w-full bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-blue-dark)] text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    Login to Apply
                    <FaArrowRight className="text-sm" />
                  </motion.button>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Choose Loan Against Property?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get the best LAP deals with competitive rates and flexible terms
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-[var(--primary-blue)] text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <feature.icon className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-3xl p-8 text-white text-center shadow-2xl"
          >
            <h3 className="text-3xl font-bold mb-4">Ready to Get Funds Against Your Property?</h3>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Get personalized LAP offers from top banks. Our experts will help you find the best
              deal with competitive rates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => (window.location.href = '/auth')}
                className="bg-white text-[var(--primary-blue)] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg"
              >
                Login to Apply
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => (window.location.href = '/auth')}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[var(--primary-blue)] transition-all duration-200"
              >
                Register Now
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
