'use client';

import React from 'react';
import { FaHandHoldingHeart, FaPercent, FaPhone, FaWhatsapp } from 'react-icons/fa';

export default function ConcernsSection() {
  const phoneNumber = '9560069525';
  const whatsappNumber = '919560069525';

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      'Hello! I would like to know more about your loan services.'
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Question Section */}
        <div className="text-center mb-10  ">
          <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-3 sm:mb-4 font-medium ">
            Concerned about
          </p>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-medium text-gray-900 leading-tight px-4 capitalize">
            Unexpected fees? Rising EMIs? Navigating alone?
          </h2>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mb-12">
          {/* Zero Commission Card */}
          <div className="bg-white rounded-2xl p-3  hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:border border-gray-100">
            <div className="flex items-center gap-4 sm:gap-5 flex-col">
              <div className="flex-shrink-0 w-16 h-16  bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl font-extrabold">0%</span>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-medium text-gray-900 mb-1.5 text-center">
                  Zero Commission
                </h3>
                <p className="text-sm  text-gray-500 font-medium text-center ">
                  Absolutely no hidden fees
                </p>
              </div>
            </div>
          </div>

          {/* Best Rates Card */}
          <div className="bg-white rounded-2xl p-3  hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:border border-gray-100">
            <div className="flex items-center gap-4 sm:gap-5 flex-col">
              <div className="flex-shrink-0 w-16 h-16  bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FaPercent className="text-white text-2xl font-extrabold" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-medium text-gray-900 mb-1.5 text-center ">
                  Best Interest Rates
                </h3>
                <p className="text-sm font-medium text-gray-500 text-center ">
                  Starting from 7.10%* p.a.
                </p>
              </div>
            </div>
          </div>

          {/* Complete Support Card */}
          <div className="bg-white rounded-2xl p-3 col-span-2 md:col-span-1  hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:border border-gray-100">
            <div className="flex items-center gap-4 sm:gap-5 flex-col">
              <div className="flex-shrink-0 w-16 h-16  bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FaHandHoldingHeart className="text-white text-2xl font-extrabold" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-medium text-gray-900 mb-1.5 text-center ">
                  Complete Support
                </h3>
                <p className="text-sm font-medium text-gray-500 text-center ">
                  Before, during & after loan
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-5 lg:gap-6 max-w-md mx-auto">
          {/* WhatsApp Button */}
          <button
            onClick={handleWhatsApp}
            className="group w-full sm:w-auto sm:flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-[var(--primary-blue-dark)] to-[var(--primary-blue)] hover:from-[var(--primary-blue)] hover:to-[var(--primary-blue-dark)] text-white px-2 md:px-6 py-3 md:py-4  rounded-lg md:font-semibold lg:font-medium text-xs md:text-sm sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98]"
          >
            <div className="w-8 h-8  bg-green-500 group-hover:bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg transition-colors duration-300">
              <FaWhatsapp className="w-5 h-5 text-white" />
            </div>
            <span>Chat on WhatsApp</span>
          </button>

          {/* Schedule a Call Button */}
          <button
            onClick={handleCall}
            className="group w-full sm:w-auto sm:flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-[var(--primary-blue-dark)] to-[var(--primary-blue)] hover:from-[var(--primary-blue)] hover:to-[var(--primary-blue-dark)] text-white px-4 md:px-6 py-3 md:py-4  rounded-lg md:font-semibold lg:font-medium text-xs md:text-sm sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98]"
          >
            <div className="w-8 h-8  bg-white group-hover:bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg transition-colors duration-300">
              <FaPhone className="w-5 h-5  text-[var(--primary-blue-dark)]" />
            </div>
            <span>Book a Free Call</span>
          </button>
        </div>
      </div>
    </section>
  );
}
