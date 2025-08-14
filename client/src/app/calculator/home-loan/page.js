'use client';

import { useState } from 'react';
import React from 'react';

import Link from 'next/link';

import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarCheck2,
  ClipboardCheck,
  FileCheck2,
  FileText,
  Handshake,
  Home,
  IndianRupee,
  MessageSquareMore,
  Percent,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';

export default function HomeLoanServicesPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    city: '',
    propertyType: 'Residential',
    loanAmount: '',
  });

  const lenders = [
    {
      name: 'HDFC Bank',
      rate: '8.50%*',
      badge: 'Popular',
      gradient: 'from-[#2D3E50] to-[#2D3E50]',
    },
    {
      name: 'SBI',
      rate: '8.65%*',
      badge: 'Govt. Backed',
      gradient: 'from-green-500 to-emerald-600',
    },
    {
      name: 'ICICI Bank',
      rate: '8.75%*',
      badge: 'Fast Processing',
      gradient: 'from-purple-500 to-violet-600',
    },
    {
      name: 'Axis Bank',
      rate: '8.85%*',
      badge: 'Low Fees',
      gradient: 'from-orange-500 to-amber-600',
    },
  ];

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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks ${form.name || 'there'}! Our team will call you shortly.`);
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
          <div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-12 gap-10 items-center"
          >
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
                  href="tel:+919999999999"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#2D3E50] px-6 py-3 text-[#2D3E50] font-semibold hover:bg-[#2D3E50] hover:text-white transition-all"
                >
                  <Phone className="h-4 w-4" /> Call Now
                </a>
              </div>
              <div className="mt-6 flex items-center gap-6 text-sm text-gray-600">
                <div className="inline-flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-yellow-500" /> No Brokerage
                </div>
                <div className="inline-flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-green-600" /> RBI-Regulated Lenders
                </div>
                <div className="inline-flex items-center gap-2">
                  <IndianRupee className="h-4 w-4 text-emerald-600" /> Best Rate Guarantee
                </div>
              </div>
            </div>

            {/* Lead Form Card */}
            <div
              id="lead-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5"
            >
              <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#2D3E50] to-[#3A6EA5] flex items-center justify-center text-white">
                    <MessageSquareMore className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold">Get Personalized Offers</h3>
                </div>
                <div onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter Your Name"
                      className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 focus:bg-white focus:ring-2 focus:ring-[#2D3E50] focus:border-transparent transition-all"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Mobile Number</label>
                      <input
                        type="tel"
                        pattern="[0-9]{10}"
                        required
                        placeholder="Enter Your Mobile Number"
                        className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 focus:bg-white focus:ring-2 focus:ring-[#2D3E50] focus:border-transparent transition-all"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">City</label>
                      <input
                        type="text"
                        placeholder="Enter Your City"
                        className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 focus:bg-white focus:ring-2 focus:ring-[#2D3E50] focus:border-transparent transition-all"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Property Type</label>
                      <select
                        className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 focus:bg-white focus:ring-2 focus:ring-[#2D3E50] focus:border-transparent transition-all"
                        value={form.propertyType}
                        onChange={(e) => setForm({ ...form, propertyType: e.target.value })}
                      >
                        <option>Residential</option>
                        <option>Commercial</option>
                        <option>Plot</option>
                        <option>Home Renovation</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Approx. Loan Amount (₹)</label>
                      <input
                        type="number"
                        placeholder="1,00,000,000"
                        className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 focus:bg-white focus:ring-2 focus:ring-[#2D3E50] focus:border-transparent transition-all"
                        value={form.loanAmount}
                        onChange={(e) => setForm({ ...form, loanAmount: e.target.value })}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-[#2D3E50] to-[#3A6EA5] py-3 font-semibold text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    Get Callback in 10 Minutes
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    By continuing, you agree to our Terms & Privacy Policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LENDERS STRIP */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {lenders.map((l) => (
              <div
                key={l.name}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-all"
              >
                <div
                  className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${l.gradient} text-white text-xs font-semibold px-3 py-1`}
                >
                  {l.badge}
                </div>
                <div className="mt-3 text-lg font-semibold text-gray-900">{l.name}</div>
                <div className="text-sm text-gray-600">Starting at</div>
                <div className="text-2xl font-bold text-[#2D3E50]">{l.rate}</div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-gray-500">
            *Rates are indicative & subject to lender policy, credit profile, and market conditions.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Why Choose Our Services
            </h2>
            <p className="mt-3 text-gray-600">
              We don&apos;t just compare rates —{' '}
              <span className="font-semibold">we negotiate the best deals for you</span>.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg hover:shadow-xl transition-all group"
              >
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#2D3E50] to-[#3A6EA5] text-white flex items-center justify-center mb-4">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              How It Works
            </h2>
            <p className="mt-3 text-gray-600">4 simple steps from start to sanction.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className="relative rounded-3xl border border-gray-100 bg-white p-6 shadow-md"
              >
                <div className="absolute -top-3 -left-3 h-8 w-8 rounded-xl bg-[#3A6EA5] text-white flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </div>
                <div className="h-12 w-12 rounded-2xl bg-gray-100 text-[#3A6EA5] flex items-center justify-center mb-4">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{s.title}</h3>
                <p className="mt-2 text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ELIGIBILITY & DOCUMENTS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-6 shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-[#3A6EA5] text-white flex items-center justify-center">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold">Basic Eligibility</h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li>• Age: 21–65 years at loan maturity</li>
              <li>• Stable income: Salaried / Self-employed</li>
              <li>• CIBIL score: 700+ preferred</li>
              <li>• Co-applicant allowed for higher eligibility</li>
              <li>• FOIR/Obligation norms as per lender policy</li>
            </ul>
            <div className="mt-5 inline-flex items-center gap-2 rounded-xl border-2 border-[#3A6EA5] px-4 py-2 font-semibold text-[#3A6EA5] hover:bg-[#2D3E50] hover:text-white transition-all cursor-pointer">
              <FileText className="h-4 w-4" /> Check My Eligibility
            </div>
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
            <p className="text-xs text-gray-500 mt-3">
              *Exact document list may vary based on bank and applicant profile.
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
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
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
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
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-[#3A6EA5] to-[#3A6EA5] p-8 text-white text-center shadow-2xl">
            <h3 className="text-3xl font-bold">Ready to Get Started?</h3>
            <p className="mt-2 text-white/90">
              Free consultation • Multiple banks • Faster approvals
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#lead-form"
                className="rounded-xl bg-white px-8 py-3 font-semibold text-[#3A6EA5] hover:bg-gray-100 transition-all"
              >
                Get Loan Offers
              </Link>
              <Link
                href="/auth"
                className="rounded-xl border-2 border-white px-8 py-3 font-semibold hover:bg-white hover:text-[#3A6EA5] transition-all"
              >
                Login / Register
              </Link>
            </div>
          </div>
          <p className="text-center text-xs text-gray-500 mt-3">
            *We are a loan facilitation service. Sanctions & Terms are at lender&apos;s discretion.
          </p>
        </div>
      </section>
    </div>
  );
}
