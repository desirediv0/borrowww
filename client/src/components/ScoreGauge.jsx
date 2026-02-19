import React from 'react';
import { motion } from 'framer-motion';

const ScoreGauge = ({ score }) => {
  // Score range: 300 - 900
  // Normalized: (score - 300) / 600 * 100
  const normalizedScore = Math.min(Math.max((score - 300) / 600 * 100, 0), 100);
  
  // Color based on score
  let color = '#ef4444'; // Red (300-549)
  let status = 'Poor';
  
  if (score >= 750) {
    color = '#22c55e'; // Green
    status = 'Excellent';
  } else if (score >= 650) {
    color = '#eab308'; // Yellow
    status = 'Good';
  } else if (score >= 550) {
    color = '#f97316'; // Orange
    status = 'Fair';
  }

  // Calculate circumference for stroke-dasharray
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
      <div className="relative w-48 h-48">
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="12"
            fill="transparent"
          />
          {/* Progress Circle */}
          <motion.circle
            cx="96"
            cy="96"
            r={radius}
            stroke={color}
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold" style={{ color }}>
            {score}
          </span>
          <span className="text-sm text-gray-500 mt-1">out of 900</span>
        </div>
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-xl font-semibold" style={{ color }}>{status}</h3>
        <p className="text-sm text-gray-500">Credit Score</p>
      </div>
    </div>
  );
};

export default ScoreGauge;
