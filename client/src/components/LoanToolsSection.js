'use client';

import React, { useState } from 'react';
import { FaPhone, FaTimes, FaWhatsapp } from 'react-icons/fa';

export default function LoanToolsSection() {
  const [activeTab, setActiveTab] = useState('emi');
  const [showDialog, setShowDialog] = useState(false);

  // EMI Calculator State
  const [emiLoanAmount, setEmiLoanAmount] = useState(8000000);
  const [emiInterestRate, setEmiInterestRate] = useState(7.1);
  const [emiTenure, setEmiTenure] = useState(20);

  // Affordability Calculator State
  const [affMonthlyIncome, setAffMonthlyIncome] = useState(50000);
  const [affCurrentEMI, setAffCurrentEMI] = useState(0);
  const [affInterestRate, setAffInterestRate] = useState(7.85);
  const [affTenure, setAffTenure] = useState(20);

  // Down Payment Calculator State
  const [dpPropertyValue, setDpPropertyValue] = useState(5000000);
  const [dpInterestRate, setDpInterestRate] = useState(7.85);
  const [dpProcessingFee, setDpProcessingFee] = useState(0.25);
  const [dpTenure, setDpTenure] = useState(20);

  // BT Calculator State
  const [btTotalAmount, setBtTotalAmount] = useState(8000000);
  const [btCurrentEMI, setBtCurrentEMI] = useState(74570);

  // Date Picker State
  const currentYear = new Date().getFullYear();
  const [btStartMonth, setBtStartMonth] = useState('Apr');
  const [btStartYear, setBtStartYear] = useState(2020);

  const [btTenure, setBtTenure] = useState(20);
  const [btInterestRate, setBtInterestRate] = useState(7.35);

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  // Calculate EMI
  const calculateEMI = (principal, rate, tenure) => {
    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;
    if (monthlyRate === 0) return principal / months;
    return (
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)
    );
  };

  // EMI Calculator Results
  const emiMonthly = calculateEMI(emiLoanAmount, emiInterestRate, emiTenure);
  const emiTotalAmount = emiMonthly * emiTenure * 12;
  const emiTotalInterest = emiTotalAmount - emiLoanAmount;

  // Affordability Calculator Results
  const affMaxEMI = Math.max(0, affMonthlyIncome * 0.4 - affCurrentEMI);
  const calculateLoanFromEMI = (emi, rate, tenure) => {
    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;
    if (monthlyRate === 0) return emi * months;
    return (
      (emi * (Math.pow(1 + monthlyRate, months) - 1)) /
      (monthlyRate * Math.pow(1 + monthlyRate, months))
    );
  };
  const affMaxLoan =
    affMaxEMI > 0 ? calculateLoanFromEMI(affMaxEMI, affInterestRate, affTenure) : 0;
  const affPropertyWorth = affMaxLoan * 1.25;
  const affCalculatedEMI = affMaxEMI;

  // Down Payment Calculator Results
  const dpDownPayment = dpPropertyValue * 0.2;
  const dpProcessingFeeAmount = dpPropertyValue * (dpProcessingFee / 100);
  const dpCashNeeded = dpDownPayment + dpProcessingFeeAmount;
  const dpMaxLoan = dpPropertyValue - dpDownPayment;
  const dpMonthlyEMI = calculateEMI(dpMaxLoan, dpInterestRate, dpTenure);

  // BT Calculator Results
  const btNewEMI = calculateEMI(btTotalAmount, btInterestRate, btTenure);
  const btOldTotal = btCurrentEMI * btTenure * 12;
  const btNewTotal = btNewEMI * btTenure * 12;
  const btTotalSavings = btOldTotal - btNewTotal;
  const btReducedEMI = btCurrentEMI - btNewEMI;

  const getApplyData = () => {
    const data = {
      tab: activeTab,
      emi:
        activeTab === 'emi'
          ? {
              loanAmount: emiLoanAmount,
              interestRate: emiInterestRate,
              tenure: emiTenure,
              monthlyEMI: emiMonthly,
              totalInterest: emiTotalInterest,
              totalAmount: emiTotalAmount,
            }
          : null,
      affordability:
        activeTab === 'affordability'
          ? {
              monthlyIncome: affMonthlyIncome,
              currentEMI: affCurrentEMI,
              interestRate: affInterestRate,
              tenure: affTenure,
              propertyWorth: affPropertyWorth,
              maxLoan: affMaxLoan,
              monthlyEMI: affCalculatedEMI,
            }
          : null,
      downPayment:
        activeTab === 'downPayment'
          ? {
              propertyValue: dpPropertyValue,
              interestRate: dpInterestRate,
              processingFee: dpProcessingFee,
              tenure: dpTenure,
              downPayment: dpDownPayment,
              processingFeeAmount: dpProcessingFeeAmount,
              cashNeeded: dpCashNeeded,
              maxLoan: dpMaxLoan,
              monthlyEMI: dpMonthlyEMI,
            }
          : null,
      balanceTransfer:
        activeTab === 'bt'
          ? {
              totalAmount: btTotalAmount,
              currentEMI: btCurrentEMI,
              startDate: `${btStartMonth}, ${btStartYear}`,
              tenure: btTenure,
              interestRate: btInterestRate,
              newEMI: btNewEMI,
              totalSavings: btTotalSavings,
              reducedEMI: btReducedEMI,
            }
          : null,
    };
    return data;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const handleApplyNow = () => {
    const data = getApplyData();
    setShowDialog(true);
  };

  const handleWhatsApp = () => {
    const whatsappNumber = '919560069525';
    const message = encodeURIComponent(
      'I’m planning to take a home loan. Kindly share the top deals with me.'
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const renderDialogContent = () => {
    const data = getApplyData();
    const tabNames = {
      emi: 'EMI Calculator',
      affordability: 'Affordability Calculator',
      downPayment: 'Down Payment Calculator',
      bt: 'Balance Transfer Calculator',
    };

    return (
      <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl sm:text-3xl font-medium text-gray-900">
            {tabNames[activeTab]} Details
          </h3>
          <button
            onClick={() => setShowDialog(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <FaTimes className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="space-y-4">
          {activeTab === 'emi' && data.emi && (
            <>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                <h4 className=" text-gray-900 mb-3 text-lg">Loan Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Loan Amount:</span>
                    <span className=" text-gray-900">{formatCurrency(data.emi.loanAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interest Rate:</span>
                    <span className=" text-gray-900">{data.emi.interestRate}% p.a.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tenure:</span>
                    <span className=" text-gray-900">{data.emi.tenure} years</span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-[var(--primary-blue-dark)] to-[var(--primary-blue)] rounded-xl p-4 text-white">
                <h4 className=" mb-3 text-lg">Calculation Results</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monthly EMI:</span>
                    <span className="font-medium text-xl">
                      {formatCurrency(data.emi.monthlyEMI)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Interest:</span>
                    <span className="">{formatCurrency(data.emi.totalInterest)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Amount:</span>
                    <span className="">{formatCurrency(data.emi.totalAmount)}</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'affordability' && data.affordability && (
            <>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                <h4 className=" text-gray-900 mb-3 text-lg">Income Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Income:</span>
                    <span className=" text-gray-900">
                      {formatCurrency(data.affordability.monthlyIncome)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current EMI:</span>
                    <span className=" text-gray-900">
                      {formatCurrency(data.affordability.currentEMI)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interest Rate:</span>
                    <span className=" text-gray-900">{data.affordability.interestRate}% p.a.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tenure:</span>
                    <span className=" text-gray-900">{data.affordability.tenure} years</span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-[var(--primary-blue-dark)] to-[var(--primary-blue)] rounded-xl p-4 text-white">
                <h4 className=" mb-3 text-lg">Eligibility Results</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Property Worth:</span>
                    <span className="font-medium text-xl">
                      {formatCurrency(data.affordability.propertyWorth)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Max Loan Amount:</span>
                    <span className="">{formatCurrency(data.affordability.maxLoan)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly EMI:</span>
                    <span className="">{formatCurrency(data.affordability.monthlyEMI)}</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'downPayment' && data.downPayment && (
            <>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                <h4 className=" text-gray-900 mb-3 text-lg">Property Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property Value:</span>
                    <span className=" text-gray-900">
                      {formatCurrency(data.downPayment.propertyValue)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interest Rate:</span>
                    <span className=" text-gray-900">{data.downPayment.interestRate}% p.a.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing Fee:</span>
                    <span className=" text-gray-900">{data.downPayment.processingFee}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tenure:</span>
                    <span className=" text-gray-900">{data.downPayment.tenure} years</span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-[var(--primary-blue-dark)] to-[var(--primary-blue)] rounded-xl p-4 text-white">
                <h4 className=" mb-3 text-lg">Payment Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Down Payment (20%):</span>
                    <span className="font-medium text-xl">
                      {formatCurrency(data.downPayment.downPayment)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing Fee:</span>
                    <span className="">{formatCurrency(data.downPayment.processingFeeAmount)}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/20 pt-2 mt-2">
                    <span>Cash Needed:</span>
                    <span className="font-medium text-xl">
                      {formatCurrency(data.downPayment.cashNeeded)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Max Loan Amount:</span>
                    <span className="">{formatCurrency(data.downPayment.maxLoan)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly EMI:</span>
                    <span className="">{formatCurrency(data.downPayment.monthlyEMI)}</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'bt' && data.balanceTransfer && (
            <>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                <h4 className=" text-gray-900 mb-3 text-lg">Current Loan Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className=" text-gray-900">
                      {formatCurrency(data.balanceTransfer.totalAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current EMI:</span>
                    <span className=" text-gray-900">
                      {formatCurrency(data.balanceTransfer.currentEMI)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Start Date:</span>
                    <span className=" text-gray-900">{data.balanceTransfer.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tenure:</span>
                    <span className=" text-gray-900">{data.balanceTransfer.tenure} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">New Interest Rate:</span>
                    <span className=" text-gray-900">
                      {data.balanceTransfer.interestRate}% p.a.
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-[var(--primary-blue-dark)] to-[var(--primary-blue)] rounded-xl p-4 text-white">
                <h4 className=" mb-3 text-lg">Savings Calculation</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>New Monthly EMI:</span>
                    <span className="">{formatCurrency(data.balanceTransfer.newEMI)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reduced Monthly EMI:</span>
                    <span className="">{formatCurrency(data.balanceTransfer.reducedEMI)}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/20 pt-2 mt-2">
                    <span>Total Savings Over Tenure:</span>
                    <span className="font-medium text-xl">
                      {formatCurrency(data.balanceTransfer.totalSavings)}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          {activeTab !== 'emi' && (
            <button
              onClick={handleWhatsApp}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl  transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FaWhatsapp className="w-5 h-5" />
              <span>Continue on WhatsApp</span>
            </button>
          )}
          <button
            onClick={() => {
              window.location.href = `tel:9560069525`;
              setShowDialog(false);
            }}
            className="flex-1 bg-[var(--primary-blue-dark)] hover:bg-[var(--primary-blue)] text-white px-6 py-3 rounded-xl  transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FaPhone className="w-5 h-5" />
            <span>Call Now</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 w-full">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-medium text-gray-900 leading-tight capitalize">
              Tools to Plan Your Home Loan
            </h2>
            <p className="text-sm text-gray-600 mt-3">
              Calculate your loan details with our smart calculators
            </p>
          </div>

          {/* Tabs - Modern Design */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              { id: 'emi', label: 'EMI Calculator' },
              { id: 'affordability', label: 'Affordability' },
              { id: 'downPayment', label: 'Down-Payment' },
              { id: 'bt', label: 'BT Calculator' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 sm:px-6 py-3 sm:py-4 rounded-xl font-medium uppercase text-xs md:text-sm transition-all duration-300 transform ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[var(--primary-blue-dark)] to-[var(--primary-blue)] text-white shadow-lg scale-105'
                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-[var(--primary-blue)] hover:shadow-md'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Calculator Card - Modern Design */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left Section - Inputs */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 sm:p-8 border-r-0 lg:border-r border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* EMI Calculator Inputs */}
                  {activeTab === 'emi' && (
                    <>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-900 mb-3">
                          Loan Amount
                        </label>
                        <input
                          type="text"
                          value={`₹${formatNumber(emiLoanAmount)}`}
                          onChange={(e) => {
                            const val = e.target.value.replace(/[₹,\s]/g, '');
                            if (!isNaN(val)) setEmiLoanAmount(Number(val) || 0);
                          }}
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue-dark)] focus:border-transparent"
                        />
                        <div className="flex flex-wrap gap-2 mt-3">
                          {['50L', '75L', '1Cr', '3Cr', '5Cr'].map((val) => (
                            <button
                              key={val}
                              onClick={() => {
                                const multiplier = val.includes('Cr') ? 10000000 : 100000;
                                const num = parseFloat(val.replace(/[LCr]/g, ''));
                                setEmiLoanAmount(num * multiplier);
                              }}
                              className="px-4 py-2 bg-gray-100 hover:bg-[var(--primary-blue-dark)] hover:text-white rounded-lg text-sm font-medium text-gray-700 transition-all duration-300"
                            >
                              {val}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <label className="text-sm font-medium text-gray-900">
                            Interest Rate (% p.a)
                          </label>
                          <span className="text-lg sm:text-xl font-medium text-[var(--primary-blue-dark)]">
                            {emiInterestRate.toFixed(2)} %
                          </span>
                        </div>
                        <input
                          type="range"
                          min="5"
                          max="25"
                          step="0.1"
                          value={emiInterestRate}
                          onChange={(e) => setEmiInterestRate(Number(e.target.value))}
                          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--primary-blue-dark)]"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                          <span>5%</span>
                          <span>25%</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <label className="text-sm font-medium text-gray-900">
                            Tenure (Years)
                          </label>
                          <span className="text-lg sm:text-xl font-medium text-[var(--primary-blue-dark)]">
                            {emiTenure} years
                          </span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="30"
                          step="1"
                          value={emiTenure}
                          onChange={(e) => setEmiTenure(Number(e.target.value))}
                          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--primary-blue-dark)]"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                          <span>1</span>
                          <span>30</span>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Affordability Calculator Inputs */}
                  {activeTab === 'affordability' && (
                    <>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-900 mb-3">
                          Monthly Income
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={`₹${formatNumber(affMonthlyIncome)}`}
                            onChange={(e) => {
                              const val = e.target.value.replace(/[₹,\s]/g, '');
                              if (!isNaN(val)) setAffMonthlyIncome(Number(val) || 0);
                            }}
                            className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue-dark)] focus:border-transparent"
                          />
                          <div className="px-4 py-2 bg-gray-100 rounded-xl text-xs text-gray-700 flex items-center min-w-[40px] justify-center">
                            {affMonthlyIncome >= 1000
                              ? `${(affMonthlyIncome / 1000).toFixed(0)} K`
                              : `${affMonthlyIncome}`}
                          </div>
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-900 mb-3">
                          Current EMI
                        </label>
                        <input
                          type="text"
                          value={`₹${formatNumber(affCurrentEMI)}`}
                          onChange={(e) => {
                            const val = e.target.value.replace(/[₹,\s]/g, '');
                            if (!isNaN(val)) setAffCurrentEMI(Number(val) || 0);
                          }}
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue-dark)] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <label className="text-sm font-medium text-gray-900">
                            Interest Rate (% p.a)
                          </label>
                          <span className="text-lg sm:text-xl font-medium text-[var(--primary-blue-dark)]">
                            {affInterestRate.toFixed(2)} %
                          </span>
                        </div>
                        <input
                          type="range"
                          min="5"
                          max="25"
                          step="0.1"
                          value={affInterestRate}
                          onChange={(e) => setAffInterestRate(Number(e.target.value))}
                          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--primary-blue-dark)]"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                          <span>5%</span>
                          <span>25%</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <label className="text-sm font-medium text-gray-900">
                            Tenure (Years)
                          </label>
                          <span className="text-lg sm:text-xl font-medium text-[var(--primary-blue-dark)]">
                            {affTenure} years
                          </span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="30"
                          step="1"
                          value={affTenure}
                          onChange={(e) => setAffTenure(Number(e.target.value))}
                          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--primary-blue-dark)]"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                          <span>1</span>
                          <span>30</span>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Down Payment Calculator Inputs */}
                  {activeTab === 'downPayment' && (
                    <>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-900 mb-3">
                          Property Value
                        </label>
                        <div className="flex gap-1">
                          <input
                            type="text"
                            value={`₹${formatNumber(dpPropertyValue)}`}
                            onChange={(e) => {
                              const val = e.target.value.replace(/[₹,\s]/g, '');
                              if (!isNaN(val)) setDpPropertyValue(Number(val) || 0);
                            }}
                            className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue-dark)] focus:border-transparent"
                          />
                          <div className="px-2 py-2 bg-gray-100 rounded-xl text-xs text-gray-700 flex items-center min-w-[55px] justify-center">
                            {dpPropertyValue >= 100000
                              ? `${(dpPropertyValue / 100000).toFixed(0)} L`
                              : `${dpPropertyValue}`}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-3 ">
                          <label className="text-sm font-medium text-gray-900">
                            Interest Rate (% p.a)
                          </label>
                          <span className="text-lg sm:text-xl font-medium text-[var(--primary-blue-dark)]">
                            {dpInterestRate.toFixed(2)} %
                          </span>
                        </div>
                        <input
                          type="range"
                          min="5"
                          max="25"
                          step="0.1"
                          value={dpInterestRate}
                          onChange={(e) => setDpInterestRate(Number(e.target.value))}
                          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--primary-blue-dark)]"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                          <span>5%</span>
                          <span>25%</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <label className="text-sm font-medium text-gray-900">
                            Processing Fee (%)
                          </label>
                          <span className="text-lg sm:text-xl font-medium text-[var(--primary-blue-dark)]">
                            {dpProcessingFee.toFixed(2)} %
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="5"
                          step="0.1"
                          value={dpProcessingFee}
                          onChange={(e) => setDpProcessingFee(Number(e.target.value))}
                          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--primary-blue-dark)]"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                          <span>0%</span>
                          <span>5%</span>
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <div className="flex justify-between items-center mb-3">
                          <label className="text-sm font-medium text-gray-900">
                            Tenure (Years)
                          </label>
                          <span className="text-lg sm:text-xl font-medium text-[var(--primary-blue-dark)]">
                            {dpTenure} years
                          </span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="30"
                          step="1"
                          value={dpTenure}
                          onChange={(e) => setDpTenure(Number(e.target.value))}
                          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--primary-blue-dark)]"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                          <span>1</span>
                          <span>30</span>
                        </div>
                      </div>
                    </>
                  )}

                  {/* BT Calculator Inputs */}
                  {activeTab === 'bt' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-3">
                          Total Amount
                        </label>
                        <input
                          type="text"
                          value={`₹${formatNumber(btTotalAmount)}`}
                          onChange={(e) => {
                            const val = e.target.value.replace(/[₹,\s]/g, '');
                            if (!isNaN(val)) setBtTotalAmount(Number(val) || 0);
                          }}
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue-dark)] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-3">
                          Current EMI
                        </label>
                        <input
                          type="text"
                          value={`₹${formatNumber(btCurrentEMI)}`}
                          onChange={(e) => {
                            const val = e.target.value.replace(/[₹,\s]/g, '');
                            if (!isNaN(val)) setBtCurrentEMI(Number(val) || 0);
                          }}
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue-dark)] focus:border-transparent"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-900 mb-3">
                          Starting Mo/Yr
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="relative">
                            <select
                              value={btStartMonth}
                              onChange={(e) => setBtStartMonth(e.target.value)}
                              className="w-full appearance-none px-4 py-2 border-2 border-gray-300 rounded-xl text-base bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue-dark)] focus:border-transparent cursor-pointer"
                            >
                              {months.map((m) => (
                                <option key={m} value={m}>
                                  {m}
                                </option>
                              ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <svg
                                className="fill-current h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                              </svg>
                            </div>
                          </div>
                          <div className="relative">
                            <select
                              value={btStartYear}
                              onChange={(e) => setBtStartYear(Number(e.target.value))}
                              className="w-full appearance-none px-4 py-2 border-2 border-gray-300 rounded-xl text-base bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue-dark)] focus:border-transparent cursor-pointer"
                            >
                              {years.map((y) => (
                                <option key={y} value={y}>
                                  {y}
                                </option>
                              ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <svg
                                className="fill-current h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <label className="text-sm font-medium text-gray-900">
                            Tenure (Years)
                          </label>
                          <span className="text-lg sm:text-xl font-medium text-[var(--primary-blue-dark)]">
                            {btTenure} years
                          </span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="30"
                          step="1"
                          value={btTenure}
                          onChange={(e) => setBtTenure(Number(e.target.value))}
                          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--primary-blue-dark)]"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                          <span>1</span>
                          <span>30</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <label className="text-sm font-medium text-gray-900">
                            Interest Rate (% p.a)
                          </label>
                          <span className="text-lg sm:text-xl font-medium text-[var(--primary-blue-dark)]">
                            {btInterestRate.toFixed(2)} %
                          </span>
                        </div>
                        <input
                          type="range"
                          min="5"
                          max="25"
                          step="0.1"
                          value={btInterestRate}
                          onChange={(e) => setBtInterestRate(Number(e.target.value))}
                          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--primary-blue-dark)]"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                          <span>5%</span>
                          <span>25%</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Right Section - Results */}
              <div className="bg-gradient-to-br from-[var(--primary-blue-dark)] to-[var(--primary-blue)] p-6 sm:p-8 text-white flex flex-col justify-between">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* EMI Calculator Results */}
                  {activeTab === 'emi' && (
                    <>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 md:col-span-2">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm">Monthly EMI</span>
                        </div>
                        <div className="text-3xl font-medium">{formatCurrency(emiMonthly)}</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                        <div className="flex justify-between items-center h-full">
                          <div>
                            <span className="text-sm block mb-1">Total Interest</span>
                            <span className="text-xl font-medium">
                              {formatCurrency(emiTotalInterest)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                        <div className="flex justify-between items-center h-full">
                          <div>
                            <span className="text-sm block mb-1">Total Amount</span>
                            <span className="text-xl font-medium">
                              {formatCurrency(emiTotalAmount)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Affordability Calculator Results */}
                  {activeTab === 'affordability' && (
                    <>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 md:col-span-2">
                        <div className="mb-2">
                          <span className="text-sm block mb-2">
                            You can consider properties worth
                          </span>
                        </div>
                        <div className="text-3xl font-medium">
                          {formatCurrency(affPropertyWorth)}
                        </div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                        <div className="flex flex-col justify-center h-full">
                          <span className="text-sm mb-1">Max Loan Amount</span>
                          <div className="text-xl font-medium">{formatCurrency(affMaxLoan)}</div>
                        </div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                        <div className="flex flex-col justify-center h-full">
                          <span className="text-sm mb-1">Monthly EMI</span>
                          <div className="text-xl font-medium">
                            {formatCurrency(affCalculatedEMI)}
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Down Payment Calculator Results */}
                  {activeTab === 'downPayment' && (
                    <>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 md:col-span-2">
                        <div className="mb-2">
                          <span className="text-sm block mb-2">Down Payment</span>
                        </div>
                        <div className="text-3xl font-medium text-red-200">
                          {formatCurrency(dpDownPayment)}
                        </div>
                        <p className="text-xs text-white/80 mt-2">(Min. 20% needed)</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                        <div className="flex flex-col justify-center h-full">
                          <span className="text-sm mb-1">Processing Fee</span>
                          <span className="text-xl font-medium">
                            {formatCurrency(dpProcessingFeeAmount)}
                          </span>
                        </div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 ">
                        <div className="mb-2">
                          <span className="text-sm block mb-2">Cash Needed</span>
                        </div>
                        <div className="text-3xl font-medium text-red-200">
                          {formatCurrency(dpCashNeeded)}
                        </div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                        <div className="flex flex-col justify-center h-full">
                          <span className="text-sm mb-1">Max Loan Amount</span>
                          <div className="text-xl font-medium">{formatCurrency(dpMaxLoan)}</div>
                        </div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                        <div className="flex flex-col justify-center h-full">
                          <span className="text-sm mb-1">Monthly EMI</span>
                          <div className="text-xl font-medium">{formatCurrency(dpMonthlyEMI)}</div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* BT Calculator Results */}
                  {activeTab === 'bt' && (
                    <>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 md:col-span-2">
                        <div className="mb-2">
                          <span className="text-sm block mb-2">Total Savings Over Tenure</span>
                        </div>
                        <div className="text-3xl font-medium">{formatCurrency(btTotalSavings)}</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 md:col-span-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Reduced Monthly EMI</span>
                          <span className="text-xl sm:text-2xl font-medium">
                            {formatCurrency(btReducedEMI)}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 mt-auto">
                  <button
                    onClick={handleApplyNow}
                    className="flex-1 bg-white hover:bg-gray-50 text-[var(--primary-blue-dark)] px-6 py-4 rounded-xl font-medium text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    Apply Now
                  </button>
                  {activeTab !== 'emi' && (
                    <button
                      onClick={handleWhatsApp}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-xl font-medium text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
                    >
                      <FaWhatsapp className="w-5 h-5" />
                      <span>Chat now</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dialog Modal */}
      {showDialog && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowDialog(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {renderDialogContent()}
          </div>
        </div>
      )}
    </>
  );
}
