'use client';

import { useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import {
  Building2,
  Calculator,
  Calendar,
  Car,
  GraduationCap,
  Heart,
  Home,
  IndianRupee,
  Percent,
  TrendingUp,
  User,
} from 'lucide-react';

import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Slider } from './ui/slider';

export default function LoanCalculator() {
  const [activeTab, setActiveTab] = useState('home');
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(20);
  const [downPayment, setDownPayment] = useState(100000);
  const [monthlyIncome, setMonthlyIncome] = useState(50000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(20000);

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

  // Calculate affordability
  const availableForEMI = monthlyIncome - monthlyExpenses;
  const affordabilityRatio = (emi / availableForEMI) * 100;
  const isAffordable = affordabilityRatio <= 40;

  // Loan type configurations
  const loanTypes = {
    home: {
      name: 'Home Loan',
      icon: Home,
      minAmount: 100000,
      maxAmount: 50000000,
      minRate: 6.5,
      maxRate: 12,
      minTerm: 5,
      maxTerm: 30,
      description: 'Finance your dream home with competitive rates',
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    personal: {
      name: 'Personal Loan',
      icon: User,
      minAmount: 10000,
      maxAmount: 10000000,
      minRate: 10,
      maxRate: 18,
      minTerm: 1,
      maxTerm: 7,
      description: 'Quick personal loans for your immediate needs',
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    business: {
      name: 'Business Loan',
      icon: Building2,
      minAmount: 50000,
      maxAmount: 20000000,
      minRate: 12,
      maxRate: 20,
      minTerm: 1,
      maxTerm: 10,
      description: 'Grow your business with flexible financing',
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    car: {
      name: 'Car Loan',
      icon: Car,
      minAmount: 50000,
      maxAmount: 15000000,
      minRate: 8,
      maxRate: 15,
      minTerm: 1,
      maxTerm: 8,
      description: 'Drive your dream car with easy financing',
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    education: {
      name: 'Education Loan',
      icon: GraduationCap,
      minAmount: 25000,
      maxAmount: 10000000,
      minRate: 7,
      maxRate: 14,
      minTerm: 1,
      maxTerm: 10,
      description: 'Invest in your future with education loans',
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    medical: {
      name: 'Medical Loan',
      icon: Heart,
      minAmount: 10000,
      maxAmount: 5000000,
      minRate: 9,
      maxRate: 16,
      minTerm: 1,
      maxTerm: 5,
      description: 'Healthcare financing when you need it most',
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
  };

  const currentLoanType = loanTypes[activeTab];

  // Update loan parameters based on loan type
  useEffect(() => {
    const type = loanTypes[activeTab];
    setLoanAmount(Math.min(Math.max(loanAmount, type.minAmount), type.maxAmount));
    setInterestRate(Math.min(Math.max(interestRate, type.minRate), type.maxRate));
    setLoanTerm(Math.min(Math.max(loanTerm, type.minTerm), type.maxTerm));
  }, [activeTab, loanAmount, interestRate, loanTerm, loanTypes]);

  return (
    <section id="calculator" className="py-12 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
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
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 p-4">
                <CardTitle className="text-xl font-bold text-gray-900">Choose Loan Type</CardTitle>
                <CardDescription>Select the type of loan you&apos;re interested in</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {Object.entries(loanTypes).map(([key, type]) => (
                    <motion.button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`w-full p-3 rounded-xl transition-all duration-300 ${
                        activeTab === key
                          ? `bg-gradient-to-r ${type.color} text-white shadow-lg transform scale-105`
                          : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 hover:border-gray-300'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-2 rounded-lg ${
                            activeTab === key ? 'bg-white/20' : type.bgColor
                          }`}
                        >
                          <type.icon
                            className={`w-5 h-5 ${
                              activeTab === key
                                ? 'text-white'
                                : `text-${type.color.split('-')[1]}-600`
                            }`}
                          />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-base">{type.name}</div>
                          <div
                            className={`text-xs ${
                              activeTab === key ? 'text-white/80' : 'text-gray-500'
                            }`}
                          >
                            {type.description}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
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
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden mb-4">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 p-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <div className={`p-2 rounded-lg ${currentLoanType.bgColor}`}>
                    <currentLoanType.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  {currentLoanType.name} Calculator
                </CardTitle>
                <CardDescription>{currentLoanType.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  {/* Loan Amount */}
                  <motion.div
                    className="space-y-3 bg-white rounded-xl p-5 border border-blue-100 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <Label className="text-base font-bold flex items-center gap-2 text-blue-700">
                        <IndianRupee className="w-4 h-4 text-blue-600" />
                        Loan Amount
                      </Label>
                      <span className="text-xl font-extrabold text-blue-800">
                        ₹{loanAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="relative">
                      <Slider
                        min={currentLoanType.minAmount}
                        max={currentLoanType.maxAmount}
                        step={10000}
                        value={[loanAmount]}
                        onValueChange={(value) => setLoanAmount(value[0])}
                        className="w-full h-3 bg-blue-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        thumbClassName="bg-blue-600 border-2 border-white w-6 h-6 shadow-lg"
                        trackClassName="bg-blue-400 h-3 rounded-full"
                      />
                      <div className="flex justify-between text-xs text-blue-600 mt-1">
                        <span>₹{currentLoanType.minAmount.toLocaleString('en-IN')}</span>
                        <span>₹{currentLoanType.maxAmount.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Interest Rate */}
                  <motion.div
                    className="space-y-3 bg-white rounded-xl p-5 border border-blue-100 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <Label className="text-base font-bold flex items-center gap-2 text-blue-700">
                        <Percent className="w-4 h-4 text-blue-600" />
                        Interest Rate (% per annum)
                      </Label>
                      <span className="text-xl font-extrabold text-blue-800">{interestRate}%</span>
                    </div>
                    <div className="relative">
                      <Slider
                        min={currentLoanType.minRate}
                        max={currentLoanType.maxRate}
                        step={1}
                        value={[interestRate]}
                        onValueChange={(value) => setInterestRate(value[0])}
                        className="w-full h-3 bg-blue-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        thumbClassName="bg-blue-600 border-2 border-white w-6 h-6 shadow-lg"
                        trackClassName="bg-blue-400 h-3 rounded-full"
                      />
                      <div className="flex justify-between text-xs text-blue-600 mt-1">
                        <span>{currentLoanType.minRate}%</span>
                        <span>{currentLoanType.maxRate}%</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Loan Term */}
                  <motion.div
                    className="space-y-3 bg-white rounded-xl p-5 border border-blue-100 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <Label className="text-base font-bold flex items-center gap-2 text-blue-700">
                        <Calendar className="w-4 h-4 text-blue-600" />
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
                        className="w-full h-3 bg-blue-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        thumbClassName="bg-blue-600 border-2 border-white w-6 h-6 shadow-lg"
                        trackClassName="bg-blue-400 h-3 rounded-full"
                      />
                      <div className="flex justify-between text-xs text-blue-600 mt-1">
                        <span>{currentLoanType.minTerm} years</span>
                        <span>{currentLoanType.maxTerm} years</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Down Payment (for home loan) */}
                  {activeTab === 'home' && (
                    <motion.div
                      className="space-y-3 bg-white rounded-xl p-5 border border-blue-100 shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <Label className="text-base font-bold flex items-center gap-2 text-blue-700">
                          <IndianRupee className="w-4 h-4 text-blue-600" />
                          Down Payment
                        </Label>
                        <span className="text-xl font-extrabold text-blue-800">
                          ₹{downPayment.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="relative">
                        <Slider
                          min={0}
                          max={loanAmount * 0.9}
                          step={10000}
                          value={[downPayment]}
                          onValueChange={(value) => setDownPayment(value[0])}
                          className="w-full h-3 bg-blue-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                          thumbClassName="bg-blue-600 border-2 border-white w-6 h-6 shadow-lg"
                          trackClassName="bg-blue-400 h-3 rounded-full"
                        />
                        <div className="flex justify-between text-xs text-blue-600 mt-1">
                          <span>₹0</span>
                          <span>₹{(loanAmount * 0.9).toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Monthly Income & Expenses */}
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div className="space-y-3 bg-white rounded-xl p-5 border border-blue-100 shadow-sm">
                      <Label className="text-base font-bold flex items-center gap-2 text-blue-700">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        Monthly Income
                      </Label>
                      <Input
                        type="number"
                        value={monthlyIncome}
                        onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                        placeholder="50000"
                        className="text-base p-3 border-2 border-blue-200 focus:border-blue-500 rounded-xl bg-white shadow-sm"
                      />
                    </div>
                    <div className="space-y-3 bg-white rounded-xl p-5 border border-blue-100 shadow-sm">
                      <Label className="text-base font-bold flex items-center gap-2 text-blue-700">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        Monthly Expenses
                      </Label>
                      <Input
                        type="number"
                        value={monthlyExpenses}
                        onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                        placeholder="20000"
                        className="text-base p-3 border-2 border-blue-200 focus:border-blue-500 rounded-xl bg-white shadow-sm"
                      />
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>

            {/* Results Section - Redesigned */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* EMI Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl overflow-hidden h-full flex flex-col justify-center items-center p-6">
                  <CardHeader className="bg-transparent p-0 mb-2 w-full text-center">
                    <CardTitle className="text-white text-2xl font-bold">Monthly EMI</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 w-full flex flex-col items-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={emi}
                        className="text-4xl lg:text-5xl font-extrabold mb-1"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        ₹{emi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </motion.div>
                    </AnimatePresence>
                    <p className="text-white/80 text-base">per month</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Loan Summary */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="shadow-2xl border-0 bg-white rounded-2xl overflow-hidden h-full flex flex-col justify-center p-6">
                  <CardHeader className="bg-transparent p-0 mb-2 w-full text-center">
                    <CardTitle className="text-black text-2xl font-bold">Loan Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 w-full flex flex-col gap-4 items-center">
                    <div className="grid grid-cols-2 gap-4 w-full">
                      <div className="text-center p-3 bg-blue-50 rounded-xl border border-blue-200">
                        <div className="text-lg font-bold text-blue-700">
                          ₹
                          {(loanAmount - (activeTab === 'home' ? downPayment : 0)).toLocaleString(
                            'en-IN'
                          )}
                        </div>
                        <div className="text-xs text-blue-600">Principal</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-xl border border-blue-200">
                        <div className="text-lg font-bold text-blue-700">
                          ₹{totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                        </div>
                        <div className="text-xs text-blue-600">Total Interest</div>
                      </div>
                    </div>
                    <div className="text-center p-3 bg-blue-100 rounded-xl border border-blue-300 w-full">
                      <div className="text-lg font-bold text-blue-800">
                        ₹{totalPayment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </div>
                      <div className="text-xs text-blue-700">Total Payment</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Affordability Check - Full width */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="shadow-2xl border-0 bg-white rounded-2xl overflow-hidden p-6">
                <CardHeader className="bg-transparent p-0 mb-2 w-full text-center">
                  <CardTitle className="text-blue-700 text-2xl font-bold">
                    Affordability Check
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 w-full flex flex-col gap-4 items-center">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-base font-semibold">EMI to Income Ratio</span>
                    <Badge
                      variant={isAffordable ? 'default' : 'destructive'}
                      className={`text-sm px-3 py-1 rounded-lg ${isAffordable ? 'bg-blue-500 text-white' : 'bg-red-500 text-white'}`}
                    >
                      {affordabilityRatio.toFixed(1)}%
                    </Badge>
                  </div>
                  <div className="w-full bg-blue-100 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${isAffordable ? 'bg-blue-500' : 'bg-red-500'}`}
                      style={{ width: `${Math.min(affordabilityRatio, 100)}%` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(affordabilityRatio, 100)}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                  <div className="text-sm">
                    {isAffordable ? (
                      <span className="text-blue-600 font-semibold">
                        ✓ Loan is affordable (EMI ≤ 40% of disposable income)
                      </span>
                    ) : (
                      <span className="text-red-600 font-semibold">
                        ⚠ EMI exceeds 40% of disposable income
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-blue-700">
                    Available for EMI: ₹{availableForEMI.toLocaleString('en-IN')}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Apply Now Button - Full width */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:opacity-90 text-white py-4 text-lg font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300">
                Apply for {currentLoanType.name}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
