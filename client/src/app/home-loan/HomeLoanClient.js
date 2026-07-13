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
        },
        {
            q: "Can I prepay my home loan without any penalty?",
            a: "Yes. As per RBI guidelines, floating-rate home loans taken by individual borrowers cannot carry foreclosure or prepayment charges. This applies whether you prepay a lump sum or close the loan entirely."
        },
        {
            q: "Does my credit score improve after taking a home loan?",
            a: "A home loan, repaid on time, generally helps your credit score over the medium term by adding a long-tenure secured loan with consistent repayment history. Missed EMIs can hurt your score significantly."
        },
        {
            q: "Can NRIs apply for a home loan in India?",
            a: "Yes, most banks and several HFCs offer home loans to NRIs for residential property purchase in India, typically requiring an NRE/NRO account, valid passport and visa, overseas income proof, and often a resident co-applicant."
        },
        {
            q: "What happens if my home loan application gets rejected?",
            a: "A rejection at one lender doesn't mean rejection everywhere. Common fixable reasons include a low credit score, high existing EMI load, or incomplete documentation, all of which can often be addressed before reapplying."
        },
        {
            q: "Is home loan interest tax-deductible in India?",
            a: "Under the Old Tax Regime, interest on a self-occupied property is deductible up to ₹2 lakh/year under Section 24(b), and principal repayment up to ₹1.5 lakh under Section 80C. The New Tax Regime does not permit these deductions — confirm with a tax professional."
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

            <PartnerBanks />

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

            {/* IN-DEPTH HOME LOAN GUIDES */}
            <section className="py-16 bg-[#2D3E50]/[0.02] border-t border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                            In-Depth Home Loan Insights & Guides
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Everything you need to know about eligibility, calculations, interest rates, charges, and categories before you apply.
                        </p>
                    </div>

                    <div className="space-y-16">
                        {/* 1. Home Loan Eligibility Calculator */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#3A6EA5]/10 text-[#3A6EA5] text-sm font-bold flex-shrink-0">1</span>
                                Home Loan Eligibility Calculator – Check How Much You Can Borrow
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Your home loan eligibility depends primarily on four factors — monthly income, existing EMIs, age, and credit score. Most salaried applicants can borrow roughly 60 times their net monthly salary, subject to a FOIR cap of 60-70%.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Before you shortlist a property, it helps to know your borrowing power. Lenders don't look at income alone — they calculate eligibility using a formula that balances your take-home salary against your current financial commitments. Here's how the maths generally works:
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
                                            <td className="px-6 py-4 text-sm text-gray-600">₹30–33 lakh</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">₹24,000–26,000</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">₹60,000</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">₹42–45 lakh</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">₹36,000–39,000</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">₹1,00,000</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">₹75–78 lakh</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">₹60,000–65,000</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">₹1,50,000</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">₹110–115 lakh</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">₹90,000–95,000</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Three levers move your eligibility the most: reducing existing EMIs before applying, adding a co-applicant's income, and improving your CIBIL score above 750. Self-employed applicants are assessed differently — lenders average the last 2–3 years of ITR income rather than a single payslip.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Want an exact number based on your salary, city, and existing obligations? Get a free eligibility check from our loan experts — we'll match you with the lender offering the highest sanction at the lowest rate.
                            </p>
                        </div>

                        {/* 2. How Does a Home Loan EMI Calculator Work? */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#3A6EA5]/10 text-[#3A6EA5] text-sm font-bold flex-shrink-0">2</span>
                                How Does a Home Loan EMI Calculator Work?
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                EMI is calculated using your loan amount, interest rate, and tenure, via the formula <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded font-mono text-sm">EMI = [P × R × (1+R)^N] / [(1+R)^N – 1]</code>, where P is principal, R is monthly interest rate, and N is tenure in months.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                An EMI has two moving parts every month: interest and principal. In the early years, a larger share goes toward interest; as tenure progresses, more reduces principal — this is why prepaying in the first 5–7 years saves the most interest.
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
                                            <td className="px-6 py-4 text-sm text-gray-600">~₹32,224</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">~₹37.33 lakh</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">₹75 lakh</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">25 years</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">7.75%</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">~₹55,424</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">~₹91.27 lakh</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xs text-gray-500 mb-6 italic">
                                Figures are approximate and illustrative; use the live EMI Calculator (borrowww.com/emi) for a precise, personalised calculation.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                A longer tenure lowers monthly outgo but increases total interest paid; a shorter tenure does the opposite. Most borrowers choose tenure based on comfortable cash flow first, then use prepayment to close the loan faster once income grows.
                            </p>
                        </div>

                        {/* 3. Bank-wise Home Loan Interest Rate Comparison in India */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#3A6EA5]/10 text-[#3A6EA5] text-sm font-bold flex-shrink-0">3</span>
                                Bank-wise Home Loan Interest Rate Comparison in India
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Home loan interest rates across major Indian banks and NBFCs typically range between 7.10% and 9.50% p.a., depending on credit score, loan amount, and whether the rate is repo-linked or MCLR-based.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Rates move frequently with RBI policy changes, so treat any published number as indicative. Comparing lender categories helps you know where to start:
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
                                            <td className="px-6 py-4 text-sm text-gray-600">7.10% – 8.50%</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Salaried applicants, lowest processing fees</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">Private Sector Banks</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">7.15% – 9.00%</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Faster processing, digital-first applicants</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">Housing Finance Companies</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">7.25% – 9.50%</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Self-employed, lower credit score, informal income</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">NBFCs</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">8.00% – 10.00%</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Quick disbursal, flexible eligibility norms</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                The lowest advertised rate isn't always the cheapest loan — processing fees, prepayment charges, and mandatory insurance bundling change the real cost. This is where Borrowww adds value: we compare live offers across partner lenders and shortlist the option that's genuinely cheapest for your profile.
                            </p>
                        </div>

                        {/* 4. How Does RBI Repo Rate Affect Your Home Loan EMI? */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#3A6EA5]/10 text-[#3A6EA5] text-sm font-bold flex-shrink-0">4</span>
                                How Does RBI Repo Rate Affect Your Home Loan EMI?
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Since most home loans are linked to an External Benchmark Lending Rate (EBLR) tied to the repo rate, any RBI rate change is passed on to your loan's interest rate — usually within one quarter.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                When RBI cuts the repo rate, banks on repo-linked loans typically reduce their lending rate, lowering either your EMI or tenure. When RBI hikes it, the reverse happens. Borrowers on older MCLR loans see changes with more delay since MCLR resets only at fixed intervals.
                            </p>
                            <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200 shadow-sm">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-[#2D3E50]/5">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Repo Rate Change</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Impact on Repo-Linked Loan</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Typical Borrower Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">Rate Cut (e.g. -0.25%)</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Lower EMI or shorter tenure</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 font-medium text-[#3A6EA5]">Choose reduced EMI or keep EMI same to close loan faster</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">Rate Hike (e.g. +0.25%)</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 font-semibold text-red-600">Higher EMI or longer tenure</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Consider part-prepayment to offset the increase</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">No Change</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">EMI stays the same</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Good time to review balance transfer options if current rate is high</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                If your loan is on MCLR or a fixed rate and market rates have dropped meaningfully, a balance transfer is usually the fastest way to capture the benefit. Our team tracks live repo-linked offers across partner banks and can tell you within minutes whether switching makes financial sense.
                            </p>
                        </div>

                        {/* 5. Home Loan Processing Fees & Hidden Charges Explained */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#3A6EA5]/10 text-[#3A6EA5] text-sm font-bold flex-shrink-0">5</span>
                                Home Loan Processing Fees & Hidden Charges Explained
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Beyond the interest rate, home loans typically carry processing fees (0.25%–1%), legal/technical valuation charges, stamp duty on the loan agreement, and prepayment charges (mostly waived on floating-rate loans for individuals per RBI rules).
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
                                            <td className="px-6 py-4 text-sm text-gray-600">0.25% – 1% of loan amount</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Often negotiable; some lenders waive during festive offers</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">Legal & Technical Valuation</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">₹3,000 – ₹10,000</td>
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
                                            <td className="px-6 py-4 text-sm text-gray-600 font-medium">₹100– ₹200 + GST</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Mandatory security interest registration</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">Insurance Bundling</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Varies</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Often optional — read the sanction letter carefully</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                Always ask for the fee break-up in writing before signing the sanction letter — some lenders bundle credit life insurance into the loan amount without clearly flagging it as optional. Our advisors review the full cost sheet with you before you commit.
                            </p>
                        </div>

                        {/* 6. Fixed vs Floating vs Repo-Linked Home Loan Rates */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#3A6EA5]/10 text-[#3A6EA5] text-sm font-bold flex-shrink-0">6</span>
                                Fixed vs Floating vs Repo-Linked Home Loan Rates: Which Should You Choose?
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Floating and repo-linked rates move with RBI policy and are usually cheaper long-term; fixed rates stay constant for a set period but typically start 0.5–1.5% higher and offer less flexibility on foreclosure.
                            </p>
                            <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200 shadow-sm">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-[#2D3E50]/5">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Feature</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Fixed Rate</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Floating (MCLR)</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Repo-Linked (EBLR)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">Rate Movement</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Constant for tenure/period</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Resets periodically with MCLR</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Directly tracks RBI repo rate</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">Transparency</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">High (predictable EMI)</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Moderate (bank-set spread)</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Highest (faster, clearer transmission)</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">Typical Starting Rate</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Higher</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Moderate</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 font-medium text-[#3A6EA5]">Usually lowest</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">Best For</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Budget certainty</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Comfortable with gradual changes</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Fastest benefit from rate cuts</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">Foreclosure Charges</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">May apply</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Nil for individuals (RBI mandate)</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Nil for individuals (RBI mandate)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Since October 2019, RBI has required most retail floating-rate loans to be linked to an external benchmark like the repo rate, making EBLR the most common choice today. Fixed-rate home loans are less common in India, usually offered only for a limited initial period before converting to floating.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                If you value predictability and can accept a slightly higher starting rate, fixed works. If you want your EMI to reflect the true cost of borrowing as RBI policy shifts, repo-linked is generally more transparent and lower-cost over a full tenure.
                            </p>
                        </div>

                        {/* 7. Home Loan Benefits by Borrower Category */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#3A6EA5]/10 text-[#3A6EA5] text-sm font-bold flex-shrink-0">7</span>
                                Home Loan Benefits by Borrower Category
                            </h3>
                            
                            <div className="space-y-8">
                                <div className="border-l-4 border-[#3A6EA5] pl-4">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">7. Women Home Loan Benefits</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Women borrowers typically get a 0.05%–0.10% interest rate concession from most banks, along with lower stamp duty (1–2% less) in several states when the property is registered solely or jointly in a woman's name.
                                    </p>
                                    <p className="text-gray-600 text-sm leading-relaxed mt-2">
                                        This concession applies whether the woman is the sole applicant or a co-applicant, provided she is a co-owner in most bank policies. States like Delhi, Haryana, UP, and Rajasthan offer reduced stamp duty for women property owners — the combined saving can run into lakhs on a higher-value property.
                                    </p>
                                </div>

                                <div className="border-l-4 border-[#2D3E50] pl-4">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">8. Joint Home Loan Benefits</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        A joint home loan combines the income of two applicants to increase eligibility, and allows both co-borrowers to separately claim tax deductions under Section 80C (principal) and Section 24(b) (interest), up to ₹1.5 lakh and ₹2 lakh respectively — effectively doubling the household's tax benefit if both are co-owners and co-applicants.
                                    </p>
                                    <p className="text-gray-600 text-sm leading-relaxed mt-2">
                                        For eligibility purposes, adding a working spouse or parent as co-applicant often unlocks a meaningfully higher loan amount than either applicant could get alone.
                                    </p>
                                </div>

                                <div className="border-l-4 border-[#3A6EA5] pl-4">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">9. Home Loan for Government Employees</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Government employees (central, state, PSU) often get preferential rates due to income stability, sometimes with relaxed FOIR norms and reduced documentation.
                                    </p>
                                    <p className="text-gray-600 text-sm leading-relaxed mt-2">
                                        Some public sector banks run dedicated schemes for government staff with marginally lower processing fees. It's worth explicitly asking your relationship manager whether a special scheme applies to your department.
                                    </p>
                                </div>

                                <div className="border-l-4 border-[#2D3E50] pl-4">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">10. Home Loan for Doctors and Professionals</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Many lenders offer specialised schemes for doctors, CAs, CS, and other qualified professionals, with higher eligibility multiples (sometimes up to 70–80x monthly income) and relaxed income-proof requirements.
                                    </p>
                                    <p className="text-gray-600 text-sm leading-relaxed mt-2">
                                        Since professional income can be less predictable than a salaried applicant's, lenders assessing doctors and professionals typically look at 2–3 years of ITR and practice stability rather than payslips.
                                    </p>
                                </div>

                                <div className="border-l-4 border-[#3A6EA5] pl-4">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">11. Home Loan for Senior Citizens</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Senior citizens can get home loans, but tenure is typically capped based on age at maturity (commonly 70–75 years), which shortens tenure and raises the EMI compared to a younger applicant for the same loan amount.
                                    </p>
                                    <p className="text-gray-600 text-sm leading-relaxed mt-2">
                                        Adding a younger co-applicant (often an adult child) as co-borrower is the most common way senior citizens extend their effective tenure and improve eligibility.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 12. New Tax Regime vs Old Tax Regime */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#3A6EA5]/10 text-[#3A6EA5] text-sm font-bold flex-shrink-0">12</span>
                                New Tax Regime vs Old Tax Regime: Which Is Better for Home Loan Borrowers?
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                The Old Tax Regime allows deductions on both principal (Section 80C, up to ₹1.5 lakh) and interest (Section 24(b), up to ₹2 lakh for self-occupied property). The New Tax Regime does not allow these deductions for a self-occupied home, making the Old Regime generally more beneficial for active home loan borrowers.
                            </p>
                            <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200 shadow-sm">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-[#2D3E50]/5">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Benefit</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Old Tax Regime</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">New Tax Regime</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">Principal Repayment (80C)</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Deductible up to ₹1.5 lakh/year</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Not allowed</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">Interest on Self-Occupied Property (24b)</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Deductible up to ₹2 lakh/year</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Not allowed</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">Interest on Let-Out Property</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Fully deductible (no cap)</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 font-medium text-[#3A6EA5]">Allowed, loss set-off restricted</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">Best Suited For</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 font-semibold text-[#3A6EA5]">Borrowers actively repaying a home loan</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Borrowers without major deductions</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                If you're planning to buy with a loan and don't have many other deductions, running both regimes through a calculator before filing is worthwhile — for many borrowers in the early years of repayment (highest interest component), the Old Regime still results in lower tax outgo. This is general information, not personalised advice — confirm your specific position with a qualified tax consultant.
                            </p>
                        </div>

                        {/* 13. Home Loan Checklist */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#3A6EA5]/10 text-[#3A6EA5] text-sm font-bold flex-shrink-0">13</span>
                                Home Loan Checklist: What to Prepare Before You Apply
                            </h3>
                            
                            <ul className="grid sm:grid-cols-2 gap-4 mb-6">
                                {[
                                    "CIBIL/credit score checked and above 700 (ideally 750+)",
                                    "Last 3 months' salary slips (salaried) or 2–3 years' ITR (self-employed)",
                                    "Last 12 months' bank statements showing salary/income credits",
                                    "Identity proof: PAN card and Aadhaar card",
                                    "Address proof (Aadhaar, voter card, driving license)",
                                    "Property documents: sale agreement, title deed, approved building plan",
                                    "Builder's NOC and RERA registration number (under-construction property)",
                                    "Down payment amount arranged (typically 10–25% of property value)",
                                    "Existing loan/EMI details for FOIR calculation",
                                    "Employment continuity proof (offer letter, experience letter, or Form 16)"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2.5 text-gray-600 text-sm">
                                        <span className="flex-shrink-0 mt-1 flex items-center justify-center w-4 h-4 rounded-full bg-[#3A6EA5]/20 text-[#3A6EA5]">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <p className="text-gray-600 leading-relaxed">
                                Applicants who arrange these documents in advance typically move from application to in-principle approval faster, since most delays come from back-and-forth document requests rather than the credit decision itself.
                            </p>
                        </div>

                        {/* 14. Home Loan Myths vs Facts */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#3A6EA5]/10 text-[#3A6EA5] text-sm font-bold flex-shrink-0">14</span>
                                Home Loan Myths vs Facts
                            </h3>
                            <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200 shadow-sm">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-[#2D3E50]/5">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-[#2D3E50] uppercase tracking-wider w-1/3">Myth</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-[#3A6EA5] uppercase tracking-wider w-2/3">Fact</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                        {[
                                            { m: "You need a CIBIL score of 900 to get approved", f: "Scores max out at 900, but most lenders approve comfortably at 750+; some approve even at 650–700 with conditions" },
                                            { m: "The lowest advertised rate is always cheapest", f: "Processing fees, insurance bundling, and prepayment terms can make a 'lower rate' loan costlier overall" },
                                            { m: "Foreclosing always attracts a penalty", f: "RBI mandates zero foreclosure charges on floating-rate loans for individual borrowers" },
                                            { m: "Self-employed can't get home loans easily", f: "Many lenders and HFCs specialise in self-employed profiles with tailored income assessment" },
                                            { m: "You must bank with a lender to get a loan there", f: "Home loans are widely available even where you hold no existing account" },
                                            { m: "A rejected application stays rejected everywhere", f: "Different lenders have different credit policies — rejection at one doesn't mean rejection elsewhere" }
                                        ].map((item, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-6 py-4 text-sm font-medium text-red-700 bg-red-50/30">{item.m}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600 bg-emerald-50/10">{item.f}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* 15. Complete Home Buying Cost Breakdown */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#3A6EA5]/10 text-[#3A6EA5] text-sm font-bold flex-shrink-0">15</span>
                                Complete Home Buying Cost Breakdown (Beyond the Property Price)
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Beyond the property's sale price, buyers should budget an additional 7–10% for stamp duty, registration, GST (on under-construction property), brokerage, and loan-related charges.
                            </p>
                            <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200 shadow-sm">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-[#2D3E50]/5">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Cost Component</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Typical Range</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">Stamp Duty</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">3% – 7% of property value (state-dependent)</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">Registration Charges</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">1% of property value (approx.)</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">GST (under-construction only)</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">1% (affordable housing) – 5% (others)</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">Loan Processing & Legal Fees</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">0.25% – 1% of loan amount</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">Brokerage (if applicable)</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">1% – 2% of property value</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">Interior & Fit-Out (optional)</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Varies widely by choice</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">Home Insurance (optional but recommended)</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Varies by cover</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                A common budgeting mistake is arranging only the down payment and missing stamp duty and registration, which together can add 4–8% on top of the sale price. Factor these into your total cash requirement before finalising a property.
                            </p>
                        </div>

                        {/* 16. Home Loan Trends in India */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#3A6EA5]/10 text-[#3A6EA5] text-sm font-bold flex-shrink-0">16</span>
                                Home Loan Trends in India (2026)
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                In 2026, home loan trends in India are shaped by continued repo-linked rate transparency, growing digital/paperless disbursal, rising demand in Tier-2 cities, and increasing use of AI-based credit assessment by lenders.
                            </p>
                            <ul className="space-y-4 mb-6">
                                {[
                                    { t: "Faster digital disbursal", d: "end-to-end digital verification cutting approval timelines for straightforward salaried applications" },
                                    { t: "Tier-2 and Tier-3 city growth", d: "demand rising steadily outside metros as infrastructure and remote-work flexibility expand" },
                                    { t: "Greater rate transparency", d: "repo-linked loans make rate changes easier to track and anticipate than the MCLR era" },
                                    { t: "Alternate credit assessment", d: "utility payments, GST filings, and digital transaction history considered alongside traditional credit scores" },
                                    { t: "Balance transfer activity", d: "more existing borrowers actively comparing and switching lenders rather than staying with their original bank" }
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-gray-600 text-sm">
                                        <span className="flex-shrink-0 mt-1.5 flex items-center justify-center w-1.5 h-1.5 rounded-full bg-[#3A6EA5]"></span>
                                        <div>
                                            <strong className="text-gray-900 font-semibold">{item.t}:</strong> {item.d}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-xs text-gray-500 italic">
                                These are general market observations, not a forecast of future interest rate movements. Always check current rates directly with lenders.
                            </p>
                        </div>

                        {/* 17. Home Loan Glossary */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#3A6EA5]/10 text-[#3A6EA5] text-sm font-bold flex-shrink-0">17</span>
                                Home Loan Glossary: Key Terms Explained
                            </h3>
                            <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200 shadow-sm">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-[#2D3E50]/5">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/4">Term</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-3/4">Meaning</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                        {[
                                            { t: "FOIR", m: "Fixed Obligation to Income Ratio — share of income already committed to EMIs/obligations" },
                                            { t: "EBLR", m: "External Benchmark Lending Rate — the repo-linked rate most floating home loans follow today" },
                                            { t: "MCLR", m: "Marginal Cost of Funds based Lending Rate — an older benchmark still used by some lenders" },
                                            { t: "Pre-EMI", m: "Interest-only payment made during construction, before full EMI begins" },
                                            { t: "LTV Ratio", m: "Loan-to-Value ratio — percentage of property value a lender is willing to finance" },
                                            { t: "CERSAI", m: "Central Registry that records the security interest created on your property" },
                                            { t: "Sanction Letter", m: "Formal document confirming loan approval, amount, rate, and terms" },
                                            { t: "Disbursement", m: "Actual release of loan funds, in full or in stages" },
                                            { t: "Balance Transfer", m: "Moving an existing home loan to a new lender, usually for a better rate" },
                                            { t: "Co-applicant", m: "A second borrower (often spouse/parent) whose income is combined for eligibility" }
                                        ].map((item, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{item.t}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{item.m}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* 18. Your Home Loan Journey with Borrowww */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#3A6EA5]/10 text-[#3A6EA5] text-sm font-bold flex-shrink-0">18</span>
                                Your Home Loan Journey with Borrowww: Step-by-Step Timeline
                            </h3>
                            <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200 shadow-sm">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-[#2D3E50]/5">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/4">Stage</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/2">What Happens</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/4">Typical Timeframe</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                        {[
                                            { s: "1. Enquiry", w: "Share your requirement via lead form or call", t: "Same day" },
                                            { s: "2. Eligibility Check", w: "Team assesses income, credit score, and lender fit", t: "1–2 days" },
                                            { s: "3. Lender Shortlisting", w: "Compare offers across partner banks/NBFCs for your profile", t: "1–2 days" },
                                            { s: "4. Document Submission", w: "You submit KYC, income, and property documents", t: "1–3 days" },
                                            { s: "5. In-Principle Approval", w: "Lender issues conditional sanction based on credit assessment", t: "2–7 working days" },
                                            { s: "6. Property Verification", w: "Legal and technical valuation of the property", t: "3–10 working days" },
                                            { s: "7. Final Sanction & Disbursement", w: "Loan agreement signed and funds released", t: "3–7 working days after verification" }
                                        ].map((item, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{item.s}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{item.w}</td>
                                                <td className="px-6 py-4 text-sm font-semibold text-[#3A6EA5]">{item.t}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                Timelines vary by lender workload, property type, and how quickly documents are submitted. Our relationship managers stay involved at every stage, so you always know exactly what's pending and with whom.
                            </p>
                        </div>

                        {/* 19. How We've Helped Borrowers */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#3A6EA5]/10 text-[#3A6EA5] text-sm font-bold flex-shrink-0">19</span>
                                How We've Helped Borrowers: Illustrative Case Studies
                            </h3>
                            
                            <div className="space-y-6">
                                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                                    <h4 className="font-semibold text-gray-900 mb-2">Case 1: First-Time Salaried Buyer, Gurgaon</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        A salaried applicant earning ₹85,000/month wanted a ₹55 lakh loan for a ready property but was initially quoted a higher rate at their existing bank. By comparing offers across our partner lenders, we identified a public sector bank offering a lower repo-linked rate for their credit profile, reducing the EMI by an estimated ₹3,400/month over the tenure.
                                    </p>
                                </div>

                                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                                    <h4 className="font-semibold text-gray-900 mb-2">Case 2: Self-Employed Applicant, Noida</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        A self-employed shop owner with irregular banking history struggled with standard salaried-focused lenders. We routed the application to a housing finance company that assesses self-employed income using GST filings and bank credit patterns rather than payslips, resulting in an approved loan within a workable timeline.
                                    </p>
                                </div>

                                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                                    <h4 className="font-semibold text-gray-900 mb-2">Case 3: Balance Transfer, Delhi</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        An existing borrower on an older MCLR-linked loan at a higher rate approached us for a review. We compared their outstanding loan against current repo-linked offers and facilitated a balance transfer that reduced their effective rate, shortening the remaining payoff period without increasing their EMI.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 20. Bank vs NBFC vs Housing Finance Company */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#3A6EA5]/10 text-[#3A6EA5] text-sm font-bold flex-shrink-0">20</span>
                                Bank vs NBFC vs Housing Finance Company: Which Should You Choose?
                            </h3>
                            <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200 shadow-sm">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-[#2D3E50]/5">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Factor</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Banks</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">NBFCs</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Housing Finance Companies</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">Regulator</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">RBI</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">RBI</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">RBI (via National Housing Bank oversight)</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">Typical Interest Rates</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Generally lowest</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Slightly higher, faster approval</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Moderate, flexible on income proof</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">Processing Speed</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Moderate</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Fast</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Fast to moderate</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">Best For</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Salaried, strong credit profile</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Quick disbursal, flexible eligibility</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Self-employed, informal income</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">Documentation Flexibility</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Stricter</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Moderate</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 font-medium">Most flexible</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                There's no universally 'best' category — the right choice depends on your income type, credit history, and how quickly you need funds. This is precisely why Borrowww works across all three lender categories rather than pushing one type of institution: we match your specific profile to the lender most likely to approve you at the best available rate.
                            </p>
                        </div>
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

