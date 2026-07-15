'use client';

import { useState } from 'react';
import {
    ArrowRight,
    BadgeCheck,
    Building2,
    ClipboardCheck,
    FileCheck2,
    Home,
    IndianRupee,
    MessageSquareMore,
    Percent,
    Phone,
    ShieldCheck,
    Users,
    ChevronDown,
    FileText,
    Check,
    AlertCircle,
    UserCheck,
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

export default function HomeLoanDocumentsClient() {
    const [form, setForm] = useState({
        name: '',
        phone: '',
        city: '',
        propertyType: 'Residential',
        loanAmount: '',
        duration: '120',
        monthlyIncome: '',
        employmentType: 'Salaried',
        remarks: 'Home Loan Documents Verification Request',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [activeTab, setActiveTab] = useState('salaried');
    const [faqOpen, setFaqOpen] = useState(Array(10).fill(false));

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
                toast.success('Thank you! Our documentation expert will contact you shortly.');
                setForm({
                    name: '',
                    phone: '',
                    city: '',
                    propertyType: 'Residential',
                    loanAmount: '',
                    duration: '120',
                    monthlyIncome: '',
                    employmentType: 'Salaried',
                    remarks: 'Home Loan Documents Verification Request',
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

    // Data structures
    const importanceTable = [
        { purpose: 'Identity Verification', confirms: 'You are who you claim to be', docs: 'PAN, Aadhaar, Passport, Voter ID' },
        { purpose: 'Address Verification', confirms: 'Your current residential address', docs: 'Aadhaar, utility bills, passport' },
        { purpose: 'Income Verification', confirms: 'Your ability to repay the loan', docs: 'Salary slips, ITR, Form 16' },
        { purpose: 'Employment Verification', confirms: 'Job or business stability', docs: 'Employment certificate, business proof' },
        { purpose: 'Property Verification', confirms: 'Legal ownership and clear title', docs: 'Sale deed, title deed, encumbrance certificate' },
        { purpose: 'Credit Assessment', confirms: 'Your repayment history', docs: 'Bank statements, existing loan statements' },
        { purpose: 'Fraud Prevention', confirms: 'Authenticity of submitted information', docs: 'Original document verification, KYC' },
        { purpose: 'Regulatory Compliance', confirms: 'Adherence to RBI and KYC norms', docs: 'PAN, Aadhaar, KYC forms' }
    ];

    const generalChecklist = [
        { title: 'Identity Proof', desc: 'Confirms your legal identity. Accepted documents typically include PAN card, Aadhaar card, passport, voter ID, or driving licence.', icon: UserCheck },
        { title: 'Address Proof', desc: 'Confirms your current residential address. Aadhaar card, utility bills, passport, or rent agreement are commonly accepted.', icon: Home },
        { title: 'Income Proof', desc: 'Confirms your repayment capacity. Salary slips and Form 16 for salaried; ITR and P&L statements for self-employed.', icon: IndianRupee },
        { title: 'Employment Proof', desc: 'Confirms job or business stability. Appointment letter, employment certificate, or business registration papers.', icon: FileText },
        { title: 'Bank Statements', desc: 'Confirm your financial behaviour, existing obligations, and income consistency. Usually last 6 to 12 months.', icon: ClipboardCheck },
        { title: 'PAN Card', desc: 'Mandatory for all home loan applicants — used for identity verification and tax regulation compliance.', icon: ShieldCheck },
        { title: 'Aadhaar Card', desc: 'Used for both identity and address verification, and is now a standard requirement across nearly all lenders in India.', icon: BadgeCheck },
        { title: 'Passport', desc: 'Required additionally for NRI applicants, and serves as valid identity and address proof for resident Indians.', icon: FileCheck2 },
        { title: 'Voter ID', desc: 'An accepted alternative for identity and address proof, particularly useful without a passport.', icon: ClipboardCheck },
        { title: 'Driving Licence', desc: 'Another acceptable identity and address proof document, commonly used alongside or instead of Aadhaar.', icon: FileCheck2 },
        { title: 'Passport-Size Photos', desc: 'Typically 2–4 recent passport-size photos are required for the application form and KYC records.', icon: Users },
        { title: 'Signature Verification', desc: 'Lenders verify your signature against your PAN card or bank records to confirm consistency.', icon: FileText },
        { title: 'Existing Loan Statements', desc: 'If you have ongoing loans, statements showing repayment history and EMIs help lenders assess your burden.', icon: Percent },
        { title: 'Property Documents', desc: 'A separate, detailed set of legal papers confirming ownership and property standing — covered below.', icon: Building2 }
    ];

    const salariedDocs = [
        { name: 'Salary Slips (last 3 months)', purpose: 'Confirms current monthly income' },
        { name: 'Form 16', purpose: 'Confirms annual income and tax compliance' },
        { name: 'Latest Bank Statements (6 months)', purpose: 'Shows salary credit and financial behaviour' },
        { name: 'Employment Certificate', purpose: 'Confirms current employment status' },
        { name: 'Appointment Letter (if required)', purpose: 'Confirms job role and tenure, especially for newer employees' },
        { name: 'PAN Card', purpose: 'Identity and tax verification' },
        { name: 'Aadhaar Card', purpose: 'Identity and address verification' },
        { name: 'Passport-Size Photographs', purpose: 'Application and KYC requirement' }
    ];

    const selfEmployedDocs = [
        { name: 'Business Registration', purpose: 'Confirms legal existence of the business/practice' },
        { name: 'GST Registration', purpose: 'Confirms tax compliance and business turnover' },
        { name: 'ITR (Last 2–3 Years)', purpose: 'Confirms income consistency over time' },
        { name: 'Profit & Loss Statement', purpose: 'Confirms business profitability' },
        { name: 'Balance Sheet', purpose: 'Confirms overall financial position' },
        { name: 'Business Bank Statements', purpose: 'Shows cash flow and income patterns' },
        { name: 'Professional Qualification Certificate', purpose: 'Confirms credentials (for doctors, CAs, architects, etc.)' }
    ];

    const businessOwnerDocs = [
        { name: 'Business Proof', purpose: 'Confirms nature and existence of the business' },
        { name: 'Financial Statements (audited)', purpose: 'Confirms profitability and financial health' },
        { name: 'Company Registration', purpose: 'Confirms legal business structure' },
        { name: 'Partnership Deed (if applicable)', purpose: 'Confirms ownership structure for partnership firms' },
        { name: 'GST Returns', purpose: 'Confirms turnover and tax compliance' },
        { name: 'ITR', purpose: 'Confirms declared income' },
        { name: 'Bank Statements (business + personal)', purpose: 'Confirms cash flow and repayment capacity' }
    ];

    const nriDocs = [
        { name: 'Passport', purpose: 'Primary identity proof for NRIs' },
        { name: 'Visa', purpose: 'Confirms current residency status abroad' },
        { name: 'Overseas Employment Proof', purpose: 'Confirms job stability abroad' },
        { name: 'Salary Certificate', purpose: 'Confirms overseas income' },
        { name: 'NRE/NRO Account Statements', purpose: 'Confirms banking relationship and fund source' },
        { name: 'Power of Attorney (if required)', purpose: 'Authorises a representative to act in India on your behalf' }
    ];

    const propertyDocs = [
        { name: 'Sale Agreement', purpose: 'Confirms the terms of the property transaction' },
        { name: 'Sale Deed', purpose: 'Legal proof of property transfer to the buyer' },
        { name: 'Title Deed', purpose: 'Confirms clear ownership of the property' },
        { name: 'Encumbrance Certificate', purpose: 'Confirms the property is free of legal or financial liabilities' },
        { name: 'Approved Building Plan', purpose: 'Confirms construction complies with local regulations' },
        { name: 'Occupancy Certificate', purpose: 'Confirms the property is legally fit for habitation' },
        { name: 'Completion Certificate', purpose: 'Confirms construction is fully completed as per approved plans' },
        { name: 'Property Tax Receipt', purpose: 'Confirms property tax dues are cleared' },
        { name: 'Possession Letter', purpose: 'Confirms handover of property to the buyer' },
        { name: 'Builder Documents (if applicable)', purpose: 'Includes builder\'s approvals, NOCs, and project registration' }
    ];

    const commonMistakes = [
        { mistake: 'Missing signatures', delay: 'Application or documents get sent back for re-signing' },
        { mistake: 'Incorrect PAN details', delay: 'Triggers identity mismatch during verification' },
        { mistake: 'Name mismatch across documents', delay: 'Requires additional proof or affidavits to resolve' },
        { mistake: 'Expired KYC', delay: 'Lender cannot process the application until KYC is updated' },
        { mistake: 'Incomplete bank statements', delay: 'Raises questions about income or cash flow gaps' },
        { mistake: 'Wrong income proof submitted', delay: 'Doesn\'t match the applicant\'s actual employment type' },
        { mistake: 'Property document issues', delay: 'Legal verification gets stuck, delaying sanction' },
        { mistake: 'Missing ITR', delay: 'Self-employed applications cannot proceed without it' },
        { mistake: 'Unverified photocopies', delay: 'Lenders may require self-attested or notarised copies' },
        { mistake: 'Incorrect application form details', delay: 'Creates mismatches with submitted documents' }
    ];

    const faqsList = [
        {
            q: "What documents are required for a home loan?",
            a: "The core documents required for a home loan include identity proof (PAN, Aadhaar, passport), address proof, income proof (salary slips or ITR), employment proof, bank statements, passport-size photographs, and property documents. The exact list varies slightly depending on whether you're salaried, self-employed, a business owner, or an NRI. Property documents such as the sale agreement, title deed, and encumbrance certificate are required once you've finalised the property you intend to purchase, in addition to your personal documentation."
        },
        {
            q: "What documents does a salaried employee need for a home loan?",
            a: "Salaried employees typically need PAN card, Aadhaar card, latest salary slips (usually 3 months), Form 16, bank statements for the last 6 months, an employment certificate, and passport-size photographs. An appointment letter may also be required, especially for applicants with less than a year at their current job. Since income is verified through official employer records, salaried applicants generally have a simpler and faster documentation process compared to self-employed applicants."
        },
        {
            q: "What documents does a self-employed person need for a home loan?",
            a: "Self-employed applicants need business registration proof, GST registration, income tax returns for the last two to three years, profit and loss statements, balance sheets, and business bank statements. Professionals like doctors, chartered accountants, or architects may also need to submit their professional qualification certificates. Since self-employed income can vary year to year, lenders review multiple years of financial records to assess average earnings and business stability before approving the loan."
        },
        {
            q: "What documents are required for an NRI home loan?",
            a: "NRI applicants need a valid passport, visa copy, overseas employment proof or salary certificate, and NRE/NRO bank account statements to verify overseas income and identity. If the applicant cannot be physically present in India during the process, a Power of Attorney authorising a representative may also be required. Additionally, property purchases by NRIs must comply with RBI's FEMA guidelines, which can affect certain documentation and approval steps."
        },
        {
            q: "What property documents are needed for a home loan?",
            a: "Property documents typically include the sale agreement, sale deed, title deed, encumbrance certificate, approved building plan, occupancy certificate, completion certificate, property tax receipt, and possession letter. For under-construction properties, builder-related documents such as project approvals and NOCs are also required. These documents confirm that the property has a clear legal title and complies with local building regulations, which protects both the buyer and the lender."
        },
        {
            q: "Why do banks ask for so many documents for a home loan?",
            a: "Banks request multiple documents because a home loan is a large, long-term financial commitment, and they need to verify your identity, income, employment, and the legal standing of the property before approving such a significant amount. Each document serves a specific purpose — some confirm who you are, others confirm your ability to repay, and property documents confirm legal ownership. This thorough verification protects both the lender and the borrower from future legal or financial complications."
        },
        {
            q: "What are common mistakes to avoid in home loan documentation?",
            a: "Common mistakes include missing signatures, incorrect PAN details, name mismatches across documents, expired KYC, incomplete bank statements, submitting the wrong type of income proof, and property document issues. Unverified or blurry photocopies and incorrect details on the application form can also cause delays. Most of these mistakes are avoidable with a careful review of all documents before submission, ideally with expert guidance to catch inconsistencies early."
        },
        {
            q: "How long does home loan document verification take?",
            a: "Document verification timelines vary by lender, but typically take anywhere from a few days to two to three weeks, depending on how complete and accurate your initial submission is. Salaried applicants with straightforward, consistent documentation often see faster verification, while self-employed applicants or those with property title complications may take longer. Submitting a complete, error-free document set upfront is the most effective way to speed up this process."
        },
        {
            q: "Can I apply for a home loan without all documents ready?",
            a: "While you can begin the application process with basic details, most lenders won't move forward with formal processing until they've received your complete document set, including income proof, identity proof, and property papers. Applying without proper documentation often leads to delays or requests for resubmission. It's best to have your core documents — identity, address, and income proof — ready before applying, and property documents ready shortly after finalising your property."
        },
        {
            q: "How does Borrowww help with home loan documentation?",
            a: "Borrowww provides a personalised document checklist based on your employment type, along with expert verification to catch errors before submission. Our team maps requirements across multiple banks and NBFCs, so you know exactly what's needed for each lender, reducing back-and-forth and processing delays. From initial document collection to final loan sanction, Borrowww's advisors support you throughout, making sure your file moves as quickly and smoothly as possible."
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
                                <FileText className="h-4 w-4 text-[#3A6EA5]" /> Documents Verification
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-medium text-black leading-tight">
                                Home Loan Documents – Complete Checklist for Faster Loan Approval
                            </h1>
                            <p className="mt-5 text-lg text-gray-600 max-w-2xl leading-relaxed">
                                Good and complete documentation is what separates a smooth home loan approval from a frustrating, delayed one. Most applicants don&apos;t get rejected because they&apos;re financially unqualified — they get stuck because a document was missing, outdated, or didn&apos;t match their other paperwork. A mismatched name on a PAN card, an expired address proof, or an incomplete bank statement can hold up your file for weeks.
                            </p>
                            <p className="mt-4 text-base text-gray-600 max-w-2xl leading-relaxed">
                                That&apos;s exactly where preparation makes all the difference. Once you know what&apos;s required and why, gathering everything becomes a fairly simple, one-time task. At <a href="https://www.borrowww.com/" className="text-[#3A6EA5] hover:underline font-semibold">Borrowww</a>, we help applicants prepare, organise, and verify your documents before submission, matching requirements across multiple banks and NBFCs so nothing gets missed and your file moves quickly from submission to sanction.
                            </p>
                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <a
                                    href="#lead-form"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2D3E50] to-[#3A6EA5] px-6 py-3 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                                >
                                    Get Your Documents Verified by Experts <ArrowRight className="h-4 w-4" />
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
                        <div id="lead-form" className="lg:col-span-5">
                            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#2D3E50] to-[#3A6EA5] flex items-center justify-center text-white">
                                        <MessageSquareMore className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold">Verify Documents</h3>
                                        <p className="text-xs text-gray-500">Get free expert verification</p>
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
                                    <div>
                                        <label className="text-sm text-gray-600">Remarks</label>
                                        <input
                                            type="text"
                                            placeholder="Any additional info"
                                            disabled={isSubmitting}
                                            className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 focus:bg-white focus:ring-2 focus:ring-[#2D3E50] focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                            value={form.remarks}
                                            onChange={(e) => setForm({ ...form, remarks: e.target.value })}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full rounded-xl bg-gradient-to-r from-[#2D3E50] to-[#3A6EA5] py-3 font-semibold text-white shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                                                Verifying...
                                            </>
                                        ) : (
                                            'Get Your Documents Verified'
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

            {/* WHAT & WHY ARE DOCUMENTS IMPORTANT */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-5">
                            <h2 className="text-3xl font-semibold text-gray-900 leading-tight">
                                What Are Home Loan Documents & Why Are They Important?
                            </h2>
                            <p className="mt-4 text-gray-600 leading-relaxed">
                                Home loan documents are the set of papers a bank or housing finance company asks for to confirm who you are, where you live, how much you earn, where you work, and what property you&apos;re buying or mortgaging. In short, they&apos;re the proof behind every claim you make in your loan application.
                            </p>
                            <p className="mt-4 text-gray-600 leading-relaxed">
                                Lenders ask for documents because a home loan is a large, long-term financial commitment, and they need to verify that the person applying is genuine, financially capable, and legally entitled to buy or mortgage the property in question. Each document serves a specific verification purpose — some confirm identity, some confirm income, and others confirm that the property itself is legally sound.
                            </p>
                            <p className="mt-4 text-gray-600 leading-relaxed font-medium text-gray-900">
                                Proper documentation directly improves your approval chances. A complete, accurate, and consistent set of documents allows the lender&apos;s verification team to process your file without back-and-forth queries, which is often the single biggest factor in how quickly your loan gets sanctioned.
                            </p>
                        </div>

                        <div className="lg:col-span-7">
                            <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-[#2D3E50]">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Purpose</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">What It Confirms</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Typical Documents Used</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100 text-sm">
                                        {importanceTable.map((item, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-6 py-4 font-semibold text-gray-900">{item.purpose}</td>
                                                <td className="px-6 py-4 text-gray-600">{item.confirms}</td>
                                                <td className="px-6 py-4 text-[#3A6EA5] font-medium">{item.docs}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* COMPLETE CHECKLIST */}
            <section className="py-16 bg-gradient-to-b from-gray-50 via-white to-gray-50 border-t border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 leading-tight">
                            Complete Home Loan Documents Checklist
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            Here&apos;s a detailed look at every document category most lenders ask for, and why it matters.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {generalChecklist.map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-[#3A6EA5]/10 text-[#3A6EA5] flex items-center justify-center mb-5 group-hover:bg-[#3A6EA5] group-hover:text-white transition-all duration-300">
                                    <item.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#3A6EA5] transition-colors">{item.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* EMPLOYMENT TYPE SPECIFIC DOCUMENTATION */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 leading-tight">
                            Profile-Specific Document Checklists
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                            Requirements vary based on your source of income. Switch tabs below to see specific lists:
                        </p>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 mb-10">
                        {['salaried', 'self-employed', 'business-owners', 'nri'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3 rounded-full font-semibold transition-all ${activeTab === tab
                                        ? 'bg-[#2D3E50] text-white shadow-md'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
                            </button>
                        ))}
                    </div>

                    {/* Tab Contents */}
                    <div className="max-w-5xl mx-auto">
                        <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 border border-gray-100 shadow-lg">
                            {activeTab === 'salaried' && (
                                <div>
                                    <div className="mb-6">
                                        <h3 className="text-2xl font-semibold text-gray-900">Salaried Employees Checklist</h3>
                                        <p className="mt-2 text-gray-600">
                                            Salaried applicants generally have the most straightforward documentation process, since income is easily verifiable through official employer records.
                                        </p>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {salariedDocs.map((doc, idx) => (
                                            <div key={idx} className="flex gap-3 items-start bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                                <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                                    <Check className="w-3 h-3 stroke-[3]" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 text-base">{doc.name}</h4>
                                                    <p className="text-sm text-gray-500 mt-0.5">{doc.purpose}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm">
                                        <strong>Pro Tip:</strong> Salaried employees should ensure their salary slips and bank statements match — inconsistent figures between the two are one of the most common reasons for verification delays.
                                    </div>
                                </div>
                            )}

                            {activeTab === 'self-employed' && (
                                <div>
                                    <div className="mb-6">
                                        <h3 className="text-2xl font-semibold text-gray-900">Self-Employed Individuals Checklist</h3>
                                        <p className="mt-2 text-gray-600">
                                            Self-employed professionals, such as doctors, chartered accountants, architects, and consultants, are assessed through business continuity and income tax records rather than a fixed salary.
                                        </p>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {selfEmployedDocs.map((doc, idx) => (
                                            <div key={idx} className="flex gap-3 items-start bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                                <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#3A6EA5]/15 text-[#3A6EA5] flex items-center justify-center">
                                                    <Check className="w-3 h-3 stroke-[3]" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 text-base">{doc.name}</h4>
                                                    <p className="text-sm text-gray-500 mt-0.5">{doc.purpose}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'business-owners' && (
                                <div>
                                    <div className="mb-6">
                                        <h3 className="text-2xl font-semibold text-gray-900">Business Owners Checklist</h3>
                                        <p className="mt-2 text-gray-600">
                                            Business owners face slightly deeper scrutiny, as lenders want assurance that the business itself is financially healthy and legally compliant.
                                        </p>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {businessOwnerDocs.map((doc, idx) => (
                                            <div key={idx} className="flex gap-3 items-start bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                                <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                                                    <Check className="w-3 h-3 stroke-[3]" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 text-base">{doc.name}</h4>
                                                    <p className="text-sm text-gray-500 mt-0.5">{doc.purpose}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-6 p-4 rounded-xl bg-[#2D3E50]/5 border border-[#2D3E50]/10 text-gray-700 text-sm">
                                        A business with at least three years of stable turnover, consistent GST filings, and clean bank statements typically sails through documentation review far more smoothly.
                                    </div>
                                </div>
                            )}

                            {activeTab === 'nri' && (
                                <div>
                                    <div className="mb-6">
                                        <h3 className="text-2xl font-semibold text-gray-900">NRI (Non-Resident Indian) Checklist</h3>
                                        <p className="mt-2 text-gray-600">
                                            NRIs purchasing property in India need a slightly different documentation set, largely due to overseas income and identity verification requirements.
                                        </p>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {nriDocs.map((doc, idx) => (
                                            <div key={idx} className="flex gap-3 items-start bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                                <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                                                    <Check className="w-3 h-3 stroke-[3]" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 text-base">{doc.name}</h4>
                                                    <p className="text-sm text-gray-500 mt-0.5">{doc.purpose}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-6 p-4 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 text-sm">
                                        <strong>FEMA Guidelines:</strong> NRI applicants should also ensure their documents comply with RBI&apos;s FEMA guidelines for property purchase, since this affects both loan processing and future property transactions.
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* COMPARISON TABLE */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-semibold text-gray-900">Salaried vs Self-Employed Documentation</h2>
                        <p className="mt-3 text-gray-600">Compare the core parameters of documentation between employee profiles</p>
                    </div>

                    <div className="overflow-x-auto rounded-3xl border border-gray-200 shadow-lg bg-white">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Aspect</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Salaried</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Self-Employed</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                                <tr className="hover:bg-gray-50/50">
                                    <td className="px-6 py-4 font-semibold text-gray-900">Primary Income Proof</td>
                                    <td className="px-6 py-4">Salary slips, Form 16</td>
                                    <td className="px-6 py-4">ITR, profit & loss statement</td>
                                </tr>
                                <tr className="hover:bg-gray-50/50">
                                    <td className="px-6 py-4 font-semibold text-gray-900">Employment Proof</td>
                                    <td className="px-6 py-4">Employment certificate</td>
                                    <td className="px-6 py-4">Business registration, GST returns</td>
                                </tr>
                                <tr className="hover:bg-gray-50/50">
                                    <td className="px-6 py-4 font-semibold text-gray-900">Assessment Basis</td>
                                    <td className="px-6 py-4">Fixed monthly salary</td>
                                    <td className="px-6 py-4">Average income over 2–3 years</td>
                                </tr>
                                <tr className="hover:bg-gray-50/50">
                                    <td className="px-6 py-4 font-semibold text-gray-900">Documentation Volume</td>
                                    <td className="px-6 py-4">Lower</td>
                                    <td className="px-6 py-4">Higher</td>
                                </tr>
                                <tr className="hover:bg-gray-50/50">
                                    <td className="px-6 py-4 font-semibold text-gray-900">Processing Time</td>
                                    <td className="px-6 py-4 text-emerald-600 font-medium">Generally faster</td>
                                    <td className="px-6 py-4">Slightly longer due to added verification</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* PROPERTY DOCUMENTS */}
            <section className="py-16 bg-white border-t border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-5">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3A6EA5]/10 text-[#3A6EA5] text-sm font-semibold mb-4">
                                Legal & Construction
                            </div>
                            <h2 className="text-3xl font-semibold text-gray-900 leading-tight">
                                Property Documents Required for Home Loan
                            </h2>
                            <p className="mt-4 text-gray-600 leading-relaxed">
                                Beyond personal documentation, lenders require a complete set of property papers to confirm legal ownership and ensure the property is free from disputes.
                            </p>
                            <p className="mt-4 text-gray-600 leading-relaxed">
                                Property documentation is often the most time-consuming part of the process, particularly for resale properties, so it&apos;s worth starting this verification early, ideally before finalising your home loan application.
                            </p>
                            <div className="mt-8 p-6 rounded-2xl bg-[#2D3E50]/5 border border-gray-100">
                                <h4 className="font-semibold text-gray-900 mb-2">Need Property Verification Help?</h4>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Our legal team works directly with leading property evaluators to cross-verify ownership history and encumbrance records.
                                </p>
                            </div>
                        </div>

                        <div className="lg:col-span-7">
                            <div className="grid sm:grid-cols-2 gap-4">
                                {propertyDocs.map((doc, idx) => (
                                    <div key={idx} className="bg-gray-50 hover:bg-white p-5 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                                        <div className="w-8 h-8 rounded-lg bg-[#2D3E50]/5 flex items-center justify-center mb-3">
                                            <Building2 className="w-4 h-4 text-[#2D3E50]" />
                                        </div>
                                        <h4 className="font-semibold text-gray-900 text-base">{doc.name}</h4>
                                        <p className="text-sm text-gray-500 mt-1 leading-relaxed">{doc.purpose}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* HOW BORROWWW HELPS */}
            <section className="py-16 bg-[#2D3E50]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-semibold text-white leading-tight">
                            How Borrowww Helps with Home Loan Documentation
                        </h2>
                        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                            Getting your documents right the first time saves weeks of back-and-forth. Here&apos;s how we support you:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 text-white">
                        {[
                            'Document checklist tailored to your profile (salaried, self-employed, NRI, business)',
                            'Expert verification of documents before submission to catch errors early',
                            'Multiple lender requirements mapped out so you know what each bank or NBFC needs',
                            'Error checking for common issues like name mismatches or incomplete bank statements',
                            'Faster processing through pre-verified, organised document sets',
                            'End-to-end support from document collection to final loan disbursement',
                            'Dedicated home loan experts available to answer documentation questions at every stage'
                        ].map((benefit, idx) => (
                            <div key={idx} className="bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10 hover:border-white/20 transition-all">
                                <div className="w-10 h-10 rounded-xl bg-[#3A6EA5] flex items-center justify-center mb-4">
                                    <BadgeCheck className="w-6 h-6 text-white" />
                                </div>
                                <p className="text-sm text-gray-200 leading-relaxed font-medium">{benefit}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* COMMON MISTAKES & DELAYS */}
            <section className="py-16 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-semibold text-gray-900">
                            Common Documentation Mistakes That Delay Approval
                        </h2>
                        <p className="mt-3 text-gray-600">
                            Most delays are entirely avoidable with a careful review before submission — something our team checks for.
                        </p>
                    </div>

                    <div className="overflow-x-auto rounded-3xl border border-gray-100 shadow-xl">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-red-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-red-900 uppercase">Mistake</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-red-900 uppercase">Why It Causes Delays</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm text-gray-600 bg-white">
                                {commonMistakes.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-red-50/10">
                                        <td className="px-6 py-4 font-semibold text-gray-900 flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                                            {item.mistake}
                                        </td>
                                        <td className="px-6 py-4">{item.delay}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* TIPS TO PREPARE */}
            <section className="py-16 bg-gradient-to-br from-gray-50 to-white border-t border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <h2 className="text-3xl font-semibold text-gray-900 text-center mb-10">
                        Tips to Prepare Home Loan Documents Before Applying
                    </h2>

                    <div className="grid gap-4">
                        {[
                            'Arrange documents in advance — don\'t wait until you\'ve finalised a property to start collecting paperwork',
                            'Update your KYC if it\'s been a while since your last bank or financial transaction',
                            'Keep originals ready for physical verification, even if you submit copies initially',
                            'Maintain clear, legible photocopies — blurry or partial scans often cause delays',
                            'Verify property papers early, especially for resale properties with a longer ownership history',
                            'Check your bank statements for consistency with your declared income',
                            'Organize income records — salary slips, ITRs, or profit statements — in chronological order',
                            'Cross-check lender requirements, since document lists can vary slightly between banks and NBFCs',
                            'Keep digital copies of everything, organised in clearly labelled folders',
                            'Review your application form carefully to ensure every detail matches your submitted documents'
                        ].map((tip, idx) => (
                            <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
                                    {idx + 1}
                                </div>
                                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{tip}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* VERIFICATION PROCESS */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-semibold text-gray-900">
                            Home Loan Document Verification Process
                        </h2>
                        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
                            Understanding how your documents move through the system helps set realistic expectations:
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { step: '1', title: 'Application', desc: 'You submit your home loan application along with your initial document set.' },
                            { step: '2', title: 'Document Collection', desc: 'The lender\'s team collects and organises all identity, income, and property documents.' },
                            { step: '3', title: 'Verification', desc: 'Each document is checked for authenticity, consistency, and completeness.' },
                            { step: '4', title: 'Property Verification', desc: 'Legal and technical teams verify the property\'s title, approvals, and valuation.' },
                            { step: '5', title: 'Credit Assessment', desc: 'Your credit history and existing obligations are reviewed alongside your documents.' },
                            { step: '6', title: 'Final Approval', desc: 'Once all checks are complete, the lender approves the loan amount and terms.' },
                            { step: '7', title: 'Loan Sanction', desc: 'A formal sanction letter is issued, followed by disbursement as per the payment schedule.' }
                        ].map((item, idx) => (
                            <div key={idx} className="relative bg-gray-50 rounded-3xl p-6 border border-gray-100 hover:shadow-lg transition-all">
                                <div className="absolute -top-4 -left-4 h-10 w-10 rounded-xl bg-[#2D3E50] text-white flex items-center justify-center text-base font-bold shadow-lg">
                                    {item.step}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mt-2 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* BENEFITS */}
            <section className="py-16 bg-[#2D3E50]/5">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <h2 className="text-3xl font-semibold text-gray-900 text-center mb-10">
                        Benefits of Keeping Home Loan Documents Ready
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            'Faster approval — a complete file moves through verification with far fewer delays',
                            'Less paperwork stress — no last-minute scrambling for missing documents',
                            'Higher approval chances — accurate, consistent documentation reduces rejection risk',
                            'Better customer experience — smoother communication with your lender and advisor',
                            'Reduced application errors — fewer mismatches mean fewer follow-up requests',
                            'Smoother loan processing — from application to disbursement, everything moves quicker'
                        ].map((benefit, idx) => (
                            <div key={idx} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                                    <Check className="w-3 h-3 stroke-[3]" />
                                </div>
                                <p className="text-sm text-gray-700 font-medium">{benefit}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQS */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
                            Home Loan Documents FAQs
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {faqsList.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300"
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
                                    <div className="px-6 py-5 text-gray-600 leading-relaxed text-sm sm:text-base">
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
