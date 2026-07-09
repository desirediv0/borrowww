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
            title: 'Choose the type of loan',
            desc: 'Select the right loan product that fits your property requirements.',
        },
        {
            icon: ClipboardCheck,
            title: 'Fill up the basic details',
            desc: 'Provide your basic details via our simple lead form.',
        },
        {
            icon: FileCheck2,
            title: 'Provide all the documents',
            desc: 'Submit required documents for quick verification.',
        },
        {
            icon: Users,
            title: 'Wait for discussion',
            desc: 'Wait till our relationship manager contact you for detailed discussion.',
        },
    ];

    const features = [
        {
            icon: Building2,
            title: 'Access to multiple banks',
            desc: 'Partnerships with leading Indian banks & NBFCs.',
        },
        {
            icon: Percent,
            title: 'Competitive interest rates',
            desc: 'We help you find and negotiate the best market rates.',
        },
        {
            icon: CalendarCheck2,
            title: 'Faster approval support',
            desc: 'Quick support to accelerate your loan sanction.',
        },
        {
            icon: ShieldCheck,
            title: 'Flexible tenure options',
            desc: 'Explore different tenure lengths to match your EMI comfort.',
        },
        {
            icon: Handshake,
            title: 'End-to-end assistance',
            desc: 'Our team guides you from application to disbursement.',
        },
        {
            icon: BadgeCheck,
            title: 'Transparent process',
            desc: 'Clear terms and conditions with zero hidden surprises.',
        },
    ];

    const loanTypes = [
        {
            title: 'Ready property loans',
            desc: 'Ready property loans work well for buyers looking for quicker possession',
            icon: Home,
        },
        {
            title: 'Under-construction property loans',
            desc: 'Under-construction property loans need a more flexible disbursement structure',
            icon: Building2,
        },
        {
            title: 'Home loan balance transfers',
            desc: 'Home loan balance transfers are ideal for borrowers looking for better interest rates or improved repayment terms.',
            icon: Percent,
        },
        {
            title: 'Plot loans',
            desc: 'Plot loans help you get your dream land for building a home',
            icon: ShieldCheck,
        },
        {
            title: 'Plot and construction loan',
            desc: 'Plot and construction loan lets you buy a land and customize construct your dream home',
            icon: FileCheck2,
        },
    ];

    const faqs = [
        {
            q: 'What type of home loans can I apply for?',
            a: 'Our platform allows you to choose from different types of home loans, including-',
            bullets: [
                'Ready property loans',
                'Under-construction property loans',
                'Plot loans',
                'Plot plus construction loans',
                'Home loan balance transfers',
            ],
        },
        {
            q: 'Can Borrowww help me compare multiple banks?',
            a: 'Our platform will connect borrowers with the leading Indian banks and NBFC’s. You can easily compare suitable loan options, best interest rates and repayment structures in one place.',
        },
        {
            q: 'Do you provide support during the loan process?',
            a: 'Our team will assist you with documentation, coordination and application follow-ups from start to finish.',
        },
        {
            q: "What is the minimum salary required to get a home loan in India?",
            a: "Most lenders look for a minimum monthly income of around ₹25,000 for salaried applicants, though this varies by city and bank. The bigger factor is your repayment capacity — banks usually keep your EMI within 40–50% of your net monthly income. A higher salary simply means you qualify for a larger loan amount."
        },
        {
            q: "How is home loan eligibility calculated on the basis of salary?",
            a: "Lenders calculate eligibility using your net monthly income, existing EMIs, age, and your FOIR (Fixed Obligation to Income Ratio). As a rough guide, you can borrow around 60 times your monthly salary. So if you earn ₹50,000 a month, your eligibility could be close to ₹30 lakh — subject to your credit score and the property value."
        },
        {
            q: "What is the maximum home loan amount I can get?",
            a: "The maximum amount depends on your income, age, credit profile, and the property’s market value. Banks typically finance up to 75–90% of the property cost, with the rest paid by you as a down payment. On the income side, your eligible amount is tied to how much EMI you can comfortably manage each month."
        },
        {
            q: "What documents are required to apply for a home loan?",
            a: "You generally need identity proof (Aadhaar, PAN), address proof, income proof (salary slips and Form 16 for salaried, or ITR for self-employed), your last 6 months’ bank statements, and the property papers. Keeping these ready upfront speeds up verification and approval considerably."
        },
        {
            q: "What is the current home loan interest rate in India?",
            a: "Home loan interest rates in India usually fall between 7.10% and 9.5% per annum, depending on the lender, your credit score, the loan amount, and whether you choose a fixed or floating rate. A strong CIBIL score of 750 and above often helps you negotiate a lower rate."
        },
        {
            q: "Can I get a home loan with a low CIBIL score?",
            a: "It is possible, but more difficult. A score below 650 can lead to rejection or a higher interest rate. Some banks and NBFCs still approve such cases with conditions like a larger down payment or a co-applicant. Improving your score before applying almost always gets you better terms."
        },
        {
            q: "What is a home loan balance transfer and how does it help?",
            a: "A balance transfer means shifting your existing home loan to another lender that offers a lower interest rate. It can reduce both your EMI and the total interest you pay over the tenure. It works best early in your loan term, when a larger share of each EMI still goes toward interest."
        },
        {
            q: "How long does it take to get a home loan approved?",
            a: "With complete documents, in-principle approval can come through within 2–7 working days. Final sanction and disbursement depend on property verification and legal checks, which may add a couple of weeks. Submitting accurate paperwork the first time is the easiest way to avoid delays."
        },
        {
            q: "Can I get a home loan for an under-construction property?",
            a: "Yes. For under-construction properties, the loan is usually disbursed in stages linked to construction progress. During this period you often pay interest only on the amount disbursed (known as pre-EMI), with full EMIs starting once the property is handed over to you."
        },
        {
            q: "What is the maximum tenure available for a home loan?",
            a: "Home loans in India can run for up to 30 years, though the exact tenure depends on your age when you apply and your expected retirement age. A longer tenure lowers your monthly EMI but increases the total interest you pay over the life of the loan."
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
                                Home Loan in India – Check Eligibility by Salary & Get Low Interest Rates
                            </h1>
                            <h2 className="mt-5 text-xl sm:text-2xl font-medium text-gray-600 leading-relaxed">
                                Simplify Your Home Buying Journey through <a href="https://www.borrowww.com/" className="text-[#3A6EA5] hover:underline font-semibold">Borrowww</a>’s Secured Loans
                            </h2>
                            <p className="mt-5 text-lg text-gray-600 max-w-2xl leading-relaxed">
                                Are you in search of the right home loan provider platform? We understand that it takes time, there are so many aspects to consider. Then, the rates change, bank policies differ, and paperwork often feels exhausting after a point.
                            </p>
                            <p className="mt-4 text-base text-gray-600 max-w-2xl leading-relaxed">
                                That is why you must connect with us at <a href="https://www.borrowww.com/" className="text-[#3A6EA5] hover:underline font-semibold">Borrowww</a> and we know how to help you avoid that confusion. Our platform has strong partnerships with the leading banks and NBFC’s in India. We connect you with them and guide you through the loan process with practical support that actually helps.
                            </p>
                            <p className="mt-4 text-base text-gray-600 max-w-2xl leading-relaxed font-light">
                                Potential home buyers already know the property they want but others still believe in comparing projects, budgets and repayment plans. We work with both. Our team lets you explore suitable loan options based on your requirement instead of always choosing a one-size-fits-all solution.
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
                                    <h3 className="text-xl font-semibold">Get Personalized Offers</h3>
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

            {/* CHOOSE THE RIGHT LOAN FOR YOUR PROPERTY PLANS */}
            <section className="py-16 bg-[#2D3E50]/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 leading-tight">
                            Choose the Right Loan for Your Property Plans
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                            We offer support for multiple loan requirements to suit your individual needs:
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
                            Our platform offers multiple perks and brings you closer to your dream.
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
                            What’s Our Approach
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            Seeking a home loan from our platform is a simple process. All you must do is follow these simple steps:
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

            {/* LET US HELP YOU MOVE FORWARD (CTA) */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-3xl bg-gradient-to-r from-[#2D3E50] to-[#3A6EA5] p-10 text-white text-center shadow-2xl">
                        <h3 className="text-2xl sm:text-3xl font-semibold mb-4">Let Us Help You Move Forward</h3>
                        <p className="text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                            Does buying a home sound challenging to you? With Borrowww, the entire procedure becomes simple and accessible. Connect with us and explore the best home loan options that fit your property goals with confidence.
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

