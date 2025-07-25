'use client';

import { useState } from 'react';

import { motion } from 'framer-motion';
import { CheckCircle, CreditCard, Shield, Zap } from 'lucide-react';
import { toast } from 'sonner';

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    toast.success('CIBIL score checked successfully!', {
      style: { background: '#22c55e', color: 'white' },
    });
  };

  const features = [
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get your CIBIL score within minutes, not days',
      color: 'text-blue-600',
    },
    {
      icon: Shield,
      title: '100% Secure',
      description: 'Bank-level security to protect your data',
      color: 'text-blue-600',
    },
    {
      icon: CheckCircle,
      title: 'Free Check',
      description: 'No charges for checking your CIBIL score',
      color: 'text-purple-600',
    },
    {
      icon: CreditCard,
      title: 'Detailed Report',
      description: 'Complete credit report with analysis',
      color: 'text-orange-600',
    },
  ];

  return (
    <section id="cibil-check" className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-black mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Check Your CIBIL Score
          </motion.h2>
          <motion.p
            className="text-xl text-gray-800 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Get your credit score instantly and understand your creditworthiness. Free CIBIL score
            check with detailed credit report analysis.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-md rounded overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
                <CardTitle className="text-2xl">Free CIBIL Score Check</CardTitle>
                <CardDescription className="text-blue-100">
                  Enter your details to get your credit score instantly
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="relative">
                    <Label htmlFor="fullName" className="text-base font-semibold text-blue-800">
                      Full Name
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="pl-14 p-3 border-2 border-blue-100 focus:border-blue-500 rounded-xl bg-white shadow-sm placeholder:text-gray-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <Label htmlFor="panNumber" className="text-base font-semibold text-blue-800">
                      PAN Number
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="panNumber"
                        name="panNumber"
                        type="text"
                        value={formData.panNumber}
                        onChange={handleInputChange}
                        placeholder="ABCDE1234F"
                        className="pl-14 p-3 border-2 border-blue-100 focus:border-blue-500 rounded-xl bg-white shadow-sm placeholder:text-gray-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <Label
                      htmlFor="aadhaarNumber"
                      className="text-base font-semibold text-blue-800"
                    >
                      Aadhaar Number
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="aadhaarNumber"
                        name="aadhaarNumber"
                        type="text"
                        value={formData.aadhaarNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012"
                        className="pl-14 p-3 border-2 border-blue-100 focus:border-blue-500 rounded-xl bg-white shadow-sm placeholder:text-gray-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <Label htmlFor="mobileNumber" className="text-base font-semibold text-blue-800">
                      Mobile Number
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="mobileNumber"
                        name="mobileNumber"
                        type="tel"
                        value={formData.mobileNumber}
                        onChange={handleInputChange}
                        placeholder="98765 43210"
                        className="pl-14 p-3 border-2 border-blue-100 focus:border-blue-500 rounded-xl bg-white shadow-sm placeholder:text-gray-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <Label htmlFor="email" className="text-base font-semibold text-blue-800">
                      Email Address
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className="pl-14 p-3 border-2 border-blue-100 focus:border-blue-500 rounded-xl bg-white shadow-sm placeholder:text-gray-500"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 text-lg font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Check CIBIL Score Now
                  </Button>
                </form>

                <p className="text-xs text-blue-600 mt-4 text-center">
                  By submitting this form, you agree to our Terms of Service and Privacy Policy
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Side - Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg border border-blue-100 hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.03, y: -2 }}
              >
                <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black mb-1">{feature.title}</h3>
                  <p className="text-gray-700 text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}

            {/* Additional Info Card */}
            <motion.div
              className="bg-blue-50 border-2 border-blue-600 text-black p-6 rounded-2xl flex items-start gap-4 shadow-lg md:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <CheckCircle className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">Why Check CIBIL Score?</h3>
                <ul className="space-y-2 text-gray-700 text-base">
                  <li>• Understand your creditworthiness</li>
                  <li>• Improve loan approval chances</li>
                  <li>• Get better interest rates</li>
                  <li>• Monitor your credit health</li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
