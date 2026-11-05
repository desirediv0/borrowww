'use client';

import { useState } from 'react';

import {
    ArrowRight,
    BadgeCheck,
    Building2,
    CalendarCheck2,
    ClipboardCheck,
    FileCheck2,
    Handshake,
    Home,
    IndianRupee,
    MessageSquareMore,
    Percent,
    Phone,
    ShieldCheck,
    Users,
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

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
import PartnerBanks from '@/components/PartnerBanks';

export default function HomeLoanClient() {
    const [form, setForm] = useState({
        name: '',
        phone: '',
        city: '',
        propertyType: 'Residential',
        loanAmount: '',
        duration: '',
        monthlyIncome: '',
        employmentType: '',
        remarks: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const steps = [
        {
            icon: Home,
            title: 'Select the loan type',
            desc: 'Choose the appropriate loan product that meets your requirements in relation to the property.',
        },
        {
            icon: ClipboardCheck,
            title: 'Enter your basic details',
            desc: 'Add your basic information using our simple contact form.',
        },
        {
            icon: FileCheck2,
            title: 'Submit documents',
            desc: 'Submit the required documents for a quick review.',
        },
        {
            icon: Users,
            title: 'Waiting for a conversation',
            desc: 'Wait for one of our consultants to get in touch with you for a detailed discussion.',
        },
    ];

    const features = [
        {
            icon: Building2,
            title: 'Connect with multiple banks',
            desc: 'Partnerships with major banks and non-bank financial companies (NBFCs) in India.',
        },
        {
            icon: Percent,
            title: 'Favorable interest rate',
            desc: 'We will help you find the most favorable rates on the market and assist you in negotiating them.',
        },
        {
            icon: CalendarCheck2,
            title: 'Approval support',
            desc: 'We provide timely support to help your loan application move forward.',
        },
        {
            icon: ShieldCheck,
            title: 'Adaptable term options',
            desc: 'Explore various terms that align with your preferences regarding monthly installment payments.',
        },
        {
            icon: Handshake,
            title: 'Full assistance',
            desc: 'Our team will provide support throughout the entire process, from application to the disbursement of the loan.',
        },
        {
            icon: BadgeCheck,
            title: 'Straightforward process',
            desc: 'Clear terms and conditions: no hidden traps of any kind.',
        },
    ];

    const loanTypes = [
        {
            title: 'Ready property loans',
            desc: 'Real estate loans for move-in-ready properties are well-suited for buyers who wish to take possession of a property more quickly.',
            icon: Home,
        },
        {
            title: 'Under-construction property loans',
            desc: 'For home loan financing during the construction phase, a more flexible disbursement structure is required.',
            icon: Building2,
        },
        {
            title: 'Refinancing of home loans',
            desc: 'Refinancing real estate loans is ideal for borrowers who are interested in better interest rates or improved repayment terms.',
            icon: Percent,
        },
        {
            title: 'Plot loans',
            desc: 'Land loans help you acquire the plot of land on which you can build the home of your dreams.',
            icon: ShieldCheck,
        },
        {
            title: 'Plot and construction loan',
            desc: 'A land and construction loan allows you to acquire the land and build your property according to your preferences.',
            icon: FileCheck2,
        },
    ];

    const faqs = [
        {
            q: "What types of home loans can I apply for?",
            a: "You can choose from various types of home loan financing, including:",
            bullets: [
                "Financing for move-in-ready properties",
                "Financing for properties under construction",
                "Financing for land",
                "Transfer of existing real estate loans",
                "Financing for land, including construction",
            ],
        },
        {
            q: "Can Borrowww help me compare offers from different banks?",
            a: "Yes, we connect borrowers with leading banks and non-bank financial companies (NBFCs) in India. You can compare and evaluate the best loan products, favorable interest rates, and repayment plans smoothly."
        },
        {
            q: "What is the minimum income required for a housing loan in India?",
            a: "Most financial institutions require employed applicants to have a minimum monthly income of approximately 25,000 rupees, though this can vary depending on the city and the specific bank. Banks generally ensure that the monthly loan repayment amount does not exceed 40–50% of an applicant's net monthly income."
        },
        {
            q: "What is the maximum amount I can receive as a home loan?",
            a: "The maximum loan amount is determined by factors such as your income, age, credit status, and the market value of the property. Banks typically finance between 75% and 90% of the property's value. Furthermore, the loan amount you are eligible for is based on a monthly repayment figure that you can comfortably afford."
        },
        {
            q: "What documents are required to apply for a home loan?",
            a: "In general, you will need proof of identity such as Aadhaar or PAN card, proof of address, proof of income such as salary slips, bank statements for the last six months, and documents relating to the property."
        },
        {
            q: "What is the current interest rate for home loans in India?",
            a: "Interest rates for home loans in India generally range between 7.25% and 9.5% per annum, depending on the lender, your creditworthiness, the loan amount, and whether you choose a fixed or variable interest rate."
        },
        {
            q: "How long does it take for a real estate loan to be approved?",
            a: "Once the complete documentation has been received, an initial approval can be granted within 2 to 7 business days. Final approval and disbursement are contingent upon a property valuation and legal reviews, which may extend the process by several weeks."
        },
        {
            q: "Can I get a loan for a property that is still under construction?",
            a: "Yes, the loan is typically paid out in stages with the progress of the construction work. During this period, you are generally required to pay interest only on the portion of the loan that has already been disbursed. Regular installment repayments covering both principal and interest begin once the property has been handed over."
        }
    ];

    const [errors, setErrors] = useState({});

    // Validation with clear error messages
    const validateForm = () => {
        const newErrors = {};

        // Name validation - only letters and spaces
        if (!form.name.trim()) {
            newErrors.name = 'Please enter your name';
        } else if (!/^[a-zA-Z\s]+$/.test(form.name.trim())) {
            newErrors.name = 'Name should contain only letters';
        }

        // Phone validation - strict Indian number
        if (!form.phone.trim()) {
            newErrors.phone = 'Please enter mobile number';
        } else if (!isValidIndianNumber(form.phone)) {
            newErrors.phone = 'Please enter a valid mobile number';
        }

        // Loan amount validation
        if (form.loanAmount && !/^\d+$/.test(form.loanAmount)) {
            newErrors.loanAmount = 'Enter only numbers';
        }

        // Monthly income validation
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
                toast.success('Thank you! Our expert will call you soon.');
                setForm({
                    name: '',
                    phone: '',
                    city: '',
                    propertyType: 'Residential',
                    loanAmount: '',
                    duration: '',
                    monthlyIncome: '',
                    employmentType: '',
                    remarks: '',
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

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
            {/* HERO */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-48 -right-32 h-96 w-96 rounded-full bg-[#2D3E50]/10 blur-3xl" />
                    <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-[#3A6EA5]/10 blur-3xl" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid lg:grid-cols-12 gap-10 items-center">
                        <div className="lg:col-span-7">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2D3E50]/10 text-black text-sm font-medium mb-5">
                                <Home className="h-4 w-4" /> Home Loan Assistance
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-medium text-black leading-tight">
                                Home Loans in India
                            </h1>
                            <h2 className="mt-5 text-xl sm:text-2xl font-medium text-gray-600 leading-relaxed">
                                Simplify your home buying with <a href="https://www.borrowww.com/" className="text-[#3A6EA5] hover:underline font-semibold">Borrowww</a>
                            </h2>
                            <p className="mt-5 text-lg text-gray-600 max-w-2xl leading-relaxed">
                                Are you looking for suitable home loan offers without having to incur any additional costs? With Borrowww, you can assess your creditworthiness based on your salary and take advantage of low interest rates.
                            </p>
                            <p className="mt-4 text-base text-gray-600 max-w-2xl leading-relaxed">
                                <a href="https://www.borrowww.com/" className="text-[#3A6EA5] hover:underline font-semibold">Borrowww</a> maintains close partnerships with leading banks and non-banking financial companies (NBFCs) in India. We connect you with these providers and help you through the entire loan process, offering support that truly helps you move forward.
                            </p>
                            <p className="mt-4 text-base text-gray-600 max-w-2xl leading-relaxed font-light">
                                Some clients have already decided on a specific property they wish to purchase, while others are still in the process of comparing various properties and repayment plans. We are here to help you find a financing plan tailored to your individual needs.
                            </p>
                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <a
                                    href="#lead-form"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2D3E50] to-[#3A6EA5] px-6 py-3 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                                >
                                    Get Free Consultation <ArrowRight className="h-4 w-4" />
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
                            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#2D3E50] to-[#3A6EA5] flex items-center justify-center text-white">
                                        <MessageSquareMore className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-xl font-semibold">Get Personalised Offers</h3>
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
                                            <label className="text-sm text-gray-600">
                                                Loan Duration:
                                                <span className="font-semibold text-[#3A6EA5] ml-1">
                                                    {(() => {
                                                        const months = Number(form.duration || 120);
                                                        const years = Math.floor(months / 12);
                                                        const remMonths = months % 12;
                                                        return `${years > 0 ? years + ' year' + (years > 1 ? 's' : '') : ''}${years > 0 && remMonths > 0 ? ' ' : ''}${remMonths > 0 ? remMonths + ' month' + (remMonths > 1 ? 's' : '') : ''}`.trim();
                                                    })()}
                                                </span>
                                            </label>
                                            <input
                                                type="range"
                                                min="6"
                                                max="360"
                                                step="1"
                                                value={form.duration || 120}
                                                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                                                disabled={isSubmitting}
                                                className="w-full accent-[#3A6EA5] disabled:opacity-50"
                                                aria-label="Loan Duration Slider"
                                            />
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="text-xs text-gray-500">Or enter custom duration:</span>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    max="600"
                                                    value={form.duration || ''}
                                                    onChange={(e) => {
                                                        let val = e.target.value;
                                                        if (val === '' || isNaN(val)) val = '';
                                                        else if (Number(val) < 1) val = '1';
                                                        else if (Number(val) > 600) val = '600';
                                                        setForm({ ...form, duration: val });
                                                    }}
                                                    disabled={isSubmitting}
                                                    className="w-20 rounded border border-gray-200 px-2 py-1 text-sm focus:ring-2 focus:ring-[#3A6EA5] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                                                    placeholder="months"
                                                    aria-label="Custom Duration Months"
                                                />
                                                <span className="text-xs text-gray-400">months</span>
                                            </div>
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
                                            {errors.monthlyIncome && <p className="text-red-500 text-xs mt-1">{errors.monthlyIncome}</p>}
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
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full rounded-xl bg-gradient-to-r from-[#2D3E50] to-[#3A6EA5] py-3 font-semibold text-white shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                                                Submitting...
                                            </>
                                        ) : (
                                            'Get Callback from Our Expert'
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

            {/* CHOOSE THE RIGHT LOAN FOR YOUR PROPERTY PLANS */}
            <section className="py-16 bg-[#2D3E50]/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 leading-tight">
                            Find the right loan for your home loan plans
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                            We offer support for a variety of financing needs tailored to your individual requirements:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {loanTypes.map((type, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#3A6EA5]/30 group"
                            >
                                <div className="w-14 h-14 bg-gradient-to-br from-[#2D3E50] to-[#3A6EA5] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
                                    <type.icon className="h-7 w-7 text-white" />
                                </div>
                                <h4 className="text-xl font-semibold text-gray-900 mb-3">{type.title}</h4>
                                <p className="text-gray-600 leading-relaxed">{type.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHY BORROWERS PREFER BORROWWW */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 leading-tight">
                            Why Borrowers Prefer Borrowww
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            We provide numerous advantages and bring you closer to your dream.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((f, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-[#3A6EA5]/10 text-[#3A6EA5] flex items-center justify-center mb-5 group-hover:bg-[#3A6EA5] group-hover:text-white transition-all duration-300">
                                    <f.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHAT'S OUR APPROACH */}
            <section className="py-16 bg-gradient-to-b from-gray-50 via-white to-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 leading-tight">
                            What’s Our Approach?
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            Obtaining a home loan is simple with our help. Follow the steps below.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((s, i) => (
                            <div
                                key={i}
                                className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
                            >
                                <div className="absolute -top-4 -left-4 h-10 w-10 rounded-xl bg-gradient-to-br from-[#2D3E50] to-[#3A6EA5] text-white flex items-center justify-center text-base font-bold shadow-lg group-hover:scale-110 transition-transform">
                                    {i + 1}
                                </div>
                                <div className="w-14 h-14 rounded-2xl bg-[#3A6EA5]/5 text-[#3A6EA5] flex items-center justify-center mb-5 group-hover:bg-gradient-to-br group-hover:from-[#3A6EA5] group-hover:to-[#2D3E50] group-hover:text-white transition-all duration-300">
                                    <s.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{s.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* COMPLETE GUIDE TO HOME LOANS */}
            <section className="py-16 bg-[#2D3E50]/[0.02] border-t border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                            Complete Information and Guide to Home Loans
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            This covers all the information you need to know before applying, including eligibility requirements, repayment simulations, interest rates, and associated costs.
                        </p>
                    </div>

                    <div className="space-y-16">
                        {/* 1. Home Loan Eligibility Calculator */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#3A6EA5]/10 text-[#3A6EA5] text-sm font-bold flex-shrink-0">1</span>
                                Home Loan Calculator – Find out how much you can borrow
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Your borrowing capacity depends primarily on four factors: your monthly income, your existing monthly installment payments, your age, and your creditworthiness.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Before narrowing down your property options, you need to determine how much you are eligible to borrow. Financial institutions do not base their assessment solely on the amount of your income; instead, they use a formula that factors in your take-home pay alongside your existing financial obligations to calculate your maximum borrowing capacity. The general method for this calculation is as follows:
                            </p>
                            <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200 shadow-sm">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-[#2D3E50]/5">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Monthly Net Income</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Approx. Eligible Loan Amount*</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Approx. EMI (7.5%, 20 yrs)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">₹40,000</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">₹30-33 lakh</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">₹24,000-26,000</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">₹60,000</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">₹42-45 lakh</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">₹34,000-36,000</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">₹1,00,000</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">₹75-78 lakh</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">₹60,000-65,000</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">₹1,50,000</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">₹110-115 lakh</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">₹89,000-93,000</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                The factors with the greatest impact on creditworthiness are: reducing existing monthly debt obligations before applying for a loan, combining your income with that of a co-applicant, and raising your CIBIL score to 750 or higher. For self-employed individuals, the assessment process differs; rather than relying on a single payslip, the lender calculates an average income based on financial data from the past two to three years.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Take advantage of the free loan check offered by our <a href="/home-loan-eligibility" className="text-[#3A6EA5] hover:underline font-medium">loan consultants</a>. We will compare various providers for you and show you which institutions are most likely to offer you the highest loan amount at the most favorable interest rates.
                            </p>
                        </div>

                        {/* 2. How does an EMI calculator for home loans work? */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#3A6EA5]/10 text-[#3A6EA5] text-sm font-bold flex-shrink-0">2</span>
                                How does an EMI calculator for home loans work?
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                EMI is calculated using your loan amount, interest rate, and tenure, via the formula <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded font-mono text-sm">EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]</code>, where P is principal, R is monthly interest rate, and N is tenure in months.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                In the initial years, a larger portion goes toward interest; as the loan term progresses, a greater share is applied to repaying the principal. This is precisely why making extra principal payments during the first 5 to 7 years yields the greatest savings in interest costs.
                            </p>
                            <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200 shadow-sm">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-[#2D3E50]/5">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Loan Amount</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Tenure</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Rate</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Monthly EMI</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Total Interest Paid</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">₹30 lakh</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">20 years</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">7.5%</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">~₹24,168</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">~₹28 lakh</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">₹50 lakh</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">20 years</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">7.5%</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">~₹40,280</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">~₹46.67 lakh</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">₹75 lakh</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">25 years</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">7.75%</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">~₹56,650</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">~₹94.95 lakh</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xs text-gray-500 mb-6 italic">
                                Figures are approximate and illustrative; use the <a href="/loan-emi-calculator" className="text-[#3A6EA5] hover:underline">EMI calculator</a> for a precise figure.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                A longer term reduces the monthly financial burden but increases the total interest to be paid; a shorter term has the opposite effect. Most borrowers initially choose a term that is comfortably manageable, and subsequently, as their income rises, make extra repayments to pay off the loan more quickly.
                            </p>
                        </div>

                        {/* 3. Comparison of Home Loan Interest Rates by Lender Type */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#3A6EA5]/10 text-[#3A6EA5] text-sm font-bold flex-shrink-0">3</span>
                                Comparison of Home Loan Interest Rates by Lender Type
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                In India, interest rates for home loans offered by major banks and non-banking financial companies typically range from 7.25% to 9.50% per annum. These rates vary based on factors such as an individual’s credit score and the loan amount.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Interest rates fluctuate commonly in response to changes in the Reserve Bank of India’s policies; therefore, published interest rate data is for reference only. Comparing interest rates from different types of financial institutions can help you determine where to begin your search for suitable loan products.
                            </p>
                            <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200 shadow-sm">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-[#2D3E50]/5">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Lender Type</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Typical Rate Range*</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Best Suited For</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">Public Sector Banks</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">7.25% - 8.50%</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Salaried applicants, lowest processing fees</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">Private Sector Banks</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">7.25% - 9.00%</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Faster processing, digital-first applicants</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">Housing Finance Companies</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">7.25% - 9.50%</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Self-employed, lower credit score, informal income</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">NBFCs</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">8.00% - 10.00%</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Quick disbursal, flexible eligibility norms</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                The lowest advertised interest rate does not necessarily mean that a loan is the most economical option. The actual total costs can vary significantly due to factors such as administrative fees, prepayment penalties, and mandatory insurance. This is where Borrowww comes in. We compare the latest terms offered by our network of financial institutions to carefully select and recommend the option that truly minimizes costs for your specific situation.
                            </p>
                        </div>

                        {/* 4. Administrative fees and hidden costs */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#3A6EA5]/10 text-[#3A6EA5] text-sm font-bold flex-shrink-0">4</span>
                                Administrative Fees and Hidden Costs in Loans
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Home loans basically entail administrative fees (0.25%–1%), costs for legal and technical appraisals, taxes related to the loan agreement, and, on some fixed-rate loans, penalties for early repayment.
                            </p>
                            <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200 shadow-sm">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-[#2D3E50]/5">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Charge Type</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Typical Range</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">Processing Fee</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">0.25% - 1% of loan amount</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Often negotiable; some lenders waive during festive offers</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">Legal & Technical Valuation</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">₹3,000 - ₹10,000</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Covers property title check and site valuation</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">Stamp Duty on Loan Agreement</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">State-dependent</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Separate from property registration stamp duty</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">Prepayment/Foreclosure Charges</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Nil (floating, individual borrower)</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Applicable on fixed-rate loans per RBI guidelines</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">CERSAI Registration</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 font-medium">₹100-₹200 + GST</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Mandatory security interest registration</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">Insurance Bundling</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Varies</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Often optional - read the sanction letter carefully</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                Before signing a loan agreement, ensure that you are provided with a written breakdown of all costs. Some lenders may include premiums for credit protection insurance in the loan amount. Our consultants will provide a thorough explanation of the cost breakdown before you make your final judgment regarding the agreement.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* LET US HELP YOU MOVE FORWARD (CTA) */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-3xl bg-gradient-to-r from-[#2D3E50] to-[#3A6EA5] p-10 text-white text-center shadow-2xl">
                        <h3 className="text-2xl sm:text-3xl font-semibold mb-4">We will help you take a step forward</h3>
                        <p className="text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                            With Borrowww, we make the entire real estate financing process straightforward for everyone. We help you find the ideal loan so that you can realize your dream of owning a home.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                type="button"
                                onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3 font-semibold text-[#3A6EA5] hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                            >
                                Apply for Loan <ArrowRight className="h-4 w-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
                                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white px-8 py-3 font-semibold hover:bg-white hover:text-[#3A6EA5] transition-all"
                            >
                                Get Free Consultation
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 bg-gradient-to-b from-white to-gray-50">
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
                                        <ArrowRight className="h-5 w-5 text-[#3A6EA5]" />
                                    </span>
                                </summary>
                                <div className="mt-3 text-gray-700 leading-relaxed space-y-2">
                                    <p>{f.a}</p>
                                    {f.bullets && (
                                        <ul className="list-disc pl-5 space-y-1">
                                            {f.bullets.map((bullet, bIdx) => (
                                                <li key={bIdx}>{bullet}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
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
                                "text": f.a + (f.bullets ? "\n\n" + f.bullets.join("\n") : "")
                            }
                        }))
                    })
                }}
            />
        </div>
    );
}

