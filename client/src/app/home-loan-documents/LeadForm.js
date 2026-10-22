'use client';

import { useState } from 'react';
import { MessageSquareMore } from 'lucide-react';
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

const EMPTY_FORM = {
    name: '',
    phone: '',
    city: '',
    propertyType: 'Residential',
    loanAmount: '',
    duration: '120',
    monthlyIncome: '',
    employmentType: 'Salaried',
    remarks: 'Home Loan Documents Verification Request',
};

export default function LeadForm() {
    const [form, setForm] = useState(EMPTY_FORM);
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
                setForm(EMPTY_FORM);
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
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl relative z-10">
            <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#2D3E50] to-[#3A6EA5] flex items-center justify-center text-white">
                    <MessageSquareMore className="h-5 w-5" />
                </div>
                <div>
                    <p className="text-xl font-semibold text-gray-900">Get your documents checked</p>
                    <p className="text-xs text-gray-500">Free check before you apply</p>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="hld-name" className="text-sm text-gray-600">Full Name <span className="text-red-500">*</span></label>
                    <input
                        id="hld-name"
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
                        <label htmlFor="hld-phone" className="text-sm text-gray-600">Mobile Number <span className="text-red-500">*</span></label>
                        <input
                            id="hld-phone"
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
                        <label htmlFor="hld-city" className="text-sm text-gray-600">City</label>
                        <input
                            id="hld-city"
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
                            <SelectTrigger aria-label="Property type" className="mt-1 w-full h-[50px] rounded-xl border-gray-200 bg-gray-50 focus:ring-2 focus:ring-[#2D3E50]">
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
                        <label htmlFor="hld-amount" className="text-sm text-gray-600">Approx. Loan Amount (₹)</label>
                        <input
                            id="hld-amount"
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
                            <SelectTrigger aria-label="Employment type" className="mt-1 w-full h-[50px] rounded-xl border-gray-200 bg-gray-50 focus:ring-2 focus:ring-[#2D3E50]">
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
                        <label htmlFor="hld-income" className="text-sm text-gray-600">Monthly Income (₹)</label>
                        <input
                            id="hld-income"
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
                    <label htmlFor="hld-remarks" className="text-sm text-gray-600">Remarks</label>
                    <input
                        id="hld-remarks"
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
                            Checking...
                        </>
                    ) : (
                        'Check My Documents'
                    )}
                </button>
                <p className="text-xs text-gray-500 text-center">
                    By continuing, you agree to our Terms & Privacy Policy.
                </p>
            </form>
        </div>
    );
}
