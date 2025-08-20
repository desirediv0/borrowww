'use client';

import { useEffect, useState } from 'react';
import {
  FaArrowRight,
  FaBuilding,
  FaCalculator,
  FaCalendarAlt,
  FaCar,
  FaChartLine,
  FaDownload,
  FaHome,
  FaPercentage,
  FaRupeeSign,
  FaUser,
} from 'react-icons/fa';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(10.5);
  const [tenureYears, setTenureYears] = useState(20);
  const [tenureMonths, setTenureMonths] = useState(0);
  const [emi, setEmi] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  const router = useRouter()

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, tenureYears, tenureMonths]);

  const calculateEMI = () => {
    const principal = loanAmount;
    const rate = interestRate / 12 / 100; // Monthly interest rate
    const time = tenureYears * 12 + tenureMonths; // Total months

    if (rate === 0) {
      setEmi(principal / time);
    } else {
      const emiValue =
        (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
      setEmi(emiValue);
    }

    const totalAmountValue = emi * time;
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



  const loanTypes = [
    {
      name: 'Home Loan',
      rate: '8.50% - 12.50%',
      amount: '₹5L - ₹2Cr',
      icon: FaHome,
      color: 'from-[#2D3E50] to-[#2D3E50]',
    },
    {
      name: 'Personal Loan',
      rate: '10.99% - 24.99%',
      amount: '₹50K - ₹25L',
      icon: FaUser,
      color: 'from-green-500 to-green-600',
    },
    {
      name: 'Business Loan',
      rate: '12.00% - 18.00%',
      amount: '₹1L - ₹50L',
      icon: FaBuilding,
      color: 'from-purple-500 to-purple-600',
    },
    {
      name: 'Car Loan',
      rate: '9.00% - 15.00%',
      amount: '₹1L - ₹50L',
      icon: FaCar,
      color: 'from-orange-500 to-orange-600',
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
            className="text-center 2"
          >
            <div className="inline-flex items-center px-4 py-2 bg-[var(--primary-blue)]/10 text-[var(--primary-blue)] rounded-full text-sm font-medium mb-6">
              <FaCalculator className="mr-2" />
              EMI Calculator
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-gray-900 mb-6 tracking-tighter">
              EMI <span className="text-[var(--primary-blue)] italic tiemposfine">Calculator</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Calculate your monthly EMI, total interest, and loan breakdown with our advanced EMI
              calculator
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
              className="bg-white p-8 rounded-3xl h-min shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-2xl flex items-center justify-center shadow-lg">
                  <FaCalculator className="text-white text-xl" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">Calculate Your EMI</h2>
              </div>

              <div className="space-y-5">
                {/* Loan Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 ">
                    Loan Amount
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
                      min="10000"
                      max="10000000"
                      step="10000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>₹10,000</span>
                      <span>₹1,00,00,000</span>
                    </div>
                  </div>
                </div>

                {/* Interest Rate */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 ">
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

                    />
                  </div>
                  <div className="mt-3">
                    <input
                      type="range"
                      min="5"
                      max="25"

                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>5%</span>
                      <span>25%</span>
                    </div>
                  </div>
                </div>

                {/* Tenure */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 ">
                    Loan Tenure
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Years Input */}
                    <div>
                      <div className="relative">
                        <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="number"
                          value={tenureYears}
                          onChange={(e) => setTenureYears(Number(e.target.value))}
                          className="w-full pl-12 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-transparent transition-all duration-200 text-lg bg-gray-50 focus:bg-white"
                          placeholder="Years"
                          min="0"
                          max="30"
                        />
                      </div>
                      <div className="mt-3">
                        <input
                          type="range"
                          min="0"
                          max="30"
                          step="1"
                          value={tenureYears}
                          onChange={(e) => setTenureYears(Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                          <span>0 Years</span>
                          <span>30 Years</span>
                        </div>
                      </div>
                    </div>

                    {/* Months Input */}
                    <div>
                      <div className="relative">
                        <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="number"
                          value={tenureMonths}
                          onChange={(e) => setTenureMonths(Number(e.target.value))}
                          className="w-full pl-12 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-transparent transition-all duration-200 text-lg bg-gray-50 focus:bg-white"
                          placeholder="Months"
                          min="0"
                          max="11"
                        />
                      </div>
                      <div className="mt-3">
                        <input
                          type="range"
                          min="0"
                          max="11"
                          step="1"
                          value={tenureMonths}
                          onChange={(e) => setTenureMonths(Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                          <span>0 Months</span>
                          <span>11 Months</span>
                        </div>
                      </div>
                    </div>
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
                <h3 className="text-2xl font-bold mb-3">Your Monthly EMI</h3>
                <div className="text-5xl font-bold mb-4">{formatCurrency(emi)}</div>
                <p className="text-white/90 mb-4 font-medium">
                  Monthly payment for {tenureYears} years{' '}
                  {tenureMonths > 0 ? `${tenureMonths} months` : ''} at {interestRate}% interest
                  rate
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
                  <div className="flex justify-between items-center py-1 border-b border-gray-100">
                    <span className="text-gray-700 font-medium">Principal Amount</span>
                    <span className="font-bold text-lg">{formatCurrency(loanAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-100">
                    <span className="text-gray-700 font-medium">Interest Amount</span>
                    <span className="font-bold text-lg text-red-600">
                      {formatCurrency(totalInterest)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-100">
                    <span className="text-gray-700 font-medium">Total Amount</span>
                    <span className="font-bold text-lg text-[var(--primary-blue)]">
                      {formatCurrency(totalAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-700 font-medium">Number of EMIs</span>
                    <span className="font-bold text-lg">
                      {tenureYears * 12 + tenureMonths} ({tenureYears} years {tenureMonths} months)
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Loan Types */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Popular Loan Types</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore different loan options with their typical interest rates and amounts
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {loanTypes.map((loan, index) => (
              <motion.div
                key={loan.name}
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
                      <span className="font-bold text-[var(--primary-blue)] text-lg">
                        {loan.rate}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Loan Amount:</span>
                      <span className="font-semibold text-gray-900">{loan.amount}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-blue-dark)] text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    Calculate EMI
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
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Choose Our EMI Calculator?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get accurate calculations and detailed insights for better financial planning
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <FaCalculator className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Accurate Calculations</h3>
              <p className="text-gray-600 leading-relaxed">
                Get precise EMI calculations using industry-standard formulas and algorithms
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <FaChartLine className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Detailed Breakdown</h3>
              <p className="text-gray-600 leading-relaxed">
                View complete loan breakdown including principal, interest, and total amount
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <FaDownload className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Export Results</h3>
              <p className="text-gray-600 leading-relaxed">
                Download your calculations as PDF or share with others for easy reference
              </p>
            </motion.div>
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
            <h3 className="text-3xl font-bold mb-4">Ready to Apply for a Loan?</h3>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Get personalized loan offers from top banks. Our experts will help you find the best
              deal with competitive rates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => (router.push('/auth'))}
                className="bg-white text-[var(--primary-blue)] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg"
              >
                Login to Apply
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => (router.push('/auth'))}
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
