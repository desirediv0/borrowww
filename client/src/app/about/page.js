'use client';

import {
  FaAward,
  FaChartLine,
  FaGlobe,
  FaHandshake,
  FaHeart,
  FaLightbulb,
  FaRocket,
  FaShieldAlt,
  FaStar,
  FaUsers,
} from 'react-icons/fa';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function AboutPage() {
  const router = useRouter();
  const stats = [
    {
      number: '2700+',
      label: 'Happy Customers',
      icon: FaUsers,
      color: 'from-[var(--primary-blue-dark)] to-[var(--primary-blue)]',
    },
    {
      number: '₹500Cr+',
      label: 'Loans Disbursed',
      icon: FaChartLine,
      color: 'from-[var(--primary-blue-dark)] to-[var(--primary-blue)]',
    },
    {
      number: '95%',
      label: 'Approval Rate',
      icon: FaAward,
      color: 'from-[var(--primary-blue-dark)] to-[var(--primary-blue)]',
    },
    {
      number: '24/7',
      label: 'Customer Support',
      icon: FaHandshake,
      color: 'from-[var(--primary-blue-dark)] to-[var(--primary-blue)]',
    },
  ];

  const values = [
    {
      icon: FaShieldAlt,
      title: 'Trust & Security',
      description: 'Your financial data is protected with bank-level security and encryption.',
      color: 'from-[var(--primary-blue-dark)] to-[var(--primary-blue)]',
    },
    {
      icon: FaChartLine,
      title: 'Transparency',
      description: 'Clear terms, no hidden charges, and complete transparency in all processes.',
      color: 'from-[var(--primary-blue-dark)] to-[var(--primary-blue)]',
    },
    {
      icon: FaUsers,
      title: 'Customer First',
      description:
        'Every decision we make is centered around providing the best customer experience.',
      color: 'from-[var(--primary-blue-dark)] to-[var(--primary-blue)]',
    },
    {
      icon: FaGlobe,
      title: 'Innovation',
      description: 'Leveraging technology to make loan processes faster and more efficient.',
      color: 'from-[var(--primary-blue-dark)] to-[var(--primary-blue)]',
    },
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Founded',
      description: 'Started with a vision to democratize credit',
      icon: FaRocket,
    },
    {
      year: '2021',
      title: 'First 10,000 Customers',
      description: 'Reached our first major milestone',
      icon: FaUsers,
    },
    {
      year: '2023',
      title: '₹100Cr+ Disbursed',
      description: 'Crossed the ₹100 crore mark in loan disbursals',
      icon: FaChartLine,
    },
    {
      year: '2024',
      title: '50,000+ Customers',
      description: 'Continuing to grow and serve more customers',
      icon: FaStar,
    },
  ];

  const features = [
    {
      icon: FaShieldAlt,
      title: 'Bank-Level Security',
      description: '256-bit encryption with strict RBI-aligned data protection standards.',
      color: 'from-[var(--primary-blue-dark)] to-[var(--primary-blue)]',
    },
    {
      icon: FaRocket,
      title: 'Quick Processing Support',
      description: 'Tech-enabled guidance that accelerates documentation and bank coordination.',
      color: 'from-[var(--primary-blue-dark)] to-[var(--primary-blue)]',
    },
    {
      icon: FaHeart,
      title: 'Customer-First Approach',
      description: 'Dedicated advisors who guide you at every step for the best loan experience.',
      color: 'from-[var(--primary-blue-dark)] to-[var(--primary-blue)]',
    },
    {
      icon: FaLightbulb,
      title: 'Smarter Loan Experience',
      description:
        'Innovative tools and insights that help you choose better loan options with ease.',
      color: 'from-[var(--primary-blue-dark)] to-[var(--primary-blue)]',
    },
  ];

  return (
    <>
      {/* Hero Section - Updated to match LAP style */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-[var(--primary-blue-light)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center px-4 py-2 bg-[var(--primary-blue)]/10 text-[var(--primary-blue)] rounded-full text-sm font-medium mb-6">
              <FaStar className="mr-2" />
              About Borrowww
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-gray-900 mb-6 tracking-tighter">
              About{' '}
              <span className="text-[var(--primary-blue)] italic tiemposfine">Borrowww</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              India&apos;s leading digital lending platform, revolutionizing the way people access
              credit. We make financial inclusion a reality through technology and trust.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Updated */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <stat.icon className="text-white text-3xl" />
                </div>
                <div className="text-4xl font-medium text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision - Updated */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-[var(--primary-blue)]/10 text-[var(--primary-blue)] rounded-full text-sm font-medium mb-6">
                <FaHeart className="mr-2" />
                Our Mission
              </div>
              <h2 className="text-4xl font-medium text-gray-900 mb-6">
                Democratizing Access to Credit
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To democratize access to credit by leveraging technology and data, making financial
                services accessible to every Indian who deserves it.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                We believe that everyone should have the opportunity to achieve their dreams, and
                access to credit shouldn&apos;t be a barrier to success.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
            >
              <div className="inline-flex items-center px-4 py-2 bg-[var(--primary-blue)]/10 text-[var(--primary-blue)] rounded-full text-sm font-medium mb-6">
                <FaStar className="mr-2" />
                Our Vision
              </div>
              <h3 className="text-3xl font-medium text-gray-900 mb-6">
                India&apos;s Most Trusted Digital Lending Partner
              </h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                To become India&apos;s most trusted and preferred digital lending partner, serving
                millions of customers with innovative financial solutions.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-[var(--primary-blue)]/5 rounded-xl">
                  <div className="w-3 h-3 bg-[var(--primary-blue)] rounded-full"></div>
                  <span className="text-gray-700 font-medium">Financial inclusion for all</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-[var(--primary-blue)]/5 rounded-xl">
                  <div className="w-3 h-3 bg-[var(--primary-blue)] rounded-full"></div>
                  <span className="text-gray-700 font-medium">Technology-driven solutions</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-[var(--primary-blue)]/5 rounded-xl">
                  <div className="w-3 h-3 bg-[var(--primary-blue)] rounded-full"></div>
                  <span className="text-gray-700 font-medium">Customer-centric approach</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section - Updated */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-medium text-gray-900 mb-6">Why Choose Borrowww?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine cutting-edge technology with human touch to deliver exceptional financial
              services
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
                className="text-center p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <feature.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section - Updated */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-medium text-gray-900 mb-6">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at Borrowww
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <value.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section - Updated */}
      {/* <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-[var(--primary-blue)]/10 text-[var(--primary-blue)] rounded-full text-sm font-medium mb-6">
                <FaRocket className="mr-2" />
                Our Journey
              </div>
              <h2 className="text-4xl font-medium text-gray-900 mb-6">The Borrowww Story</h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2020, Borrowww emerged from a simple observation: millions of
                  Indians were struggling to access credit due to traditional banking barriers.
                </p>
                <p>
                  Our founders, having experienced these challenges firsthand, decided to build a
                  platform that would make credit accessible, transparent, and hassle-free.
                </p>
                <p>
                  Today, we&apos;ve helped over 50,000 customers achieve their financial goals,
                  disbursing more than ₹500 crores in loans with a 95% approval rate.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-[var(--primary-blue)]/5 to-white p-8 rounded-3xl shadow-xl border border-[var(--primary-blue)]/10"
            >
              <h3 className="text-2xl font-medium text-gray-900 mb-8">Key Milestones</h3>
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={milestone.year} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[var(--primary-blue)] rounded-2xl flex items-center justify-center text-white font-medium text-lg shadow-lg">
                      <milestone.icon className="text-xl" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900">{milestone.title}</h4>
                        <span className="text-[var(--primary-blue)] font-medium">
                          {milestone.year}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* CTA Section - Updated */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-3xl p-8 text-white text-center shadow-2xl"
          >
            <h2 className="text-4xl font-medium text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have already achieved their financial goals
              with Borrowww
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/credit-check')}
                className="bg-white text-[var(--primary-blue)] px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Check Your CIBIL Score
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/calculator/home-loan')}
                className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-[var(--primary-blue)] transition-colors duration-200"
              >
                Apply for Loan
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
