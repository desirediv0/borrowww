'use client';

import { useState } from 'react';
import {
    ArrowRight,
    MessageSquareMore,
    Phone,
    ShieldCheck,
    ChevronDown,
    Check,
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';
import { isValidIndianNumber } from '@/utils/validation';
import PartnerBanks from '@/components/PartnerBanks';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export default function HomeLoanEligibilityClient() {
    const [form, setForm] = useState({
        name: '',
        phone: '',
        city: '',
        propertyType: 'Residential',
        loanAmount: '',
        duration: '120',
        monthlyIncome: '',
        employmentType: 'Salaried',
        remarks: 'Home Loan Eligibility Check Request',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [activeProfileTab, setActiveProfileTab] = useState('salaried');
    const [faqOpen, setFaqOpen] = useState(Array(20).fill(false));

    // Toggle FAQ Accordion
    const toggleFaq = (index) => {
        setFaqOpen(prev => {
            const newState = [...prev];
            newState[index] = !newState[index];
            return newState;
        });
    };

    // Validation
    const validateForm = () => {
        const newErrors = {};
        if (!form.name.trim()) {
            newErrors.name = 'Please enter your name';
        } else if (!/^[a-zA-Z\s]+$/.test(form.name.trim())) {
            newErrors.name = 'Name should contain only letters';
        }

        if (!form.phone.trim()) {
            newErrors.phone = 'Please enter mobile number';
        } else if (!isValidIndianNumber(form.phone)) {
            newErrors.phone = 'Please enter a valid mobile number';
        }

        if (form.loanAmount && !/^\d+$/.test(form.loanAmount)) {
            newErrors.loanAmount = 'Enter only numbers';
        }

        if (form.monthlyIncome && !/^\d+$/.test(form.monthlyIncome)) {
            newErrors.monthlyIncome = 'Enter only numbers';
        }

        setErrors(newErrors);
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            toast.error(Object.values(formErrors)[0]);
            return;
        }

        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const response = await fetch(`${API_URL}/client/home-loan`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Thank you! Our home loan expert will contact you shortly to discuss your eligibility.');
                setForm({
                    name: '',
                    phone: '',
                    city: '',
                    propertyType: 'Residential',
                    loanAmount: '',
                    duration: '120',
                    monthlyIncome: '',
                    employmentType: 'Salaried',
                    remarks: 'Home Loan Eligibility Check Request',
                });
                setErrors({});
            } else {
                toast.error(data.error || 'Failed to submit. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Failed to submit. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Table Data
    const criteriaOverview = [
        { criteria: 'Age', req: '21–65 years (salaried), up to 70–75 years (self-employed)' },
        { criteria: 'Minimum Income', req: 'Varies by lender; typically ₹25,000+ per month (salaried)' },
        { criteria: 'CIBIL Score', req: '700+ recommended, 750+ ideal' },
        { criteria: 'Employment Stability', req: '1–2 years with current employer / 2–3 years in business' },
        { criteria: 'Existing Obligations', req: 'Total EMIs ideally within 70-75% of net income for salaried, higher for business owners' },
        { criteria: 'Nationality', req: 'Resident Indian or NRI (with additional documentation)' }
    ];

    const incomeReqs = [
        { type: 'Salaried Employee', basis: 'Gross/net monthly salary, Form 16, salary slips' },
        { type: 'Self-Employed Professional', basis: 'ITR (2–3 years), profit statements' },
        { type: 'Business Owner', basis: 'Turnover, net profit, GST returns, audited statements' },
        { type: 'NRI', basis: 'Overseas salary certificate, NRE/NRO account statements' }
    ];

    const ageReqs = [
        { type: 'Salaried', min: '21 years', max: '60-65 years' },
        { type: 'Self-Employed', min: '21 years', max: '70-75 years' },
        { type: 'NRI', min: '21 years', max: '60–65 years' }
    ];

    const cibilGuide = [
        { score: '750–900', rating: 'Excellent', outcome: 'High approval chance, best interest rates', bg: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
        { score: '700–749', rating: 'Good', outcome: 'Generally approved by most lenders', bg: 'bg-teal-50 text-teal-700 border-teal-100' },
        { score: '650–699', rating: 'Fair', outcome: 'May be approved with stricter terms', bg: 'bg-amber-50 text-amber-700 border-amber-100' },
        { score: 'Below 650', rating: 'Poor', outcome: 'High rejection risk; co-applicant may help', bg: 'bg-red-50 text-red-700 border-red-100' }
    ];

    const docsOverview = [
        { type: 'Identity & Address Proof', salaried: 'Required', self: 'Required' },
        { type: 'Income Proof', salaried: 'Salary slips, Form 16', self: 'ITR, P&L statement' },
        { type: 'Bank Statements', salaried: 'Last 6 months', self: 'Last 6–12 months' },
        { type: 'Employment/Business Proof', salaried: 'Employment letter', self: 'Business registration, GST returns' },
        { type: 'Property Documents', salaried: 'Required', self: 'Required' }
    ];

    const factorsAffecting = [
        { factor: 'Existing EMIs', impact: 'Reduces eligible loan amount' },
        { factor: 'Loan Tenure', impact: 'Longer tenure increases eligibility, raises total interest' },
        { factor: 'Property Value', impact: 'Determines maximum loan via LTV ratio' },
        { factor: 'Down Payment', impact: 'Higher down payment can improve eligibility' },
        { factor: 'CIBIL Score', impact: 'Directly affects approval and interest rate' },
        { factor: 'Age', impact: 'Impacts maximum allowable tenure' }
    ];

    const comparisonTable = [
        { param: 'Income Proof', salaried: 'Salary slips, Form 16', self: 'ITR, P&L statement (2–3 yrs)' },
        { param: 'Employment Stability Required', salaried: '1–2 years', self: '2–3 years in business' },
        { param: 'Age Limit', salaried: 'Up to 60 years', self: 'Up to 65–70 years' },
        { param: 'Income Assessment', salaried: 'Fixed monthly salary', self: 'Averaged annual profit' },
        { param: 'Documentation Complexity', salaried: 'Lower', self: 'Slightly higher' }
    ];

    const faqsList = [
        {
            q: "What is home loan eligibility?",
            a: "Home loan eligibility refers to the maximum amount a bank or NBFC is willing to lend you, based on your income, age, credit score, existing financial obligations, and repayment capacity. It varies from person to person, since each applicant's financial profile is different. Lenders assess eligibility to ensure you can comfortably repay the loan through EMIs without financial strain. Factors like job stability, credit history, and current debts all play a role. Checking your eligibility beforehand helps you understand what loan amount to expect, allowing you to plan your property budget more realistically before you begin house-hunting or submit a formal application."
        },
        {
            q: "Who is eligible for a home loan in India?",
            a: "Salaried employees, self-employed professionals, business owners, and NRIs purchasing property in India can all apply for a home loan, provided they meet the lender's income, age, and credit score requirements. Most lenders require applicants to be at least 21 years old, with a stable income source and a reasonable credit history. Salaried applicants typically need one to two years of employment stability, while self-employed applicants need two to three years of consistent business or professional income. Joint applications with a co-applicant, such as a spouse or parent, can also improve overall eligibility."
        },
        {
            q: "What is the minimum salary required for a home loan?",
            a: "There isn't one fixed minimum salary across all lenders, but most banks expect salaried applicants to earn at least around ₹25,000 per month in metro areas, though this can vary based on the lender, city, and loan amount requested. A higher salary generally means a higher eligible loan amount and better negotiating power on interest rates. Self-employed applicants are assessed differently, based on net annual income reflected in their income tax returns rather than a fixed monthly salary figure. It's best to check with your specific lender for exact income thresholds."
        },
        {
            q: "What is the age limit for a home loan?",
            a: "Most lenders accept salaried applicants between 21 and 65 years of age, while self-employed individuals can often apply up to 70 or 75 years, since business income doesn't depend on a fixed retirement age. Your age at the time of application directly affects the maximum loan tenure you're offered — younger applicants typically qualify for longer tenures, which can lower EMIs and increase overall eligibility. If you're closer to the upper age limit, adding a younger co-applicant can help extend the tenure and improve your eligible loan amount."
        },
        {
            q: "How is home loan eligibility calculated?",
            a: "Lenders primarily use the Fixed Obligation to Income Ratio (FOIR) method, which looks at your total monthly income, subtracts existing EMIs and financial obligations, and determines how much of the remaining income can go towards a new home loan EMI, usually within 70–75% of net income for salaried and higher for business owners. From there, they calculate the maximum loan amount based on the applicable interest rate and chosen tenure. Other factors like age, credit score, employment stability, and property value also influence the final eligible amount, which is why the same salary can result in different eligibility for different applicants."
        },
        {
            q: "What CIBIL score is required for home loan eligibility?",
            a: "Most lenders prefer a CIBIL score of 700 or above, with scores of 750 and higher considered excellent and likely to result in faster approval and better interest rates. Scores between 650 and 699 may still be approved but often come with stricter terms or a higher interest rate. A score below 650 significantly increases the risk of rejection, though adding a co-applicant with a strong credit history can sometimes help. Maintaining timely repayments on existing loans and credit cards is the most effective way to build and protect a healthy CIBIL score."
        },
        {
            q: "Can self-employed individuals get a home loan?",
            a: "Yes, self-employed professionals and business owners are fully eligible for home loans, though the assessment process differs slightly from salaried applicants. Lenders typically review income tax returns for the last two to three years, profit and loss statements, business continuity, and bank statements to assess repayment capacity. Since self-employed income can fluctuate, lenders often average earnings across multiple years rather than relying on a single year's figures. Maintaining consistent, well-documented income and a healthy CIBIL score significantly improves eligibility for self-employed applicants."
        },
        {
            q: "How much home loan can I get based on my salary?",
            a: "As a general guideline, many lenders allow a home loan EMI of up to 70–75% of your net monthly income, after accounting for existing obligations. For example, higher take-home income, fewer existing EMIs, and a longer tenure can all increase your eligible loan amount. However, the exact figure depends on the lender's specific policies, your age, credit score, and the property's value. Using a home loan eligibility calculator gives you a quick, personalised estimate based on your actual income and financial situation."
        },
        {
            q: "Does existing EMI affect home loan eligibility?",
            a: "Yes, significantly. Lenders calculate your total monthly financial obligations, including existing car loans, personal loans, or credit card dues, before determining how much additional EMI you can comfortably afford. Higher existing EMIs reduce the portion of your income available for a new home loan, which lowers your eligible loan amount. If you're planning to apply for a home loan soon, paying off smaller existing debts beforehand can meaningfully improve your eligibility and may also help you secure a larger loan amount at more favourable terms."
        },
        {
            q: "What documents are required to check home loan eligibility?",
            a: "Typically, you'll need identity and address proof, recent income documents, and bank statements. Salaried applicants usually provide salary slips, Form 16, and six months of bank statements, while self-employed applicants submit income tax returns for two to three years, profit and loss statements, and business proof such as GST registration. Property-related documents are required once you've selected a specific property. An eligibility calculator, however, only requires basic details like income, age, and existing EMIs to give you an instant, document-free estimate."
        },
        {
            q: "Can I improve my home loan eligibility?",
            a: "Yes, there are several practical ways to improve eligibility, including reducing existing debts, adding a co-applicant with stable income, improving your CIBIL score through timely repayments, opting for a longer loan tenure, and increasing your down payment to lower the required loan amount. Avoiding multiple loan applications within a short period also helps, since each application can trigger a hard credit enquiry that may slightly lower your score. With three to six months of financial planning, most applicants can meaningfully improve their eligibility outcome before applying formally."
        },
        {
            q: "Why was my home loan application rejected?",
            a: "Common reasons include a low CIBIL score, high existing EMI burden relative to income, insufficient or inconsistent income documentation, frequent job changes, or applying for a loan amount beyond your realistic repayment capacity. Property-related issues, such as unclear title or pending legal approvals, can also lead to rejection. Reviewing your eligibility and documentation carefully before applying, or using an eligibility calculator to set realistic expectations, can help you avoid many of these common pitfalls and improve your chances of approval on the next attempt."
        },
        {
            q: "Is a co-applicant required for a home loan?",
            a: "A co-applicant isn't always mandatory, but adding one — typically a spouse, parent, or sibling with a stable income — can significantly boost your combined eligibility, especially if your individual income falls short of the required loan amount. A co-applicant's income and credit score are considered alongside yours, which can increase the total loan amount you qualify for. This is a common strategy among young professionals and first-time buyers looking to purchase a higher-value property than their individual income alone would support."
        },
        {
            q: "How does property value affect home loan eligibility?",
            a: "Lenders typically finance up to 75–90% of a property's assessed market value, a ratio known as Loan-to-Value (LTV). This means the property's value sets an upper ceiling on the loan amount, regardless of your income. However, your income and repayment capacity still determine the actual eligible amount within that ceiling. A higher-value property doesn't automatically increase your eligibility if your income doesn't support the corresponding EMI, which is why both factors are assessed together."
        },
        {
            q: "What is the difference between home loan eligibility and home loan approval?",
            a: "Eligibility refers to the estimated loan amount you may qualify for, based on income, age, and credit profile, often calculated instantly through an online tool. Approval, on the other hand, is the lender's final decision after verifying your documents, credit history, employment details, and the property you intend to purchase. Eligibility is a helpful starting estimate, while approval is the confirmed outcome after a complete assessment. Checking eligibility first helps you apply with realistic expectations, improving your chances of a smoother approval process."
        },
        {
            q: "Can NRIs apply for a home loan in India?",
            a: "Yes, NRIs can apply for home loans to purchase property in India, subject to additional documentation such as a valid passport, visa, overseas employment or income proof, and NRE/NRO bank account statements. Compliance with RBI's FEMA guidelines is also required for property purchases by NRIs. The eligibility assessment considers overseas income, and loan tenures for NRIs are sometimes shorter compared to resident Indian applicants, given the additional verification and legal processes involved in cross-border documentation."
        },
        {
            q: "Does loan tenure affect eligibility?",
            a: "Yes. A longer loan tenure spreads your repayment over more years, which reduces your monthly EMI and can increase your overall eligible loan amount, since the FOIR calculation allows for a higher principal within the same EMI limit. However, a longer tenure also means paying more total interest over the life of the loan. Balancing tenure length with total interest cost is an important consideration when deciding how to optimise your eligibility versus your long-term repayment cost."
        },
        {
            q: "How accurate is a home loan eligibility calculator?",
            a: "A home loan eligibility calculator provides a fairly reliable estimate based on the inputs you provide, such as income, age, existing EMIs, and preferred tenure. However, it's an estimate, not a guaranteed sanction, since final approval also depends on document verification, credit history checks, and lender-specific policies. It's a useful first step to understand your realistic budget range before you begin house-hunting or submit a formal application, and Borrowww's calculator gives you this estimate instantly, without affecting your credit score."
        },
        {
            q: "What is the minimum down payment required for a home loan?",
            a: "Since lenders typically finance 75–90% of a property's value, you'll usually need to arrange 10–25% of the property cost as a down payment, depending on the loan amount and lender policy. A larger down payment reduces the loan amount required, which can improve your eligibility and lower your monthly EMI. Planning your down payment in advance, alongside other costs like registration and stamp duty, ensures a smoother and more predictable home-buying process overall."
        },
        {
            q: "How can Borrowww help me check my home loan eligibility?",
            a: "Borrowww offers a free, instant home loan eligibility calculator that estimates your loan amount based on your income, age, and existing obligations, without impacting your credit score. Beyond the calculator, our advisory team helps you compare offers from multiple banks and NBFCs, understand documentation requirements, and choose the loan structure that best fits your financial situation. From the first eligibility check to final disbursement, Borrowww supports you at every step of your home loan journey."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
            {/* HERO */}
            <section className="relative overflow-hidden border-b border-gray-100">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-48 -right-32 h-96 w-96 rounded-full bg-[#2D3E50]/10 blur-3xl" />
                    <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-[#3A6EA5]/10 blur-3xl" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid lg:grid-cols-12 gap-10 items-center">
                        <div className="lg:col-span-7">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2D3E50]/10 text-black text-sm font-medium mb-5">
                                <ShieldCheck className="h-4 w-4 text-[#3A6EA5]" /> Eligibility Criteria 2026
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-medium text-black leading-tight">
                                Home Loan Eligibility Criteria 2026 – Check Now
                            </h1>
                            <p className="mt-5 text-lg text-gray-600 max-w-2xl leading-relaxed">
                                If you&apos;ve started looking at properties, chances are you&apos;ve also started worrying about whether a bank or NBFC will actually approve your home loan application. It&apos;s a fair concern. Home loan eligibility isn&apos;t just one number — it&apos;s a combination of your income, age, job stability, existing debts, credit score, and even the property you&apos;re planning to buy.
                            </p>
                            <p className="mt-4 text-base text-gray-600 max-w-2xl leading-relaxed">
                                At <a href="https://www.borrowww.com/" className="text-[#3A6EA5] hover:underline font-semibold">Borrowww</a>, we&apos;ve spent years helping salaried employees, self-employed professionals, and business owners understand exactly where they stand before they apply. This guide breaks down every eligibility factor lenders use in India today, in plain language, so you can walk into the process with confidence instead of guesswork.
                            </p>
                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <a
                                    href="#eligibility-form"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2D3E50] to-[#3A6EA5] px-6 py-3 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                                >
                                    Check Eligibility Now <ArrowRight className="h-4 w-4" />
                                </a>
                                <a
                                    href="tel:+919560069525"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#2D3E50] px-6 py-3 text-[#2D3E50] font-semibold hover:bg-[#2D3E50] hover:text-white transition-all"
                                >
                                    <Phone className="h-4 w-4" /> Call Now
                                </a>
                            </div>
                        </div>

                        {/* Lead Form Card */}
                        <div id="eligibility-form" className="lg:col-span-5">
                            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#2D3E50] to-[#3A6EA5] flex items-center justify-center text-white">
                                        <MessageSquareMore className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold">Check Your Eligibility</h3>
                                        <p className="text-xs text-gray-500">Calculate borrowing power instantly</p>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="text-sm text-gray-600">Full Name <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Enter Your Name"
                                            disabled={isSubmitting}
                                            className={`mt-1 w-full rounded-xl border ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'} px-4 py-3 focus:bg-white focus:ring-2 focus:ring-[#2D3E50] focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                                            value={form.name}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                                                setForm({ ...form, name: value });
                                                if (errors.name) setErrors({ ...errors, name: '' });
                                            }}
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-gray-600">Mobile Number <span className="text-red-500">*</span></label>
                                            <input
                                                type="tel"
                                                required
                                                placeholder="Enter Mobile Number"
                                                disabled={isSubmitting}
                                                maxLength={10}
                                                className={`mt-1 w-full rounded-xl border ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'} px-4 py-3 focus:bg-white focus:ring-2 focus:ring-[#2D3E50] focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                                                value={form.phone}
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/\D/g, '');
                                                    setForm({ ...form, phone: value });
                                                    if (errors.phone) setErrors({ ...errors, phone: '' });
                                                }}
                                            />
                                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">City</label>
                                            <input
                                                type="text"
                                                placeholder="Enter Your City"
                                                disabled={isSubmitting}
                                                className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 focus:bg-white focus:ring-2 focus:ring-[#2D3E50] focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                value={form.city}
                                                onChange={(e) => setForm({ ...form, city: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-gray-600">Property Type</label>
                                            <Select
                                                disabled={isSubmitting}
                                                value={form.propertyType}
                                                onValueChange={(value) => setForm({ ...form, propertyType: value })}
                                            >
                                                <SelectTrigger className="mt-1 w-full h-[50px] rounded-xl border-gray-200 bg-gray-50 focus:ring-2 focus:ring-[#2D3E50]">
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white">
                                                    <SelectItem value="Residential">Residential</SelectItem>
                                                    <SelectItem value="Commercial">Commercial</SelectItem>
                                                    <SelectItem value="Plot">Plot</SelectItem>
                                                    <SelectItem value="Home Renovation">Home Renovation</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">Approx. Loan Amount (₹)</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. 5000000"
                                                disabled={isSubmitting}
                                                className={`mt-1 w-full rounded-xl border ${errors.loanAmount ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'} px-4 py-3 focus:bg-white focus:ring-2 focus:ring-[#2D3E50] focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                                                value={form.loanAmount}
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/\D/g, '');
                                                    setForm({ ...form, loanAmount: value });
                                                    if (errors.loanAmount) setErrors({ ...errors, loanAmount: '' });
                                                }}
                                            />
                                            {errors.loanAmount && <p className="text-red-500 text-xs mt-1">{errors.loanAmount}</p>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-gray-600">Employment Type</label>
                                            <Select
                                                disabled={isSubmitting}
                                                value={form.employmentType}
                                                onValueChange={(value) => setForm({ ...form, employmentType: value })}
                                            >
                                                <SelectTrigger className="mt-1 w-full h-[50px] rounded-xl border-gray-200 bg-gray-50 focus:ring-2 focus:ring-[#2D3E50]">
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white">
                                                    <SelectItem value="Salaried">Salaried</SelectItem>
                                                    <SelectItem value="Self-employed">Self-employed</SelectItem>
                                                    <SelectItem value="Business Owner">Business Owner</SelectItem>
                                                    <SelectItem value="Retired">Retired</SelectItem>
                                                    <SelectItem value="Other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">Monthly Income (₹)</label>
                                            <input
                                                type="number"
                                                placeholder="e.g. 50000"
                                                disabled={isSubmitting}
                                                className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 focus:bg-white focus:ring-2 focus:ring-[#2D3E50] focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                value={form.monthlyIncome}
                                                onChange={(e) => setForm({ ...form, monthlyIncome: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full rounded-xl bg-gradient-to-r from-[#2D3E50] to-[#3A6EA5] py-3 font-semibold text-white shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                                                Checking...
                                            </>
                                        ) : (
                                            'Get Eligibility Report'
                                        )}
                                    </button>
                                    <p className="text-xs text-gray-500 text-center">
                                        By continuing, you agree to our Terms & Privacy Policy.
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <PartnerBanks />

            {/* WHAT IS HOME LOAN ELIGIBILITY */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-6">
                            <h2 className="text-3xl font-semibold text-gray-900 leading-tight">
                                What Is Home Loan Eligibility & Why Does It Matter?
                            </h2>
                            <p className="mt-4 text-gray-600 leading-relaxed">
                                Home loan eligibility refers to the maximum loan amount a lender is willing to sanction based on your ability to repay it. It isn&apos;t a fixed figure — it changes from person to person and even from lender to lender, depending on how each one assesses risk.
                            </p>
                            <p className="mt-4 text-gray-600 leading-relaxed">
                                In simple terms, eligibility is the bank&apos;s way of answering one question: &quot;If we lend this person money, how confident are we that they&apos;ll pay it back on time, every month, for the next 15 to 30 years?&quot; That confidence is built from several ingredients — your income, your job or business stability, your existing loans and credit cards, your age, and your credit score.
                            </p>
                            <p className="mt-4 text-gray-600 leading-relaxed">
                                Many buyers make the mistake of finalising a property first and checking eligibility later. This often leads to disappointment — either the loan amount sanctioned is lower than expected, or the application gets rejected altogether, which can also affect your credit score.
                            </p>
                        </div>
                        <div className="lg:col-span-6 space-y-6">
                            <div className="bg-[#2D3E50]/5 p-6 rounded-3xl border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Key Benefits of Checking Eligibility First:</h3>
                                <ul className="space-y-3">
                                    {[
                                        'Set a realistic property budget',
                                        'Avoid wasting time on properties you can\'t finance',
                                        'Negotiate better interest rates with proof of strong eligibility',
                                        'Plan your down payment more accurately',
                                        'Avoid multiple loan rejections that hurt your CIBIL score'
                                    ].map((benefit, idx) => (
                                        <li key={idx} className="flex gap-2 text-sm text-gray-700 font-medium items-start">
                                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">✔</span>
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHO CAN APPLY & CRITERIA PILLARS */}
            <section className="py-16 bg-gradient-to-b from-gray-50 via-white to-gray-50 border-t border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-semibold text-gray-900">Who Can Apply & Eligibility Criteria Overview</h2>
                        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
                            Lenders evaluate your application based on age, income, stability, and CIBIL rating.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-8 items-start">
                        {/* Table 1: Criteria Overview */}
                        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-lg">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Home Loan Eligibility Criteria (Overview)</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-[#2D3E50]">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Criteria</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Requirement</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                                        {criteriaOverview.map((row, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 font-semibold text-gray-900">{row.criteria}</td>
                                                <td className="px-4 py-3">{row.req}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Table 2: Income Requirements by Applicant Type */}
                        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-lg">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Income Requirements by Applicant Type</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-[#3A6EA5]">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Applicant Type</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Income Assessment Basis</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                                        {incomeReqs.map((row, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 font-semibold text-gray-900">{row.type}</td>
                                                <td className="px-4 py-3">{row.basis}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROFILE SPECIFIC ELIGIBILITY */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-semibold text-gray-900">Eligibility details by Applicant Profile</h2>
                        <p className="mt-3 text-gray-600">Choose your profile to check customized eligibility considerations.</p>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {['salaried', 'self-employed', 'business-owners', 'nri'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveProfileTab(tab)}
                                className={`px-6 py-3 rounded-full font-semibold transition-all ${activeProfileTab === tab
                                        ? 'bg-[#2D3E50] text-white shadow-md'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
                            </button>
                        ))}
                    </div>

                    <div className="max-w-4xl mx-auto bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 border border-gray-100 shadow-xl">
                        {activeProfileTab === 'salaried' && (
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Eligibility for Salaried Employees</h3>
                                <p className="text-gray-600 mb-5">
                                    Salaried applicants usually have a smoother, faster documentation process since income is easily verifiable through salary slips, Form 16, and bank statements.
                                </p>
                                <ul className="grid sm:grid-cols-2 gap-3 mb-6">
                                    {[
                                        'Gross and net monthly income eligibility',
                                        'Current employer\'s reputation and industry stability',
                                        'Total work experience and tenure with current employer',
                                        'Existing EMIs, credit card dues, and other obligations',
                                        'CIBIL score and repayment track record',
                                        'Age and remaining working years'
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex gap-2 text-sm text-gray-700 items-start">
                                            <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">✔</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {activeProfileTab === 'self-employed' && (
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Eligibility for Self-Employed Individuals</h3>
                                <p className="text-gray-600 mb-5">
                                    Lenders average the last two to three years&apos; earnings rather than relying on a single year&apos;s figures to account for income fluctuations.
                                </p>
                                <ul className="grid sm:grid-cols-2 gap-3 mb-6">
                                    {[
                                        'Income Tax Returns (ITR) for the last 2–3 years',
                                        'Profit & Loss statements and balance sheets',
                                        'Continuity and stability of professional practice',
                                        'Business registration and qualification certifications',
                                        'Regular income flow reflected in bank statements'
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex gap-2 text-sm text-gray-700 items-start">
                                            <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">✔</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {activeProfileTab === 'business-owners' && (
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Eligibility for Business Owners</h3>
                                <p className="text-gray-600 mb-5">
                                    Business owners face a detailed assessment as lenders require proof that the business entity is legally compliant and financially healthy.
                                </p>
                                <ul className="grid sm:grid-cols-2 gap-3 mb-6">
                                    {[
                                        'Business vintage (ideally 3 years or more)',
                                        'Annual turnover and net profit trends',
                                        'GST returns and audited financial records',
                                        'Existing business loans or overdraft facilities',
                                        'Industry risk profile'
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex gap-2 text-sm text-gray-700 items-start">
                                            <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">✔</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {activeProfileTab === 'nri' && (
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Eligibility for NRIs</h3>
                                <p className="text-gray-600 mb-5">
                                    Subject to RBI&apos;s FEMA compliance, NRIs purchasing properties in India must verify foreign income and establish local representatives.
                                </p>
                                <ul className="grid sm:grid-cols-2 gap-3 mb-6">
                                    {[
                                        'Valid passport, visa, and employment proofs',
                                        'Overseas income documents and salary certificates',
                                        'NRE/NRO bank account statements',
                                        'Power of Attorney for representative in India',
                                        'FEMA guidelines compliance'
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex gap-2 text-sm text-gray-700 items-start">
                                            <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">✔</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* AGE & CIBIL SCORE GUIDES */}
            <section className="py-16 bg-gray-50 border-t border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-12 gap-8 items-start">
                        {/* Table 3: Age requirements */}
                        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gray-100 shadow-lg">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Age Requirements by Applicant Type</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-[#2D3E50]">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase">Type</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase">Min Age</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase">Max Age</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                                        {ageReqs.map((row, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 font-semibold text-gray-900">{row.type}</td>
                                                <td className="px-4 py-3">{row.min}</td>
                                                <td className="px-4 py-3">{row.max}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Table 4: CIBIL Score Guide */}
                        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-gray-100 shadow-lg">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">CIBIL Score Guide</h3>
                            <p className="text-sm text-gray-500 mb-4">Your CIBIL score is one of the most critical factors for home loan eligibility.</p>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-[#3A6EA5]">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase">Score Range</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase">Rating</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase">Likely Outcome</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-sm">
                                        {cibilGuide.map((row, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-4 py-3 font-semibold text-gray-900">{row.score}</td>
                                                <td className="px-4 py-3">
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${row.bg}`}>
                                                        {row.rating}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-gray-600">{row.outcome}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* COMPARISON & FACTORS TABLES */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-12 gap-8 items-start">
                        {/* Table 8: Salaried vs Self-Employed */}
                        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-lg">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Comparison Table — Salaried vs Self-Employed Eligibility</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-[#2D3E50]">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase">Parameter</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase">Salaried</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase">Self-Employed</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                                        {comparisonTable.map((row, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 font-semibold text-gray-900">{row.param}</td>
                                                <td className="px-4 py-3">{row.salaried}</td>
                                                <td className="px-4 py-3">{row.self}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Table 6: Factors Affecting Eligibility */}
                        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-lg">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Factors Affecting Eligibility</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-[#3A6EA5]">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase">Factor</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase">Impact on Eligibility</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                                        {factorsAffecting.map((row, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 font-semibold text-gray-900">{row.factor}</td>
                                                <td className="px-4 py-3 text-gray-600">{row.impact}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* DOCUMENTS OVERVIEW */}
            <section className="py-16 bg-gray-50 border-t border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">Documents Overview by Profile</h3>
                    <div className="overflow-x-auto rounded-3xl border border-gray-200 shadow-lg bg-white">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Document Type</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Salaried</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Self-Employed</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                                {docsOverview.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-semibold text-gray-900">{row.type}</td>
                                        <td className="px-6 py-4">{row.salaried}</td>
                                        <td className="px-6 py-4">{row.self}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* FOIR EXPLANATION */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-6">How Lenders Calculate Eligibility</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        Most lenders use a method called the <strong>Fixed Obligation to Income Ratio (FOIR)</strong> to determine how much you can borrow. In simple terms, they calculate your total monthly income, subtract existing obligations like EMIs and credit card payments, and then determine how much of the remaining amount can comfortably go towards a new home loan EMI — usually keeping the total obligations within 70–75% of your net income.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        From there, lenders reverse-calculate the maximum loan amount based on the applicable interest rate and chosen tenure. This is why two people with the same salary can be eligible for very different loan amounts — existing debt, age, and credit score all shift the final number.
                    </p>
                </div>
            </section>

            {/* HOW TO IMPROVE & REJECTIONS */}
            <section className="py-16 bg-gradient-to-br from-[#2D3E50] to-[#3A6EA5] text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">How to Improve Home Loan Eligibility</h2>
                            <div className="space-y-4">
                                {[
                                    'Clear or reduce existing debts before applying, to free up more of your income for a new EMI',
                                    'Add a co-applicant with a stable income, such as a spouse or parent, to boost combined eligibility',
                                    'Improve your CIBIL score by paying existing dues on time and reducing credit utilisation',
                                    'Opt for a longer tenure to reduce EMI burden, if a higher loan amount is your priority',
                                    'Increase your down payment to reduce the loan amount you actually need',
                                    'Avoid multiple loan applications within a short period, as each hard enquiry can dent your credit score'
                                ].map((tip, idx) => (
                                    <div key={idx} className="flex gap-3 items-start bg-white/5 p-4 rounded-xl border border-white/10">
                                        <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                            {idx + 1}
                                        </div>
                                        <p className="text-sm text-gray-200 leading-relaxed">{tip}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold mb-6">Common Reasons for Rejection</h2>
                            <div className="space-y-4">
                                {[
                                    'Low or inconsistent CIBIL score',
                                    'High existing EMI burden relative to income',
                                    'Insufficient or unstable income documentation',
                                    'Frequent job changes or short employment tenure',
                                    'Applying for a loan amount well beyond your repayment capacity',
                                    'Errors or mismatches in submitted documents',
                                    'Property with unclear legal title or pending approvals'
                                ].map((reason, idx) => (
                                    <div key={idx} className="flex gap-3 items-start bg-white/5 p-4 rounded-xl border border-white/10">
                                        <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                            !
                                        </div>
                                        <p className="text-sm text-gray-200 leading-relaxed">{reason}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CHECKLIST & CALCULATOR EXPLANATION */}
            <section className="py-16 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                            <h3 className="text-2xl font-bold text-gray-900 mb-5">Eligibility Checklist</h3>
                            <div className="space-y-3">
                                {[
                                    'Stable income source (salary or business) for the required minimum period',
                                    'CIBIL score of 700 or above, ideally 750+',
                                    'Existing EMIs kept within a manageable range',
                                    'Age within the lender\'s accepted bracket for your loan tenure',
                                    'Complete and updated income documents (salary slips, ITR, bank statements)',
                                    'Property with clear title and necessary approvals',
                                    'Down payment amount arranged in advance'
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                                        </div>
                                        <p className="text-sm text-gray-700 font-medium">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Using an Eligibility Calculator</h3>
                            <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                A home loan eligibility calculator is a simple online tool that estimates the loan amount you may qualify for, based on inputs like your monthly income, age, existing EMIs, interest rate, and preferred tenure. It doesn&apos;t replace a formal bank assessment, but it gives you a fairly accurate starting estimate within seconds.
                            </p>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Borrowww&apos;s home loan eligibility calculator lets you check your estimated eligibility instantly, without any impact on your credit score, so you can plan your home purchase with much greater clarity.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHY CHOOSE BORROWWW & STEP BY STEP */}
            <section className="py-16 bg-[#2D3E50] text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Why Choose Borrowww</h2>
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                At Borrowww, we don&apos;t just process loan applications — we help you understand exactly where you stand and what your options are. Our approach is built around transparency, simplicity, and genuine guidance, whether you&apos;re a salaried professional, a self-employed individual, or a business owner exploring your first home purchase.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    'Access to multiple leading banks and NBFCs on a single platform',
                                    'A free, instant home loan eligibility check with no impact on your credit score',
                                    'Dedicated advisors who explain your options in plain language, not jargon',
                                    'Support with documentation, comparison, and application, end-to-end',
                                    'A track record of helping first-time buyers, self-employed professionals, and business owners secure home financing confidently'
                                ].map((item, idx) => (
                                    <li key={idx} className="flex gap-2 text-sm text-gray-200">
                                        <span className="text-[#3A6EA5]">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold mb-6">Step-by-Step Application Process</h2>
                            <div className="space-y-4">
                                {[
                                    { step: '1', title: 'Check Eligibility', desc: 'Check your eligibility using our free online calculator' },
                                    { step: '2', title: 'Compare Offers', desc: 'Compare loan offers from multiple banks and NBFCs based on your profile' },
                                    { step: '3', title: 'Select Lender', desc: 'Select the best-fit lender based on interest rate, tenure, and terms' },
                                    { step: '4', title: 'Submit Documents', desc: 'Submit your documents — income proof, identity proof, and property papers' },
                                    { step: '5', title: 'Application Review', desc: 'Application review by the chosen lender, with support from our advisory team' },
                                    { step: '6', title: 'Loan Sanction', desc: 'Loan sanction once verification and property checks are complete' },
                                    { step: '7', title: 'Disbursement', desc: 'Disbursement of funds directly towards your property purchase' }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                                            {item.step}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white">{item.title}</h4>
                                            <p className="text-xs text-gray-300">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* RELATED SERVICES */}
            <section className="py-12 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Related Services</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                        <a href="/home-loan" className="p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#3A6EA5] text-sm font-semibold text-gray-700 hover:text-[#3A6EA5] transition-all">Home Loan</a>
                        <a href="/home-loan-documents" className="p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#3A6EA5] text-sm font-semibold text-gray-700 hover:text-[#3A6EA5] transition-all">Required Documents</a>
                        <a href="/home-loan" className="p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#3A6EA5] text-sm font-semibold text-gray-700 hover:text-[#3A6EA5] transition-all">Interest Rates</a>
                        <a href="/loan-emi-calculator" className="p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#3A6EA5] text-sm font-semibold text-gray-700 hover:text-[#3A6EA5] transition-all">EMI Calculator</a>
                        <a href="/balance-transfer" className="p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#3A6EA5] text-sm font-semibold text-gray-700 hover:text-[#3A6EA5] transition-all">Balance Transfer</a>
                    </div>
                </div>
            </section>

            {/* FAQS */}
            <section className="py-16 bg-gray-50 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
                            Home Loan Eligibility FAQs
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {faqsList.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm transition-all duration-300"
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full flex items-center justify-between px-6 py-5 text-left font-semibold text-gray-900 hover:text-[#3A6EA5] transition-colors focus:outline-none"
                                >
                                    <span>{index + 1}. {faq.q}</span>
                                    <ChevronDown
                                        className={`h-5 w-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ${faqOpen[index] ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>
                                <div
                                    className={`transition-all duration-300 overflow-hidden ${faqOpen[index] ? 'max-h-[500px] border-t border-gray-100' : 'max-h-0'
                                        }`}
                                >
                                    <div className="px-6 py-5 text-gray-600 leading-relaxed text-sm sm:text-base bg-gray-50/30">
                                        {faq.a}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
