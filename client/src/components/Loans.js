'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function Loans() {
  const [scale, setScale] = useState(1);
  const [opacity, setOpacity] = useState(1);
  const [isSticky, setIsSticky] = useState(false);
  const [cardStates, setCardStates] = useState([
    { opacity: 0, transform: 'translateY(100px) scale(0.8)', delay: 0, rotation: -5 },
    { opacity: 0, transform: 'translateY(80px) scale(0.8)', delay: 0.15, rotation: 3 },
    { opacity: 0, transform: 'translateY(120px) scale(0.8)', delay: 0.3, rotation: -2 },
    { opacity: 0, transform: 'translateY(60px) scale(0.8)', delay: 0.45, rotation: 4 },
  ]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const updateScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate scroll progress with Lenis smooth scrolling
      const scrollProgress = Math.max(
        0,
        Math.min(1, (windowHeight - rect.top) / (windowHeight * 1.5))
      );

      // Sticky functionality (only active until 70% scroll progress)
      if (scrollProgress <= 0.7) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      // Heading scale and fade effect (0 to 0.5 progress)
      if (scrollProgress <= 0.5) {
        const scaleProgress = scrollProgress / 0.5;
        const newScale = 1 + scaleProgress * 0.3; // Scale from 1 to 1.3
        setScale(newScale);
        setOpacity(1);
      } else {
        setScale(1.3);
        // Keep heading visible but dimmed (0.5 to 1.0 progress)
        const fadeProgress = (scrollProgress - 0.5) / 0.5;
        setOpacity(Math.max(0.3, 1 - fadeProgress * 0.7)); // Never fully fade out
      }

      // Cards animation with Lenis smooth interpolation (0.3 to 1.0 progress)
      if (scrollProgress >= 0.3) {
        const cardProgress = (scrollProgress - 0.3) / 0.7;

        setCardStates((prevStates) =>
          prevStates.map((card, index) => {
            const individualProgress = Math.max(0, Math.min(1, (cardProgress - card.delay) / 0.4));
            const speed = 0.9 + index * 0.15; // Different speeds for each card
            const easeOut = 1 - Math.pow(1 - individualProgress, 3); // Smooth easing

            return {
              ...card,
              opacity: easeOut * speed,
              transform: `translateY(${100 - easeOut * 100 * speed}px) scale(${0.8 + easeOut * 0.2}) rotate(${card.rotation * (1 - easeOut)}deg)`,
            };
          })
        );
      } else {
        setCardStates((prevStates) =>
          prevStates.map((card) => ({
            ...card,
            opacity: 0,
            transform: `translateY(${100 + card.delay * 30}px) scale(0.8) rotate(${card.rotation}deg)`,
          }))
        );
      }
    };

    // Use Lenis with optimized settings
    if (window.lenis) {
      const lenis = window.lenis;

      // Optimize Lenis for smooth animations
      lenis.options.smooth = true;
      lenis.options.duration = 1.2;
      lenis.options.easing = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

      lenis.on('scroll', updateScroll);
      return () => lenis.off('scroll', updateScroll);
    } else {
      window.addEventListener('scroll', updateScroll);
      return () => window.removeEventListener('scroll', updateScroll);
    }
  }, []);

  const cardData = [
    {
      title: 'Personal Loans',
      subtitle: 'Quick & Easy Application',
      amount: '₹50,000',
      growth: '+12.5%',
      icon: '₹',
      position: 'left-16 top-8',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Home Loans',
      subtitle: 'Dream Home Financing',
      amount: '₹25,00,000',
      growth: '+8.3%',
      icon: '🏠',
      position: 'right-16 top-12',
      color: 'from-[#2D3E50] to-cyan-500',
    },
    {
      title: 'Education Loans',
      subtitle: 'Invest in Your Future',
      amount: '₹8,00,000',
      growth: '+9.7%',
      icon: '🎓',
      position: 'right-12 bottom-8',
      color: 'from-orange-500 to-red-500',
    },
    {
      title: 'Business Loans',
      subtitle: 'Grow Your Business',
      amount: '₹10,00,000',
      growth: '+15.2%',
      icon: '💼',
      position: 'left-12 bottom-12',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="bg-purple-900 text-white min-h-[100vh] relative"
      style={{ background: 'linear-gradient(135deg, #581c87 0%, #7c3aed 50%, #4c1d95 100%)' }}
    >
      <div className="h-screen flex items-center justify-center relative overflow-hidden">
        <div className="text-center relative w-full h-full">
          {/* Background heading - always visible but dimmed */}
          <h1
            className="text-9xl font-medium transition-all duration-500 ease-out absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 text-purple-300/40"
            style={{
              transform: `translate(-50%, -50%) scale(${scale})`,
              opacity: opacity,
            }}
          >
            LOANS
          </h1>

          {/* Floating cards positioned like dashboard */}
          {cardData.map((card, index) => (
            <div
              key={index}
              className={`absolute ${card.position} transition-all duration-1000 ease-out z-10`}
              style={{
                opacity: cardStates[index]?.opacity || 0,
                transform: cardStates[index]?.transform || 'translateY(100px) scale(0.8)',
              }}
            >
              <div className="bg-white rounded-xl p-6 max-w-xs border border-white/20 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`text-2xl p-2 rounded-lg bg-gradient-to-r ${card.color} text-white w-12 h-12 flex items-center justify-center`}
                  >
                    {card.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">{card.subtitle}</div>
                    <div className="text-green-600 text-sm font-semibold">{card.growth}</div>
                  </div>
                </div>

                <h3 className="text-xl font-medium text-gray-800 mb-2">{card.title}</h3>
                <div className="text-2xl font-medium text-gray-800 mb-4">{card.amount}</div>

                <div className="h-2 bg-gray-200 rounded-full mb-4">
                  <div
                    className={`h-2 bg-gradient-to-r ${card.color} rounded-full transition-all duration-1000`}
                    style={{ width: `${70 + index * 8}%` }}
                  ></div>
                </div>

                <button className="w-full bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-300 text-sm">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
