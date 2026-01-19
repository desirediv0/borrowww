'use client';

import { useEffect, useMemo, useState } from 'react';

import { motion } from 'framer-motion';
import { Calculator, Calendar, IndianRupee, Percent, RefreshCw } from 'lucide-react';

import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Slider } from './ui/slider';

export default function LoanCalculator() {
  const [activeTab, setActiveTab] = useState('emi');
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(20);
  const [downPayment, setDownPayment] = useState(100000);
  const [btPeriod, setBtPeriod] = useState('monthly'); // monthly or yearly for BT calculator

  // Calculate loan details
  const calculateLoan = () => {
    const principal = loanAmount - (activeTab === 'home' ? downPayment : 0);
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (monthlyRate === 0) {
      return {
        monthlyPayment: principal / numberOfPayments,
        totalPayment: principal,
        totalInterest: 0,
        emi: principal / numberOfPayments,
      };
    }

    const emi =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalPayment = emi * numberOfPayments;
    const totalInterest = totalPayment - principal;

    return {
      monthlyPayment: emi,
      totalPayment,
      totalInterest,
      emi,
    };
  };

  const loanDetails = calculateLoan();
  const emi = loanDetails.emi;
  const totalInterest = loanDetails.totalInterest;
  const totalPayment = loanDetails.totalPayment;

  // Loan type configurations
  const loanTypes = useMemo(
    () => ({
      emi: {
        name: 'EMI Calculator',
        icon: Calculator,
        minAmount: 100000,
        maxAmount: 50000000,
        minRate: 6.5,
        maxRate: 12,
        minTerm: 5,
        maxTerm: 30,
        description: 'Calculate your monthly EMI for any loan amount',
        color: 'from-[#2D3E50] to-blue-700',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
      },
      bt: {
        name: 'BT Calculator',
        icon: RefreshCw,
        minAmount: 100000,
        maxAmount: 50000000,
        minRate: 6.5,
        maxRate: 12,
        minTerm: 5,
        maxTerm: 30,
        description: 'Balance Transfer Calculator for better rates',
        color: 'from-[#2D3E50] to-blue-700',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
      },
    }),
    []
  );

  const currentLoanType = loanTypes[activeTab];

  // Update loan parameters based on loan type
  useEffect(() => {
    const type = loanTypes[activeTab];
    setLoanAmount(Math.min(Math.max(loanAmount, type.minAmount), type.maxAmount));
    setInterestRate(Math.min(Math.max(interestRate, type.minRate), type.maxRate));
    setLoanTerm(Math.min(Math.max(loanTerm, type.minTerm), type.maxTerm));
  }, [activeTab, loanAmount, interestRate, loanTerm, loanTypes]);

  // Console logging function
  const handleCalculate = () => {
    const data = {
      calculatorType: activeTab,
      loanAmount,
      interestRate,
      loanTerm,
      emi,
      totalInterest,
      totalPayment,
      btPeriod: activeTab === 'bt' ? btPeriod : null,
      timestamp: new Date().toISOString(),
    };

    console.log('Loan Calculator Data:', data);
    console.table(data);
  };

  const handleApply = () => {
    const data = {
      action: 'Apply for Loan',
      calculatorType: activeTab,
      loanAmount,
      interestRate,
      loanTerm,
      emi,
      totalInterest,
      totalPayment,
      btPeriod: activeTab === 'bt' ? btPeriod : null,
      timestamp: new Date().toISOString(),
    };

    console.log('Loan Application Data:', data);
    console.table(data);
  };

  return (
    <section id="calculator" className="py-12 ">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-24">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl lg:text-4xl font-medium text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Smart Loan Calculator
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Calculate your EMI, interest, and total payment for different types of loans. Get
            instant loan estimates based on your CIBIL score and requirements.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Side - Loan Type Tabs */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1"
          >
            <Card className="border-0 bg-[var(--primary-blue)] backdrop-blur-md h-full overflow-hidden text-white p-4 md:p-6">
              <CardContent className="p-4 flex flex-col justify-between h-full">
                <div className="space-y-2">
                  {Object.entries(loanTypes).map(([key, type]) => (
                    <motion.button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`w-full p-3 pl-6 rounded-full transition-all duration-300 ${
                        activeTab === key
                          ? `bg-white text-black shadow-lg transform scale-105`
                          : '  text-white border border-gray-200 hover:border-gray-300'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-left">
                          <div className="font-semibold text-base">{type.name}</div>
                          <div
                            className={`text-xs ${activeTab === key ? 'text-black' : 'text-white'}`}
                          >
                            {type.description}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
                {/* Animated Histogram Chart */}
                <div className="mt-8">
                  <svg className="w-full h-64" viewBox="0 0 200 120">
                    {/* Histogram Bars */}
                    <motion.rect
                      x="10"
                      y="80"
                      width="16"
                      height="40"
                      fill="white"
                      initial={{ height: 0, y: 120 }}
                      animate={{ height: 40, y: 80 }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        delay: 0,
                      }}
                    />
                    <motion.rect
                      x="35"
                      y="55"
                      width="16"
                      height="65"
                      fill="white"
                      initial={{ height: 0, y: 120 }}
                      animate={{ height: 65, y: 55 }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        delay: 0.2,
                      }}
                    />
                    <motion.rect
                      x="60"
                      y="30"
                      width="16"
                      height="90"
                      fill="white"
                      initial={{ height: 0, y: 120 }}
                      animate={{ height: 90, y: 30 }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        delay: 0.4,
                      }}
                    />
                    <motion.rect
                      x="85"
                      y="10"
                      width="16"
                      height="110"
                      fill="white"
                      initial={{ height: 0, y: 120 }}
                      animate={{ height: 110, y: 10 }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        delay: 0.6,
                      }}
                    />
                    <motion.rect
                      x="110"
                      y="20"
                      width="16"
                      height="100"
                      fill="white"
                      initial={{ height: 0, y: 120 }}
                      animate={{ height: 100, y: 20 }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        delay: 0.8,
                      }}
                    />
                    <motion.rect
                      x="135"
                      y="40"
                      width="16"
                      height="80"
                      fill="white"
                      initial={{ height: 0, y: 120 }}
                      animate={{ height: 80, y: 40 }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        delay: 1,
                      }}
                    />
                    <motion.rect
                      x="160"
                      y="60"
                      width="16"
                      height="60"
                      fill="white"
                      initial={{ height: 0, y: 120 }}
                      animate={{ height: 60, y: 60 }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        delay: 1.2,
                      }}
                    />
                  </svg>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Side - Calculator */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Calculator Inputs */}
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-md overflow-hidden mb-4 rounded-bl-[10em]">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <div className={`p-2 rounded-lg ${currentLoanType.bgColor}`}>
                        <currentLoanType.icon className="w-5 h-5 text-[#2D3E50]" />
                      </div>
                      {currentLoanType.name}
                    </CardTitle>
                    <CardDescription>{currentLoanType.description}</CardDescription>
                  </div>
                  <div>
                    <p>Monthly EMI</p>
                    <div className="flex">
                      <motion.div
                        key={emi}
                        className="text-4xl lg:text-5xl font-extrabold mb-1 text-[var(--primary-green)]"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        ₹{emi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </motion.div>
                      <p className="text-lg text-gray-600 my-auto pl-2">/per month</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-6">
                  {/* Loan Amount */}
                  <motion.div
                    className="space-y-3 bg-white rounded-xl p-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <Label className="text-base font-medium flex items-center gap-2 text-blue-700">
                        <IndianRupee className="w-4 h-4 text-[#2D3E50]" />
                        Loan Amount
                      </Label>
                      <span className="text-xl font-extrabold text-blue-800">
                        ₹{loanAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="relative">
                      <Input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value) || 0)}
                        placeholder="Enter loan amount"
                        className="text-base p-3 border-2 border-blue-200 focus:border-[#2D3E50] rounded-xl bg-white shadow-sm mb-3"
                        min="0"
                        step="1000"
                      />
                      <Slider
                        min={currentLoanType.minAmount}
                        max={currentLoanType.maxAmount}
                        step={10000}
                        value={[loanAmount]}
                        onValueChange={(value) => setLoanAmount(value[0])}
                        className="w-full h-3 bg-blue-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#2D3E50]"
                        thumbClassName="bg-[#2D3E50] border-2 border-white w-6 h-6 shadow-lg"
                        trackClassName="bg-blue-400 h-3 rounded-full"
                      />
                      <div className="flex justify-between text-xs text-[#2D3E50] mt-1">
                        <span>₹{currentLoanType.minAmount.toLocaleString('en-IN')}</span>
                        <span>₹{currentLoanType.maxAmount.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Interest Rate */}
                  <motion.div
                    className="space-y-3 bg-white rounded-xl p-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <Label className="text-base font-medium flex items-center gap-2 text-blue-700">
                        <Percent className="w-4 h-4 text-[#2D3E50]" />
                        Interest Rate (% per annum)
                      </Label>
                      <span className="text-xl font-extrabold text-blue-800">{interestRate}%</span>
                    </div>
                    <div className="relative">
                      <Input
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                        placeholder="Enter interest rate"
                        className="text-base p-3 border-2 border-blue-200 focus:border-[#2D3E50] rounded-xl bg-white shadow-sm mb-3"
                        min="0"
                        max="100"
                        step="0.01"
                      />
                      <Slider
                        min={currentLoanType.minRate}
                        max={currentLoanType.maxRate}
                        step={0.1}
                        value={[interestRate]}
                        onValueChange={(value) => setInterestRate(value[0])}
                        className="w-full h-3 bg-blue-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#2D3E50]"
                        thumbClassName="bg-[#2D3E50] border-2 border-white w-6 h-6 shadow-lg"
                        trackClassName="bg-blue-400 h-3 rounded-full"
                      />
                      <div className="flex justify-between text-xs text-[#2D3E50] mt-1">
                        <span>{currentLoanType.minRate}%</span>
                        <span>{currentLoanType.maxRate}%</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Loan Term */}
                  <motion.div
                    className="space-y-3 bg-white rounded-xl p-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <Label className="text-base font-medium flex items-center gap-2 text-blue-700">
                        <Calendar className="w-4 h-4 text-[#2D3E50]" />
                        Loan Term (Years)
                      </Label>
                      <span className="text-xl font-extrabold text-blue-800">{loanTerm} years</span>
                    </div>
                    <div className="relative">
                      <Slider
                        min={currentLoanType.minTerm}
                        max={currentLoanType.maxTerm}
                        step={1}
                        value={[loanTerm]}
                        onValueChange={(value) => setLoanTerm(value[0])}
                        className="w-full h-3 bg-blue-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#2D3E50]"
                        thumbClassName="bg-[#2D3E50] border-2 border-white w-6 h-6 shadow-lg"
                        trackClassName="bg-blue-400 h-3 rounded-full"
                      />
                      <div className="flex justify-between text-xs text-[#2D3E50] mt-1">
                        <span>{currentLoanType.minTerm} years</span>
                        <span>{currentLoanType.maxTerm} years</span>
                      </div>
                    </div>

                    {/* BT Period Selection (only for BT Calculator) */}
                    {activeTab === 'bt' && (
                      <div className="mt-4">
                        <Label className="text-base font-medium flex items-center gap-2 text-blue-700 mb-2">
                          <RefreshCw className="w-4 h-4 text-[#2D3E50]" />
                          BT Period
                        </Label>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => setBtPeriod('monthly')}
                            className={`flex-1 ${
                              btPeriod === 'monthly'
                                ? 'bg-[#2D3E50] text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                          >
                            Monthly
                          </Button>
                          <Button
                            onClick={() => setBtPeriod('yearly')}
                            className={`flex-1 ${
                              btPeriod === 'yearly'
                                ? 'bg-[#2D3E50] text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                          >
                            Yearly
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Buttons */}
                    <motion.div
                      className="flex gap-3 pt-3 md:pt-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <Button
                        onClick={handleApply}
                        className="bg-gradient-to-r from-[#2D3E50] to-blue-700 hover:opacity-90 text-white py-4 md:py-6 px-8 text-lg font-medium rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                      >
                        Apply
                      </Button>
                    </motion.div>
                  </motion.div>

                  {/* Loan Summary */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <Card className=" bg-white border-none shadow-none overflow-hidden h-full flex flex-col justify-center p-6">
                      <CardHeader className="bg-transparent p-0 mb-2 w-full text-center">
                        <CardTitle className="text-black text-2xl font-medium">
                          Loan Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0 w-full flex flex-col gap-4 items-center">
                        <div className="grid grid-cols-2 gap-4 w-full">
                          <div className="text-center p-3 bg-blue-50 rounded-xl border border-blue-200">
                            <div className="text-lg font-medium text-blue-700">
                              ₹
                              {(
                                loanAmount - (activeTab === 'home' ? downPayment : 0)
                              ).toLocaleString('en-IN')}
                            </div>
                            <div className="text-xs text-[#2D3E50]">Principal</div>
                          </div>
                          <div className="text-center p-3 bg-blue-50 rounded-xl border border-blue-200">
                            <div className="text-lg font-medium text-blue-700">
                              ₹{totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                            </div>
                            <div className="text-xs text-[#2D3E50]">Total Interest</div>
                          </div>
                        </div>
                        <div className="text-center p-3 bg-blue-100 rounded-xl border border-blue-300 w-full">
                          <div className="text-lg font-medium text-blue-800">
                            ₹{totalPayment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                          </div>
                          <div className="text-xs text-blue-700">Total Payment</div>
                        </div>
                        {activeTab === 'bt' && (
                          <div className="text-center p-3 bg-green-50 rounded-xl border border-green-200 w-full">
                            <div className="text-lg font-medium text-green-700">
                              {btPeriod === 'monthly' ? 'Monthly' : 'Yearly'} BT Period
                            </div>
                            <div className="text-xs text-green-600">Balance Transfer Option</div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
