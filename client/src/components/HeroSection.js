'use client ';

import React from 'react';

import Image from 'next/image';

import { ArrowUp, CreditCard, Globe, Shield, Sparkles, Star } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative  bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Background floating elements */}
      <div className="absolute inset-0">
        <div
          className="absolute top-20 right-20 w-32 h-32 rounded-full opacity-30"
          style={{ backgroundColor: 'hsl(217, 91%, 60%)' }}
        />
        <div
          className="absolute bottom-32 left-16 w-24 h-24 rounded-full opacity-20"
          style={{ backgroundColor: 'hsl(42, 94%, 60%)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <p
                className="font-medium text-sm tracking-wider uppercase mb-4"
                style={{ color: 'hsl(217, 91%, 60%)' }}
              >
                INSTANT APPROVAL!
              </p>

              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                Check Your CIBIL
                <br />
                Score & Get
                <br />
                <span className="italic" style={{ color: 'hsl(217, 91%, 60%)' }}>
                  Instant Loans
                </span>
              </h1>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
              Get your CIBIL score checked instantly and apply for personal loans, home loans,
              business loans, and more. Quick approval with competitive rates.
            </p>

            <div className="flex items-center gap-8">
              <button
                className="text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-all duration-300 shadow-lg"
                style={{ backgroundColor: 'hsl(217, 91%, 60%)' }}
              >
                Check CIBIL Score
              </button>

              <div className="flex items-center gap-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">4.9/5.0</div>
                  <div className="text-gray-500">
                    from 10,000+ <span className="underline">customers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Cards Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Top Left - CIBIL Score Card */}
              <div className="rounded-3xl p-6 aspect-square flex flex-col justify-between bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <div className="flex flex-col items-center justify-center">
                  <h3 className="text-6xl font-bold mb-1">750+</h3>
                  <p className="text-blue-100 text-sm">Average CIBIL Score</p>
                </div>
                <div className="flex justify-end">
                  <div className="w-12 h-12 border-2 border-white/30 rounded-full flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Top Right - Loan Amount Card */}
              <div className="rounded-3xl p-6 aspect-square flex flex-col justify-between bg-green-100">
                <div className="flex flex-col items-center justify-center">
                  <h3 className="text-4xl font-bold text-gray-800 mb-1">₹50L+</h3>
                  <p className="text-gray-700 text-sm">Total Loans Disbursed</p>
                </div>
                <div className="flex justify-end">
                  <div className="w-12 h-12 border-2 border-gray-600 rounded-full flex items-center justify-center">
                    <Globe className="w-6 h-6 text-gray-600" />
                  </div>
                </div>
              </div>

              {/* Bottom Left - Processing Time Card */}
              <div className="rounded-3xl p-6 aspect-square flex flex-col justify-between relative bg-orange-100">
                <div className="flex items-center justify-center flex-1">
                  <Sparkles className="w-16 h-16 text-orange-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-700 mb-2">Processing Time</p>
                  <div className="text-2xl font-bold text-gray-800">24 Hours</div>
                </div>
              </div>

              {/* Bottom Right - Interest Rate Card */}
              <div className="rounded-3xl p-6 aspect-square flex flex-col justify-between text-black relative bg-purple-100">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <h3 className="text-2xl font-bold">8.5%</h3>
                    <ArrowUp className="w-5 h-5" />
                  </div>
                  <p className="text-black/80 text-sm">Starting Interest Rate</p>
                </div>

                {/* Chart visualization */}
                <div className="mt-4">
                  <svg className="w-full h-8" viewBox="0 0 80 20">
                    <polyline
                      points="0,15 20,12 40,8 60,10 80,4"
                      fill="none"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="80" cy="4" r="2" fill="white" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
