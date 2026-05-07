'use client';

import { useState } from 'react';
import {
    ArrowRight,
    BadgeCheck,
    CheckCircle2,
    ChevronDown,
    HandCoins,
    Home,
    IndianRupee,
    MessageSquareMore,
    Phone,
    Users,
    Percent,
    ShieldCheck,
    Zap
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { isValidIndianNumber } from '@/utils/validation';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

const servicesOffered = [
    'Loan eligibility assessment',
    'CIBIL score guidance and improvement tips',
    'Comparison of interest rates across banks/NBFCs',
    'Documentation and file preparation',
    'Application submission and follow-ups',
    'Disbursement support and post-loan assistance',
];

const loanTypes = [
    'Home Loans',
    'Loan Against Property (LAP)',
    'MSME & Startup Loans',
    'Business Loans',
    'Personal Loans',
    'Commercial vehicle loans',
    'Car & Equipment Loans',
];

const benefits = [
    {
        icon: Users,
        title: 'Access to Multiple Lenders',
        desc: 'Loan consultants have tie-ups with multiple government banks, private banks, and NBFCs, allowing one to compare and choose the best deal. Good DSAs have partnerships with over a dozen lenders to increase borrowers\' chances of approval.',
    },
    {
        icon: Zap,
        title: 'Faster Approval & Disbursal',
        desc: 'With help completing the documentation in a single go and with expert handling, loan approvals can be significantly faster and hassle-free—sometimes within 48 hours depending on the profile.',
    },
    {
        icon: Percent,
        title: 'Better Interest Rates',
        desc: 'This is one of the best reasons to have consultants, as they help negotiate or guide you toward lenders offering competitive interest rates based on your profile. A mere difference of 0.50% in a home loan of 1 crore rupees can save lakhs of money over a period of 20 years.',
    },
    {
        icon: ShieldCheck,
        title: 'Reduced Rejection Risk',
        desc: 'First-time borrowers often face rejection or delays due to incorrect or incomplete documentation or weak financial presentation. Consultants ensure your application is strong and complete in a single go.',
    },
    {
        icon: HandCoins,
        title: 'Personalized Financial Advice',
        desc: 'Rather than an approach which is one-size-fits-all, consultants recommend loans in accordance to your income, credit score, future goals, and repayment capacity.',
    },
];

const choosingCriteria = [
    {
        title: 'Experience & Track Record',
        desc: 'Choose firms whose management teams have proven success in handling loan cases.'
    },
    {
        title: 'Transparency',
        desc: 'Choose consultants who review the profile thoroughly and understand requirements and documentation before concluding which lender to approach.'
    },
    {
        title: 'Lender Network',
        desc: 'More tie-ups mean better options. So always ask consultants regarding the options of lenders.'
    },
    {
        title: 'Customer Support',
        desc: 'A good consultant always follows up and stays with you even after disbursement.'
    },
    {
        title: 'No False Commitments',
        desc: 'Be cautious; avoid consultants who ask to make fake documentation for loan approvals; always work with credible professionals.'
    }
];

const faqs = [
    {
        q: '1. Is it necessary to hire a loan consultant for my first loan?',
        a: 'No, though it is entirely optional. However, for first-time borrowers, having a consultant helps simplify the process, improves chances of approval, and ensures better loan terms.',
    },
    {
        q: '2. Do loan consultants charge fees?',
        a: 'Most of the consultants have tie-ups with banks and thus are on commission with banks. Some consultants, however, may charge a service fee. It is advisable to always clarify charges upfront before starting the deal.',
    },
    {
        q: '3. Can a consultant guarantee loan approval?',
        a: 'No genuine consultant can guarantee approval. However, with their knowledge and expertise, they can help to choose the right lender for your loan approval depending on your credit profile, income, and lender policies.',
    },
    {
        q: '4. What documents are required for a loan?',
        a: null,
        aJsx: true,
    },
    {
        q: '5. What is the minimum CIBIL score required?',
        a: 'Generally, a score of 750 and above is considered good; 700+ is preferred, though some lenders may approve even lower scores depending on the case.',
    },
    {
        q: '6. How long does loan approval take?',
        a: 'Depending upon the loan, a personal loan might be approved from 2 hrs to 24 hrs; however, home loans or loans against property might take days or weeks to approve.',
    },
    {
        q: '7. Can consultants help improve my loan eligibility?',
        a: 'Yes, they can help you to club other family income or guide you on improving your credit score, restructuring income, or choosing suitable lenders for higher loan eligibility.',
    },
    {
        q: '8. Are loan consultants safe to work with?',
        a: 'Yes, if you choose reputed and transparent consultants with a proven track record in the lending business. Always speak to your consultant in detail regarding your requirements and documentation before sharing sensitive documents.',
    },
];

function FAQItem({ faq }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`rounded-2xl border transition-all duration-300 ${open ? 'border-[#3A6EA5] bg-blue-50/50' : 'border-gray-200 bg-white'}`}
        >
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                aria-expanded={open}
            >
                <span className="font-semibold text-gray-900 text-base">{faq.q}</span>
                <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-[#3A6EA5] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                />
            </button>
            {open && (
                <div className="px-6 pb-5">
                    {faq.aJsx ? (
                        <div className="text-gray-700 leading-relaxed">
                            <p className="mb-2">Common documents include:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>KYC (identity & address proof)</li>
                                <li>Income proof (salary slips/ITR)</li>
                                <li>Bank statements</li>
                                <li>Property or business documents (if applicable)</li>
                            </ul>
                        </div>
                    ) : (
                        <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default function FirstTimeLoanConsultantClient() {
    const [form, setForm] = useState({
        name: '',
        phone: '',
        city: 'Delhi NCR',
        propertyType: 'Residential',
        loanAmount: '',
        employmentType: '',
        remarks: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, remarks: `[First-Time Borrower Delhi NCR] ${form.remarks}` }),
            });
            const data = await response.json();
            if (response.ok) {
                toast.success('Thank you! Our expert will call you soon.');
                setForm({
                    name: '',
                    phone: '',
                    city: 'Delhi NCR',
                    propertyType: 'Residential',
                    loanAmount: '',
                    employmentType: '',
                    remarks: '',
                });
                setErrors({});
            } else {
                toast.error(data.error || 'Failed to submit. Please try again.');
            }
        } catch {
            toast.error('Failed to submit. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">

            {/* ── HERO ── */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-48 -right-32 h-96 w-96 rounded-full bg-[#2D3E50]/10 blur-3xl" />
                    <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-[#3A6EA5]/10 blur-3xl" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid lg:grid-cols-12 gap-10 items-center">
                        {/* Left: copy */}
                        <div className="lg:col-span-7">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2D3E50]/10 text-black text-sm font-medium mb-5">
                                <Home className="h-4 w-4" /> Loan Consultant · Delhi NCR
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-medium text-black">
                                Best <span className="text-[#3A6EA5] italic">Loan Consultant</span> for First-Time Borrowers in Delhi NCR
                            </h1>
                            <p className="mt-5 text-lg text-gray-600 max-w-2xl">
                                The first loan always feels overwhelming, whether one is applying for a <Link href="/home-loan" className="text-[#3A6EA5] underline underline-offset-2">home loan</Link>, a loan against property, or project funding for a business.
                            </p>
                            <p className="mt-3 text-lg text-gray-600 max-w-2xl">
                                In Delhi NCR, we specialize in helping first-time borrowers, guiding them to the correct lenders by understanding their needs and simplifying their loan journey.
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
                            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-gray-600">
                                <div className="inline-flex items-center gap-2">
                                    <BadgeCheck className="h-4 w-4 text-green-600" /> Easy Approvals
                                </div>
                                <div className="inline-flex items-center gap-2">
                                    <IndianRupee className="h-4 w-4 text-emerald-600" /> Best Interest Rates
                                </div>
                                <div className="inline-flex items-center gap-2">
                                    <Users className="h-4 w-4 text-blue-600" /> Expert Guidance
                                </div>
                            </div>
                        </div>

                        {/* Right: Lead Form */}
                        <div id="lead-form" className="lg:col-span-5">
                            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#2D3E50] to-[#3A6EA5] flex items-center justify-center text-white">
                                        <MessageSquareMore className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-xl font-semibold">Talk to a Loan Advisor</h3>
                                </div>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Name */}
                                    <div>
                                        <label className="text-sm text-gray-600">
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Enter Your Name"
                                            disabled={isSubmitting}
                                            className={`mt-1 w-full rounded-xl border ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'} px-4 py-3 focus:bg-white focus:ring-2 focus:ring-[#2D3E50] focus:border-transparent transition-all disabled:opacity-50`}
                                            value={form.name}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                                                setForm({ ...form, name: value });
                                                if (errors.name) setErrors({ ...errors, name: '' });
                                            }}
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                    </div>

                                    {/* Phone + City */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-gray-600">
                                                Mobile Number <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                placeholder="Enter Mobile Number"
                                                disabled={isSubmitting}
                                                maxLength={10}
                                                className={`mt-1 w-full rounded-xl border ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'} px-4 py-3 focus:bg-white focus:ring-2 focus:ring-[#2D3E50] focus:border-transparent transition-all disabled:opacity-50`}
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
                                            <label className="text-sm text-gray-600">Loan Amount (₹)</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. 5000000"
                                                disabled={isSubmitting}
                                                className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 focus:bg-white focus:ring-2 focus:ring-[#2D3E50] focus:border-transparent transition-all disabled:opacity-50"
                                                value={form.loanAmount}
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/\D/g, '');
                                                    setForm({ ...form, loanAmount: value });
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Property Type + Employment */}
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
                                                    <SelectItem value="LAP">Loan Against Property</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
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
                                                    <SelectItem value="NRI">NRI</SelectItem>
                                                    <SelectItem value="Other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    {/* Remarks */}
                                    <div>
                                        <label className="text-sm text-gray-600">Remarks</label>
                                        <input
                                            type="text"
                                            placeholder="Any additional info"
                                            disabled={isSubmitting}
                                            className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 focus:bg-white focus:ring-2 focus:ring-[#2D3E50] focus:border-transparent transition-all disabled:opacity-50"
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
                                                <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                                Submitting...
                                            </>
                                        ) : (
                                            'Get Callback from Our Expert'
                                        )}
                                    </button>
                                    <p className="text-xs text-gray-500 text-center">
                                        By continuing, you agree to our Terms &amp; Privacy Policy.
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── INTRO / WHY A CONSULTANT ── */}
            <section className="py-14 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">

                    <div className="max-w-4xl">
                        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-5">
                            Why a loan consultant is important, especially for first-time borrowers
                        </h2>
                        <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                            <p>
                                When someone is applying for any loan for the first time, the biggest challenge is not funding—it is rather choosing the right loan product. DSAs or loan consultants act as a bridge between borrowers and lenders, ensuring that the application is structured correctly as per the borrower&apos;s needs and lender requirements and has higher chances of approval.
                            </p>
                            <p>
                                A good loan consultant evaluates income, <Link href="/credit-check" className="text-[#3A6EA5] underline underline-offset-2 hover:text-[#2D3E50] transition-colors">credit score</Link>, property, and need / financial goals before recommending suitable loan options. Instead of applying randomly to multiple banks (which can impact your credit score negatively), consultants help streamline the process with limited and targeted applications.
                            </p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Services Offered */}
                        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
                                Services Offered by Loan Consultants
                            </h2>
                            <h3 className="text-lg text-gray-700 font-medium mb-6">
                                Top loan consultants in Delhi NCR provide end-to-end services, including:
                            </h3>
                            <ul className="space-y-3">
                                {servicesOffered.map((p) => (
                                    <li key={p} className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-[#3A6EA5] flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700">{p}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Types of Loans */}
                        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
                                Types of Loans You Can Get Assistance With
                            </h2>
                            <h3 className="text-lg text-gray-700 font-medium mb-6">
                                A reliable loan consultant can help you secure:
                            </h3>
                            <ul className="space-y-3">
                                {loanTypes.map((p) => (
                                    <li key={p} className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-[#3A6EA5] flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700">{p}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── BENEFITS ── */}
            <section className="py-14 bg-gradient-to-b from-gray-50 via-white to-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-3">
                            Key Benefits of Choosing the Right Consultant
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6 justify-center">
                        {benefits.map((b) => (
                            <div
                                key={b.title}
                                className="bg-white rounded-3xl border border-gray-100 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2D3E50] to-[#3A6EA5] text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg">
                                    <b.icon className="h-7 w-7" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{b.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{b.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CHOOSING CRITERIA ── */}
            <section className="py-14 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4">
                                How to Choose the Best Loan Consultant in Delhi NCR
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                                Not all consultants are equal. Here’s what you should look for:
                            </p>
                            <div className="space-y-6">
                                {choosingCriteria.map((c, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="w-8 h-8 rounded-full bg-[#3A6EA5]/10 flex items-center justify-center">
                                                <BadgeCheck className="h-5 w-5 text-[#3A6EA5]" />
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 text-lg">{c.title}</h4>
                                            <p className="text-gray-600 mt-1">{c.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-[#2D3E50] to-[#3A6EA5] rounded-3xl p-8 sm:p-10 text-white shadow-xl">
                            <h3 className="text-2xl sm:text-3xl font-semibold mb-6">Final Thoughts</h3>
                            <div className="space-y-4 text-white/90 leading-relaxed text-lg">
                                <p>
                                    If you are planning to borrow for the first time in your life, consultants in Delhi NCR can be more than just a middleman—they can be your financial guide. From choosing the right product and lender to ensuring smooth sanctioning and disbursal, their expertise can save you time, money, and stress.
                                </p>
                                <p>
                                    So, working with a trusted consultant can significantly improve your chances of getting the best deal with minimal hassle. Always take time to do research and ask questions of consultants before choosing, and pick one who prioritizes transparency and long-term relationships.
                                </p>
                            </div>
                            <div className="mt-8">
                                <a
                                    href="#lead-form"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[#3A6EA5] hover:bg-gray-100 transition-all shadow-lg"
                                >
                                    Get Started Today <ArrowRight className="h-4 w-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="py-14 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
                            Frequently Asked Questions (FAQs)
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <FAQItem key={i} faq={faq} />
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
