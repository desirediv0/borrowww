'use client ';

import React from 'react';

import Image from 'next/image';
import { globeIcon } from '@/assets';

import { ArrowUp, CreditCard, Globe, Shield, Sparkles, Star } from 'lucide-react';
import RotatingSVG from './Globe';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background floating elements */}
      {/* <div className="absolute inset-0">
        <div
          className="absolute top-20 right-20 w-32 h-32 rounded-full opacity-30"
          style={{ backgroundColor: 'hsl(217, 91%, 60%)' }}
        />
        <div
          className="absolute bottom-32 left-16 w-24 h-24 rounded-full opacity-20"
          style={{ backgroundColor: 'hsl(42, 94%, 60%)' }}
        />
      </div> */}

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-24 pt-16 pb-10 sm:pt-20 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <p
                className="font-medium text-xs sm:text-sm tracking-wider uppercase mb-3 sm:mb-4 text-[var(--primary-blue)]">
                Fast APPROVAL!
              </p>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-[5rem] font-medium text-gray-900 lg:leading-tight xl:leading-tight tracking-tighter">
                Check Your CIBIL
                <br />
                Score & Get
                <br />
                <span className="italic tiemposfine" >
                  Instant Loans
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg pt-4 md:pt-4">
              Get your CIBIL score checked instantly and apply for personal loans, home loans,
              business loans, and more. Quick approval with competitive rates.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
              <button
                className="text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-[var(--primary-blue)] transition-all duration-300 shadow-lg bg-[var(--primary-blue-dark)]"
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
            <div className="grid grid-cols-2">
              {/* Top Left - CIBIL Score Card */}
              <div className=" text-white">
                {/* <div className="flex flex-col items-center justify-center">
                  <h3 className="text-3xl sm:text-6xl font-bold mb-1">750+</h3>
                  <p className="text-blue-100 text-xs sm:text-sm">Average CIBIL Score</p>
                </div>
                <div className="flex justify-end">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 border-2 border-white/30 rounded-full flex items-center justify-center">
                    <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div> */}
                <Image src="/1.avif" alt="CIBIL Score" width={100} height={100} className="aspect-square w-full mx-auto" />
              </div>

              {/* Top Right - Loan Amount Card */}
              {/* <div className="p-6 sm:p-12 aspect-square flex flex-col justify-between bg-[#6BA292] overflow-hidden rounded-tr-2xl rounded-br-2xl sm:rounded-l-full">
                <div className="flex flex-col items-center justify-center">
                  <h3 className="text-2xl sm:text-4xl md:text-6xl font-medium text-white mb-1">₹50L+</h3>
                  <p className="text-white text-xs sm:text-sm">Total Loans Disbursed</p>
                </div>
                <div className="flex justify-end">
                  <RotatingSVG/>

                  <div className="w-8 h-8 sm:w-12 sm:h-12 border-2 border-gray-600 rounded-full flex items-center justify-center">
                    <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                  </div>
                  <Image src={globeIcon} alt="Globe" width={70} height={50} className="rotate-12" />
                </div>
              </div> */}
              <div className="p-6 sm:p-12 aspect-square grid grid-cols-2 bg-[#90d2bf] overflow-hidden rounded-tr-2xl rounded-br-2xl sm:rounded-l-full">
                <div className="flex flex-col justify-center sm:h-[70%]">
                  <div>
                    <p className="text-[#2D3E50] text-xs sm:text-xl md:text-2xl my-auto">Loans</p>
                  </div>
                </div>
                <div>
                    <div className="flex flex-col items-center">
                      <h3 className="text-2xl sm:text-4xl md:text-6xl font-medium text-[#2D3E50] mb-1">₹50L+</h3>
                    </div>
                    <div className="flex justify-end mt-8">
                      <RotatingSVG />

                      {/* <div className="w-8 h-8 sm:w-12 sm:h-12 border-2 border-gray-600 rounded-full flex items-center justify-center">
                    <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                  </div> */}
                      {/* <Image src={globeIcon} alt="Globe" width={70} height={50} className="rotate-12" /> */}
                    </div>
                  </div>
              </div>


              {/* Bottom Left - Processing Time Card */}
              <div className="p-4 sm:p-6 aspect-square flex flex-col justify-between relative bg-[#3A6EA5] overflow-hidden rounded-bl-2xl sm:rounded-tr-[10rem] md:rounded-tr-[15rem]">
                <div className="flex items-center justify-center flex-1">
                  <Sparkles className="w-10 h-10 sm:w-16 sm:h-16 text-white animate-breathing" />
                </div>
                <div>
                  <p className="text-white text-xl mb-1">Processing Time</p>
                  <div className="text-lg sm:text-3xl font-medium text-white">24 Hours</div>
                </div>
              </div>

              {/* Bottom Right - Interest Rate Card */}
              <div className="p-4 sm:p-6 aspect-square flex flex-col justify-between text-black relative bg-[#2D3E50]">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <h3 className="text-2xl sm:text-4xl md:text-6xl font-medium text-white mb-1">8.5%</h3>
                    <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  {/* <p className="text-white text-xl">Starting Interest Rate</p> */}
                </div>

                                 {/* Chart visualization */}
                 <div className="mt-2 sm:mt-4 ">
                   <svg className="w-full h-12 sm:h-16" viewBox="0 0 80 35">
                     <polyline
                       points="0,30 10,25 20,28 30,20 40,22 50,15 60,18 70,12 80,3"
                       fill="none"
                       stroke="white"
                       strokeWidth="2.5"
                       strokeLinecap="round"
                       strokeLinejoin="round"
                       className="animate-draw-chart"
                       style={{ strokeDasharray: "200", strokeDashoffset: "0" }}
                     />
                     <circle cx="80" cy="3" r="3" fill="white" className="animate-draw-chart" />
                   </svg>
                 </div>
                 <div>
                 <p className="text-white text-xl md:text-2xl flex justify-end">Interest Rate</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
