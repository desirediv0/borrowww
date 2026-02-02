'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  FaCalendarAlt,
  FaChartLine,
  FaCheckCircle,
  FaLock,
  FaShieldAlt,
  FaUser,
} from 'react-icons/fa';

import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { isValidIndianNumber } from '@/utils/validation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

function CIBILCheckContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [FormData, setFormData] = useState({
    firstName: '',
    mobileNumber: '',
    consent: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setIsProcessing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check auth and auto-fill from URL params
  useEffect(() => {
    const token = localStorage.getItem('user_token');
    setIsLoggedIn(!!token);

    // Check for data in URL (returned from auth)
    const encodedData = searchParams.get('data');
    if (encodedData) {
      try {
        const decodedData = JSON.parse(atob(encodedData));
        setFormData(prev => ({
          ...prev,
          firstName: decodedData.firstName || '',
          mobileNumber: decodedData.mobileNumber || '',
          consent: decodedData.consent || false,
        }));
        // Clean URL after filling
        window.history.replaceState({}, '', '/credit-check');
      } catch (e) {
        console.error('Failed to decode form data:', e);
      }
    }
  }, [searchParams]);

  const validateBureauForm = () => {
    const newErrors = {};

    // Name validation - only letters and spaces
    if (!FormData.firstName.trim()) {
      newErrors.firstName = 'Please enter your name';
    } else if (!/^[a-zA-Z\s]+$/.test(FormData.firstName.trim())) {
      newErrors.firstName = 'Name should contain only letters';
    }

    // Phone validation - strict Indian number
    if (!FormData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Please enter mobile number';
    } else if (!isValidIndianNumber(FormData.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid mobile number';
    }

    // Consent validation
    if (!FormData.consent) {
      newErrors.consent = 'You must agree to the terms';
    }

    setErrors(newErrors);
    setErrors(newErrors);
    return newErrors;
  };

  const handleInputChange = (field, value) => {
    // Apply regex filters
    let filteredValue = value;
    if (field === 'firstName') {
      filteredValue = value.replace(/[^a-zA-Z\s]/g, '');
    } else if (field === 'mobileNumber') {
      filteredValue = value.replace(/\D/g, '');
    }

    setFormData((prev) => ({ ...prev, [field]: filteredValue }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  // --- ON SUBMIT: SECURE CIBIL CHECK ---
  const handleBureauSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateBureauForm();
    if (Object.keys(formErrors).length > 0) {
      toast.error(Object.values(formErrors)[0]);
      return;
    }

    // Check if user is logged in
    const token = localStorage.getItem('user_token');
    if (!token) {
      // Encode form data and redirect to auth
      const dataToSave = {
        firstName: FormData.firstName,
        mobileNumber: FormData.mobileNumber,
        consent: FormData.consent,
      };
      const encodedData = btoa(JSON.stringify(dataToSave));
      const redirectUrl = `/auth?redirect=${encodeURIComponent('/credit-check')}&data=${encodedData}`;
      toast.info('Please login to continue');
      router.push(redirectUrl);
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // SECURITY: Call encrypted endpoint - data is encrypted on server before saving
      const response = await fetch(`${API_URL}/client/credit-check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: FormData.firstName,
          mobileNumber: FormData.mobileNumber,
          consent: FormData.consent,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsProcessing(true);
        setTimeout(() => {
          setIsProcessing(false);
          toast.success('Thank you! We will process your credit check soon.');
          setFormData({
            firstName: '',
            mobileNumber: '',
            consent: false,
          });
          setErrors({});
        }, 2000);
      } else {
        toast.error(data.error || 'Failed to submit. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const factors = [
    {
      factor: 'Payment History',
      impact: '35%',
      description: 'Timely payment of EMIs and credit card bills',
      icon: FaCheckCircle,
    },
    {
      factor: 'Credit Utilization',
      impact: '30%',
      description: 'How much of your available credit you use',
      icon: FaChartLine,
    },
    {
      factor: 'Credit History Length',
      impact: '15%',
      description: 'How long you have been using credit',
      icon: FaCalendarAlt,
    },
    {
      factor: 'Credit Mix',
      impact: '10%',
      description: 'Types of credit accounts you have',
      icon: FaShieldAlt,
    },
    {
      factor: 'New Credit',
      impact: '10%',
      description: 'Recent credit inquiries and new accounts',
      icon: FaUser,
    },
  ];

  const tips = [
    'Pay all your bills on time, every time',
    'Keep your credit utilization below 30%',
    "Don't close old credit accounts",
    'Limit new credit applications',
    'Monitor your credit report regularly',
    'Dispute any errors in your credit report',
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-[var(--primary-blue-light)] py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 md:mb-12"
          >
            <div className="inline-flex items-center px-4 py-2 bg-[var(--primary-blue)]/10 text-[var(--primary-blue)] rounded-full text-sm font-medium mb-6">
              <FaShieldAlt className="mr-2" />
              Free Credit Check
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 mb-6 tracking-tighter">
              Check Your{' '}
              <span className="text-[var(--primary-blue)] italic tiemposfine">Credit Score</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Get your free credit score instantly. No hidden charges, no credit card required.
              Check your credit health and improve your loan eligibility.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 ">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-6  rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                  <FaLock className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                    Secure Credit Check
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Your data is protected with bank-level security
                  </p>
                </div>
              </div>

              <form onSubmit={handleBureauSubmit} className="space-y-6">
                {/* Simplified Form - Only Essential Fields */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="Enter Your Full Name"
                      value={FormData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      disabled={isSubmitting}
                      className={`rounded-md border border-gray-300 transition-all duration-200 bg-gray-50 focus:bg-white text-black placeholder:text-gray-500 h-12 disabled:opacity-50 disabled:cursor-not-allowed ${errors.firstName ? 'border-red-500' : ''}`}
                    />
                    {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mobileNumber" className="text-sm font-medium">
                      Mobile Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="mobileNumber"
                      placeholder="Enter Your 10-digit Mobile Number"
                      value={FormData.mobileNumber}
                      onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                      disabled={isSubmitting}
                      className={`rounded-md border border-gray-300 transition-all duration-200 bg-gray-50 focus:bg-white text-black placeholder:text-gray-500 h-12 disabled:opacity-50 disabled:cursor-not-allowed ${errors.mobileNumber ? 'border-red-500' : ''}`}
                      type="tel"
                      maxLength="10"
                    />
                    {errors.mobileNumber && (
                      <p className="text-red-500 text-xs">{errors.mobileNumber}</p>
                    )}
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start space-x-3 pt-4">
                    <Checkbox
                      id="consent"
                      checked={FormData.consent}
                      onCheckedChange={(checked) => handleInputChange('consent', checked)}
                      disabled={isSubmitting}
                      className={`mt-1 rounded border-gray-400 data-[state=checked]:bg-[var(--primary-blue)] data-[state=checked]:border-[var(--primary-blue)] disabled:opacity-50 disabled:cursor-not-allowed ${errors.consent ? 'border-red-500' : ''}`}
                    />
                    <div className="space-y-1">
                      <Label
                        htmlFor="consent"
                        className="text-sm leading-relaxed cursor-pointer text-gray-600"
                      >
                        I agree, all information mentioned above is true and I authorize Borrowww to fetch my data.
                      </Label>
                      {errors.consent && <p className="text-red-500 text-xs">{errors.consent}</p>}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto px-12 py-6 bg-[var(--primary-blue)] hover:bg-[var(--primary-blue-dark)] text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          Submitting...
                        </>
                      ) : (
                        'Check My Score'
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Features */}
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
                  Why Check Credit Score?
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-1">
                      <FaCheckCircle className="text-green-600 text-lg" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">Free & Instant</h4>
                      <p className="text-gray-600 text-sm mt-1">
                        Get your score instantly without any charges or hidden fees.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-1">
                      <FaLock className="text-[var(--primary-blue)] text-lg" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">Secure & Private</h4>
                      <p className="text-gray-600 text-sm mt-1">
                        Bank-level encryption protects your personal data.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-1">
                      <FaChartLine className="text-purple-600 text-lg" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">Improve Score</h4>
                      <p className="text-gray-600 text-sm mt-1">
                        Get personalized tips to improve your credit score over time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Score Factors */}
      <section className="py-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-6">
              What Affects Your Credit Score?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Understanding the factors that influence your credit score helps you make better
              financial decisions
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {factors.map((factor, index) => (
              <motion.div
                key={factor.factor}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group h-full"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-6  rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-[var(--primary-blue)] h-full flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                      <factor.icon className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{factor.factor}</h3>
                      <span className="text-[var(--primary-blue)] font-medium text-lg">
                        {factor.impact}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    {factor.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-12  bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-6">
              Tips to Improve Your Credit Score
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Follow these simple steps to boost your credit score and improve your loan eligibility
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {tips.map((tip, index) => (
              <motion.div
                key={tip}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group h-full"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-[var(--primary-blue)]/5 to-white p-6  rounded-3xl border border-[var(--primary-blue)]/10 hover:shadow-lg transition-all duration-300 h-full flex items-center justify-start gap-4"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-full flex items-center justify-center text-white text-sm font-medium shadow-lg shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed font-medium text-sm md:text-base">
                    {tip}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-medium mb-4">
                Ready to Improve Your Credit Score?
              </h3>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
                Get personalized advice and loan offers based on your credit score. Our experts will
                help you find the best deals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/contact')}
                  className="bg-white text-[var(--primary-blue)] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg"
                >
                  Get Free Consultation
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/calculator/home-loan')}
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[var(--primary-blue)] transition-all duration-200"
                >
                  View Loan Offers
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

// Wrap with Suspense for useSearchParams
export default function CIBILCheck() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--primary-blue)]"></div></div>}>
      <CIBILCheckContent />
    </Suspense>
  );
}
