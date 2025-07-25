'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

const LOOP_TIME = 20;

export default function LogoSlider() {
  const logos = [
    { src: '/logos/sbi.svg', alt: 'State Bank of India' },
    { src: '/logos/hdfc.svg', alt: 'HDFC Bank' },
    { src: '/logos/icici.svg', alt: 'ICICI Bank' },
    { src: '/logos/axis.svg', alt: 'Axis Bank' },
    { src: '/logos/kotak.svg', alt: 'Kotak Mahindra Bank' },
    { src: '/logos/pnb.svg', alt: 'Punjab National Bank' },
  ];

  return (
    <div className="overflow-hidden py-8 bg-white">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Trusted by Leading Banks</h3>
        <p className="text-gray-500">Partnered with top financial institutions across India</p>
      </div>
      <motion.div
        className="flex space-x-16"
        initial={{ x: 0 }}
        animate={{ x: '-50%' }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'linear',
          duration: LOOP_TIME,
        }}
        style={{ width: '200%' }}
      >
        {/* Duplicate logos for infinite effect */}
        {[...logos, ...logos].map((logo, i) => (
          <div key={i} className="flex-shrink-0 flex flex-col items-center">
            <div className="w-24 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
              <span className="text-gray-600 font-semibold text-sm">{logo.alt}</span>
            </div>
            <span className="text-gray-700 text-xs text-center max-w-20">{logo.alt}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
