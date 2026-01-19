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
        'Complete transparency in credit score checking and loan processing. No hidden charges, clear terms, and honest communication throughout your journey.',
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
      title: 'Smart Bank Choice',
      description:
        'Get guided support to find the right bank faster with minimal paperwork and smart matchmaking — making your loan process quick and effortless.',
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
        'Access to the best loan rates starting from 7.10%* with flexible repayment options. We partner with leading banks to offer you the most competitive terms.',
      bgColor: 'bg-[#f5f2e8]',
      textColor: 'text-gray-900',
    },
  ];

  return (
    <section id="about" className="py-12 bg-white overflow-x-hidden">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-24">
        {/* Section Header */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              className="text-lg text-[#2D3E50] leading-tight mb-3 uppercase font-normal"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Values
            </motion.p>
            <motion.h2
              className="text-2xl md:text-4xl lg:text-5xl font-medium text-gray-900 leading-tight"
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
              We are India&apos;s leading credit score checking and loan provider platform, helping
              millions of customers achieve their financial goals with ease and transparency.
            </motion.p>
          </motion.div>
        </div>

        {/* Values Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              className={`relative overflow-hidden shadow-lg cursor-pointer group border-2 border-blue-100 hover:bg-blue-50 hover:border-blue-50  ${index === 1 ? 'hover:rounded-br-[80px]' : 'hover:rounded-tr-[80px]'} duration-300 ease-in-out`}
              initial={{ scale: 1 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
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

              <div className="relative z-10 p-5 md:p-10 flex flex-col h-full justify-between">
                <motion.div
                  className="mb-8"
                  initial={{ scale: 1, rotate: 0 }}
                  whileHover={{ scale: 1.13, rotate: 8 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  <div className="md:w-16 md:h-16 w-12 h-12 flex items-center justify-center text-gray-700">
                    {value?.icon}
                  </div>
                </motion.div>
                <motion.h3
                  className="text-xl md:text-2xl font-semibold text-gray-900 mb-2 md:mb-4"
                  initial={{ y: 0 }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  {value?.title || 'Transparency'}
                </motion.h3>

                {/* Description */}
                <motion.p
                  className="text-gray-600 leading-relaxed mb-8 text-sm md:text-base"
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
                    className="md:w-14 md:h-14 w-12 h-12 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-br from-[var(--primary-blue-dark)] to-[var(--primary-blue)] cursor-pointer text-white"
                    initial={{
                      scale: 1,
                    }}
                    whileHover={{
                      scale: 1.12,
                    }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                  >
                    <IconArrowRight className="-rotate-45" />
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
