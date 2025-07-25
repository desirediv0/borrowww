'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

const LOOP_TIME = 20;

export default function LogoSlider() {
  const logos = [
    { src: '/logos/openai.svg', alt: 'OpenAI' },
    { src: '/logos/raycast.svg', alt: 'Raycast' },
    { src: '/logos/zenefits.svg', alt: 'Zenefits' },
    { src: '/logos/loom.svg', alt: 'Loom' },
    { src: '/logos/hubspot.svg', alt: 'HubSpot' },
  ];

  return (
    <div className="overflow-hidden py-8 bg-white">
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
            <Image
              src={logo.src}
              alt={logo.alt}
              className="h-12 md:h-16 "
              width={200}
              height={200}
            />
            <span className="mt-2 text-gray-700 text-sm">{logo.alt}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
