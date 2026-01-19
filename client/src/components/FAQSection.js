'use client';

import { useState } from 'react';

import { IconPlus } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'How do I check my credit score?',
      answer:
        'You can check your credit score online by submitting basic details like your PAN number and contact information. credit verification is handled securely by credit bureaus.',
    },
    {
      question: 'What documents are required for loan application?',
      answer:
        'Common documents include identity proof (PAN/Aadhaar), address proof, income proof (salary slips/bank statements), and employment or business proof. Required documents may vary based on the bank and loan type.',
    },
    {
      question: 'How long does loan approval take?',
      answer:
        'Loan approval time depends on the bank, documentation, and profile strength. We help speed up your process by matching you with the right lender and assisting with paperwork.',
    },
    {
      question: 'What is the minimum credit score required?',
      answer:
        'A CIBIL score of 750+ is generally considered good. However, some banks may still offer loans at lower scores based on income, stability, and other eligibility factors.',
    },
    {
      question: 'Are there any hidden charges?',
      answer:
        'No. All charges such as processing fees and interest rates are clearly shared upfront by the bank. We maintain complete transparency throughout the process.',
    },
    {
      question: 'Can I apply for multiple loans simultaneously?',
      answer:
        'Yes, you can apply for multiple loan types, but approval depends on your income, credit profile, and existing liabilities. We recommend checking eligibility first to avoid impact on credit score.',
    },
  ];

  return (
    <section id="faq" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Side - Title */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-2xl md:text-4xl lg:text-5xl font-medium text-gray-900 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Frequently asked
              <br />
              questions
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 mt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Get answers to common questions about credit score checking and loan applications
            </motion.p>
          </motion.div>

          {/* Right Side - FAQ Items */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="border-b border-gray-200 last:border-b-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <motion.button
                  className="w-full py-6 flex items-center justify-between text-left group"
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <span className="text-lg font-medium text-gray-900 group-hover:text-[#2D3E50] transition-colors duration-200">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 ml-4"
                  >
                    <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-[#2D3E50] group-hover:bg-[#2D3E50] group-hover:text-white transition-all duration-200">
                      <IconPlus className="w-4 h-4" />
                    </div>
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        className="pb-6 pr-12"
                        initial={{ y: -10 }}
                        animate={{ y: 0 }}
                        exit={{ y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
