'use client';

import { useState } from 'react';
import {
    Zap,
    ShieldCheck,
    Clock,
    Smartphone,
    IndianRupee,
    BadgeCheck,
    ChevronDown,
    ArrowRight,
    MessageSquareMore,
    CreditCard,
    Lock,
    Scale,
    Building2,
    CheckCircle2
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

const commonReasons = [
    'Medical emergencies',
    'Clearing high-interest credit card bills',
    'Paying for school or coaching fees',
    'Quick home upgrades',
    'Sudden business deals',
    'Travel or wedding expenses',
];

const checklist = [
    {
        icon: Scale,
        title: 'Key Fact Statement (KFS)',
        desc: 'It should clearly show the APR. If any fee is not mentioned here, you don’t have to pay it later.'
    },
    {
        icon: Building2,
        title: 'Direct Disbursement',
        desc: 'Make sure the app is linked to a properly licensed bank or NBFC. This ensures it’s safe and regulated.'
    },
    {
        icon: Lock,
        title: 'Data Privacy',
        desc: 'Under the DPDP Act of 2023, lenders can’t access your contacts or photo gallery. They should only ask for basic KYC details.'
    }
];

const faqs = [
    {
        q: '1. What’s the usual interest rate for instant loans in Ghaziabad?',
        a: 'Right now, interest rates range from 9.99% to 14% per year if the borrower\'s CIBIL score is good. If your score is lower or the loan amount is small, rates can be higher. Always check your KFS for the total borrowing cost.'
    },
    {
        q: '2. Just how instant is instant?',
        a: 'With most digital lenders, you’ll usually get approval in under two minutes thanks to AI. After you sign using e-NACH or Aadhaar OTP, the money generally reaches your account within 30 minutes to 2 hours.'
    },
    {
        q: '3. CIBIL score under 650 - can you still get a loan?',
        a: 'Yes, many fintech lenders in Ghaziabad use “Alternative Data Scoring.” They also check things like utility bills, GST records, and bank transaction patterns. If your score’s low, you might pay higher interest, but getting a loan is still possible.'
    },
    {
        q: '4. What documents do you need?',
        a: 'No paperwork, no branch visits. You just need your PAN card, Aadhaar card (linked to your phone number for OTP), and your bank account details to complete the process.'
    },
    {
        q: '5. Are there hidden charges or processing fees?',
        a: 'All charges are clearly listed in the Key Fact Statement (KFS). Usually, there’s a one-time processing fee of around 1% to 3% plus GST. Under the new rules, once the loan is signed, the lender cannot add any surprise charges later.'
    }
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
                    <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                </div>
            )}
        </div>
    );
}

export default function InstantLoanGhaziabadClient() {
    const [form, setForm] = useState({
        name: '',
        phone: '',
        city: 'Ghaziabad',
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
                body: JSON.stringify({ ...form, remarks: `[Instant Loan Ghaziabad] ${form.remarks}` }),
            });
            const data = await response.json();
            if (response.ok) {
                toast.success('Thank you! Our expert will call you soon.');
                setForm({
                    name: '',
                    phone: '',
                    city: 'Ghaziabad',
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
        <div className="min-h-screen bg-white">
            {/* ── HERO ── */}
            <section className="relative py-20 overflow-hidden bg-gradient-to-br from-[#2D3E50] via-[#3A6EA5] to-[#2D3E50]">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7 text-white">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
                                <Zap className="h-4 w-4 text-yellow-400 fill-yellow-400" /> Instant Loan Services · Ghaziabad
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                                Instant Loan Services in <span className="text-yellow-400">Ghaziabad</span>
                            </h1>
                            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
                                Speedy, Secure, and Smooth - get credit solutions in minutes, not days. Fully RBI-compliant lending with zero foreclosure charges.
                            </p>
                            <div className="flex flex-wrap gap-6 mb-10">
                                <div className="flex items-center gap-3">
                                    <Clock className="h-6 w-6 text-yellow-400" />
                                    <span>Approval in 2 Mins</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Smartphone className="h-6 w-6 text-yellow-400" />
                                    <span>100% Paperless</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="h-6 w-6 text-yellow-400" />
                                    <span>RBI Regulated</span>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="#lead-form" className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#2D3E50] font-bold rounded-2xl shadow-xl hover:bg-yellow-400 transition-all group">
                                    Apply for Instant Loan <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>

                        {/* Form */}
                        <div id="lead-form" className="lg:col-span-5">
                            <div className="bg-white rounded-[2rem] p-8 shadow-2xl border border-white/20">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-12 w-12 rounded-2xl bg-[#3A6EA5]/10 flex items-center justify-center text-[#3A6EA5]">
                                        <MessageSquareMore className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">Instant Approval</h3>
                                        <p className="text-sm text-gray-500">Fill in your details to get started</p>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="text-sm font-semibold text-gray-700">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#3A6EA5] focus:border-transparent outline-none transition-all"
                                            placeholder="John Doe"
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-semibold text-gray-700">Mobile Number</label>
                                            <input
                                                type="tel"
                                                required
                                                maxLength={10}
                                                className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#3A6EA5] focus:border-transparent outline-none transition-all"
                                                placeholder="9876543210"
                                                value={form.phone}
                                                onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '') })}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-semibold text-gray-700">Loan Amount</label>
                                            <input
                                                type="text"
                                                required
                                                className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#3A6EA5] focus:border-transparent outline-none transition-all"
                                                placeholder="e.g. 50000"
                                                value={form.loanAmount}
                                                onChange={(e) => setForm({ ...form, loanAmount: e.target.value.replace(/\D/g, '') })}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-gray-700">Employment Type</label>
                                        <Select
                                            value={form.employmentType}
                                            onValueChange={(v) => setForm({ ...form, employmentType: v })}
                                        >
                                            <SelectTrigger className="w-full h-[52px] rounded-xl border-gray-200">
                                                <SelectValue placeholder="Select Type" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white">
                                                <SelectItem value="Salaried">Salaried</SelectItem>
                                                <SelectItem value="Self-employed">Self-employed</SelectItem>
                                                <SelectItem value="Business Owner">Business Owner</SelectItem>
                                                <SelectItem value="Student">Student / Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <button
                                        disabled={isSubmitting}
                                        className="w-full py-4 bg-gradient-to-r from-[#2D3E50] to-[#3A6EA5] text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Processing...' : 'Get Instant Cash'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── THE 3-S FRAMEWORK ── */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">The 3-S Framework for Modern Lending</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">In 2026, the best instant loans are defined by their speed, security, and smoothness.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: 'Speedy', desc: 'Approval in under 2 minutes with AI-driven credit checks.', icon: Zap, color: 'text-yellow-500' },
                            { title: 'Secure', desc: 'RBI-compliant processes ensuring your data and funds are safe.', icon: ShieldCheck, color: 'text-green-500' },
                            { title: 'Smooth', desc: '100% digital process with zero paperwork or branch visits.', icon: CheckCircle2, color: 'text-blue-500' }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl hover:-translate-y-2 transition-all group">
                                <div className={`w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <item.icon className={`h-8 w-8 ${item.color}`} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed text-lg">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CONTENT BODY ── */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Why does Ghaziabad love digital instant loans?</h2>
                            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                                <p>
                                    Ghaziabad is growing really fast, especially for professionals and small business owners. Surprise medical bills, AC breakdowns, or sudden business deals can come up anytime. In such situations, you don’t want to wait for days - you need money quickly.
                                </p>
                                <p>
                                    Lenders now use <strong>Smart AI</strong> to check your credit in real time. This really helps younger professionals or small shop owners in areas like <strong>Raj Nagar Extension</strong> who may not have a <Link href="/credit-check" className="text-[#3A6EA5] font-semibold underline underline-offset-4">CIBIL history</Link> but do have regular digital transactions.
                                </p>
                                <p>
                                    With the new <strong>RBI Digital Lending Rules in 2026</strong>, things feel a lot safer. Foreclosure and prepayment charges are now zero, so if you have funds, you can just pay the outstanding principal and your loan is closed. No penalties, no drama.
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gradient-to-br from-[#2D3E50] to-[#3A6EA5] rounded-3xl p-8 text-white shadow-2xl">
                                <h3 className="text-4xl font-bold mb-2">24/7</h3>
                                <p className="text-white/80">Available anytime, day or night</p>
                            </div>
                            <div className="bg-gray-900 rounded-3xl p-8 text-white shadow-2xl">
                                <h3 className="text-4xl font-bold mb-2">₹0</h3>
                                <p className="text-white/80">Foreclosure charges</p>
                            </div>
                            <div className="bg-yellow-400 rounded-3xl p-8 text-[#2D3E50] shadow-2xl col-span-2">
                                <h3 className="text-4xl font-bold mb-2">Smart AI</h3>
                                <p className="font-semibold">Real-time credit assessment</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CHECKLIST ── */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-[3rem] p-8 sm:p-16 shadow-2xl border border-gray-100">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">Check before choosing an instant loan provider</h2>
                        <div className="grid md:grid-cols-3 gap-12">
                            {checklist.map((item, i) => (
                                <div key={i} className="space-y-4">
                                    <div className="w-12 h-12 rounded-xl bg-[#3A6EA5]/10 flex items-center justify-center text-[#3A6EA5]">
                                        <item.icon className="h-6 w-6" />
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900">{item.title}</h4>
                                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── REASONS ── */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Common reasons for using instant loans</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {commonReasons.map((r, i) => (
                                    <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                        <BadgeCheck className="h-5 w-5 text-green-500" />
                                        <span className="font-medium text-gray-700">{r}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-[#2D3E50] rounded-[2rem] p-10 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                            <h3 className="text-2xl font-bold mb-4">No Collateral Required</h3>
                            <p className="text-white/80 text-lg leading-relaxed mb-6">
                                Whether you need ₹5,000 or ₹5,00,000, these unsecured personal loans are based on your verified income and how you manage your money. No assets needed.
                            </p>
                            <div className="flex items-center gap-4 py-4 border-t border-white/10">
                                <CreditCard className="h-8 w-8 text-yellow-400" />
                                <div>
                                    <p className="font-bold">Paperless KYC</p>
                                    <p className="text-sm text-white/60">Aadhaar & PAN based</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <FAQItem key={i} faq={faq} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-[#2D3E50] to-[#3A6EA5] rounded-[3rem] p-12 text-center text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Need Quick Funding Anytime?</h2>
                        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                            Ghaziabad’s instant loan market is now safer, faster, and friendlier. Get the cash you need with no drama.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="#lead-form" className="px-10 py-4 bg-yellow-400 text-[#2D3E50] font-bold rounded-2xl shadow-xl hover:bg-white transition-all">
                                Apply Now
                            </a>
                            <a href="tel:+919560069525" className="px-10 py-4 bg-white/10 border border-white/20 backdrop-blur-md text-white font-bold rounded-2xl hover:bg-white/20 transition-all">
                                Contact Support
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
