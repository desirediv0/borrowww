'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    FaBuilding,
    FaCalculator,
    FaCalendarAlt,
    FaCheckCircle,
    FaPercentage,
    FaRupeeSign,
} from 'react-icons/fa';

import { motion } from 'framer-motion';

export default function LAPClient() {
    const router = useRouter();
    const [propertyValue, setPropertyValue] = useState(10000000);
    const [loanAmount, setLoanAmount] = useState(6000000);
    const [interestRate, setInterestRate] = useState(12.5);
    const [tenureYears, setTenureYears] = useState(15);
    const [tenureMonths, setTenureMonths] = useState(0);
    const [emi, setEmi] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);

    const calculateEMI = useCallback(() => {
        const principal = loanAmount;
        const rate = interestRate / 12 / 100;
        const totalMonths = tenureYears * 12 + tenureMonths;

        let emiValue;
        if (rate === 0) {
            emiValue = principal / totalMonths;
        } else {
            emiValue =
                (principal * rate * Math.pow(1 + rate, totalMonths)) /
                (Math.pow(1 + rate, totalMonths) - 1);
        }

        setEmi(emiValue);
        const totalAmountValue = emiValue * totalMonths;
        setTotalAmount(totalAmountValue);
        setTotalInterest(totalAmountValue - principal);
    }, [loanAmount, interestRate, tenureYears, tenureMonths]);

    useEffect(() => {
        calculateEMI();
    }, [calculateEMI]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const features = [
        {
            title: 'High Loan Amount',
            description: 'Get up to 75% of your property value as loan',
            icon: FaRupeeSign,
        },
        {
            title: 'Flexible Usage',
            description: 'Use funds for business, education, or any purpose',
            icon: FaCheckCircle,
        },
        {
            title: 'Lower Interest',
            description: 'Competitive rates compared to personal loans',
            icon: FaPercentage,
        },
        {
            title: 'Long Tenure',
            description: 'Repayment period up to 15 years',
            icon: FaCalendarAlt,
        },
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-[var(--primary-blue-light)] py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center px-4 py-2 bg-[var(--primary-blue)]/10 text-[var(--primary-blue)] rounded-full text-sm font-medium mb-6">
                            <FaBuilding className="mr-2" />
                            Loan Against Property Calculator
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-gray-900 mb-4 sm:mb-6 tracking-tight">
                            Loan Against{' '}
                            <span className="text-[var(--primary-blue)] italic tiemposfine">Property</span>
                        </h1>
                        <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
                            Calculate your LAP EMI and get funds against your property. Use the loan amount for
                            any purpose with competitive rates.
                        </p>
                        <p className="text-base sm:text-lg font-semibold text-[var(--primary-blue)] mt-3">
                            Interest rate from 7.75%* p.a.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Calculator Section */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-6 lg:gap-12">
                        {/* Calculator Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="bg-white p-6  rounded-3xl shadow-lg border-2 border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <div className="flex items-center gap-3 mb-6 ">
                                <div className="w-14 h-14 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-2xl flex items-center justify-center shadow-lg">
                                    <FaCalculator className="text-white text-xl" />
                                </div>
                                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                                    Calculate Your LAP
                                </h2>
                            </div>

                            <div className=" grid  md:grid-cols-2 gap-4">
                                {/* Property Value */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Property Value
                                    </label>
                                    <div className="relative">
                                        <FaRupeeSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="number"
                                            value={propertyValue}
                                            onChange={(e) => setPropertyValue(Number(e.target.value))}
                                            className="w-full pl-8 pr-3 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)] transition-all duration-200 text-sm bg-gray-50 focus:bg-white"
                                            placeholder="Enter property value"
                                        />
                                    </div>
                                    <div className="mt-3">
                                        <input
                                            type="range"
                                            min="1000000"
                                            max="100000000"
                                            step="100000"
                                            value={propertyValue}
                                            onChange={(e) => setPropertyValue(Number(e.target.value))}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                        />
                                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                                            <span>₹10L</span>
                                            <span>₹10Cr</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Loan Amount */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Loan Amount Required
                                    </label>
                                    <div className="relative">
                                        <FaRupeeSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="number"
                                            value={loanAmount}
                                            onChange={(e) => setLoanAmount(Number(e.target.value))}
                                            className="w-full pl-8 pr-3 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)] transition-all duration-200 text-sm bg-gray-50 focus:bg-white"
                                            placeholder="Enter loan amount"
                                        />
                                    </div>
                                    <div className="mt-3">
                                        <input
                                            type="range"
                                            min="1000000"
                                            max={propertyValue * 0.6}
                                            step="100000"
                                            value={loanAmount}
                                            onChange={(e) => setLoanAmount(Number(e.target.value))}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                        />
                                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                                            <span>₹10L</span>
                                            <span>{formatCurrency(propertyValue * 0.6)}</span>
                                        </div>
                                    </div>
                                    <div className="mt-2 text-sm text-gray-600">
                                        Max loan amount: 60% of property value
                                    </div>
                                </div>

                                {/* Interest Rate */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Interest Rate (% per annum)
                                    </label>
                                    <div className="relative">
                                        <FaPercentage className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="number"
                                            value={interestRate}
                                            onChange={(e) => setInterestRate(Number(e.target.value))}
                                            className="w-full pl-8 pr-3 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)] transition-all duration-200 text-sm bg-gray-50 focus:bg-white"
                                            placeholder="Enter interest rate"
                                            step="0.1"
                                        />
                                    </div>
                                    <div className="mt-3">
                                        <input
                                            type="range"
                                            min="10"
                                            max="18"
                                            step="0.1"
                                            value={interestRate}
                                            onChange={(e) => setInterestRate(Number(e.target.value))}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                        />
                                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                                            <span>10%</span>
                                            <span>18%</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Tenure */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1 ">
                                        Loan Tenure
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        {/* Years */}
                                        <div>
                                            <label className="block text-xs font-medium text-gray-600 mb-1">Years</label>
                                            <div className="relative">
                                                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                                                <input
                                                    type="number"
                                                    value={tenureYears}
                                                    onChange={(e) => setTenureYears(Number(e.target.value))}
                                                    className="w-full pl-8 pr-3 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)] transition-all duration-200 text-sm bg-gray-50 focus:bg-white"
                                                    placeholder="Years"
                                                    min="0"
                                                    max="15"
                                                />
                                            </div>
                                            <div className="mt-2">
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="15"
                                                    step="1"
                                                    value={tenureYears}
                                                    onChange={(e) => setTenureYears(Number(e.target.value))}
                                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                                />
                                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                                    <span>0</span>
                                                    <span>15</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Months */}
                                        <div>
                                            <label className="block text-xs font-medium text-gray-600 mb-1">Months</label>
                                            <div className="relative">
                                                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                                                <input
                                                    type="number"
                                                    value={tenureMonths}
                                                    onChange={(e) => setTenureMonths(Number(e.target.value))}
                                                    className="w-full pl-8 pr-3 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)] transition-all duration-200 text-sm bg-gray-50 focus:bg-white"
                                                    placeholder="Months"
                                                    min="0"
                                                    max="11"
                                                />
                                            </div>
                                            <div className="mt-2">
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="11"
                                                    step="1"
                                                    value={tenureMonths}
                                                    onChange={(e) => setTenureMonths(Number(e.target.value))}
                                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                                />
                                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                                    <span>0</span>
                                                    <span>11</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-3 text-sm text-gray-600">
                                        Total Tenure: {tenureYears} years {tenureMonths} months (
                                        {tenureYears * 12 + tenureMonths} months)
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Results */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-3"
                        >
                            {/* EMI Result */}
                            <div className="bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-3xl p-6  text-white shadow-2xl">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl  font-medium mb-4">Your Monthly EMI</h3>
                                    <div className="text-3xl sm:text-4xl  font-medium mb-3 sm:mb-4">
                                        {formatCurrency(emi)}
                                    </div>
                                </div>
                                <p className="text-white/90 mb-6  font-medium text-sm">
                                    Monthly payment for {tenureYears} years {tenureMonths} months at {interestRate}%
                                    interest rate
                                </p>
                                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                    <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
                                        <div className="text-xs sm:text-sm text-white/80 font-medium mb-1">
                                            Total Amount
                                        </div>
                                        <div className="text-base sm:text-lg font-medium">
                                            {formatCurrency(totalAmount)}
                                        </div>
                                    </div>
                                    <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
                                        <div className="text-xs sm:text-sm text-white/80 font-medium mb-1">
                                            Total Interest
                                        </div>
                                        <div className="text-base sm:text-lg font-medium">
                                            {formatCurrency(totalInterest)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Loan Breakdown */}
                            <div className="bg-white rounded-3xl p-6  shadow-lg border-2 border-gray-100 hover:shadow-2xl transition-all duration-300">
                                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 ">
                                    Loan Breakdown
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                        <span className="text-gray-700 font-medium text-sm">Property Value</span>
                                        <span className="font-medium text-base">{formatCurrency(propertyValue)}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                        <span className="text-gray-700 font-medium text-sm">Loan Amount</span>
                                        <span className="font-medium text-base text-[var(--primary-blue)]">
                                            {formatCurrency(loanAmount)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                        <span className="text-gray-700 font-medium text-sm">Loan to Value Ratio</span>
                                        <span className="font-medium text-base text-green-600">
                                            {((loanAmount / propertyValue) * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                        <span className="text-gray-700 font-medium text-sm">Interest Amount</span>
                                        <span className="font-medium text-base text-red-600">
                                            {formatCurrency(totalInterest)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                        <span className="text-gray-700 font-medium text-sm">Number of EMIs</span>
                                        <span className="font-medium text-base">{tenureYears * 12 + tenureMonths}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-12 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-8"
                    >
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-gray-900 mb-4">
                            Why Choose Loan Against Property?
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Get the best LAP deals with competitive rates and flexible terms
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 group-hover:border-[var(--primary-blue)]/30 text-center transform hover:-translate-y-2"
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                                        <feature.icon className="text-white text-2xl" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-3xl p-6  text-white text-center shadow-2xl"
                    >
                        <h3 className="text-2xl sm:text-3xl font-medium mb-4">
                            Ready to Get Funds Against Your Property?
                        </h3>
                        <p className="text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base">
                            Get personalized LAP offers from top banks. Our experts will help you find the best
                            deal with competitive rates.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => router.push('/home-loan')}
                                className="bg-white text-[var(--primary-blue)] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg text-sm sm:text-base"
                            >
                                Apply Loan
                            </motion.button>
                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => router.push('/contact')}
                                className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-white hover:text-[var(--primary-blue)] transition-all duration-200 text-sm sm:text-base"
                            >
                                Contact an Expert
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
