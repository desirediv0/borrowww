'use client';

import { useState } from 'react';

import { IconPlus } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'How sending a bank transfer',
      answer:
        'You can send bank transfers easily through our secure platform. Simply select the recipient, enter the amount, and confirm the transaction. All transfers are processed with bank-level security.',
    },
    {
      question: 'What is the scheduled payments feature?',
      answer:
        'The scheduled payments feature allows you to manage all of your subscriptions or recurring payments in one place. This way, you can view details for every payment, which include the amount, frequency, payment dates etc.',
    },
    {
      question: 'How can I reactivate a terminated card?',
      answer:
        'To reactivate a terminated card, please contact our customer support team through the app or website. They will guide you through the verification process and help restore your card access.',
    },
    {
      question: 'How about with a refund?',
      answer:
        'Refunds are processed automatically for eligible transactions. For manual refund requests, please submit a ticket through our support system with transaction details, and we will process it within 3-5 business days.',
    },
    {
      question: 'How can add money to my account?',
      answer:
        'You can add money to your account through bank transfer, debit card, or by connecting your existing bank account. All funding methods are secure and typically process within minutes.',
    },
  ];

  return (
    <section id="faq" className="py-20 bg-white">
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
              className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Frequently asked
              <br />
              questions
            </motion.h2>
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
                  <span className="text-lg font-medium text-gray-900 group-hover:text-blue-500 transition-colors duration-200">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 ml-4"
                  >
                    <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-200">
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
