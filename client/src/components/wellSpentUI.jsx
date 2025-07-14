import React from "react";
import { IconDiamond, IconCircles, IconFlower } from "@tabler/icons-react";
import "./wellSpentUI.css";

const WellSpentUI = () => {
  return (
    <div className="min-h-screen px-4 py-24 md:px-8 lg:px-16">
      <div className="w-full mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-6 lg:mb-0">
            Make your spend, Well-spent
          </h1>
          <p className="text-gray-600 text-lg md:text-xl lg:text-2xl max-w-md lg:max-w-lg leading-relaxed">
            Manages a diversified group of specialized private credit brands
            with efficient tech-enabled processes.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Transparency Card */}
          <div className="bg-white border p-10 lg:p-10 shadow-sm hover:shadow-md duration-300 group hover:rounded-tr-[12rem] transition-all hover:bg-[#fff8ec]">
            <div className="mb-8">
              <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center mb-6 group-hover:border-gray-400 transition-colors">
                <IconFlower size={32} className="text-gray-600" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-normal text-gray-900 mb-4">
                Transparency
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                A departure from the industry norm of ambiguity, Montfort, as a
                public and finest company.
              </p>
            </div>
            <div className="flex justify-start">
              <button className="w-12 h-12 bg-gray-100 hover:bg-green-700 group-hover:bg-green-700 rounded-full flex items-center justify-center transition-colors duration-200 group rotate-on-hover">
                <svg
                  className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-200 rotate-svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 17L17 7M17 7H7M17 7V17"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Creative expansion Card */}
          <div className="bg-white border p-8 lg:p-10 shadow-sm hover:shadow-md duration-300 group hover:rounded-br-[12rem] transition-all hover:bg-[#fff8ec]">
            <div className="mb-8">
              <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center mb-6 group-hover:border-gray-400 transition-colors">
                <IconDiamond size={32} className="text-gray-600" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-normal text-gray-900 mb-4">
                Creative expansion
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Ascope proprietary fintech platform helps our subsidiaries
                locate and manage investments.
              </p>
            </div>
            <div className="flex justify-start">
              <button className="w-12 h-12 bg-gray-100 hover:bg-green-700 group-hover:bg-green-700 rounded-full flex items-center justify-center transition-colors duration-200 group rotate-on-hover">
                <svg
                  className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-200 rotate-svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 17L17 7M17 7H7M17 7V17"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Private Credit Investments Card */}
          <div className="bg-white border p-8 lg:p-10 shadow-sm hover:shadow-md duration-300 group hover:rounded-tr-[12rem] transition-all hover:bg-[#fff8ec]">
            <div className="mb-8">
              <div className="w-16 h-16 rounded-full border-2 border-gray-400 flex items-center justify-center mb-6 group-hover:border-gray-500 transition-colors">
                <IconCircles size={32} className="text-gray-700" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-normal text-gray-900 mb-4">
                Private Credit Investments
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                We provide access to unique private credit investments; a rare
                but valuable part of a sound investment portfolio.
              </p>
            </div>
            <div className="flex justify-start">
              <button className="w-12 h-12 bg-gray-100 hover:bg-green-700 group-hover:bg-green-700 rounded-full flex items-center justify-center transition-colors duration-200 group rotate-on-hover">
                <svg
                  className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-200 rotate-svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 17L17 7M17 7H7M17 7V17"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Numbers Section */}
      <div className="w-full mt-24 relative">
        {/* Background Image with overlay */}
        <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('banner.avif')`, // Adjust the path to your banner image
            }}
          ></div>
          <div className="absolute inset-0 bg-emerald-900/60"></div>
        </div>

        {/* Overlay Content */}
        <div className="relative bg-transparent rounded-2xl py-16 px-8 lg:px-24 flex flex-col lg:flex-row items-center justify-between text-white">
          <div className="flex-1 flex flex-col items-center lg:items-start mb-12 lg:mb-0">
            <span className="text-[5rem] lg:text-[7rem] font-light leading-none">
              $14B
            </span>
            <span className="text-2xl mt-4 font-normal">
              Funds and syndicates
            </span>
          </div>
          <div className="flex-1 flex flex-col items-center lg:items-start mb-12 lg:mb-0">
            <span className="text-[5rem] lg:text-[7rem] font-light leading-none">
              23k+
            </span>
            <span className="text-2xl mt-4 font-normal">
              Raised by active startups
            </span>
          </div>
          <div className="flex-1 flex flex-col items-center lg:items-start">
            <span className="uppercase text-lg font-semibold mb-2 tracking-wider">
              NUMBERS
            </span>
            <span className="text-4xl lg:text-6xl font-light leading-tight text-center lg:text-left">
              Market and build
              <br />
              the solutions
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellSpentUI;
