'use client';

import { useState } from 'react';

import { motion } from 'framer-motion';
import {
  ArrowUp,
  CheckCircle,
  CreditCard,
  FileText,
  Shield,
  Smartphone,
  Star,
  TrendingUp,
  User,
  Zap,
} from 'lucide-react';

import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function CibilCheckSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    panNumber: '',
    aadhaarNumber: '',
    mobileNumber: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('CIBIL Check Form Data:', formData);
  };

  const features = [
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get your CIBIL score within minutes, not days',
    },
    {
      icon: Shield,
      title: '100% Secure',
      description: 'Bank-grade encryption protects your data',
    },
    {
      icon: TrendingUp,
      title: 'Score Analysis',
      description: 'Detailed breakdown of your credit factors',
    },
    {
      icon: CreditCard,
      title: 'Free Report',
      description: 'Complete credit report with no hidden charges',
    },
  ];

  return (
    <section
      id="cibil-check"
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden"
    >
      {/* Luxury Background Elements */}

      {/* Geometric Shapes */}
      <motion.div
        className="absolute top-10 left-20 w-32 h-32 border border-blue-200/30 rounded-full"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <motion.div
        className="absolute top-20 right-10 w-20 h-20 border border-blue-300/20 rounded-lg"
        animate={{
          rotate: [0, -360],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
          delay: 5,
        }}
      />

      <motion.div
        className="absolute bottom-20 left-10 w-16 h-16 border border-blue-400/25 rounded-full"
        animate={{
          rotate: [0, 360],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Elegant Lines */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-40 h-px bg-gradient-to-r from-transparent via-blue-300/30 to-transparent"
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/4 w-32 h-px bg-gradient-to-r from-transparent via-blue-400/25 to-transparent"
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 0.4, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
      />

      {/* Subtle Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400 rounded-full"
          style={{
            top: `${20 + i * 12}%`,
            left: `${15 + i * 15}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Floating Icons with Luxury Feel */}
      <motion.div
        className="absolute top-20 left-24 text-blue-200/30"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <CreditCard className="w-16 h-16" />
      </motion.div>

      <motion.div
        className="absolute top-40 right-20 text-blue-200/25"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      >
        <Shield className="w-12 h-12" />
      </motion.div>

      <motion.div
        className="absolute bottom-40 left-20 text-blue-200/30"
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      >
        <TrendingUp className="w-14 h-14" />
      </motion.div>

      {/* Professional Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <CreditCard className="w-4 h-4" />
            </motion.div>
            CIBIL Score Check
          </motion.div>

          <motion.h2
            className="text-4xl lg:text-5xl font-medium text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Check Your CIBIL Score
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Get your credit score instantly and understand your creditworthiness. Free CIBIL score
            check with detailed credit report analysis.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <Card className="shadow-2xl border-0 bg-white overflow-hidden rounded-3xl relative">
              {/* Animated Credit Score Visualization */}
              <div className="absolute top-4 right-4 w-24 h-24">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="8"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: '0 251.2' }}
                    animate={{ strokeDasharray: '188.4 251.2' }}
                    transition={{ duration: 2, delay: 1 }}
                  />
                  <motion.text
                    x="50"
                    y="45"
                    textAnchor="middle"
                    className="text-xs font-medium fill-gray-100"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                  >
                    750+
                  </motion.text>
                  <motion.text
                    x="50"
                    y="58"
                    textAnchor="middle"
                    className="text-xs fill-gray-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.2 }}
                  >
                    Score
                  </motion.text>
                </svg>
              </div>

              <CardHeader className="bg-gradient-to-r from-[#2D3E50] to-blue-700 text-white p-8">
                <div className="flex items-center gap-3 mb-2">
                  <motion.div
                    className="p-2"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <CreditCard className="w-6 h-6" />
                  </motion.div>
                  <CardTitle className="text-2xl font-medium">Free CIBIL Score Check</CardTitle>
                </div>
                <CardDescription className="text-blue-100 text-lg">
                  Enter your details to get your credit score instantly
                </CardDescription>
              </CardHeader>

              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="fullName"
                      className="text-base font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        <User className="w-4 h-4 text-[#2D3E50]" />
                      </motion.div>
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="p-4 border-2 border-gray-200 focus:border-[#2D3E50] focus:ring-2 focus:ring-blue-200 rounded-xl bg-gray-50 placeholder:text-gray-400 transition-all duration-200"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="panNumber"
                      className="text-base font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        <FileText className="w-4 h-4 text-[#2D3E50]" />
                      </motion.div>
                      PAN Number
                    </Label>
                    <Input
                      id="panNumber"
                      name="panNumber"
                      type="text"
                      value={formData.panNumber}
                      onChange={handleInputChange}
                      placeholder="ABCDE1234F"
                      className="p-4 border-2 border-gray-200 focus:border-[#2D3E50] focus:ring-2 focus:ring-blue-200 rounded-xl bg-gray-50 placeholder:text-gray-400 transition-all duration-200 uppercase tracking-widest"
                      required
                      maxLength={10}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="aadhaarNumber"
                      className="text-base font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        <Shield className="w-4 h-4 text-[#2D3E50]" />
                      </motion.div>
                      Aadhaar Number
                    </Label>
                    <Input
                      id="aadhaarNumber"
                      name="aadhaarNumber"
                      type="text"
                      value={formData.aadhaarNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012"
                      className="p-4 border-2 border-gray-200 focus:border-[#2D3E50] focus:ring-2 focus:ring-blue-200 rounded-xl bg-gray-50 placeholder:text-gray-400 transition-all duration-200 tracking-widest"
                      required
                      maxLength={14}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="mobileNumber"
                      className="text-base font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        <Smartphone className="w-4 h-4 text-[#2D3E50]" />
                      </motion.div>
                      Mobile Number
                    </Label>
                    <Input
                      id="mobileNumber"
                      name="mobileNumber"
                      type="tel"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      placeholder="98765 43210"
                      className="p-4 border-2 border-gray-200 focus:border-[#2D3E50] focus:ring-2 focus:ring-blue-200 rounded-xl bg-gray-50 placeholder:text-gray-400 transition-all duration-200"
                      required
                      maxLength={11}
                    />
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#2D3E50] to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 text-lg font-medium rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                    >
                      Check CIBIL Score Now
                    </Button>
                  </motion.div>
                </form>

                <p className="text-sm text-gray-500 mt-6 text-center">
                  By submitting this form, you agree to our{' '}
                  <a href="#" className="text-[#2D3E50] hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-[#2D3E50] hover:underline">
                    Privacy Policy
                  </a>
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Side - Features & Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 space-y-8"
          >
            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="group p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  {/* Animated background pattern */}
                  <motion.div
                    className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-full opacity-50"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.3, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  />

                  <div className="flex items-start gap-4 relative z-10">
                    <motion.div
                      className="p-3 rounded-xl bg-blue-50 text-[#2D3E50] group-hover:bg-blue-100 transition-colors"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className="w-6 h-6" />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Why Check CIBIL Score Card */}
            <motion.div
              className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-8 rounded-3xl relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              {/* Animated stars */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-yellow-400 opacity-30"
                  style={{
                    top: `${20 + i * 15}%`,
                    left: `${10 + i * 20}%`,
                  }}
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                >
                  <Star className="w-4 h-4" />
                </motion.div>
              ))}

              <div className="flex items-start gap-4 relative z-10">
                <motion.div
                  className="p-3 bg-[#2D3E50] rounded-xl"
                  animate={{
                    y: [0, -5, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <CheckCircle className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-medium text-gray-900 mb-4">
                    Why Check CIBIL Score?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      'Understand your creditworthiness',
                      'Improve loan approval chances',
                      'Get better interest rates',
                      'Monitor your credit health',
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                      >
                        <motion.div
                          className="w-2 h-2 bg-[#2D3E50] rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.3,
                          }}
                        />
                        <span className="text-gray-700">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats Card with Animated Numbers */}
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
            >
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { value: '10M+', label: 'Users Trusted', icon: ArrowUp },
                  { value: '99.9%', label: 'Accuracy Rate', icon: CheckCircle },
                  { value: '24/7', label: 'Support Available', icon: Zap },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 + index * 0.2 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className="text-2xl font-medium text-[#2D3E50] mb-1 flex items-center justify-center gap-1"
                      animate={{
                        y: [0, -2, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                    >
                      {stat.value}
                      <stat.icon className="w-4 h-4" />
                    </motion.div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
