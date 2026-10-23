'use client';

import { useState } from 'react';
import {
    ArrowRight,
    BadgeCheck,
    Building2,
    CheckCircle2,
    ChevronDown,
    FileCheck2,
    HandCoins,
    Home,
    IndianRupee,
    MessageSquareMore,
    Percent,
    Phone,
    ShieldCheck,
    Users,
    Zap,
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

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

const products = [
    'Home loans and loan against property for salaried employees',
    'Home loans and loan against property for self-employed business owners',
    'Home loans and loans against property for professionals like CAs, doctors, etc.',
    'Construction loans',
    'Plot purchase loans / plot equity loans / loans against plots',
    'Home loan balance transfer and home loan top-ups',
    'Home loans and loans against property for NRIs',
    'Pradhan Mantri Awas Yojana (PMAY) loans',
    'Loans against commercial or industrial property',
];

const benefits = [
    {
        icon: Percent,
        title: 'Best Possible Rates',
        desc: 'As a leading loan advisor, we have relationships with all the top lenders and can help you get preferential rates from banks. Even a difference of 0.5% can help you save lakhs over a 20-25-year loan tenure.',
    },
    {
        icon: Zap,
        title: 'One-Stop Shop',
        desc: 'We will help you with end-to-end processing. As soon as you share the details with us, our team will manage your document collection, eligibility calculation, comparison between lenders, file login, follow-ups, and disbursal process while also providing timely updates.',
    },
    {
        icon: ShieldCheck,
        title: 'Zero Hidden Costs',
        desc: 'All fees charged by banks are discussed upfront. There are no last-minute surprises.',
    },
];

const faqs = [
    {
        q: 'Q1. What is the job of a loan advisor in Gurgaon?',
        a: 'An advisor will analyse your documents, review your eligibility, and compare the best offers for you from banks and NBFCs. They will help you log in your application and get the best possible deal, saving you money, time, and the hassle of managing the entire process yourself.',
    },
    {
        q: 'Q2. Which is better: going to the bank or a loan advisor in Gurgaon?',
        a: 'Going through a loan advisor will help you immensely. Advisors will compare your application eligibility across banks and lenders and will get you a better negotiated deal. They will also make sure you do not apply to lenders where your profile doesn’t match, so there are no unnecessary rejections on your CIBIL report.',
    },
    {
        q: 'Q3. What do I need to get the lowest interest rate in Gurgaon?',
        a: null,
        aJsx: true,
    },
    {
        q: 'Q4. What is the minimum CIBIL score requirement to get a home loan?',
        a: 'The majority of lenders prefer a CIBIL score of 750 and above and offer their best rates at that score. Many lenders also allow CIBIL scores from 650-749 but at slightly higher rates. For scores below 650, we can look at NBFCs or banks based on the reason for the low score. We can also work on improving your CIBIL score before you apply by following a programme, and we will guide you on how to do it.',
    },
    {
        q: 'Q5. How much time does it take to get a home loan disbursal in Gurgaon?',
        a: 'A home loan sanction normally takes 5-10 working days if all documents are complete and in order and no extra due diligence is needed. Disbursement can take 12 to 15 working days, depending on completion of the required formalities.',
    },
    {
        q: 'Q6. Can a business owner or a doctor get a home loan in Gurgaon?',
        a: 'Many banks and NBFCs offer home loans to self-employed people. Lenders have specially designed products so that business owners can get the maximum possible eligibility based on their profile. Our team has expertise in handling self-employed cases and will help you get the best deal.',
    },
    {
        q: 'Q7. What is the list of documents for a home loan?',
        a: 'Key documents include your KYC (PAN card and Aadhaar card), address proof (if different from Aadhaar) and income documents (last 3 months’ salary slips for salaried applicants, or 2 years’ income tax returns and computation of income for self-employed applicants). You will also need the last 12 months’ bank statements, property documents, Form 16 for salaried employees, and statements of account for running loans. For self-employed applicants, other documents may be needed depending on the business constitution (e.g., GST certificate, MOA/AOA).',
    },
    {
        q: 'Q8. Are there any fees charged by you for the process?',
        a: 'We have direct tie-ups with lenders, and they pay our fees. We do not charge you any fees.',
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
                        <p className="text-gray-700 leading-relaxed">
                            Banks often offer the lowest rate based on a good{' '}
                            <a
                                href="https://www.borrowww.com/credit-check"
                                className="text-[#3A6EA5] font-medium underline underline-offset-2 hover:text-[#2D3E50] transition-colors"
                            >
                                CIBIL score
                            </a>
                            , your income, and property eligibility. The lowest rate depends on your CIBIL score,
                            income stability, loan-to-value ratio, and employment type. A good advisor will assess
                            your application and make sure it goes to the lender that fits best, for the best possible rate. A difference of 0.25% is significant because home loans have a long tenure.
                        </p>
                    ) : (
                        <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default function LoanAdvisorGurgaonClient() {
    const [form, setForm] = useState({
        name: '',
        phone: '',
        city: 'Gurgaon',
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
                body: JSON.stringify({ ...form, remarks: `[Gurgaon Advisor] ${form.remarks}` }),
            });
            const data = await response.json();
            if (response.ok) {
                toast.success('Thank you! Our expert will call you soon.');
                setForm({
                    name: '',
                    phone: '',
                    city: 'Gurgaon',
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
                                <Home className="h-4 w-4" /> Loan Advisor · Gurgaon
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-medium text-black">
                                Best{' '}
                                <span className="text-[#3A6EA5] italic">Loan Advisor</span>{' '}
                                in Gurgaon for Home Loan &amp; Loan Against Property
                            </h1>
                            <p className="mt-5 text-lg text-gray-600 max-w-2xl">
                                <span className="font-semibold">35+ lenders. Best rates. Zero hassle.</span>{' '}
                                Your trusted financial partner for every home loan and LAP need in Gurgaon.
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
                                    <BadgeCheck className="h-4 w-4 text-green-600" /> RBI-Regulated Lenders
                                </div>
                                <div className="inline-flex items-center gap-2">
                                    <IndianRupee className="h-4 w-4 text-emerald-600" /> Zero Advisor Fees
                                </div>
                                <div className="inline-flex items-center gap-2">
                                    <Users className="h-4 w-4 text-blue-600" /> Serving All of Gurgaon
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

            {/* ── INTRO ── */}
            <section className="py-14 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">

                    {/* Looking for a home loan advisor */}
                    <div className="max-w-4xl">
                        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-5">
                            Are you looking for a home loan advisor in Gurgaon? You have come to the right place.
                        </h2>
                        <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                            <p>
                                One of the most important financial decisions in our lives is buying a home. We spend
                                months, sometimes years, looking for our dream home. The process is already overwhelming, and on top of that, finding the{' '}
                                <a
                                    href="https://www.borrowww.com/home-loan"
                                    className="text-[#3A6EA5] font-medium underline underline-offset-2 hover:text-[#2D3E50] transition-colors"
                                >
                                    best home loan
                                </a>{' '}
                                option among dozens of lenders can be very difficult.
                            </p>
                            <p>
                                We will help you choose the lender that best fits your income and eligibility, with the best interest rate for your loan requirement. We will make sure you get the right guidance throughout this complex process.
                            </p>
                        </div>
                    </div>

                    {/* Who is Borrowww */}
                    <div className="grid lg:grid-cols-2 gap-10 items-center">
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-5">
                                Who is Borrowww?
                            </h2>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                                <p>
                                    We are a dedicated loan advisor in Gurgaon for home loans and a trusted loan
                                    against property consultant in Gurgaon. We assist individuals, MSMEs, and NRIs in
                                    securing the best possible loan deals tailored to their requirements. Our services
                                    are available across the entire Gurgaon region.
                                </p>
                                <p>
                                    Whether you are a first-time loan applicant, an experienced investor, or looking
                                    for a LAP for your business, our team of experienced loan advisors will be
                                    delighted to serve you and guide you through the process.
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: Users, label: '35+ Lenders', sub: 'Partner network' },
                                { icon: BadgeCheck, label: 'Zero Fees', sub: 'For you, always' },
                                { icon: Building2, label: 'All of Gurgaon', sub: 'Full region coverage' },
                                { icon: HandCoins, label: 'Best Rates', sub: 'Negotiated for you' },
                            ].map((stat) => (
                                <div
                                    key={stat.label}
                                    className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 p-5 shadow text-center"
                                >
                                    <div className="h-10 w-10 mx-auto rounded-xl bg-gradient-to-br from-[#2D3E50] to-[#3A6EA5] flex items-center justify-center text-white mb-3">
                                        <stat.icon className="h-5 w-5" />
                                    </div>
                                    <p className="font-bold text-gray-900">{stat.label}</p>
                                    <p className="text-xs text-gray-500">{stat.sub}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Why choose us */}
                    <div className="max-w-4xl">
                        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-5">
                            Why choose us?
                        </h2>
                        <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                            <p>
                                Homebuyers often approach banks directly without knowing where they will get the maximum loan amount for their income and property, or where they will get the best rates. Our team of experts will help you choose from the products of 35+ lenders.
                            </p>
                            <p>
                                Being offered a lower amount at a higher interest rate by bank A doesn’t mean you can’t get a better deal from bank B. We will help you through the entire process and ensure you get the best possible option based on your requirements.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── BENEFITS ── */}
            <section className="py-14 bg-gradient-to-b from-gray-50 via-white to-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-3">
                            What you get when you work with us
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Everything you need from a single trusted loan advisor in Gurgaon.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
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

            {/* ── PRODUCTS ── */}
            <section className="py-14 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4">
                                Products we specialise in
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-8">
                                We advise on the complete range of home loans and loans against property.
                            </p>
                            <ul className="space-y-3">
                                {products.map((p) => (
                                    <li key={p} className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-[#3A6EA5] flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700">{p}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Who are our clients */}
                        <div className="space-y-8">
                            <div className="bg-gradient-to-br from-[#2D3E50] to-[#3A6EA5] rounded-3xl p-8 text-white">
                                <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Who are our clients?</h2>
                                <p className="text-white/90 leading-relaxed mb-4">
                                    We work with a wide variety of clients. Whether you are salaried at an IT or consultancy company, a business owner, a professional or a government employee, we will find the best fit for you.
                                </p>
                                <p className="text-white/90 leading-relaxed">
                                    We also specialise in cases where your CIBIL score is low or your income is irregular. Our team of experts will find the best possible solution for you while meeting all compliance requirements.
                                </p>
                            </div>

                            {/* Why rate matters */}
                            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-100 p-8 shadow">
                                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
                                    Why does rate matter?
                                </h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    The Gurgaon property market has seen a consistent boom, and property prices have soared dramatically. A low-cost home loan helps protect your purchasing power and reduces your total outflow.
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    We keep track of rate movements and RBI policies on a regular basis. In case of
                                    any major changes or any limited-time offers, we will update you immediately so
                                    that you can make an informed decision.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── PROCESS ── */}
            <section className="py-14 bg-gradient-to-b from-gray-50 via-white to-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-5">
                        What is our process?
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-lg mb-4">
                        It will take you <strong>5 minutes to start.</strong> Just share your basic details, including
                        your income details, property details, and loan amount needed. We will call you within 24
                        hours with a list of available options. We will manage everything from there.
                    </p>
                    <p className="text-gray-700 leading-relaxed text-lg mb-10">
                        Many clients have trusted us with their loans, and we will make sure the process is quicker and less stressful for you than going to a bank.
                    </p>
                    <div className="grid sm:grid-cols-3 gap-6 mb-10">
                        {[
                            { step: '1', title: 'Share Your Details', desc: 'Income, property & loan amount needed - takes 5 minutes.' },
                            { step: '2', title: 'Get Options in 24 hrs', desc: 'We compare 35+ lenders and call you with the best options.' },
                            { step: '3', title: 'We Handle the Rest', desc: 'Docs, login, follow-ups & disbursal - all managed end-to-end.' },
                        ].map((s) => (
                            <div
                                key={s.step}
                                className="relative bg-white rounded-3xl p-6 shadow-lg border-2 border-gray-100 hover:border-[#3A6EA5]/30 hover:shadow-2xl transition-all duration-300 group"
                            >
                                <div className="absolute -top-4 -left-4 h-10 w-10 rounded-xl bg-gradient-to-br from-[#2D3E50] to-[#3A6EA5] text-white flex items-center justify-center text-base font-bold shadow-lg group-hover:scale-110 transition-transform">
                                    {s.step}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-2">{s.title}</h3>
                                <p className="text-gray-600 text-sm" dangerouslySetInnerHTML={{ __html: s.desc }} />
                            </div>
                        ))}
                    </div>
                    <p className="text-gray-700 font-medium text-lg">
                        Talk to a loan advisor in Gurgaon today.{' '}
                        <a href="tel:+919560069525" className="text-[#3A6EA5] hover:underline">
                            Call / WhatsApp us
                        </a>{' '}
                        or{' '}
                        <a href="#lead-form" className="text-[#3A6EA5] hover:underline">
                            fill out an enquiry form
                        </a>
                        , and we will get back to you within 24 hours.
                    </p>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="py-14 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
                            Frequently Asked Questions
                        </h2>
                        <p className="mt-3 text-gray-600">
                            Everything you need to know about getting a loan in Gurgaon.
                        </p>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <FAQItem key={i} faq={faq} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <div className="rounded-3xl my-10 bg-gradient-to-r from-[#2D3E50] to-[#3A6EA5] p-8 text-white text-center shadow-2xl max-w-7xl mx-auto">
                <h3 className="text-2xl sm:text-3xl font-medium mb-4">
                    Ready to Get the Best Loan Deal in Gurgaon?
                </h3>
                <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                    Connect with our expert loan advisors today. Zero fees, 35+ lenders, best rates - guaranteed.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="#lead-form"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3 font-semibold text-[#3A6EA5] hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                    >
                        Apply Now <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                        href="tel:+919560069525"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white px-8 py-3 font-semibold hover:bg-white hover:text-[#3A6EA5] transition-all"
                    >
                        <Phone className="h-4 w-4" /> Call Us Now
                    </a>
                </div>
            </div>
        </div>
    );
}
