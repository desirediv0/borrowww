'use client';

import React, { useEffect, useState } from 'react';
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaEnvelope,
  FaFileAlt,
  FaPhone,
  FaWhatsapp,
} from 'react-icons/fa';

import { useRouter } from 'next/navigation';

export default function TransparencySection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const slides = [
    {
      id: 1,
      title: 'Reach out to us, anytime',
      description:
        'Call, chat, or share your concerns — your Borrowww advisor responds personally and guides you throughout your loan journey.',
      phoneContent: {
        header: 'Borrowww Advisor',
        advisor: {
          name: 'Kamlesh Yadav',
          role: 'Senior Loan Advisor',
          phone: 'Available on request',
          email: 'support@borrowww.com',
        },
        chat: [
          {
            sender: 'advisor',
            message:
              'Welcome to Borrowww! I’m your dedicated loan advisor. How can I assist you today?',
          },
          { sender: 'user', message: 'How do I connect with the bank for my loan process?' },
          {
            sender: 'advisor',
            message:
              'We’ll schedule the discussion with the bank and share the link with you directly here. You’ll be notified once it’s set!',
          },
        ],
        icons: [
          { icon: FaFileAlt, color: 'bg-orange-100', iconColor: 'text-orange-600' },
          { icon: FaWhatsapp, color: 'bg-green-100', iconColor: 'text-green-600' },
          { icon: FaPhone, color: 'bg-blue-100', iconColor: 'text-blue-600' },
          { icon: FaEnvelope, color: 'bg-blue-100', iconColor: 'text-[var(--primary-blue-dark)]' },
        ],
      },
    },

    {
      id: 2,
      title: 'Lifetime Support After Loan',
      description:
        'Even after your loan is approved, our advisors will help you with better interest options, loan transfers, savings, and financial decisions.',
      phoneContent: {
        header: 'Available Anytime',
        chat: [
          {
            sender: 'advisor',
            message:
              'We’re always here to help you with anything related to your loan — better rates, savings tips, transfer help, or financial planning.\n\nJust message us anytime!',
          },
        ],
        buttons: [
          { text: 'Check better rates', style: 'border-orange-500 text-orange-600 bg-white' },
          { text: 'Talk to Advisor', style: 'bg-[var(--primary-blue-dark)] text-white' },
        ],
      },
    },

    {
      id: 3,
      title: 'Smart, clutter-free updates',
      description:
        'Track only the important steps of your loan process directly from your account. No spam messages — just essential updates.',
      phoneContent: {
        notifications: [
          {
            icon: FaFileAlt,
            iconBg: 'bg-orange-500',
            title: 'Documents Verified',
            message: 'Your submitted documents have been reviewed successfully',
            time: 'Just now',
          },
          {
            icon: FaCheckCircle,
            iconBg: 'bg-[var(--primary-blue-dark)]',
            title: 'Application Submitted to Bank',
            message: 'We’re now coordinating with your banker',
            time: 'Few mins ago',
          },
        ],
      },
    },

    {
      id: 4,
      title: 'Monitor your loan progress',
      description:
        'No need to follow up again and again. View your loan progress, banker actions, and updates — right on your screen.',
      phoneContent: {
        header: 'Borrowww Dashboard',
        status: 'Your Loan Application is under process',
        loanCard: {
          number: '7094 - Home Loan',
          bank: 'HDFC Bank',
          status: 'Documents Submitted',
          requestedOn: '30 June, 1:20 PM',
          amount: '₹90 Lacs',
        },
        progress: {
          title: 'Bank verification in progress',
          date: '16 June, 2:30 PM',
          status: 'Coordinating with your banker',
        },
        offer: 'Borrowww Special Benefit: Login Fee Waived',
      },
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative overflow-hidden bg-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-medium text-gray-900 leading-tight mb-4 text-balance capitalize">
            Always transparent, always available
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-2">
            Borrowww keeps you informed every step of the way - your dream home journey stays
            transparent and accessible
          </p>
        </div>

        <div className="relative w-full overflow-hidden">
          {/* Carousel Container with smooth transitions */}
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gray-50 shadow-lg w-full">
            <div
              className="flex transition-transform duration-500 ease-in-out w-full"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slideItem) => (
                <div key={slideItem.id} className="min-w-full flex-shrink-0 w-full">
                  {/* Mobile: Stacked layout */}
                  <div className="block lg:hidden">
                    <div className="flex flex-col gap-4 p-4 sm:p-6 w-full">
                      <div className="flex items-center justify-center w-full pt-2">
                        <div className="relative w-full max-w-[240px] sm:max-w-[280px] h-[320px] sm:h-[380px] overflow-hidden">
                          <MobilePhonePreview slide={slideItem} />

                          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent z-10 pointer-events-none" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col gap-4 text-center w-full">
                        <div className="w-full">
                          <h3 className="text-xl sm:text-2xl font-medium text-gray-900 mb-2 break-words">
                            {slideItem.title}
                          </h3>
                          <p className="text-sm sm:text-base text-gray-600 leading-relaxed break-words px-2">
                            {slideItem.description}
                          </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-2 w-full max-w-sm mx-auto">
                          <button
                            onClick={() => router.push('/contact')}
                            className="flex items-center justify-center gap-2 bg-white border-2 border-[var(--primary-blue-dark)] text-[var(--primary-blue-dark)] px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-all duration-300 w-full"
                          >
                            <span className="whitespace-nowrap">Contact advisor</span>
                          </button>
                          <a
                            href="tel:+919560069525"
                            className="bg-[var(--primary-blue-dark)] text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-[var(--primary-blue)] transition-all duration-300 w-full"
                          >
                            <span>Call Now</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop: Grid layout */}
                  <div className="hidden lg:block">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8 items-center p-6 lg:p-8 xl:p-10 w-full max-w-full">
                      {/* Left Content */}
                      <div className="flex flex-col justify-center gap-6 w-full overflow-hidden">
                        <div className="w-full">
                          <h3 className="text-2xl lg:text-3xl xl:text-4xl font-medium text-gray-900 mb-4 break-words">
                            {slideItem.title}
                          </h3>
                          <p className="text-sm lg:text-base text-gray-600 leading-relaxed break-words">
                            {slideItem.description}
                          </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 w-full">
                          <button
                            onClick={() => router.push('/contact')}
                            className="flex items-center justify-center gap-2 bg-white border-2 border-[var(--primary-blue-dark)] text-[var(--primary-blue-dark)] px-4 lg:px-6 py-3 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-all duration-300 whitespace-nowrap"
                          >
                            <span>Contact advisor</span>
                          </button>
                          <a
                            href="tel:+919560069525"
                            className="bg-[var(--primary-blue-dark)] text-white px-4 lg:px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[var(--primary-blue)] transition-all duration-300 whitespace-nowrap"
                          >
                            <span>Call Now</span>
                          </a>
                        </div>
                      </div>

                      {/* Right Content - Phone Mockup */}
                      <div className="flex items-center justify-center w-full lg:w-auto">
                        <div className="relative w-full max-w-[280px] lg:max-w-[300px] h-[380px] lg:h-[400px] overflow-hidden">
                          <MobilePhonePreview slide={slideItem} />
                          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent z-10 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-1 top-1/2 -translate-y-1/2 bg-white rounded-full p-2  shadow-lg hover:bg-gray-50 transition-all duration-300 z-20 hidden lg:flex items-center justify-center"
            aria-label="Previous slide"
          >
            <FaArrowLeft className="w-4 h-4  text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-1 top-1/2 -translate-y-1/2 bg-white rounded-full p-2  shadow-lg hover:bg-gray-50 transition-all duration-300 z-20 hidden lg:flex items-center justify-center"
            aria-label="Next slide"
          >
            <FaArrowRight className="w-4 h-4  text-gray-700" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-6 sm:mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${currentSlide === index
                ? 'bg-[var(--primary-blue-dark)] w-8'
                : 'bg-gray-300 hover:bg-gray-400 w-2'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function MobilePhonePreview({ slide }) {
  return (
    <div className="relative w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[300px] mx-auto">
      {/* Phone Frame */}
      <div className="bg-black rounded-3xl p-1.5 sm:p-2 shadow-2xl">
        {/* Phone Screen */}
        <div className="bg-white rounded-[1.5rem] sm:rounded-[1.5rem] overflow-hidden aspect-[9/19.5] flex flex-col">
          {/* Status Bar */}
          <div className="bg-gray-800 text-white text-xs px-3 py-1 sm:py-1.5 flex justify-between items-center flex-shrink-0">
            <span>9:41 AM</span>
            <div className="flex gap-1">
              <div className="w-3 h-1.5 border border-white rounded-full"></div>
              <div className="w-5 h-2.5 border-2 border-white rounded-full"></div>
            </div>
          </div>

          {/* Phone Content */}
          <div className="flex-1 overflow-y-auto bg-gray-50">
            {slide.id === 1 && slide.phoneContent && <SlideOneContent slide={slide} />}
            {slide.id === 2 && slide.phoneContent && <SlideTwoContent slide={slide} />}
            {slide.id === 3 && slide.phoneContent && <SlideThreeContent slide={slide} />}
            {slide.id === 4 && slide.phoneContent && <SlideFourContent slide={slide} />}
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideOneContent({ slide }) {
  return (
    <div className="p-3 sm:p-4 space-y-4 bg-white h-full">
      {/* Header */}
      <div className="flex items-center gap-2">
        <FaArrowLeft className="w-4 h-4 text-gray-700" />
        <h4 className="font-semibold text-sm sm:text-base text-gray-900">Contact Details</h4>
      </div>

      {/* Advisor Card */}
      <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-lg font-medium text-blue-600">KY</span>
          </div>
          <div className="flex-1 min-w-0">
            <h5 className="font-medium text-sm text-gray-900 mb-0.5">
              {slide.phoneContent.advisor.name}
            </h5>
            <p className="text-xs text-gray-600 mb-0.5">{slide.phoneContent.advisor.role}</p>
            <p className="text-xs text-gray-500 truncate">{slide.phoneContent.advisor.phone}</p>
          </div>
        </div>

        {/* Contact Icons */}
        <div className="flex gap-2">
          {slide.phoneContent.icons.map((item, idx) => (
            <div
              key={idx}
              className={`${item.color} p-2 rounded-full cursor-pointer hover:scale-110 transition-transform`}
            >
              <item.icon className={`w-4 h-4 ${item.iconColor}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="space-y-2">
        {slide.phoneContent.chat.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2.5 rounded-xl text-xs sm:text-sm leading-relaxed break-words ${msg.sender === 'advisor'
              ? 'bg-white border border-gray-200'
              : 'bg-[var(--primary-blue-dark)] text-white ml-auto max-w-[85%]'
              }`}
          >
            <p className="break-words">{msg.message}</p>
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="bg-gray-100 rounded-full px-3 py-2 flex items-center justify-between mt-auto">
        <span className="text-xs text-gray-500">Type Something</span>
        <div className="w-6 h-6 bg-[var(--primary-blue-dark)] rounded-full flex items-center justify-center">
          <span className="text-white text-xs">→</span>
        </div>
      </div>
    </div>
  );
}

function SlideTwoContent({ slide }) {
  return (
    <div className="p-3 sm:p-4 h-full flex flex-col bg-white gap-3">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-blue-600 text-xs font-medium">PP</span>
        </div>
        <h4 className="font-semibold text-sm sm:text-base text-gray-900 truncate">
          Borrowww Help Center
        </h4>
      </div>

      {/* Message Card */}
      <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200 flex-1 flex  justify-center">
        <div className="space-y-1.5 text-xs sm:text-sm break-words">
          <p className="text-gray-800 font-medium break-words">Hi Gautam,</p>
          <p className="text-gray-700 break-words">Hope you are doing well.</p>
          <p className="text-gray-700 break-words">
            Your next{' '}
            <span className="font-semibold text-[var(--primary-blue)]">
              EMI due date is 26th Dec, 2025
            </span>
          </p>
          <p className="text-gray-700 break-words">
            Visit the bank&apos;s website to make an online payment or reach out to us!
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        {slide.phoneContent.buttons.map((btn, idx) => (
          <button
            key={idx}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold border-2 transition-all duration-300 ${btn.style}`}
          >
            {btn.text}
          </button>
        ))}
      </div>
    </div>
  );
}

function SlideThreeContent({ slide }) {
  return (
    <div className="bg-gradient-to-b from-[var(--primary-blue-dark)] via-blue-600 to-blue-500 min-h-[55dvh] flex flex-col items-center justify-center p-4">
      {/* Lock Icon */}
      <div className="mb-4">
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
      </div>

      {/* Time Display */}
      <div className="text-white text-center mb-6">
        <div className="text-4xl sm:text-5xl font-medium mb-1 drop-shadow-lg">10:00</div>
        <div className="text-xs sm:text-sm opacity-90">Friday 18 June</div>
      </div>

      {/* Notifications */}
      <div className="space-y-2 w-full">
        {slide.phoneContent.notifications.map((notif, idx) => (
          <div key={idx} className="bg-white rounded-lg p-2.5 shadow-lg flex items-start gap-2">
            <div className={`${notif.iconBg} p-2 rounded-full flex-shrink-0`}>
              <notif.icon className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h5 className="font-medium text-xs sm:text-sm text-gray-900 mb-0.5 line-clamp-1">
                {notif.title}
              </h5>
              <p className="text-xs text-gray-600 line-clamp-2">{notif.message}</p>
            </div>
            <span className="text-xs font-semibold text-gray-400 flex-shrink-0">{notif.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideFourContent({ slide }) {
  return (
    <div className="p-3 sm:p-4 space-y-3 h-full bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 flex flex-col justify-center gap-0.5">
            <div className="w-3 h-0.5 bg-gray-600"></div>
            <div className="w-3 h-0.5 bg-gray-600"></div>
            <div className="w-3 h-0.5 bg-gray-600"></div>
          </div>
          <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-medium">PP</span>
          </div>
          <span className="text-sm font-medium text-gray-900 truncate">Borrowww</span>
        </div>
        <button className="text-xs text-white font-semibold flex items-center gap-1 bg-green-500 px-2 py-1 rounded">
          <FaPhone className="w-3 h-3" />
          <span>Help</span>
        </button>
      </div>

      {/* Status Heading */}
      <h4 className="text-sm font-medium text-gray-900">{slide.phoneContent.status}</h4>

      {/* Loan Card */}
      <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200">
        <div className="flex justify-between items-start mb-1">
          <div>
            <h5 className="font-medium text-sm text-gray-900 mb-0.5">
              {slide.phoneContent.loanCard.number}
            </h5>
            <div className="flex items-center gap-1">
              <p className="text-xs text-gray-600">{slide.phoneContent.loanCard.bank}</p>
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
          </div>
          <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
            {slide.phoneContent.loanCard.status}
          </span>
        </div>
        <p className="text-xs text-gray-500 mb-0.5">
          Requested On: {slide.phoneContent.loanCard.requestedOn}
        </p>
        <p className="text-base font-medium text-gray-900">{slide.phoneContent.loanCard.amount}</p>
      </div>

      {/* Progress Card */}
      <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200">
        <div className="flex items-start gap-2 mb-1">
          <FaCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <h5 className="font-medium text-xs sm:text-sm text-gray-900 mb-0.5">
              {slide.phoneContent.progress.title}
            </h5>
            <p className="text-xs text-gray-600 mb-0.5">{slide.phoneContent.progress.date}</p>
            <p className="text-xs text-gray-700">{slide.phoneContent.progress.status}</p>
          </div>
        </div>
        <button className="mt-2 text-xs text-blue-600 font-semibold border border-blue-600 px-2 py-1 rounded hover:bg-blue-50 transition-colors">
          View Details
        </button>
      </div>

      {/* Offer Banner */}
      <div className="bg-orange-500 text-white rounded-lg p-2 text-center">
        <p className="text-xs sm:text-sm font-semibold">{slide.phoneContent.offer}</p>
      </div>
    </div>
  );
}
