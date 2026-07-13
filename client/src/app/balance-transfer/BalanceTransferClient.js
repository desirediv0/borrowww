'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    FaCalendarAlt,
    FaCheckCircle,
    FaCreditCard,
    FaExchangeAlt,
    FaPercentage,
    FaRupeeSign,
    FaTimesCircle,
} from 'react-icons/fa';

import { motion } from 'framer-motion';
import PartnerBanks from '@/components/PartnerBanks';

export default function BalanceTransferClient() {
    const router = useRouter();
    const [currentLoan, setCurrentLoan] = useState({
        amount: 500000,
        rate: 15.5,
        tenure: 5,
        emi: 0,
        totalInterest: 0,
    });

    const [newLoan, setNewLoan] = useState({
        amount: 500000,
        rate: 12.5,
        tenure: 5,
        emi: 0,
        totalInterest: 0,
        transferFee: 2,
    });

    const [savings, setSavings] = useState({
        monthly: 0,
        total: 0,
        percentage: 0,
    });

    const calculateEMI = (principal, rate, tenure) => {
        const monthlyRate = rate / 12 / 100;
        const months = tenure * 12;

        if (monthlyRate === 0) return principal / months;

        return (
            (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1)
        );
    };

    const calculateSavings = useCallback(() => {
        // Calculate current loan EMI and total interest
        const currentEMI = calculateEMI(currentLoan.amount, currentLoan.rate, currentLoan.tenure);
        const currentTotalInterest = currentEMI * currentLoan.tenure * 12 - currentLoan.amount;

        // Calculate new loan EMI and total interest
        const newEMI = calculateEMI(newLoan.amount, newLoan.rate, newLoan.tenure);
        const newTotalInterest = newEMI * newLoan.tenure * 12 - newLoan.amount;
        const transferFeeAmount = (newLoan.amount * newLoan.transferFee) / 100;

        // Calculate savings
        const monthlySavings = currentEMI - newEMI;
        const totalSavings = currentTotalInterest + transferFeeAmount - newTotalInterest;

        setCurrentLoan((prev) => ({
            ...prev,
            emi: currentEMI,
            totalInterest: currentTotalInterest,
        }));

        setNewLoan((prev) => ({
            ...prev,
            emi: newEMI,
            totalInterest: newTotalInterest,
        }));

        setSavings({
            monthly: monthlySavings,
            total: totalSavings,

            percentage: currentTotalInterest
                ? ((currentTotalInterest - newTotalInterest) / currentTotalInterest) * 100
                : 0,
        });
    }, [
        currentLoan.amount,
        currentLoan.rate,
        currentLoan.tenure,
        newLoan.amount,
        newLoan.rate,
        newLoan.tenure,
        newLoan.transferFee,
    ]);

    useEffect(() => {
        calculateSavings();
    }, [calculateSavings]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

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
                            <FaCreditCard className="mr-2" />
                            Balance Transfer Calculator
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-gray-900 mb-4 sm:mb-6 tracking-tight">
                            Balance{' '}
                            <span className="text-[var(--primary-blue)] italic tiemposfine">Transfer</span>
                        </h1>
                        <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
                            Compare your current loan with balance transfer options and see how much you can save
                            monthly and overall
                        </p>
                    </motion.div>
                </div>
            </section>

            <PartnerBanks />

            {/* Calculator Section */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Mobile: Stack vertically, Desktop: Side by side with arrow */}
                    <div className="space-y-8 lg:space-y-0">
                        {/* Top Row: Current Loan and New Loan */}
                        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                            {/* Current Loan */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border-2 border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                                        <FaTimesCircle className="text-white text-xl" />
                                    </div>
                                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Current Loan</h2>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Outstanding Amount
                                        </label>
                                        <div className="relative">
                                            <FaRupeeSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="number"
                                                value={currentLoan.amount}
                                                onChange={(e) =>
                                                    setCurrentLoan((prev) => ({ ...prev, amount: Number(e.target.value) }))
                                                }
                                                className="w-full pl-8 pr-3 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)] transition-all duration-200 text-sm bg-gray-50 focus:bg-white"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Interest Rate (%)
                                        </label>
                                        <div className="relative">
                                            <FaPercentage className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="number"
                                                value={currentLoan.rate}
                                                onChange={(e) =>
                                                    setCurrentLoan((prev) => ({ ...prev, rate: Number(e.target.value) }))
                                                }
                                                className="w-full pl-8 pr-3 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)] transition-all duration-200 text-sm bg-gray-50 focus:bg-white"
                                                step="0.1"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Remaining Tenure (Years)
                                        </label>
                                        <div className="relative">
                                            <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="number"
                                                value={currentLoan.tenure}
                                                onChange={(e) =>
                                                    setCurrentLoan((prev) => ({ ...prev, tenure: Number(e.target.value) }))
                                                }
                                                className="w-full pl-8 pr-3 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)] transition-all duration-200 text-sm bg-gray-50 focus:bg-white"
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-5 sm:p-6 border-2 border-red-200 md:col-span-2">
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-700 font-medium text-sm sm:text-base">
                                                    Monthly EMI:
                                                </span>
                                                <span className="text-lg sm:text-xl font-semibold text-red-600">
                                                    {formatCurrency(currentLoan.emi)}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-700 font-medium text-sm sm:text-base">
                                                    Total Interest:
                                                </span>
                                                <span className="text-lg sm:text-xl font-semibold text-red-600">
                                                    {formatCurrency(currentLoan.totalInterest)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Transfer Arrow - Mobile: Between cards, Desktop: Hidden (shown separately) */}
                            <div className="flex items-center justify-center lg:hidden my-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-full flex items-center justify-center shadow-xl">
                                    <FaExchangeAlt className="text-white text-2xl" />
                                </div>
                            </div>

                            {/* New Loan */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border-2 border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                                        <FaCheckCircle className="text-white text-xl" />
                                    </div>
                                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">New Loan</h2>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Transfer Amount
                                        </label>
                                        <div className="relative">
                                            <FaRupeeSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="number"
                                                value={newLoan.amount}
                                                onChange={(e) =>
                                                    setNewLoan((prev) => ({ ...prev, amount: Number(e.target.value) }))
                                                }
                                                className="w-full pl-8 pr-3 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)] transition-all duration-200 text-sm bg-gray-50 focus:bg-white"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            New Interest Rate (%)
                                        </label>
                                        <div className="relative">
                                            <FaPercentage className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="number"
                                                value={newLoan.rate}
                                                onChange={(e) =>
                                                    setNewLoan((prev) => ({ ...prev, rate: Number(e.target.value) }))
                                                }
                                                className="w-full pl-8 pr-3 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)] transition-all duration-200 text-sm bg-gray-50 focus:bg-white"
                                                step="0.1"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            New Tenure (Years)
                                        </label>
                                        <div className="relative">
                                            <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="number"
                                                value={newLoan.tenure}
                                                onChange={(e) =>
                                                    setNewLoan((prev) => ({ ...prev, tenure: Number(e.target.value) }))
                                                }
                                                className="w-full pl-8 pr-3 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)] transition-all duration-200 text-sm bg-gray-50 focus:bg-white"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Transfer Fee (%)
                                        </label>
                                        <input
                                            type="number"
                                            value={newLoan.transferFee}
                                            onChange={(e) =>
                                                setNewLoan((prev) => ({ ...prev, transferFee: Number(e.target.value) }))
                                            }
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50 focus:bg-white text-base"
                                            step="0.1"
                                        />
                                    </div>

                                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5 sm:p-6 border-2 border-green-200 md:col-span-2">
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-700 font-medium text-sm sm:text-base">
                                                    Monthly EMI:
                                                </span>
                                                <span className="text-lg sm:text-xl font-semibold text-green-600">
                                                    {formatCurrency(newLoan.emi)}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-700 font-medium text-sm sm:text-base">
                                                    Total Interest:
                                                </span>
                                                <span className="text-lg sm:text-xl font-semibold text-green-600">
                                                    {formatCurrency(newLoan.totalInterest)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Desktop: Transfer Arrow in center */}
                        <div className="hidden lg:flex items-center justify-center -my-8">
                            <div className="w-20 h-20 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-full flex items-center justify-center shadow-xl z-10">
                                <FaExchangeAlt className="text-white text-3xl" />
                            </div>
                        </div>
                    </div>

                    {/* Savings Summary */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-12 bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-3xl p-6 sm:p-8 text-white shadow-2xl"
                    >
                        <h3 className="text-2xl sm:text-3xl font-medium mb-6 sm:mb-8 text-center">
                            Your Savings Summary
                        </h3>
                        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                            <div className="text-center bg-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-sm">
                                <div className="text-2xl sm:text-3xl lg:text-4xl font-medium mb-2">
                                    {formatCurrency(savings.monthly)}
                                </div>
                                <div className="text-white/90 font-medium text-sm sm:text-base">
                                    Monthly Savings
                                </div>
                            </div>
                            <div className="text-center bg-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-sm">
                                <div className="text-2xl sm:text-3xl lg:text-4xl font-medium mb-2">
                                    {formatCurrency(savings.total)}
                                </div>
                                <div className="text-white/90 font-medium text-sm sm:text-base">Total Savings</div>
                            </div>
                            <div className="text-center bg-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-sm">
                                <div className="text-2xl sm:text-3xl lg:text-4xl font-medium mb-2">
                                    {savings.percentage.toFixed(1)}%
                                </div>
                                <div className="text-white/90 font-medium text-sm sm:text-base">
                                    Interest Savings
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* IN-DEPTH BALANCE TRANSFER GUIDES */}
            <section className="py-16 bg-[#2D3E50]/[0.02] border-t border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                            Home Loan Balance Transfer: Save Money with Lower Interest Rates
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Everything You Need to Know Before Transferring Your Home Loan
                        </p>
                    </div>

                    <div className="space-y-16">
                        {/* Intro */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <p className="text-gray-600 leading-relaxed">
                                Switching your home loan to a new lender is one of those financial decisions that sounds simple on paper but gets complicated fast once you start looking at the actual numbers. Everyone tells you "switch if you find a lower rate," but nobody tells you how much lower it needs to be, when it stops making sense, or what it actually costs to make the move. This guide digs into that deeper layer — the calculations, the timing, the regulations, and the practical judgment calls that decide whether a balance transfer genuinely saves you money.
                            </p>
                        </div>

                        {/* How Home Loan Balance Transfer Works */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">How Home Loan Balance Transfer Works</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                When you transfer your home loan, your new lender essentially pays off your existing outstanding balance to your current bank or housing finance company, and you begin repaying that same amount to the new lender instead — usually at a lower interest rate, better tenure terms, or improved service.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Your original loan doesn't vanish; it gets closed out through the new lender's disbursal, and a fresh loan account is opened in its place. The property mortgage is then re-registered in favour of the new lender, which is why legal verification and property valuation happen again, almost as if you were applying for a fresh loan — because in many ways, you are.
                            </p>
                        </div>

                        {/* Latest RBI Regulations */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Latest RBI Regulations Affecting Home Loan Balance Transfers</h3>
                            
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-base font-semibold text-[#3A6EA5] mb-2">RBI's 2025 Pre-payment Charges Directions</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        The Reserve Bank of India (Pre-payment Charges on Loans) Directions, 2025 took effect for loans sanctioned or renewed on or after January 1, 2026. They build on the long-standing rule that individual borrowers cannot be charged foreclosure or prepayment penalties on floating-rate loans taken for non-business purposes. The 2025 Directions extend similar protection to floating-rate business loans taken by individuals and Micro and Small Enterprises, and they apply the rule consistently across banks, co-operative banks, NBFCs, and All India Financial Institutions — closing a gap where NBFCs had more room to levy such charges than banks.
                                    </p>
                                    <p className="text-gray-600 text-sm leading-relaxed mt-2">
                                        The Directions also require that any applicable prepayment terms be clearly disclosed in the sanction letter, loan agreement, and Key Facts Statement, and they prohibit lenders from reinstating charges that were previously waived. For anyone comparing balance transfer offers, this means it's worth asking directly whether your loan — and the new lender's loan — falls under this protection, since fixed-rate loans and some older loans sanctioned before January 1, 2026 may still follow different terms.
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-base font-semibold text-[#2D3E50] mb-2">RBI Repo Rate and What It Means for Your Balance Transfer Timing</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        As of mid-2026, the RBI has held the repo rate at 5.25% since a 25 basis point cut in December 2025, keeping it unchanged through its February, April, and June 2026 policy reviews, with the Monetary Policy Committee's next scheduled meeting in early August 2026. For borrowers, the practical implication is straightforward: loans linked to the repo rate (often labelled EBLR or RLLR) have been broadly stable through the first half of 2026, while borrowers still on an older MCLR or base-rate structure may be paying noticeably more, since those benchmarks transmit RBI rate changes more slowly and less transparently.
                                    </p>
                                    <p className="text-gray-600 text-sm leading-relaxed mt-2 font-medium">
                                        If your existing loan hasn't moved to a repo-linked rate, that gap alone can be worth investigating through a balance transfer, independent of any promotional rate a new lender is offering.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* When It Makes Financial Sense & When to Avoid */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
                                <h3 className="text-lg sm:text-xl font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                                    When It Makes Financial Sense
                                </h3>
                                <ul className="space-y-3 text-sm text-gray-600">
                                    <li>• The interest rate difference is meaningful.</li>
                                    <li>• You have a substantial loan tenure remaining.</li>
                                    <li>• The total cost of switching is lower than the savings.</li>
                                    <li>• Your credit score has improved since the original loan.</li>
                                </ul>
                            </div>

                            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
                                <h3 className="text-lg sm:text-xl font-semibold text-red-800 mb-4 flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                                    When You Should Avoid It
                                </h3>
                                <ul className="space-y-3 text-sm text-gray-600">
                                    <li>• Only a few years remain on your loan tenure.</li>
                                    <li>• The interest rate difference is marginal.</li>
                                    <li>• Current lender matches or comes close to the new offer.</li>
                                    <li>• You plan to sell or close the loan in 1-2 years.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Signs You Should Switch */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Signs That You Should Switch Your Lender</h3>
                            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-gray-600">
                                <li>• Existing lender hasn't passed on recent rate cuts.</li>
                                <li>• Facing poor customer service or slow resolution.</li>
                                <li>• Credit score has improved significantly.</li>
                                <li>• Need a top-up loan and current lender isn't competitive.</li>
                                <li>• Existing loan is on older benchmarks like MCLR or Base Rate.</li>
                            </ul>
                        </div>

                        {/* How Much Money Can You Actually Save */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">How Much Money Can You Actually Save?</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                This is the question that matters most, and the honest answer is: it depends heavily on your remaining tenure, outstanding principal, and the actual rate difference — not just the headline numbers.
                            </p>

                            <div className="border-t border-gray-100 pt-4 mt-4 space-y-4">
                                <h4 className="font-semibold text-gray-800 text-base">Cost vs Savings Analysis</h4>
                                <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600 bg-gray-50 p-5 rounded-2xl">
                                    <div>
                                        <h5 className="font-bold text-gray-900 mb-2 text-xs uppercase tracking-wider">Typical Costs:</h5>
                                        <ul className="space-y-1.5">
                                            <li>• Processing fee at the new lender (0.25% to 1%)</li>
                                            <li>• Legal and technical valuation charges</li>
                                            <li>• Stamp duty on mortgage agreement (state-dependent)</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-gray-900 mb-2 text-xs uppercase tracking-wider">Typical Savings:</h5>
                                        <ul className="space-y-1.5">
                                            <li>• Reduced interest outgo over remaining tenure</li>
                                            <li>• Lower monthly EMI, freeing up cash flow</li>
                                            <li>• Access to lower-cost top-up loans</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-4 mt-6">
                                <h4 className="font-semibold text-gray-800 text-base mb-2">Break-even Calculation</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Suppose your total switching cost comes to ₹35,000, and the new lender's lower rate saves you ₹3,500 per month in interest. <strong className="text-gray-900">Break-even period = ₹35,000 ÷ ₹3,500 = 10 months.</strong> If your remaining tenure is longer than 10 months, the switch makes financial sense.
                                </p>
                            </div>

                            <div className="border-t border-gray-100 pt-4 mt-6 space-y-4">
                                <h4 className="font-semibold text-gray-800 text-base">Interest Saving Examples</h4>
                                <div className="space-y-3">
                                    <div className="p-4 bg-[#3A6EA5]/5 rounded-xl text-sm text-gray-600 border border-[#3A6EA5]/10">
                                        <span className="font-semibold text-gray-950 block mb-1">Example 1: Large Savings</span>
                                        Outstanding: ₹40,00,000 | Tenure: 15 years | Current: 9.25% | New: 8.60%<br />
                                        Current EMI: ~₹41,024 | New EMI: ~₹39,588<br />
                                        <strong className="text-gray-900">Monthly Savings: ₹1,436 | Total Savings: ~₹2,58,000</strong> (before switching costs)
                                    </div>
                                    <div className="p-4 bg-[#2D3E50]/5 rounded-xl text-sm text-gray-600 border border-[#2D3E50]/10">
                                        <span className="font-semibold text-gray-950 block mb-1">Example 2: Small Savings</span>
                                        Outstanding: ₹25,00,000 | Remaining Tenure: 8 years | Current: 9.5% | New: 9.10%<br />
                                        <strong className="text-gray-900">Monthly Savings: ~₹400–500</strong>. Worth pursuing only if switching costs are minimal.
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Top-up & Taxes */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Balance Transfer with Top-up Loan</h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                A top-up loan lets you borrow additional money over your outstanding balance at rates far lower than a personal loan. Common uses include home renovation, education funding, debt consolidation, or business capital.
                            </p>

                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Tax Implications and GST</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                Tax benefits under Section 24(b) (interest) and Section 80C (principal) continue to apply on the new home loan. However, interest on a top-up loan is only deductible under Section 24(b) if the funds are explicitly used for home improvement/renovation (subject to a lower cap for self-occupied properties). Top-up amounts used for other purposes are not tax-deductible.
                            </p>
                            <p className="text-gray-600 leading-relaxed text-sm mt-3">
                                <strong className="text-gray-900">GST on Charges:</strong> Processing fees, legal fees, and administrative charges attract 18% GST.
                            </p>
                        </div>

                        {/* Balance Transfer Comparison */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Balance Transfer vs Other Options</h3>
                            
                            <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200 shadow-sm">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-[#2D3E50]/5">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Factor</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Balance Transfer</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Internal Rate Conversion</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Loan Against Property</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">Lender</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Changes to new lender</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Stays the same</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Can be new or existing</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">Legal/Valuation Redo</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Yes</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">No</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Yes</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">Typical Cost</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Processing fee + Legal/Valuation</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Small conversion fee</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Processing fee + Valuation</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">Best For</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 font-medium text-[#3A6EA5]">Meaningful rate gap vs market</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Small gap, avoiding hassle</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Need funds for non-housing</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Credit score and eligibility */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Credit Score & Eligibility</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                Lenders typically categorize credit scores as follows during balance transfer reviews:
                            </p>
                            <ul className="space-y-2 text-sm text-gray-600 mb-6">
                                <li>• <strong>750 and above:</strong> Strong eligibility for the most competitive balance transfer rates.</li>
                                <li>• <strong>700–749:</strong> Reasonable eligibility, though rate benefits may be slightly limited.</li>
                                <li>• <strong>650–699:</strong> Possible approval, but with less negotiating power on rate.</li>
                                <li>• <strong>Below 650:</strong> Balance transfer may be difficult to secure at meaningfully better terms.</li>
                            </ul>

                            <h4 className="font-semibold text-gray-800 text-base mb-2">How to Improve Your Credit Score</h4>
                            <ul className="grid sm:grid-cols-2 gap-3 text-xs text-gray-600">
                                <li>• Pay every EMI and credit card bill on time.</li>
                                <li>• Keep credit card utilisation below 30%.</li>
                                <li>• Avoid applying for multiple new loans recently.</li>
                                <li>• Check your credit report for errors and defaults.</li>
                            </ul>
                        </div>

                        {/* Lenders Comparison */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Lender Categories Comparison</h3>
                            
                            <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200 shadow-sm">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-[#2D3E50]/5">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Lender Type</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Rate Positioning</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Processing Speed</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Doc Flexibility</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Best Suited For</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">Public Sector</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Often lowest</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Can be slower</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Standardised</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Salaried / Govt employees</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">Private Banks</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Competitive</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Faster</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Flexible for strong profiles</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Speed and responsiveness</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">NBFCs / HFCs</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Slightly higher</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Fast</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Accommodating</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 font-medium text-[#3A6EA5]">Self-employed, non-standard income</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Indicative rates comparison */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Comparing Balance Transfer Offers</h3>
                            
                            <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200 shadow-sm">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-[#2D3E50]/5">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Lender Category</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Indicative Rate Range*</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Notable For</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">Public Sector Banks</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">7.10% - 8.5%</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Rate stability, govt-employee schemes</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">Large Private Banks</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">7.15% - 9%</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Faster digital processing</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">HFCs / NBFCs</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">7.25% - 9.5%</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Flexible eligibility for self-employed</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">Small Finance Banks</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">8.00% - 10.00%</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Regional reach, relaxed documentation</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* State-Wise Stamp Duty */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">State-Wise Charges to Factor In</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                Stamp duty on the new mortgage (MODT) varies by state and is one of the most commonly overlooked costs in a balance transfer.
                            </p>
                            
                            <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200 shadow-sm">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-[#2D3E50]/5">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">State</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">General Approach to Mortgage Stamp Duty</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">Maharashtra</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Nominal stamp duty on mortgage document, capped for this transaction type</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">Karnataka</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Stamp duty based on loan amount, generally lower than property transaction</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">Delhi NCR</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Applies on mortgage registration; rates differ by ownership gender/joint options</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">Tamil Nadu</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Mortgage-related stamp duty applied separately from property registration</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">Telangana</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Charged as a percentage of the loan amount, distinct from property transfer</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Checklist & Steps */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">Documents & Step-by-Step Process</h3>
                            
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3 text-base">Documents Checklist:</h4>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        <li>• Loan account statement from current lender</li>
                                        <li>• Foreclosure letter / outstanding loan certificate</li>
                                        <li>• Original property documents (to be transferred)</li>
                                        <li>• KYC documents (PAN, Aadhaar)</li>
                                        <li>• Income proof (salary slips or ITRs)</li>
                                        <li>• Bank statements for the last 6 months</li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3 text-base">The Process, Step-by-Step:</h4>
                                    <ol className="space-y-2 text-sm text-gray-600 list-decimal pl-4">
                                        <li>Compare offers & calculate break-even point.</li>
                                        <li>Apply to the chosen new lender.</li>
                                        <li>Receive provisional sanction letter.</li>
                                        <li>Request foreclosure letter from current lender.</li>
                                        <li>New lender conducts legal/technical verification.</li>
                                        <li>New lender disburses funds to close old loan.</li>
                                        <li>Mortgage charge MODT is re-registered.</li>
                                        <li>Old lender releases original property documents.</li>
                                        <li>Your new EMI cycle begins.</li>
                                    </ol>
                                </div>
                            </div>
                        </div>

                        {/* Pros and Cons */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Pros & Cons of Balance Transfer</h3>
                            
                            <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200 shadow-sm">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-[#2D3E50]/5">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-800 uppercase tracking-wider w-1/2">Pros</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-red-800 uppercase tracking-wider w-1/2">Cons</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-600 bg-emerald-50/10">Potential to lower EMI or reduce total interest</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 bg-red-50/10">Involves processing fees and valuation charges</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-600 bg-emerald-50/10">Access to a top-up loan at competitive rates</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 bg-red-50/10">Requires fresh legal and technical verification</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-600 bg-emerald-50/10">Opportunity to move to transparent repo-linked rates</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 bg-red-50/10">May not be worthwhile if remaining tenure is short</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-600 bg-emerald-50/10">Improved credit score can unlock better terms</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 bg-red-50/10">Administrative effort of document transfer and NOC processing</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Frequently Asked Questions */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 text-center">Frequently Asked Questions</h3>
                            
                            <div className="space-y-4">
                                {[
                                    { q: "How many times can I do a home loan balance transfer?", a: "There's no strict legal limit, but each transfer involves fresh processing fees and verification costs, so it only makes sense when the savings genuinely justify the effort each time." },
                                    { q: "Does a balance transfer affect my credit score?", a: "It doesn't negatively impact your score, provided your existing loan account is closed properly and you continue timely repayments without gaps." },
                                    { q: "Can I transfer my home loan if I have missed a few EMI payments in the past?", a: "It's possible, but missed payments can affect the rate and terms offered and may lead to a more cautious assessment." },
                                    { q: "Is it necessary to inform my current lender before applying elsewhere?", a: "Not strictly mandatory before comparing offers, but you'll need a foreclosure letter and outstanding balance certificate once you proceed." },
                                    { q: "Can I transfer my home loan to the same bank but a different branch for a better rate?", a: "Some banks allow an internal rate revision without a full balance transfer, which can be simpler and faster." },
                                    { q: "What is the ideal remaining tenure to consider a balance transfer?", a: "Generally 3 years or more, so interest savings have enough time to outweigh switching costs." },
                                    { q: "Does the new lender consider my old loan's repayment history?", a: "Yes, your credit report reflects this, and a strong track record can positively influence the new lender's offer." },
                                    { q: "Can I negotiate a lower rate with my current lender instead of transferring?", a: "Yes, many borrowers successfully negotiate a rate reduction by highlighting a competing offer." },
                                    { q: "What is the difference between balance transfer and refinancing?", a: "In India, these terms are generally used interchangeably to describe moving your loan to a new lender." },
                                    { q: "Will I need to redo property registration during a balance transfer?", a: "No re-registration of the sale, but the mortgage charge is transferred and re-registered to the new lender." },
                                    { q: "How long does a home loan balance transfer take to complete?", a: "Typically 2 to 4 weeks, depending on document release and verification speed." },
                                    { q: "Can I get a top-up loan without doing a full balance transfer?", a: "Some lenders offer top-up loans on your existing loan without switching, if your track record supports it." },
                                    { q: "Is a balance transfer worth it for a small remaining loan amount?", a: "Absolute savings may be limited, so check whether switching costs are justified relative to total savings." },
                                    { q: "What documents does my existing lender need to release for the transfer?", a: "Typically a foreclosure letter, NOC, and the original property documents." },
                                    { q: "Can self-employed borrowers apply for a home loan balance transfer?", a: "Yes, though income is reassessed through updated ITRs, business financials, and bank statements." },
                                    { q: "Does balance transfer include transferring home loan insurance as well?", a: "Generally not automatically — it may need to be reassigned or reissued in favour of the new lender." },
                                    { q: "What happens to my existing home loan account after the transfer is complete?", a: "It's marked as closed; obtain a formal closure letter and updated encumbrance certificate." },
                                    { q: "Can I switch lenders if my property is still under construction?", a: "Possible but more complex, since the new lender needs to verify construction stage and coordinate with the builder." },
                                    { q: "Will my EMI date change after a balance transfer?", a: "Yes, typically aligned to the new lender's billing cycle." },
                                    { q: "Should I choose the lender offering the lowest rate or the one with the best overall terms?", a: "Weigh processing fees, prepayment flexibility, service quality, and top-up terms together, not just the rate." },
                                    { q: "Does RBI's new prepayment rule mean my balance transfer is completely free?", a: "No — it removes foreclosure and prepayment charges, but processing, legal, valuation, and stamp duty costs still typically apply." },
                                    { q: "What is CERSAI and why does it matter in a balance transfer?", a: "It's the central registry recording mortgage charges — part of why legal verification takes a few weeks." },
                                    { q: "Can I do a balance transfer if my loan is a joint loan with my spouse?", a: "Yes, but both co-applicants must consent to foreclosure, and both are reassessed by the new lender." },
                                    { q: "Is a balance transfer better than asking for a top-up from my current lender?", a: "Depends on the numbers — if your base rate is also high, a transfer with a top-up often works out better." },
                                    { q: "What is the difference between MCLR and a repo-linked lending rate?", a: "MCLR changes infrequently and with lag; repo-linked rates move directly and quickly with RBI decisions." },
                                    { q: "Can NRIs transfer a home loan without visiting India?", a: "Often yes, with a valid Power of Attorney and remote documentation, though this varies by lender." },
                                    { q: "Does the new lender check my existing lender's records directly?", a: "No, it primarily relies on your credit bureau report and the documentation you provide." },
                                    { q: "What if my property valuation comes in lower than my outstanding loan amount?", a: "This can affect your loan-to-value ratio and may reduce the sanctioned amount." }
                                ].map((item, idx) => (
                                    <details key={idx} className="group rounded-2xl border border-gray-200 p-5 bg-white open:bg-gray-50/50 transition-all">
                                        <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-gray-900 text-sm sm:text-base">
                                            {item.q}
                                            <span className="transition group-open:rotate-180 text-[#3A6EA5] font-bold">↓</span>
                                        </summary>
                                        <p className="mt-3 text-gray-600 text-sm leading-relaxed">{item.a}</p>
                                    </details>
                                ))}
                            </div>
                        </div>
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
                        className="bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-3xl p-8 text-white text-center shadow-2xl"
                    >
                        <h3 className="text-2xl sm:text-3xl font-medium mb-4">Ready to Get Started?</h3>
                        <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                            Transfer your loan to a lower interest rate. Our experts will help you find the best
                            balance transfer offers from top banks.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => router.push('/home-loan')}
                                className="bg-white text-[var(--primary-blue)] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg"
                            >
                                Apply for Loan
                            </motion.button>
                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => router.push('/contact')}
                                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[var(--primary-blue)] transition-all duration-200"
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
