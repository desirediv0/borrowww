'use client';

import { motion } from 'framer-motion';
import { IconStar, IconArrowUp, IconSparkles } from '@tabler/icons-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-20 right-10 w-32 h-32 bg-[#f5f2e8] rounded-full opacity-60"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-10 w-24 h-24 bg-[#e8f5f0] rounded-full opacity-40"
          animate={{ 
            y: [0, -20, 0],
            x: [0, 10, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.p 
                className="text-[#2d5a4a] font-medium text-sm tracking-wide uppercase mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                TRY IT NOW!
              </motion.p>
              
              <motion.h1 
                className="text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Change the way
                <br />
                you use your
                <br />
                <span className="italic text-[#2d5a4a]">money</span>
              </motion.h1>
            </motion.div>

            <motion.p 
              className="text-lg text-gray-600 leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              From your everyday spending, to planning for your future
              with savings and investments, Ascone helps you get
              more from your money.
            </motion.p>

            <motion.div 
              className="flex items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <motion.button 
                className="bg-[#2d5a4a] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#234139] transition-all duration-300 shadow-lg"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(45, 90, 74, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Now
              </motion.button>

              <div className="flex items-center gap-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                    >
                      <IconStar className="w-5 h-5 text-yellow-400 fill-current" />
                    </motion.div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-semibold">5.0</span>
                  <br />
                  <span className="text-gray-500">from 120+ <u>reviews</u></span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Visual Elements */}
          <div className="relative">
            <motion.div 
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {/* Phone Card */}
              <motion.div 
                className="bg-gray-200 rounded-2xl p-6 relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-white rounded-xl p-4 shadow-lg">
                  <div className="w-full h-32 bg-gray-100 rounded-lg mb-4 relative overflow-hidden">
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200"
                      animate={{ 
                        background: [
                          "linear-gradient(45deg, #dbeafe, #bfdbfe)",
                          "linear-gradient(45deg, #bfdbfe, #93c5fd)",
                          "linear-gradient(45deg, #dbeafe, #bfdbfe)"
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </motion.div>

              {/* Currencies Card */}
              <motion.div 
                className="bg-[#f5f2e8] rounded-2xl p-6 flex flex-col justify-between"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div>
                  <motion.h3 
                    className="text-3xl font-bold text-gray-900 mb-1"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    56+
                  </motion.h3>
                  <p className="text-gray-600 text-sm">Currencies</p>
                </div>
                <motion.div 
                  className="w-12 h-12 border-2 border-gray-400 rounded-full flex items-center justify-center mt-4"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-8 h-8 border border-gray-400 rounded-full"></div>
                </motion.div>
              </motion.div>

              {/* Sparkles Card */}
              <motion.div 
                className="bg-gray-200 rounded-2xl p-6 flex items-center justify-center relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 180, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <IconSparkles className="w-12 h-12 text-gray-600" />
                </motion.div>
                <div className="absolute bottom-4 left-4">
                  <p className="text-sm text-gray-600">Users Active</p>
                  <div className="flex -space-x-2 mt-2">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-8 h-8 bg-gray-400 rounded-full border-2 border-white"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Savings Card */}
              <motion.div 
                className="bg-[#2d5a4a] rounded-2xl p-6 text-white relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.h3 
                  className="text-2xl font-bold mb-1"
                  animate={{ 
                    textShadow: [
                      "0 0 0px rgba(255,255,255,0)",
                      "0 0 10px rgba(255,255,255,0.3)",
                      "0 0 0px rgba(255,255,255,0)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  $196,000
                  <IconArrowUp className="inline w-5 h-5 ml-1" />
                </motion.h3>
                <p className="text-white/80 text-sm mb-4">Saving</p>
                
                {/* Chart Line */}
                <motion.svg 
                  className="w-full h-12" 
                  viewBox="0 0 100 30"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 1 }}
                >
                  <motion.path
                    d="M0,25 Q25,15 50,20 T100,5"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  />
                </motion.svg>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Partner Logos */}
      <motion.div 
        className="border-t bg-white py-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60">
            {['OpenAI', 'Raycast', 'zenefits', 'loom'].map((logo, index) => (
              <motion.div
                key={logo}
                className="text-2xl font-bold text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.1, opacity: 0.8 }}
              >
                {logo}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}