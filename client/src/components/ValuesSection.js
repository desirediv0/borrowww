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
      title: 'Transparency',
      description:
        'A departure from the industry norm of ambiguity, Montfort, as a public and finest company.',
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
      title: 'Creative expansion',
      description:
        'Ascone proprietary fintech platform helps our subsidiaries locate and manage investments.',
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
      title: 'Private Credit Investments',
      description:
        'We provide access to unique private credit investments; a rare but valuable part of a sound investment portfolio.',
      bgColor: 'bg-[#f5f2e8]',
      textColor: 'text-gray-900',
    },
  ];

  return (
    <section id="values" className="py-20 bg-gray-50">
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
              Make your spend,
              <br />
              Well-spent
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
              Manages a diversified group of specialized private credit brands with efficient
              tech-enabled processes.
            </motion.p>
          </motion.div>
        </div>

        {/* Values Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              className={`${value.bgColor} rounded-3xl p-8 border border-gray-200 relative overflow-hidden group cursor-pointer`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              }}
            >
              {/* Icon */}
              <motion.div
                className={`${value.textColor} mb-8`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{
                  rotate: [0, -10, 10, 0],
                  transition: { duration: 0.5 },
                }}
              >
                {value.icon}
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <h3 className={`text-2xl font-bold ${value.textColor} mb-4`}>{value.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-8">{value.description}</p>
              </motion.div>

              {/* Arrow Button */}
              <motion.div
                className="absolute bottom-8 right-8"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <motion.button
                  className={`w-12 h-12 rounded-full border-2 ${
                    index === 2
                      ? 'border-blue-500 bg-blue-500 text-white'
                      : 'border-gray-300 text-gray-400 group-hover:border-blue-500 group-hover:text-blue-500'
                  } flex items-center justify-center transition-all duration-300`}
                  whileHover={{
                    scale: 1.1,
                    rotate: 45,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>

              {/* Background decoration */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 bg-gray-200 rounded-full opacity-20"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
