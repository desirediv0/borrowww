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
            q: "What exactly is a loan against property, and how does it work?",
            a: "Think of a loan against property — or LAP, as most people end up calling it — as a way to unlock the money that’s already sitting in real estate you own, without having to sell it. You pledge a house, a shop, an office, or even an industrial unit as security, and in return the lender gives you a chunk of its market value as a loan. The property stays yours the whole time. You keep living in it or running your business out of it, and you simply repay the amount in EMIs over the agreed tenure. Since there’s collateral backing everything, the interest works out noticeably cheaper than a personal loan — and that, for most borrowers, is the real attraction."
        },
        {
            q: "What is the current interest rate on a loan against property in India?",
            a: "As of 2026, LAP rates in India mostly start somewhere around 7.75% per annum. Where you actually land, though, comes down to a handful of things — the lender you pick, your credit history, the type of property, and whether you go with a fixed or floating rate. On the higher end, rates can climb to roughly 12–14% for riskier profiles. Private sector banks usually sit at the cheaper end of that band, while NBFCs charge a little more but tend to move faster on approvals. One thing to remember: these rates shift every time the RBI changes its repo rate, so it’s always worth checking the live number before applying. On Borrowww you can put offers from partner banks and NBFCs side by side and see which one actually suits you."
        },
        {
            q: "How much loan can I get against my property?",
            a: "Two things mostly decide this — what your property is worth in the open market, and what kind of property it is. Lenders work on a figure called the Loan-to-Value (LTV) ratio, and you’ll typically be offered somewhere between 50% and 75% of the value. Residential property gets the most generous treatment here, often in the 70–75% range. Commercial and industrial spaces are funded a bit more cautiously. After that, your income and credit record fine-tune the final number you’re sanctioned."
        },
        {
            q: "What is the eligibility criteria for a loan against property?",
            a: "At its core, a lender is checking two things: can you repay comfortably, and is the property clean on paper? So they look at your age, how steady your income is, your credit score, the loans you’re already servicing, and the legal standing of the property itself. Both salaried and self-employed applicants are eligible, usually anywhere between 21 and 70 years of age. A CIBIL score of 750 or above is what unlocks the sharper rates, and the property has to come with a clear, dispute-free title — there’s no getting around that part."
        },
        {
            q: "What documents are required for a loan against property?",
            a: "Nothing too exotic, but there is a fair bit of paperwork to round up. You’ll need your KYC (Aadhaar and PAN), an address proof, and income proof — salary slips plus Form 16 if you’re salaried, or ITRs and financial statements if you’re self-employed. Add your last six months’ bank statements and the complete set of property papers, including the title deed and tax receipts. If there’s one thing that quietly holds up most approvals, it’s messy or incomplete property documents. Sorting those out before you apply genuinely saves you days of back-and-forth later."
        },
        {
            q: "Can I use a loan against property for business expansion?",
            a: "Yes — and it’s one of the most common reasons people take a LAP in the first place. Whether you’re opening a new branch, shoring up working capital, or buying equipment, the loan gives you a bigger ticket size and a lower rate than an unsecured business loan would, simply because your property is backing it. There’s a useful bonus too: when the money actually goes into the business, the interest you pay can often be claimed as a deduction at tax time."
        },
        {
            q: "What types of property can I pledge for a loan against property?",
            a: "Quite a range, as it turns out. A residential property works whether you live in it or rent it out. Commercial spaces — shops, offices, and the like — are accepted. And in plenty of cases, industrial property or even a vacant plot of land can be pledged as well. The non-negotiables stay the same across all of them: the property has to be in your name, with a clear title and the proper approvals in place. Just keep in mind that both the LTV and the rate on offer will vary by property type, with residential usually walking away with the friendliest terms."
        },
        {
            q: "How long does it take to get a loan against property approved?",
            a: "If your documents are in order and the lender runs a digital verification, an initial approval can come through in just a few days. The full sanction and the money actually reaching your account usually take around 7 to 10 working days after that. What eats up most of the time is the property valuation and the legal title check — there’s no real shortcut around either of them. So once again, the cleaner your paperwork is upfront, the quicker the whole thing moves."
        },
        {
            q: "What is the maximum tenure for a loan against property?",
            a: "Most lenders in India let you spread repayment over as long as 15 years, and a few stretch it even further. A longer tenure pulls your monthly EMI down and can help you qualify for a larger amount, which sounds great on the surface. The catch is that a longer term also means more total interest paid over the life of the loan. It’s genuinely worth weighing both sides before you settle on a tenure rather than just picking the lowest possible EMI."
        },
        {
            q: "Are there any tax benefits on a loan against property?",
            a: "This one comes down entirely to where the money ends up going. Use the loan for business purposes, and the interest can be claimed as a business expense under Section 37(1). Put it toward buying or constructing a residential house, and you may be able to claim interest under Section 24(b). But if the funds go toward personal spending — a wedding, a holiday, a big purchase — there’s no tax benefit to claim. Since tax treatment can get fiddly, it’s a good idea to run your specific case past a CA before assuming a deduction applies."
        },
        {
            q: "Can we apply if our property is currently rented out to a corporate tenant?",
            a: "Our partner network accepts self-owned properties that are leased to commercial or residential tenants. The existing lease will not block your application but serves as an additional verification of property viability during our appraisal process."
        },
        {
            q: "Who must join the loan structure as a co-applicant for corporate properties?",
            a: "It is important for all co-owners of the pledged property to join the loan structure. Partners or directors for business entities must come in as co-applicants. Women co-applicants are highly encouraged and can sometimes help secure optimal processing terms."
        },
        {
            q: "How do you value a property if it has both commercial and residential zones?",
            a: "We often look at mixed-use properties. Our partner banks send certified evaluators to assess each zone independently before combining them into a final valuation report."
        }
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
                            Loan Against Property in India with{' '}
                            <span className="text-[var(--primary-blue)] italic tiemposfine font-semibold">Minimal Documents & Fast Approval</span>
                        </h1>
                        <h2 className="text-xl sm:text-2xl font-medium text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                            Unlock Capital from Your Property to Fund Strategic Business Growth
                        </h2>
                        <div className="space-y-4 text-base sm:text-lg text-gray-600 leading-relaxed px-4 text-left sm:text-center">
                            <p>
                                Pledging your property to fund commercial expansion often feels like a major step and it certainly is. Real estate is valuable and we believe that value should always work for you when your enterprise needs financial backing.
                            </p>
                            <p>
                                That is why we built <a href="https://www.borrowww.com/" className="text-[var(--primary-blue)] hover:underline font-semibold">Borrowww</a>. As one of the leading loan facilitator platforms, we provide streamlined options for loan against property. Get direct access to premier Indian banks and NBFC’s. Our system connects your financial goals to transparent as well as secured funding options.
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
                            Loan Against Property – Frequently Asked Questions
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

            {/* FAQ Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": faqs.map((f) => ({
                            "@type": "Question",
                            "name": f.q,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": f.a
                            }
                        }))
                    })
                }}
            />
        </>
    );
}
