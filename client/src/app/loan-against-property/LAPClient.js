'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    FaBuilding,
    FaCalculator,
    FaCalendarAlt,
    FaCheckCircle,
    FaChevronDown,
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
            title: 'Lenient Assessments',
            description: 'Lenient assessment frameworks to review diverse collateral profiles.',
            icon: FaCheckCircle,
        },
        {
            title: 'Higher Eligibility',
            description: 'Get up to 75% of your property market value from our partner banks.',
            icon: FaRupeeSign,
        },
        {
            title: 'Flexible Repayment',
            description: 'Extended and flexible repayment windows matching your cash flow cycles.',
            icon: FaCalendarAlt,
        },
        {
            title: 'Zero Restrictions',
            description: 'Deploy funds instantly for operations, inventory, or machinery upgrades.',
            icon: FaPercentage,
        },
        {
            title: 'Multiple End-Use Options',
            description: 'Avail of our facility for business expansion, higher education, personal use, weddings, or medical emergencies.',
            icon: FaBuilding,
        },
    ];

    const faqs = [
        {
            q: 'Can we apply if our property is currently rented out to a corporate tenant?',
            a: 'Our partner network accepts self-owned properties that are leased to commercial or residential tenants. The existing lease will not block your application but serves as an additional verification of property viability during our appraisal process.',
        },
        {
            q: 'Who must join the loan structure as a co-applicant for corporate properties?',
            a: 'It is important for all co-owners of the pledged property to join the loan structure. Partners or directors for business entities must come in as co-applicants. Women co-applicants are highly encouraged and can sometimes help secure optimal processing terms.',
        },
        {
            q: 'How do you value a property if it has both commercial and residential zones?',
            a: 'We often look at mixed-use properties. Our partner banks send certified evaluators to assess each zone independently before combining them into a final valuation report.',
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
                        className="max-w-4xl mx-auto text-center"
                    >
                        <div className="inline-flex items-center px-4 py-2 bg-[var(--primary-blue)]/10 text-[var(--primary-blue)] rounded-full text-sm font-medium mb-6">
                            <FaBuilding className="mr-2" />
                            Secured Financing
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-gray-900 mb-6 tracking-tight leading-tight">
                            Unlock Capital from Your Property to{' '}
                            <span className="text-[var(--primary-blue)] italic tiemposfine font-semibold">Fund Strategic Business Growth</span>
                        </h1>
                        <div className="space-y-4 text-base sm:text-lg text-gray-600 leading-relaxed px-4 text-left sm:text-center">
                            <p>
                                Pledging your property to fund commercial expansion often feels like a major step and it certainly is. Real estate is valuable and we believe that value should always work for you when your enterprise needs financial backing.
                            </p>
                            <p>
                                That is why we built Borrowww. As one of the leading loan facilitator platforms, we provide streamlined options for loan against property. Get direct access to premier Indian banks and NBFC’s. Our system connects your financial goals to transparent as well as secured funding options.
                            </p>
                            <p>
                                Many small business owners struggle with standard bank filters. Our platform has changed the scenario. We assess your actual property value alongside your operational strength. For these types of loans, you can use rented residential / commercial units, self-owned residential / commercial spaces or open plots as collateral.
                            </p>
                            <p className="font-semibold text-gray-800">
                                Our managers ensure you get maximum leverage and they ensure to provides access to substantial capital based on clear property evaluations.
                            </p>
                        </div>
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
                            Why Companies Scale With Our Structured Credit Models
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Borrowww focuses entirely on making your borrowing procedure efficient. Traditional corporate financing setups are time-consuming and involve endless documentation. We cut down that stress by offering-
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
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
                                    className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 group-hover:border-[var(--primary-blue)]/30 text-center h-full transform hover:-translate-y-2 flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                                            <feature.icon className="text-white text-2xl" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                                            {feature.title}
                                        </h3>
                                    </div>
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
                            Choose Borrowww for the Ideal Loan Against Property Perks
                        </h3>
                        <p className="text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
                            You do not have to sell valuable assets to capture immediate market opportunities. Retain your property ownership while utilizing its equity. We manage the application coordination, bank follow-ups, and structural compliance from start to finish. Contact our team today to evaluate your eligibility.
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

            {/* FAQ Section */}
            <section className="py-16 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
                            Frequently Asked Questions
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((f, idx) => (
                            <details
                                key={idx}
                                className="group rounded-2xl border border-gray-200 p-5 bg-white open:bg-gray-50 transition-all"
                            >
                                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-gray-900">
                                    {f.q}
                                    <span className="transition group-open:rotate-180">
                                        <FaChevronDown className="h-5 w-5 text-[var(--primary-blue)]" />
                                    </span>
                                </summary>
                                <p className="mt-3 text-gray-700 leading-relaxed">{f.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
