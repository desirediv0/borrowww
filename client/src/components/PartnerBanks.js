'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function PartnerBanks() {
  const partners = [
    { name: 'ICICI Bank', logo: '/icici.png' },
    { name: 'Bank of Baroda', logo: '/bank-of-baroda.png' },
    { name: 'Bajaj Finserv', logo: '/bajajfinserv.png' },
  ];

  return (
    <section className="py-10 bg-gradient-to-r from-gray-50 via-white to-gray-50 border-y border-gray-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-16">
          
          {/* Left Side: Heading (Larger & More Prominent) */}
          <div className="flex-shrink-0 lg:max-w-xs">
            <h2 className="text-2xl sm:text-3xl font-black text-[#2D3E50] tracking-wide uppercase leading-tight">
              Our Lending{' '}
              <span className="block text-[#3A6EA5] font-black">Partners</span>
            </h2>
            <div className="mt-3 w-16 h-1 bg-gradient-to-r from-[#2D3E50] to-[#3A6EA5] rounded-full"></div>
          </div>

          {/* Right Side: Logos (Flat design, clean layout, no heavy shadows) */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 items-center flex-grow justify-items-end w-full lg:w-auto">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, borderColor: '#3A6EA5/20' }}
                className="w-full max-w-[190px] h-16 sm:h-20 flex items-center justify-center bg-white rounded-2xl p-3 sm:p-4 border border-gray-100 hover:border-gray-200 transition-all duration-200"
              >
                <div className="relative w-full h-8 sm:h-12">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain"
                    sizes="(max-w-768px) 33vw, 190px"
                  />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
