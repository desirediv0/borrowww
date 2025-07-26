'use client';

import { IconArrowRight } from '@tabler/icons-react';
import { motion } from 'framer-motion';

export default function ValuesSection() {
  const values = [
    {
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="36" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="12" cy="36" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="36" cy="36" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      ),
      title: 'Transparent Process',
      description:
        'Complete transparency in CIBIL score checking and loan processing. No hidden charges, clear terms, and honest communication throughout your journey.',
      bgColor: 'bg-white',
      textColor: 'text-gray-900',
    },
    {
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
          <rect
            x="8"
            y="8"
            width="16"
            height="16"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <rect
            x="24"
            y="24"
            width="16"
            height="16"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <path d="M16 24L24 16" stroke="currentColor" strokeWidth="2" />
          <path d="M32 8L40 16" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      title: 'Instant Approval',
      description:
        'Get your CIBIL score checked instantly and receive loan approval within 24 hours. Our advanced technology ensures quick processing and faster disbursals.',
      bgColor: 'bg-white',
      textColor: 'text-gray-900',
    },
    {
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="24" cy="24" r="3" fill="currentColor" />
        </svg>
      ),
      title: 'Competitive Rates',
      description:
        'Access to the best loan rates starting from 8.5% with flexible repayment options. We partner with leading banks to offer you the most competitive terms.',
      bgColor: 'bg-[#f5f2e8]',
      textColor: 'text-gray-900',
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
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
              Why Choose
              <br />
              Borrowww?
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.p
              className="text-lg text-gray-600 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              We are India&apos;s leading CIBIL score checking and loan provider platform, helping
              millions of customers achieve their financial goals with ease and transparency.
            </motion.p>
          </motion.div>
        </div>

        {/* Values Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              className={`relative overflow-hidden shadow-lg cursor-pointer group border-2 border-blue-100 hover:bg-blue-50 hover:border-blue-50  ${index===1 ? 'hover:rounded-br-[80px]' : 'hover:rounded-tr-[80px]'} duration-300 ease-in-out`}
              // style={{ borderTopRightRadius: '180px', borderRadius: '32px' }}
              initial={{ scale: 1 }}
              // whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Curved background element that appears on hover */}
              <motion.div
                className="absolute inset-0 z-0"
                initial={{
                  clipPath: 'ellipse(0% 0% at 100% 0%)',
                  backgroundColor: '#e0f2fe',
                }}
                whileHover={{
                  clipPath: 'ellipse(120% 80% at 100% 0%)',
                }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ borderTopRightRadius: '180px', borderRadius: '32px' }}
              />

              <div className="relative z-10 p-10 md:p-12 flex flex-col h-full justify-between">
                {/* Icon with smooth transitions */}
                <motion.div
                  className="mb-8"
                  initial={{ scale: 1, rotate: 0 }}
                  whileHover={{ scale: 1.13, rotate: 8 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  <div className="w-16 h-16 flex items-center justify-center text-gray-700">
                    {value?.icon}
                  </div>
                </motion.div>

                {/* Title with subtle animation */}
                <motion.h3
                  className="text-2xl font-semibold text-gray-900 mb-4"
                  initial={{ y: 0 }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  {value?.title || 'Transparency'}
                </motion.h3>

                {/* Description */}
                <motion.p
                  className="text-gray-600 leading-relaxed mb-8"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  {value?.description ||
                    'A departure from the industry norm of ambiguity, Montfort, as a public and finest company.'}
                </motion.p>

                {/* Arrow button with smooth transitions */}
                <motion.div
                  className="flex items-center justify-start"
                  initial={{ x: 0 }}
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  <motion.div
                    className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                    initial={{
                      backgroundColor: '#2158DE',
                      color: '#ffffff',
                      scale: 1,
                    }}
                    whileHover={{
                      backgroundColor: '#1a332e',
                      color: '#ffffff',
                      scale: 1.12,
                    }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                  >
                    <IconArrowRight className='-rotate-45' />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
