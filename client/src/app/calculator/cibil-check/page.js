'use client';

import { useState } from 'react';
import {
  FaArrowRight,
  FaCalendarAlt,
  FaChartLine,
  FaCheckCircle,
  FaDownload,
  FaEnvelope,
  FaExclamationTriangle,
  FaEye,
  FaEyeSlash,
  FaIdCard,
  FaLock,
  FaPhone,
  FaShare,
  FaShieldAlt,
  FaStar,
  FaUser,
} from 'react-icons/fa';

import { motion } from 'framer-motion';

export default function CIBILCheck() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    pan: '',
    dob: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [cibilScore, setCibilScore] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const mockScore = Math.floor(Math.random() * 300) + 300; // Random score between 300-900
      setCibilScore(mockScore);
      setIsSubmitting(false);
    }, 3000);
  };

  const getScoreCategory = (score) => {
    if (score >= 750) return { category: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' };
    if (score >= 650) return { category: 'Good', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (score >= 550) return { category: 'Fair', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { category: 'Poor', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const getScoreDescription = (score) => {
    if (score >= 750)
      return 'Excellent credit score! You are likely to get the best loan terms and lowest interest rates.';
    if (score >= 650)
      return 'Good credit score. You should be able to get loans with competitive rates.';
    if (score >= 550) return 'Fair credit score. You may get loans but with higher interest rates.';
    return 'Poor credit score. You may face difficulties in getting loans. Consider improving your credit score.';
  };

  const factors = [
    {
      factor: 'Payment History',
      impact: '35%',
      description: 'Timely payment of EMIs and credit card bills',
      icon: FaCheckCircle,
    },
    {
      factor: 'Credit Utilization',
      impact: '30%',
      description: 'How much of your available credit you use',
      icon: FaChartLine,
    },
    {
      factor: 'Credit History Length',
      impact: '15%',
      description: 'How long you have been using credit',
      icon: FaCalendarAlt,
    },
    {
      factor: 'Credit Mix',
      impact: '10%',
      description: 'Types of credit accounts you have',
      icon: FaShieldAlt,
    },
    {
      factor: 'New Credit',
      impact: '10%',
      description: 'Recent credit inquiries and new accounts',
      icon: FaUser,
    },
  ];

  const tips = [
    'Pay all your bills on time, every time',
    'Keep your credit utilization below 30%',
    "Don't close old credit accounts",
    'Limit new credit applications',
    'Monitor your credit report regularly',
    'Dispute any errors in your credit report',
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
              <FaShieldAlt className="mr-2" />
              Free CIBIL Check
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-gray-900 mb-6 tracking-tighter">
              Check Your{' '}
              <span className="text-[var(--primary-blue)] italic tiemposfine">CIBIL Score</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Get your free CIBIL score instantly. No hidden charges, no credit card required. Check
              your credit health and improve your loan eligibility.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-2xl flex items-center justify-center shadow-lg">
                  <FaLock className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Secure CIBIL Check</h2>
                  <p className="text-gray-600 text-sm">
                    Your data is protected with bank-level security
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      First Name *
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                        placeholder="Enter first name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Last Name *
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Email Address *
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    PAN Number *
                  </label>
                  <div className="relative">
                    <FaIdCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="pan"
                      value={formData.pan}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white uppercase"
                      placeholder="ABCDE1234F"
                      maxLength="10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Date of Birth *
                  </label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-blue-dark)] text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg flex items-center justify-center gap-3 shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Checking CIBIL Score...
                    </>
                  ) : (
                    <>
                      <FaShieldAlt />
                      Check CIBIL Score
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Info Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* CIBIL Score Display */}
              {cibilScore && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-3xl p-8 text-white shadow-2xl"
                >
                  <h3 className="text-2xl font-bold mb-6">Your CIBIL Score</h3>
                  <div className="text-6xl font-bold mb-4">{cibilScore}</div>
                  <div
                    className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 ${getScoreCategory(cibilScore).bg} ${getScoreCategory(cibilScore).color}`}
                  >
                    {getScoreCategory(cibilScore).category}
                  </div>
                  <p className="text-white/90">{getScoreDescription(cibilScore)}</p>
                </motion.div>
              )}

              {/* Features */}
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  Why Check CIBIL Score?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Free & Instant</h4>
                      <p className="text-gray-600 text-sm">
                        Get your score instantly without any charges
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Secure & Private</h4>
                      <p className="text-gray-600 text-sm">
                        Bank-level encryption protects your data
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Improve Score</h4>
                      <p className="text-gray-600 text-sm">Get tips to improve your credit score</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Score Factors */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              What Affects Your CIBIL Score?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the factors that influence your credit score helps you make better
              financial decisions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {factors.map((factor, index) => (
              <motion.div
                key={factor.factor}
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
                      <factor.icon className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{factor.factor}</h3>
                      <span className="text-[var(--primary-blue)] font-bold text-lg">
                        {factor.impact}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{factor.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Tips to Improve Your CIBIL Score
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow these simple steps to boost your credit score and improve your loan eligibility
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tips.map((tip, index) => (
              <motion.div
                key={tip}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-[var(--primary-blue)]/5 to-white p-8 rounded-3xl border border-[var(--primary-blue)]/10 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed font-medium">{tip}</p>
                  </div>
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
            <h3 className="text-3xl font-bold mb-4">Ready to Improve Your Credit Score?</h3>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Get personalized advice and loan offers based on your credit score. Our experts will
              help you find the best deals.
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
                View Loan Offers
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
