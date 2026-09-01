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
    {
      id: 1,
      category: 'cibil',
      question: 'What is a CIBIL score and why is it important?',
      answer:
        'A CIBIL score is a 3-digit credit score ranging from 300-900. It reflects your repayment history and credit behaviour. A higher score increases your chances of getting better loan offers and lower interest rates.',
    },
    {
      id: 2,
      category: 'cibil',
      question: 'How can I check my CIBIL score?',
      answer:
        'You can check your CIBIL score on official credit bureau websites like CIBIL, Experian, and CRIF by providing your basic details such as PAN and phone number. These platforms allow secure access to your credit report.',
    },
    {
      id: 3,
      category: 'cibil',
      question: 'What factors affect my CIBIL score?',
      answer:
        'Your CIBIL score is influenced by repayment history, credit utilization, length of credit history, number of active loans, and new credit inquiries. Timely payments and low utilization help maintain a strong score.',
    },
    {
      id: 4,
      category: 'cibil',
      question: 'How long does it take to improve a CIBIL score?',
      answer:
        'Improvement depends on your financial habits. With timely payments and disciplined credit usage, noticeable improvement can be seen in 3–6 months, while a major improvement may take longer.',
    },

    // Loan Process Questions
    {
      id: 5,
      category: 'loans',
      question: 'How long does loan approval take?',
      answer:
        'Approval time varies from bank to bank based on documentation and eligibility. We help you fast-track the process by matching your profile with the right lender and assisting with paperwork.',
    },
    {
      id: 6,
      category: 'loans',
      question: 'What are the minimum requirements for loan approval?',
      answer:
        'General requirements include: Age 21–65 years, Indian resident, minimum income based on loan type, and a CIBIL score of 600+. Approval also depends on income stability and existing loans.',
    },
    {
      id: 7,
      category: 'loans',
      question: 'What types of loans can I apply for?',
      answer:
        'You can apply for home loans, personal loans, business loans, and loan-against-property. Each product has different eligibility criteria and documentation requirements based on bank policies.',
    },
    {
      id: 8,
      category: 'loans',
      question: 'What are the interest rates?',
      answer:
        'Interest rates depend on the bank, loan category, profile strength, and credit score. Higher credit scores generally qualify for better rates. We help you compare options from multiple lenders.',
    },

    // Documents Questions
    {
      id: 9,
      category: 'documents',
      question: 'What documents are required for loan application?',
      answer:
        'Generally required documents include ID proof (PAN/Aadhaar), address proof, income proof (salary slips/bank statements), and employment or business proof. Requirements may vary depending on the bank.',
    },
    {
      id: 10,
      category: 'documents',
      question: 'Can I submit digital documents?',
      answer:
        'Yes, most banks accept scanned copies or clear digital photos during the initial process. Original documents may be required later for verification.',
    },
    {
      id: 11,
      category: 'documents',
      question: 'Is my data secure?',
      answer:
        'We follow strict data security measures with encrypted handling of personal information. Your information is not shared with any lender without your consent.',
    },

    // Payments & Charges Questions
    {
      id: 12,
      category: 'payments',
      question: 'Are there any charges?',
      answer:
        'Banks may charge processing fees, documentation charges, or other applicable costs. All charges are disclosed upfront by the bank. We maintain complete transparency throughout the process.',
    },
    {
      id: 13,
      category: 'payments',
      question: 'Can I prepay my loan?',
      answer:
        'Most banks allow prepayment after a specific tenure. Charges depend on the lender and loan type. Prepayment can help reduce interest costs significantly.',
    },
    {
      id: 14,
      category: 'payments',
      question: 'What happens if I miss an EMI?',
      answer:
        'Missing EMIs may affect your credit score and incur penalty charges from the bank. If facing difficulties, it is best to contact your lender to explore restructuring or repayment options.',
    },
    {
      id: 15,
      category: 'payments',
      question: 'How can I pay my EMIs?',
      answer:
        'Most banks offer multiple payment modes such as auto-debit, net banking, UPI, or branch payments. Auto-debit is recommended to avoid missed payments and maintain a healthy credit score.',
    },

    // Technical Support Questions
    {
      id: 16,
      category: 'technical',
      question: 'I forgot my login password. What should I do?',
      answer:
        'Select “Forgot Password” on the login page, verify with your registered phone number or email, and reset your password through OTP verification.',
    },
    {
      id: 17,
      category: 'technical',
      question: 'How do I get technical support?',
      answer:
        'You can contact us through our support email or request assistance through our help section. Our team will guide you step-by-step.',
    },
    {
      id: 18,
      category: 'technical',
      question: 'How do I update my details?',
      answer:
        'Login to your profile, update the required information, and verify changes via OTP. Updated details will reflect after completion of verification.',
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
            <h2 className="text-3xl font-medium text-gray-900 mb-6">Still Have Questions?</h2>
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
            <h2 className="text-3xl font-medium text-gray-900 mb-6">Popular Topics</h2>
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
