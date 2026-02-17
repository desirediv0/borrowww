'use client';

import {
  FaArrowRight,
  FaBalanceScale,
  FaBuilding,
  FaCalculator,
  FaCreditCard,
  FaHome,
  FaRupeeSign,
  FaShieldAlt,
} from 'react-icons/fa';

import Link from 'next/link';

import { motion } from 'framer-motion';

export default function Calculator() {
  const calculatorTools = [
    {
      id: 'emi',
      title: 'EMI Calculator',
      description: 'Calculate your monthly EMI for any loan',
      icon: FaCalculator,
      color: 'from-[#2D3E50] to-[#2D3E50]',
      href: '/emi',
    },
    {
      id: 'bt',
      title: 'Balance Transfer',
      description: 'Compare and transfer your loan balance',
      icon: FaCreditCard,
      color: 'from-green-500 to-green-600',
      href: '/balance-transfer',
    },
    {
      id: 'cibil',
      title: 'CIBIL Check',
      description: 'Check your credit score instantly',
      icon: FaShieldAlt,
      color: 'from-purple-500 to-purple-600',
      href: '/credit-check',
    },
    {
      id: 'home',
      title: 'Home Loan',
      description: 'Calculate home loan EMI and eligibility',
      icon: FaHome,
      color: 'from-orange-500 to-orange-600',
      href: '/home-loan',
    },
    {
      id: 'property',
      title: 'Loan Against Property',
      description: 'Calculate LAP EMI and eligibility',
      icon: FaBuilding,
      color: 'from-red-500 to-red-600',
      href: '/loan-against-property',
    },
    {
      id: 'comparison',
      title: 'Loan Comparison',
      description: 'Compare different loan options',
      icon: FaBalanceScale,
      color: 'from-indigo-500 to-indigo-600',
      href: '/comparison',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-medium text-gray-900 mb-6">Financial Calculators</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Use our comprehensive financial tools to make informed decisions about your loans and
            credit
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {calculatorTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group"
            >
              <Link
                href={tool.href}
                className="block bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-[#396A9F]"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${tool.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <tool.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{tool.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{tool.description}</p>
                <div className="flex items-center text-[#396A9F] font-semibold group-hover:text-[#396A9F]/80 transition-colors duration-200">
                  <span>Try Calculator</span>
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick EMI Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 bg-gradient-to-r from-[#396A9F] to-[#2D4A6B] rounded-3xl p-8 text-white"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-medium mb-4">Quick EMI Calculator</h3>
              <p className="text-white/90 mb-6">
                Get instant EMI calculations for your loan. Enter the loan amount, interest rate,
                and tenure to see your monthly EMI.
              </p>
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-[#396A9F] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
                >
                  Calculate EMI
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#396A9F] transition-colors duration-200"
                >
                  View All Calculators
                </motion.button>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Loan Amount</label>
                  <div className="relative">
                    <FaRupeeSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" />
                    <input
                      type="number"
                      placeholder="Enter loan amount"
                      className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Interest Rate (%)</label>
                    <input
                      type="number"
                      placeholder="Rate"
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Tenure (Years)</label>
                    <input
                      type="number"
                      placeholder="Years"
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/90">Monthly EMI:</span>
                    <span className="text-2xl font-medium">₹15,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
