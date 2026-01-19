import Image from 'next/image';

import { first, second, third } from '@/assets';

import { Button } from '@/components/ui/button';

export default function HomeLoanSections() {
  return (
    <div className="w-full">
      {/* Section 1: Rate Cut */}
      <section className="bg-white">
        <div className=" mx-auto">
          <div className="grid lg:grid-cols-2 items-center">
            <div className="flex justify-center">
              <Image
                src={first}
                alt="Mobile app showing loan comparison interface"
                width={1000}
                height={1000}
                className="object-cover w-auto h-auto md:h-[600px] "
              />
            </div>
            <div className="space-y-6 py-16 px-4 md:px-10 ">
              <h2 className="text-4xl lg:text-5xl font-medium leading-tight">
                Find out if your home loan is competitive
              </h2>

              <p className="text-gray-800 md:text-lg leading-relaxed">
                Think a lower rate&apos;s out of reach? Our Home Loan Health Check can reveal your
                savings potential. Discover how adjusting your loan might reduce your monthly
                payments and loan term. Rates can vary—our brokers are here to offer personalised
                advice.
              </p>

              <Button className="bg-[var(--primary-blue-dark)] hover:bg-[var(--primary-blue)] text-white px-8 py-3 rounded-md font-semibold text-lg">
                CHECK MY HOME LOAN HEALTH
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Home Loan Health Check */}
      <section className="bg-[#3a6ea513] ">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <Image
                src={second}
                alt="Rate cut illustration with document and plant"
                width={1000}
                height={1000}
                className="object-cover h-[400px] md:h-[600px]"
              />
            </div>
            <div className="space-y-8 py-16 px-10">
              <h2 className="text-4xl lg:text-5xl font-medium text-gray-800 leading-tight">
                A rate cut is here. Here&apos;s how we can help
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#3A6EA5] text-white rounded-full flex items-center justify-center font-medium">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Compare & apply online 24/7
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      We have digitised the whole home loan process so that you can search, compare
                      and apply with confidence at your own pace.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#3A6EA5] text-white rounded-full flex items-center justify-center font-medium">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Reduce your monthly repayments
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Find a lower rate from 25+ lenders and thousands of home loans using our smart
                      technology.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#3A6EA5] text-white rounded-full flex items-center justify-center font-medium">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Expert support at your fingertips
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Our Home Loan Specialists do the work. They liaise with the lender, keep you
                      updated on your loan&apos;s progress, and are available to answer your
                      questions via phone, email or live chat.
                    </p>
                  </div>
                </div>
              </div>

              <Button className="bg-[#3A6EA5] hover:bg-[#2d5a8a] text-white px-8 py-3 rounded-md font-semibold text-lg">
                GET STARTED
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Credit Score Check */}
      <section>
        <div className="mx-auto">
          <div className="grid lg:grid-cols-2  items-center">
            <div className="rounded-2xl space-y-6 py-7 px-10">
              <h2 className="text-4xl lg:text-5xl font-medium leading-tight">
                Check your credit score for free, in minutes
              </h2>

              <p className="text-gray-800 text-lg leading-relaxed">
                Get home loan ready by checking your credit score.
              </p>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-3 flex-shrink-0"></div>
                  <span className="text-gray-800">Only takes a few short minutes</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-3 flex-shrink-0"></div>
                  <span className="text-gray-800">
                    Check as many times as you like with no impact
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-3 flex-shrink-0"></div>
                  <span className="text-gray-800">Gain clarity on your financial health</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-3 flex-shrink-0"></div>
                  <span className="text-gray-800">
                    Get expert guidance from a Home Loan Specialist
                  </span>
                </li>
              </ul>

              <Button className="bg-[var(--primary-blue-dark)] hover:bg-[var(--primary-blue)] text-white px-8 py-3 rounded-md font-semibold text-lg">
                CHECK MY SCORE
              </Button>
            </div>

            <div className="flex justify-center">
              <Image
                src={third}
                alt="Mobile interface showing credit score information"
                width={1000}
                height={1000}
                className="object-cover h-[400px] md:h-[600px]"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
