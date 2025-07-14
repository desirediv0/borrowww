import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import WellSpentUI from "@/components/wellSpentUI";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen  overflow-hidden">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex">
              <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold tracking-wide">
                TRY IT NOW!
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Change the way you use your{" "}
              <em className="italic text-blue-600">money</em>
            </h1>

            {/* Subtext */}
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              From your everyday spending, to planning for your future with
              savings and investments, BorrowWWW helps you get more from your
              money.
            </p>

            {/* CTA Button */}
            <Button
              size="lg"
              className="bg-green-700 hover:bg-green-800 text-white px-6 py-8 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
            ><button className="w-12 h-12 bg-green-700 hover:bg-blue-600 group-hover:bg-white  rounded-full flex items-center justify-center transition-colors duration-200 group rotate-on-hover">
                <svg
                  className="w-5 h-5 text-white group-hover:text-gray-900 transition-colors duration-200 rotate-svg"
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
              Get Started Now
              
            </Button>

            {/* Rating */}
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-lg font-semibold text-gray-900">5.0</span>
              <span className="text-gray-600">from 120+ reviews</span>
            </div>
          </div>

          {/* Right Side Animated Elements */}
          <div className="">
            <div className="grid grid-cols-2  h-[600px] lg:h-[700px]  ">
              {/* Top Left - Phone Mockup */}
              <div className=" relative flex flex-col justify-center animate-slide-in-right  overflow-hidden">
                <Image
                  src="/phn.avif"
                  alt="Phone Mockup"
                  width={400}
                  height={800}
                  priority
                  className="w-full h-auto"
                />
                {/* Background decorative elements */}
                <div className="absolute top-5 right-4 w-20 h-3 animate-pulse  bg-white rounded"></div>
                <div className="absolute top-10 right-4 w-16 h-3 animate-pulse  bg-white rounded"></div>
                <br />
              </div>
              {/* Top Right - Currencies Card */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-l-[14rem] p-8 flex flex-col justify-center animate-slide-in-right relative overflow-hidden">
                <div className="space-y-4">
                  <div className="text-5xl lg:text-6xl font-bold text-gray-800">
                    56+
                  </div>
                  <div className="text-gray-600 text-lg">Currencies</div>
                  <div className="flex justify-center mt-6">
                    <div className="w-20 h-20 relative">
                      {/* Globe wireframe icon */}
                      <svg
                        className="w-full h-full text-gray-600 animate-spin duration-0.1s"
                        viewBox="0 0 80 80"
                        fill="none"
                      >
                        <circle
                          cx="40"
                          cy="40"
                          r="35"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M40 5 C 25 20, 25 60, 40 75"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M40 5 C 55 20, 55 60, 40 75"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M10 40 L 70 40"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M15 25 L 65 25"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M15 55 L 65 55"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Left - Users Active */}
              <div className="bg-gray-100 rounded-tr-[12rem] border p-8 flex flex-col justify-center animate-slide-in-left relative overflow-hidden">
                <div className="space-y-6">
                  {/* Sparkle decorations */}
                  <div className="flex space-x-2 animate-pulse">
                    <div className="w-6 h-6 text-green-600">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
                      </svg>
                    </div>
                    <div className="w-4 h-4 text-green-400">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
                      </svg>
                    </div>
                  </div>

                  <div className="text-gray-700 text-xl font-medium">
                    Users Active
                  </div>

                  {/* Profile avatars */}
                  <div className="flex -space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white flex items-center justify-center">
                      <span className="text-white text-sm font-bold">J</span>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white flex items-center justify-center">
                      <span className="text-white text-sm font-bold">A</span>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-white flex items-center justify-center">
                      <span className="text-white text-sm font-bold">M</span>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-green-700 border-2  border-white flex items-center justify-center">
                      <span className="text-white text-lg animate-pulse font-bold">
                        +
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Right - Savings Card */}
              <div className="bg-green-700  p-8 flex flex-col justify-between animate-fade-in-up text-white relative overflow-hidden">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="text-4xl lg:text-5xl font-bold">
                      $196,000
                    </div>
                    <div className="w-6 h-6">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M7 17L17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </div>
                  </div>

                  <div className="text-green-200 text-lg">Saving</div>

                  {/* Chart */}
                  <div className="h-20 relative mt-8">
                    <svg className="w-full h-full" viewBox="0 0 200 60">
                      <path
                        d="M0,45 Q25,40 50,35 T100,20 T150,15 T200,10"
                        stroke="white"
                        strokeWidth="2.5"
                        fill="none"
                        className="animate-draw-line-delayed"
                      />
                      <circle
                        cx="200"
                        cy="10"
                        r="3"
                        fill="white"
                        className="animate-pulse"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <WellSpentUI />
    </div>
  );
}
