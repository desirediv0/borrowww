'use client';

import { useState } from 'react';

import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarCheck2,
  ClipboardCheck,
  FileCheck2,
  Handshake,
  Home,
  IndianRupee,
  MessageSquareMore,
  Percent,
  Phone,
  ShieldCheck,
  Users,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';
import { isValidIndianNumber } from '@/utils/validation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export default function HomeLoanServicesPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    city: '',
    propertyType: 'Residential',
    loanAmount: '',
    duration: '',
    monthlyIncome: '',
    employmentType: '',
    remarks: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    {
      icon: ClipboardCheck,
      title: 'Free Consultation',
      desc: 'Understanding your needs and suggesting the right loan options.',
    },
    {
      icon: FileCheck2,
      title: 'Document Pickup',
      desc: 'Hassle-free document pickup & verification from your doorstep.',
    },
    {
      icon: Building2,
      title: 'Bank Selection',
      desc: 'Negotiate best rates & terms with multiple banks on your behalf.',
    },
    {
      icon: CalendarCheck2,
      title: 'Quick Approval',
      desc: 'Full support from faster sanction to smooth disbursement.',
    },
  ];

  const features = [
    {
      icon: Percent,
      title: 'Competitive Rates',
      desc: 'Access to the best interest rates available in the market.',
    },
    {
      icon: ShieldCheck,
      title: 'End-to-End Support',
      desc: 'Dedicated assistance from application to disbursement.',
    },
    {
      icon: Handshake,
      title: 'Multiple Banks',
      desc: 'Strong partnerships with top lenders for better offers.',
    },
    {
      icon: BadgeCheck,
      title: 'Zero Hidden Charges',
      desc: 'Transparent process with no surprise fees or charges.',
    },
  ];

  const documents = [
    'KYC: Aadhaar, PAN Card, Passport/Driving License',
    'Income Proof: Salary Slips / ITR / Form-16',
    'Bank Statements: Last 6–12 months',
    'Property Papers: Agreement to Sell, NOC, Chain Documents',
    'Employment Proof / Business Registration',
  ];

  const faqs = [
    {
      q: 'What is the minimum down payment required?',
      a: 'Typically 10–25% of the property value. The exact percentage depends on bank policy and your credit profile.',
    },
    {
      q: 'How long does the processing take?',
      a: 'Usually 5–12 working days. The process is faster with complete documentation and a clear credit profile.',
    },
    {
      q: 'Floating vs Fixed rate — which is better?',
      a: 'Floating rates are commonly preferred for short to medium terms. Fixed rates provide stability. We advise based on your specific needs.',
    },
    {
      q: 'Are there prepayment/foreclosure charges?',
      a: 'Most floating rate home loans have no prepayment charges. Fixed rate loans may have charges. Bank-specific rules apply.',
    },
  ];

  const [errors, setErrors] = useState({});

  // Validation with clear error messages
  const validateForm = () => {
    const newErrors = {};

    // Name validation - only letters and spaces
    if (!form.name.trim()) {
      newErrors.name = 'Please enter your name';
    } else if (!/^[a-zA-Z\s]+$/.test(form.name.trim())) {
      newErrors.name = 'Name should contain only letters';
    }

    // Phone validation - strict Indian number
    if (!form.phone.trim()) {
      newErrors.phone = 'Please enter mobile number';
    } else if (!isValidIndianNumber(form.phone)) {
      newErrors.phone = 'Please enter a valid mobile number';
    }

    // Loan amount validation
    if (form.loanAmount && !/^\d+$/.test(form.loanAmount)) {
      newErrors.loanAmount = 'Enter only numbers';
    }

    // Monthly income validation
    if (form.monthlyIncome && !/^\d+$/.test(form.monthlyIncome)) {
      newErrors.monthlyIncome = 'Enter only numbers';
    }

    setErrors(newErrors);
    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate before submitting
    // Validate before submitting
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      toast.error(Object.values(formErrors)[0]);
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // SECURITY: Call encrypted endpoint - data is encrypted on server before saving
      const response = await fetch(`${API_URL}/client/home-loan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Thank you! Our expert will call you soon.');
        setForm({
          name: '',
          phone: '',
          city: '',
          propertyType: 'Residential',
          loanAmount: '',
          duration: '',
          monthlyIncome: '',
          employmentType: '',
          remarks: '',
        });
        setErrors({});
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-48 -right-32 h-96 w-96 rounded-full bg-[#2D3E50]/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-[#3A6EA5]/10 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2D3E50]/10 text-black text-sm font-medium mb-5">
                <Home className="h-4 w-4" /> Home Loan Assistance
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-medium text-black">
                Get the <span className="text-[#3A6EA5] italic">Best Home Loan</span> for Your Dream
                Home
              </h1>
              <p className="mt-5 text-lg text-gray-600 max-w-2xl">
                <span className="font-semibold">We secure the best loan deals for you</span>.
                Multiple banks, better rates, fast approvals. You relax, we handle the paperwork.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="#lead-form"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2D3E50] to-[#3A6EA5] px-6 py-3 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Get Free Consultation <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="tel:+919560069525"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#2D3E50] px-6 py-3 text-[#2D3E50] font-semibold hover:bg-[#2D3E50] hover:text-white transition-all"
                >
                  <Phone className="h-4 w-4" /> Call Now
                </a>
              </div>
              <div className="mt-6 flex items-center gap-6 text-sm text-gray-600">
                <div className="inline-flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-green-600" /> RBI-Regulated Lenders
                </div>
                <div className="inline-flex items-center gap-2">
                  <IndianRupee className="h-4 w-4 text-emerald-600" /> Best Rate Guarantee
                </div>
              </div>
            </div>

            {/* Lead Form Card */}
            <div id="lead-form" className="lg:col-span-5">
              <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#2D3E50] to-[#3A6EA5] flex items-center justify-center text-white">
                    <MessageSquareMore className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold">Get Personalized Offers</h3>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600">Full Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      placeholder="Enter Your Name"
                      disabled={isSubmitting}
                      className={`mt-1 w-full rounded-xl border ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'} px-4 py-3 focus:bg-white focus:ring-2 focus:ring-[#2D3E50] focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                      value={form.name}
                      onChange={(e) => {
                        // Only allow letters and spaces
                        const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                        setForm({ ...form, name: value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Mobile Number <span className="text-red-500">*</span></label>
                      <input
                        type="tel"
                        required
                        placeholder="Enter Mobile Number"
                        disabled={isSubmitting}
                        maxLength={10}
                        className={`mt-1 w-full rounded-xl border ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'} px-4 py-3 focus:bg-white focus:ring-2 focus:ring-[#2D3E50] focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                        value={form.phone}
                        onChange={(e) => {
                          // Only allow numbers
                          const value = e.target.value.replace(/\D/g, '');
                          setForm({ ...form, phone: value });
                          if (errors.phone) setErrors({ ...errors, phone: '' });
                        }}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">City</label>
                      <input
                        type="text"
                        placeholder="Enter Your City"
                        disabled={isSubmitting}
                        className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 focus:bg-white focus:ring-2 focus:ring-[#2D3E50] focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Property Type</label>
                      <Select
                        disabled={isSubmitting}
                        value={form.propertyType}
                        onValueChange={(value) => setForm({ ...form, propertyType: value })}
                      >
                        <SelectTrigger className="mt-1 w-full h-[50px] rounded-xl border-gray-200 bg-gray-50 focus:ring-2 focus:ring-[#2D3E50]">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="Residential">Residential</SelectItem>
                          <SelectItem value="Commercial">Commercial</SelectItem>
                          <SelectItem value="Plot">Plot</SelectItem>
                          <SelectItem value="Home Renovation">Home Renovation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Approx. Loan Amount (₹)</label>
                      <input
                        type="text"
                        placeholder="e.g. 5000000"
                        disabled={isSubmitting}
                        className={`mt-1 w-full rounded-xl border ${errors.loanAmount ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'} px-4 py-3 focus:bg-white focus:ring-2 focus:ring-[#2D3E50] focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                        value={form.loanAmount}
                        onChange={(e) => {
                          // Only allow numbers
                          const value = e.target.value.replace(/\D/g, '');
                          setForm({ ...form, loanAmount: value });
                          if (errors.loanAmount) setErrors({ ...errors, loanAmount: '' });
                        }}
                      />
                      {errors.loanAmount && <p className="text-red-500 text-xs mt-1">{errors.loanAmount}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">
                        Loan Duration:
                        <span className="font-semibold text-[#3A6EA5] ml-1">
                          {(() => {
                            const months = Number(form.duration || 120);
                            const years = Math.floor(months / 12);
                            const remMonths = months % 12;
                            return `${years > 0 ? years + ' year' + (years > 1 ? 's' : '') : ''}${years > 0 && remMonths > 0 ? ' ' : ''}${remMonths > 0 ? remMonths + ' month' + (remMonths > 1 ? 's' : '') : ''}`.trim();
                          })()}
                        </span>
                      </label>
                      <input
                        type="range"
                        min="6"
                        max="360"
                        step="1"
                        value={form.duration || 120}
                        onChange={(e) => setForm({ ...form, duration: e.target.value })}
                        disabled={isSubmitting}
                        className="w-full accent-[#3A6EA5] disabled:opacity-50"
                        aria-label="Loan Duration Slider"
                      />
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-500">Or enter custom duration:</span>
                        <input
                          type="number"
                          min="1"
                          max="600"
                          value={form.duration || ''}
                          onChange={(e) => {
                            let val = e.target.value;
                            if (val === '' || isNaN(val)) val = '';
                            else if (Number(val) < 1) val = '1';
                            else if (Number(val) > 600) val = '600';
                            setForm({ ...form, duration: val });
                          }}
                          disabled={isSubmitting}
                          className="w-20 rounded border border-gray-200 px-2 py-1 text-sm focus:ring-2 focus:ring-[#3A6EA5] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                          placeholder="months"
                          aria-label="Custom Duration Months"
                        />
                        <span className="text-xs text-gray-400">months</span>
                      </div>
                      {/* Only show selected months and years above, no extra ticks */}
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Monthly Income (₹)</label>
                      <input
                        type="number"
                        placeholder="e.g. 50000"
                        disabled={isSubmitting}
                        className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 focus:bg-white focus:ring-2 focus:ring-[#2D3E50] focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        value={form.monthlyIncome}
                        onChange={(e) => setForm({ ...form, monthlyIncome: e.target.value })}
                      />
                      {errors.monthlyIncome && <p className="text-red-500 text-xs mt-1">{errors.monthlyIncome}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Employment Type</label>
                      <Select
                        disabled={isSubmitting}
                        value={form.employmentType}
                        onValueChange={(value) => setForm({ ...form, employmentType: value })}
                      >
                        <SelectTrigger className="mt-1 w-full h-[50px] rounded-xl border-gray-200 bg-gray-50 focus:ring-2 focus:ring-[#2D3E50]">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="Salaried">Salaried</SelectItem>
                          <SelectItem value="Self-employed">Self-employed</SelectItem>
                          <SelectItem value="Business Owner">Business Owner</SelectItem>
                          <SelectItem value="Retired">Retired</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Remarks</label>
                      <input
                        type="text"
                        placeholder="Any additional info"
                        disabled={isSubmitting}
                        className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 focus:bg-white focus:ring-2 focus:ring-[#2D3E50] focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        value={form.remarks}
                        onChange={(e) => setForm({ ...form, remarks: e.target.value })}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-gradient-to-r from-[#2D3E50] to-[#3A6EA5] py-3 font-semibold text-white shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                        Submitting...
                      </>
                    ) : (
                      'Get Callback from Our Expert'
                    )}
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    By continuing, you agree to our Terms & Privacy Policy.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOME LOAN SUMMARY - expanded content + apply flow */}
      <section className="py-12 bg-gradient-to-b from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-gray-900 leading-tight mb-4">
              Your Home, Your Future—Financed with Ease
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover flexible home loan options, low interest rates, and expert support—all in one
              place.
            </p>
            <p className="mt-4 text-gray-700 max-w-3xl mx-auto">
              A home loan is a type of secured financing offered based on the value of the property
              you intend to purchase. Whether you&apos;re planning to buy a new home, build one from
              the ground up, or upgrade your current space, a home loan can help you access the
              funds you need. At Borrowww, we make it easy to discover and choose the ideal
              home loan tailored to your goals.
            </p>
          </div>

          {/* Benefits Cards */}
          <div className="mb-16">
            <h3 className="text-2xl sm:text-3xl font-medium text-gray-900 text-center mb-8">
              Home Loan Benefits Made Simple
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <Percent className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Low Interest Rates</h4>
                <p className="text-gray-600 text-sm">
                  Cheaper than most other loans because of long repayment time.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <IndianRupee className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Tax Savings</h4>
                <p className="text-gray-600 text-sm">
                  Get up to ₹2 lakh off yearly on interest and principal under Sections 80C &amp;
                  24.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <ArrowRight className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Loan Transfer Option</h4>
                <p className="text-gray-600 text-sm">
                  Switch to another bank for better rates and save money.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <CalendarCheck2 className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Flexible Tenure</h4>
                <p className="text-gray-600 text-sm">
                  Choose up to 30 years or repay early if eligible.
                </p>
              </div>
            </div>
          </div>

          {/* Loan Type Cards */}
          <div className="mb-16">
            <h3 className="text-2xl sm:text-3xl font-medium text-gray-900 text-center mb-8">
              Choose Your Loan Type
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Ready Property Loan */}
              <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-200 group">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Home className="h-7 w-7 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Ready Property Loan</h4>
                <p className="text-gray-600 mb-4">Move In, Stress-Free</p>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Up to 90% Loan Coverage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Fast Disbursement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Flexible Tenure up to 30 years</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Interest-Only Option</span>
                  </li>
                </ul>
              </div>

              {/* Under-Construction Property Loan */}
              <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-green-200 group">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Building2 className="h-7 w-7 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  Under-Construction Property Loan
                </h4>
                <p className="text-gray-600 mb-4">Build Your Future Home</p>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Stage-Wise Loan Disbursement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Lower Property Costs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Interest-Only EMIs during construction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Tax Benefits After Possession</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>RERA-approved projects</span>
                  </li>
                </ul>
              </div>

              {/* Balance Transfer */}
              <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-purple-200 group">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ArrowRight className="h-7 w-7 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  Home Loan Balance Transfer
                </h4>
                <p className="text-gray-600 mb-4">Save More Every Month</p>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Lower Interest Rates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Easy Transfer Process</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>More Savings for life&apos;s priorities</span>
                  </li>
                </ul>
              </div>

              {/* Plot + Construction Loan */}
              <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-orange-200 group">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Building2 className="h-7 w-7 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  Plot + Construction Loan
                </h4>
                <p className="text-gray-600 mb-4">Build Your Way</p>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Staged payments as construction progresses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Full freedom to customize your home</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Ideal if you plan to start building within 2–3 years</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Tax benefits under Sections 80C &amp; 24B</span>
                  </li>
                </ul>
              </div>

              {/* Plot Loan */}
              <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-teal-200 group">
                <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Home className="h-7 w-7 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Plot Loan</h4>
                <p className="text-gray-600 mb-4">Start with the Perfect Plot</p>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-1">•</span>
                    <span>Cheapest Interest Rates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-1">•</span>
                    <span>Build When You&apos;re Ready – Up to 3 years</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-1">•</span>
                    <span>Local Support throughout the process</span>
                  </li>
                </ul>
              </div>

              {/* Why Borrowww */}
              <div className="bg-gradient-to-br from-[#2D3E50] to-[#3A6EA5] rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 text-white group">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="h-7 w-7 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-3">Why Borrowww?</h4>
                <p className="text-white/90 mb-4">
                  Owning a home is a major life milestone. At Borrowww, we&apos;re here to make
                  your home loan journey simple and stress-free.
                </p>
                <ul className="space-y-2 text-sm text-white/90 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">•</span>
                    <span>Competitive rates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">•</span>
                    <span>Simple documentation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">•</span>
                    <span>Expert guidance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-10 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-gray-900 mb-4">
              Why Choose Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We don&apos;t just compare rates —{' '}
              <span className="font-semibold text-gray-900">
                we negotiate the best deals for you
              </span>
              .
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, index) => (
              <div
                key={f.title}
                className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-gray-100 hover:border-[#3A6EA5]/30 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2D3E50] to-[#3A6EA5] text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <f.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-12 bg-gradient-to-b from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">4 simple steps from start to sanction.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className="relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-gray-100 hover:border-[#3A6EA5]/30 group"
              >
                <div className="absolute -top-4 -left-4 h-10 w-10 rounded-xl bg-gradient-to-br from-[#2D3E50] to-[#3A6EA5] text-white flex items-center justify-center text-base font-bold shadow-lg group-hover:scale-110 transition-transform">
                  {i + 1}
                </div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 text-[#3A6EA5] flex items-center justify-center mb-4 group-hover:bg-gradient-to-br group-hover:from-[#3A6EA5] group-hover:to-[#2D3E50] group-hover:text-white transition-all duration-300 shadow-md">
                  <s.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ELIGIBILITY & DOCUMENTS */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-6 shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-[#3A6EA5] text-white flex items-center justify-center">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold">Basic Eligibility</h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li>• Age: 21–80 years at loan maturity</li>
              <li>• Stable income: Salaried / Self-employed</li>
              <li>• Credit score: 700+ preferred</li>
              <li>• Co-applicant allowed for higher eligibility</li>
              <li>• FOIR/Obligation norms as per lender policy</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-6 shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-[#3A6EA5] text-white flex items-center justify-center">
                <FileCheck2 className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold">Required Documents</h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              {documents.map((d) => (
                <li key={d}>• {d}</li>
              ))}
            </ul>
            <p className="text-xs text-black mt-3">
              *Exact document list may vary based on bank and applicant profile.
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-gray-900">
              Happy Homeowners
            </h2>
            <p className="mt-3 text-gray-600">
              Clients who achieved their dream home through our services.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Rajesh Kumar',
                review:
                  'Got the best rate and the process was incredibly smooth. The team handled everything from start to finish.',
              },
              {
                name: 'Priya Sharma',
                review:
                  'Excellent service! They negotiated a great deal and kept me informed throughout the entire process.',
              },
              {
                name: 'Amit Patel',
                review:
                  'Professional and efficient. Saved me both time and money. Highly recommend their services.',
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="rounded-3xl border border-gray-100 bg-white p-6 shadow hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="inline-flex items-center gap-1 text-emerald-600 text-sm">
                    <BadgeCheck className="h-4 w-4" /> Verified
                  </div>
                </div>
                <p className="mt-3 text-gray-700">&quot;{testimonial.review}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((f, idx) => (
              <details
                key={idx}
                className="group rounded-2xl border border-gray-200 p-5 open:bg-gray-50"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-gray-900">
                  {f.q}
                  <span className="transition group-open:rotate-180">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </summary>
                <p className="mt-3 text-gray-700">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="rounded-3xl my-5 bg-gradient-to-r from-[#2D3E50] to-[#3A6EA5] p-8  text-white text-center shadow-2xl max-w-7xl mx-auto">
        <h3 className="text-2xl sm:text-3xl font-medium mb-4">Ready to Get Started?</h3>
        <p className="text-white/90 mb-8 max-w-2xl mx-auto">
          Discover the best loan options and competitive rates with us today! Get personalized
          offers and expert guidance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3 font-semibold text-[#3A6EA5] hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
          >
            Apply for Loan <ArrowRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white px-8 py-3 font-semibold hover:bg-white hover:text-[#3A6EA5] transition-all"
          >
            Get Free Consultation
          </button>
        </div>
      </div>
    </div>
  );
}
