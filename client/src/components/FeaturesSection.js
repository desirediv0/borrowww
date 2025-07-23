'use client';

import { motion } from 'framer-motion';
import { IconArrowUp, IconSparkles } from '@tabler/icons-react';

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="text-[#2d5a4a] font-medium text-sm tracking-wide uppercase mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            FEATURES
          </motion.p>
          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-gray-900 max-w-4xl mx-auto leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            One app for all your
            <br />
            money things
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Remove all the friction that stands in the way of your money
            goals.
          </motion.p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Grow Savings Card */}
          <motion.div
            className="bg-[#2d5a4a] rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.h3
              className="text-3xl lg:text-4xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Grow savings
              <br />
              faster
            </motion.h3>

            <div className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <motion.h4
                  className="text-2xl font-bold mb-2"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  $12,000
                </motion.h4>
              </motion.div>

              <motion.div
                className="w-16 h-16 flex items-center justify-center"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <IconArrowUp className="w-8 h-8 text-white" strokeWidth={3} />
              </motion.div>
            </div>

            {/* Background decoration */}
            <motion.div
              className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>

          {/* Send Across Global Card */}
          <motion.div
            className="bg-gray-100 rounded-3xl p-8 lg:p-12 relative overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.h3
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Send across the global
            </motion.h3>

            {/* Money Stack Image Placeholder */}
            <motion.div
              className="w-32 h-24 bg-gray-300 rounded-lg mb-6 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-green-200 to-green-300"
                animate={{
                  background: [
                    "linear-gradient(45deg, #bbf7d0, #86efac)",
                    "linear-gradient(45deg, #86efac, #4ade80)",
                    "linear-gradient(45deg, #bbf7d0, #86efac)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <motion.h4
                  className="text-xl font-bold text-gray-900"
                  animate={{
                    color: ["#111827", "#059669", "#111827"]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                >
                  $25,000
                </motion.h4>
                <p className="text-gray-600 text-sm">Sent btw!</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="bg-[#2d5a4a] text-white px-4 py-2 rounded-lg">
                  <motion.h4
                    className="font-bold"
                    animate={{
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity
                    }}
                  >
                    $40,000
                  </motion.h4>
                  <p className="text-xs text-white/80">Thanks Chris!</p>
                </div>

                <motion.div
                  className="w-10 h-10 bg-gray-300 rounded-full"
                  animate={{
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>
            </motion.div>

            {/* Background decoration */}
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 bg-[#f5f2e8] rounded-full opacity-50"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, -180, -360]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}