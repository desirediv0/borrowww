'use client ';

import React from 'react';

import Image from 'next/image';
import { globeIcon } from '@/assets';

import { ArrowUp, CreditCard, Globe, Shield, Sparkles, Star } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-white overflow-hidden">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 sm:pt-20 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <p
                className="font-medium text-xs sm:text-sm tracking-wider uppercase mb-3 sm:mb-4"
                style={{ color: 'hsl(217, 91%, 60%)' }}
              >
                INSTANT APPROVAL!
              </p>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                Check Your CIBIL
                <br />
                Score & Get
                <br />
                <span className="italic" style={{ color: 'hsl(217, 91%, 60%)' }}>
                  Instant Loans
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg">
              Get your CIBIL score checked instantly and apply for personal loans, home loans,
              business loans, and more. Quick approval with competitive rates.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
              <button
                className="text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:opacity-90 transition-all duration-300 shadow-lg"
                style={{ backgroundColor: 'hsl(217, 91%, 60%)' }}
              >
                Check CIBIL Score
              </button>

              <div className="flex items-center gap-3 mt-2 sm:mt-0">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="text-xs sm:text-sm">
                  <div className="font-semibold text-gray-900">4.9/5.0</div>
                  <div className="text-gray-500">
                    from 10,000+ <span className="underline">customers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Cards Grid */}
          <div className="relative mt-10 lg:mt-0">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {/* Top Left - CIBIL Score Card */}
              <div className="p-4 sm:p-6 aspect-square flex flex-col justify-between bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-tl-2xl rounded-bl-2xl">
                <div className="flex flex-col items-center justify-center">
                  <h3 className="text-3xl sm:text-6xl font-bold mb-1">750+</h3>
                  <p className="text-blue-100 text-xs sm:text-sm">Average CIBIL Score</p>
                </div>
                <div className="flex justify-end">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 border-2 border-white/30 rounded-full flex items-center justify-center">
                    <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Top Right - Loan Amount Card */}
              <div className="p-6 sm:p-12 aspect-square flex flex-col justify-between bg-green-100 overflow-hidden rounded-tr-2xl rounded-br-2xl sm:rounded-l-full">
                <div className="flex flex-col items-center justify-center">
                  <h3 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-1">₹50L+</h3>
                  <p className="text-gray-700 text-xs sm:text-sm">Total Loans Disbursed</p>
                </div>
                <div className="flex justify-end">
                  {/* <div className="w-8 h-8 sm:w-12 sm:h-12 border-2 border-gray-600 rounded-full flex items-center justify-center">
                    <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                  </div> */}
                    <Image src={globeIcon} alt="Globe" width={70} height={50} className="rotate-12" />
                </div>
              </div>

              {/* Bottom Left - Processing Time Card */}
              <div className="p-4 sm:p-6 aspect-square flex flex-col justify-between relative bg-orange-100 overflow-hidden rounded-bl-2xl rounded-tl-2xl sm:rounded-tr-[10rem] md:rounded-tr-[15rem]">
                <div className="flex items-center justify-center flex-1">
                  <Sparkles className="w-10 h-10 sm:w-16 sm:h-16 text-orange-700" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-700 mb-1 sm:mb-2">Processing Time</p>
                  <div className="text-lg sm:text-2xl font-bold text-gray-800">24 Hours</div>
                </div>
              </div>

              {/* Bottom Right - Interest Rate Card */}
              <div className="p-4 sm:p-6 aspect-square flex flex-col justify-between text-black relative bg-purple-100 rounded-br-2xl rounded-tr-2xl">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <h3 className="text-lg sm:text-2xl font-bold">8.5%</h3>
                    <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <p className="text-black/80 text-xs sm:text-sm">Starting Interest Rate</p>
                </div>

                {/* Chart visualization */}
                <div className="mt-2 sm:mt-4">
                  <svg className="w-full h-5 sm:h-8" viewBox="0 0 80 20">
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
