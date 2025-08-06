'use client';

import { useState } from 'react';
import { FaChevronDown, FaPhone, FaSearch, FaWhatsapp } from 'react-icons/fa';

import { AnimatePresence, motion } from 'framer-motion';

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'cibil', name: 'CIBIL Score' },
    { id: 'loans', name: 'Loan Process' },
    { id: 'documents', name: 'Documents' },
    { id: 'payments', name: 'Payments & Charges' },
    { id: 'technical', name: 'Technical Support' },
  ];

  const faqData = [
    // CIBIL Score Questions
    {
      id: 1,
      category: 'cibil',
      question: 'What is a CIBIL score and why is it important?',
      answer:
        'A CIBIL score is a 3-digit numeric summary of your credit history, ranging from 300-900. It reflects your creditworthiness and repayment history. A higher score (750+) increases your chances of loan approval and better interest rates. Lenders use this score to assess your credit risk before approving loans.',
    },
    {
      id: 2,
      category: 'cibil',
      question: 'How can I check my CIBIL score for free?',
      answer:
        "You can check your CIBIL score for free on our platform. Simply provide your basic details like PAN number, name, date of birth, and phone number. We'll fetch your credit report instantly without any charges. You can check your score once every year for free.",
    },
    {
      id: 3,
      category: 'cibil',
      question: 'What factors affect my CIBIL score?',
      answer:
        'Your CIBIL score is affected by: Payment history (35%), Credit utilization (30%), Length of credit history (15%), Credit mix (10%), and New credit inquiries (10%). Timely payments, low credit utilization, and a long credit history help maintain a good score.',
    },
    {
      id: 4,
      category: 'cibil',
      question: 'How long does it take to improve a CIBIL score?',
      answer:
        'Improving your CIBIL score takes time and consistent effort. With good financial habits, you can see improvement in 3-6 months. However, significant improvement may take 12-18 months. Focus on timely payments, reducing credit utilization, and avoiding multiple loan applications.',
    },

    // Loan Process Questions
    {
      id: 5,
      category: 'loans',
      question: 'How long does loan approval take?',
      answer:
        'Most loan applications are processed within 24-48 hours. We use advanced technology and AI-powered systems to provide quick approvals while maintaining security standards. The actual disbursal time depends on document verification and bank processing.',
    },
    {
      id: 6,
      category: 'loans',
      question: 'What are the minimum requirements for loan approval?',
      answer:
        'Minimum requirements include: Age 21-65 years, Indian resident, minimum monthly income ₹25,000, CIBIL score 650+, stable employment (2+ years), and clean credit history. Specific requirements may vary based on loan type and amount.',
    },
    {
      id: 7,
      category: 'loans',
      question: 'What types of loans do you offer?',
      answer:
        'We offer Personal Loans (₹50,000 - ₹25,00,000), Home Loans (₹5,00,000 - ₹2,00,00,000), Business Loans (₹1,00,000 - ₹50,00,000), and Education Loans. Each loan type has specific eligibility criteria and documentation requirements.',
    },
    {
      id: 8,
      category: 'loans',
      question: 'What are the interest rates?',
      answer:
        'Interest rates vary based on loan type, amount, tenure, and your credit profile. Personal loans start from 10.99% p.a., home loans from 8.50% p.a., and business loans from 12% p.a. Better credit scores qualify for lower rates.',
    },

    // Documents Questions
    {
      id: 9,
      category: 'documents',
      question: 'What documents do I need for loan application?',
      answer:
        'Required documents include: PAN Card, Aadhaar Card, Address Proof (Utility bills/Rental agreement), Income Proof (Salary slips/Bank statements), Employment Proof, and Photographs. Additional documents may be required based on loan type.',
    },
    {
      id: 10,
      category: 'documents',
      question: 'Can I apply with digital documents?',
      answer:
        'Yes, we accept digital copies of all required documents. You can upload scanned copies or clear photos of your documents during the application process. Original documents may be required for verification at a later stage.',
    },
    {
      id: 11,
      category: 'documents',
      question: 'How secure is my personal information?',
      answer:
        'We use bank-level encryption (256-bit SSL) to protect your data. All personal and financial information is encrypted and stored securely. We comply with RBI guidelines and data protection regulations. Your information is never shared without consent.',
    },

    // Payments & Charges Questions
    {
      id: 12,
      category: 'payments',
      question: 'What are the processing fees and charges?',
      answer:
        'Processing fees range from 1-3% of the loan amount depending on the loan type. Other charges include: Documentation charges (₹500-1000), EMI bounce charges (₹500), and late payment fees (2% per month). All charges are clearly disclosed upfront.',
    },
    {
      id: 13,
      category: 'payments',
      question: 'Can I prepay my loan?',
      answer:
        'Yes, you can prepay your loan after 6 months of disbursement. Prepayment charges are 2-4% of the outstanding amount depending on the loan type and tenure. Early prepayment helps save on interest costs.',
    },
    {
      id: 14,
      category: 'payments',
      question: 'What happens if I miss an EMI payment?',
      answer:
        'Missing EMI payments affects your credit score and incurs late payment charges. We send reminders before due dates. If you face financial difficulties, contact us immediately to discuss restructuring options. Consistent defaults may lead to legal action.',
    },
    {
      id: 15,
      category: 'payments',
      question: 'How can I pay my EMIs?',
      answer:
        'You can pay EMIs through: Auto-debit from your bank account, NEFT/RTGS transfers, UPI payments, or visiting our branches. We recommend setting up auto-debit to avoid missing payments and maintain a good credit score.',
    },

    // Technical Support Questions
    {
      id: 16,
      category: 'technical',
      question: 'I forgot my login password. How can I reset it?',
      answer:
        'Click on "Forgot Password" on the login page. Enter your registered email or phone number. You\'ll receive an OTP to verify your identity. Create a new password and you\'ll be able to access your account immediately.',
    },
    {
      id: 17,
      category: 'technical',
      question: 'The app is not working properly. What should I do?',
      answer:
        'Try these steps: Clear app cache and data, update to the latest version, restart your device, check internet connection. If issues persist, contact our technical support at support@borrowww.com or call +91 9560069525.',
    },
    {
      id: 18,
      category: 'technical',
      question: 'How do I update my contact information?',
      answer:
        "Log into your account, go to Profile Settings, and update your contact details. You'll need to verify the new information through OTP. Updated information will be reflected within 24 hours.",
    },
  ];

  const filteredFAQs = faqData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Hero Section - Updated to match LAP style */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-[var(--primary-blue-light)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center px-4 py-2 bg-[var(--primary-blue)]/10 text-[var(--primary-blue)] rounded-full text-sm font-medium mb-6">
              <FaSearch className="mr-2" />
              Frequently Asked Questions
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-gray-900 mb-6 tracking-tighter">
              Frequently Asked{' '}
              <span className="text-[var(--primary-blue)] italic tiemposfine">Questions</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Find answers to common questions about our services, loan processes, and CIBIL score
              checking.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Categories - Updated */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-transparent transition-colors duration-200"
              />
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-[var(--primary-blue)] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section - Updated */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {filteredFAQs.length > 0 ? (
              <motion.div
                key={`${activeCategory}-${searchTerm}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {filteredFAQs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                      <motion.div
                        animate={{ rotate: openItems.has(faq.id) ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FaChevronDown className="text-gray-400 flex-shrink-0" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {openItems.has(faq.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-4">
                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No questions found</h3>
                <p className="text-gray-600">
                  Try adjusting your search terms or browse all categories.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Quick Contact - Updated */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Still Have Questions?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Our support team is here to help you 24/7. Get in touch with us for personalized
              assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="tel:+919560069525"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-3 bg-[var(--primary-blue)] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[var(--primary-blue-dark)] transition-colors duration-200"
              >
                <FaPhone />
                Call Support
              </motion.a>
              <motion.a
                href="https://wa.me/919560069525"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-3 border-2 border-[var(--primary-blue)] text-[var(--primary-blue)] px-8 py-3 rounded-xl font-semibold hover:bg-[var(--primary-blue)] hover:text-white transition-colors duration-200"
              >
                <FaWhatsapp />
                WhatsApp Support
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Popular Topics - Updated */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Popular Topics</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quick access to the most commonly asked questions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'CIBIL Score Guide',
                description:
                  'Everything you need to know about checking and improving your credit score',
                questions: 8,
                icon: '📊',
              },
              {
                title: 'Loan Application Process',
                description: 'Step-by-step guide to applying for loans and getting quick approval',
                questions: 12,
                icon: '📝',
              },
              {
                title: 'Documentation Help',
                description: 'Complete list of documents required for different types of loans',
                questions: 6,
                icon: '📋',
              },
            ].map((topic, index) => (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{topic.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{topic.title}</h3>
                <p className="text-gray-600 mb-4">{topic.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{topic.questions} questions</span>
                  <button
                    onClick={() => {
                      setActiveCategory('all');
                      setSearchTerm(topic.title.split(' ')[0]);
                    }}
                    className="text-[var(--primary-blue)] hover:text-[var(--primary-blue-dark)] font-medium text-sm"
                  >
                    View Questions →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
