'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    Phone,
    Mail,
    User,
    ArrowRight,
    CheckCircle,
    Loader2,
    Gift,
    Heart
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { isValidIndianNumber } from '@/utils/validation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://borrowww.com/api';

export default function ReferralPage() {
    const [formData, setFormData] = useState({
        referrerName: '',
        referrerPhone: '',
        referrerEmail: '',
        refereeName: '',
        refereePhone: '',
        refereeEmail: '',
        relationship: '',
        loanType: '',
        remarks: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});

    // Validation function
    const validateForm = () => {
        const newErrors = {};

        // Referrer name validation
        if (!formData.referrerName.trim()) {
            newErrors.referrerName = 'Please enter your name';
        } else if (!/^[a-zA-Z\s]+$/.test(formData.referrerName.trim())) {
            newErrors.referrerName = 'Name should contain only letters';
        }

        // Referrer phone validation
        if (!formData.referrerPhone.trim()) {
            newErrors.referrerPhone = 'Please enter mobile number';
        } else if (!isValidIndianNumber(formData.referrerPhone)) {
            newErrors.referrerPhone = 'Please enter a valid mobile number';
        }

        // Referee name validation
        if (!formData.refereeName.trim()) {
            newErrors.refereeName = 'Please enter friend\'s name';
        } else if (!/^[a-zA-Z\s]+$/.test(formData.refereeName.trim())) {
            newErrors.refereeName = 'Name should contain only letters';
        }

        // Referee phone validation
        if (!formData.refereePhone.trim()) {
            newErrors.refereePhone = 'Please enter friend\'s mobile';
        } else if (!isValidIndianNumber(formData.refereePhone)) {
            newErrors.refereePhone = 'Please enter a valid mobile number';
        }

        // Email validation (optional but if provided, must be valid)
        if (formData.referrerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.referrerEmail)) {
            newErrors.referrerEmail = 'Enter valid email';
        }
        if (formData.refereeEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.refereeEmail)) {
            newErrors.refereeEmail = 'Enter valid email';
        }

        setFieldErrors(newErrors);
        setFieldErrors(newErrors);
        return newErrors;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Apply regex filters
        let filteredValue = value;
        if (name === 'referrerName' || name === 'refereeName') {
            filteredValue = value.replace(/[^a-zA-Z\s]/g, '');
        } else if (name === 'referrerPhone' || name === 'refereePhone') {
            filteredValue = value.replace(/\D/g, '');
        }

        setFormData(prev => ({ ...prev, [name]: filteredValue }));

        // Clear field error on change
        if (fieldErrors[name]) {
            setFieldErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate before submitting
        // Validate before submitting
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            toast.error(Object.values(formErrors)[0]);
            return;
        }

        setLoading(true);
        try {
            // Call server API directly
            const response = await fetch(`${API_URL}/referrals`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                setFormData({
                    referrerName: '',
                    referrerPhone: '',
                    referrerEmail: '',
                    refereeName: '',
                    refereePhone: '',
                    refereeEmail: '',
                    relationship: '',
                    loanType: '',
                    remarks: '',
                });
                setFieldErrors({});
            } else {
                setError(data.error || 'Failed to submit. Please try again.');
            }
        } catch (err) {
            setError('Failed to submit. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const relationships = ['Friend', 'Family', 'Colleague', 'Neighbor', 'Business Partner', 'Other'];
    const loanTypes = ['Home Loan', 'Loan Against Property', 'Personal Loan', 'Business Loan', 'Other'];

    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-[#3A6EA5]/10 flex items-center justify-center py-12 px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center"
                >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h2>
                    <p className="text-gray-600 mb-6">
                        Your referral has been submitted successfully. Our team will contact your friend soon!
                    </p>
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => setSuccess(false)}
                            className="w-full py-3 bg-gradient-to-r from-[#2D3E50] to-[#3A6EA5] text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
                        >
                            Refer Another Friend
                        </button>
                        <a
                            href="/"
                            className="text-[#3A6EA5] hover:underline font-medium"
                        >
                            Back to Home
                        </a>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-[#3A6EA5]/10 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#2D3E50] to-[#3A6EA5] rounded-2xl mb-4">
                        <Gift className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Refer a Friend
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Know someone who needs a loan? Refer them to us and help them get the best financial assistance!
                    </p>
                </motion.div>

                {/* Benefits */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid md:grid-cols-3 gap-4 mb-10"
                >
                    {[
                        { icon: Users, title: 'Help Your Friends', desc: 'Connect them with best loan options' },
                        { icon: Heart, title: 'Quick Processing', desc: 'Priority handling for referrals' },
                        { icon: CheckCircle, title: 'Expert Guidance', desc: 'Personal loan advisor support' },
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 text-center">
                            <div className="w-12 h-12 bg-[#3A6EA5]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                                <item.icon className="h-6 w-6 text-[#3A6EA5]" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-100"
                >
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Your Details */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <User className="h-5 w-5 text-[#3A6EA5]" />
                                Your Details
                            </h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="referrerName"
                                        value={formData.referrerName}
                                        onChange={handleInputChange}
                                        required
                                        className={`w-full px-4 py-3 border ${fieldErrors.referrerName ? 'border-red-500 bg-red-50' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[#2D3E50] focus:border-transparent`}
                                        placeholder="Enter your name"
                                    />
                                    {fieldErrors.referrerName && <p className="text-red-500 text-xs mt-1">{fieldErrors.referrerName}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Your Phone *
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="tel"
                                            name="referrerPhone"
                                            value={formData.referrerPhone}
                                            onChange={handleInputChange}
                                            required
                                            maxLength={10}
                                            className={`w-full px-4 py-3 pl-10 border ${fieldErrors.referrerPhone ? 'border-red-500 bg-red-50' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[#2D3E50] focus:border-transparent`}
                                            placeholder="Enter 10 digits number"
                                        />
                                    </div>
                                    {fieldErrors.referrerPhone && <p className="text-red-500 text-xs mt-1">{fieldErrors.referrerPhone}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Your Email (Optional)
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="email"
                                            name="referrerEmail"
                                            value={formData.referrerEmail}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 pl-10 border ${fieldErrors.referrerEmail ? 'border-red-500 bg-red-50' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[#2D3E50] focus:border-transparent`}
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    {fieldErrors.referrerEmail && <p className="text-red-500 text-xs mt-1">{fieldErrors.referrerEmail}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Friend's Details */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Users className="h-5 w-5 text-[#3A6EA5]" />
                                Friend&apos;s Details
                            </h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Friend&apos;s Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="refereeName"
                                        value={formData.refereeName}
                                        onChange={handleInputChange}
                                        required
                                        className={`w-full px-4 py-3 border ${fieldErrors.refereeName ? 'border-red-500 bg-red-50' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[#2D3E50] focus:border-transparent`}
                                        placeholder="Enter your friend's name"
                                    />
                                    {fieldErrors.refereeName && <p className="text-red-500 text-xs mt-1">{fieldErrors.refereeName}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Friend&apos;s Phone *
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="tel"
                                            name="refereePhone"
                                            value={formData.refereePhone}
                                            onChange={handleInputChange}
                                            required
                                            maxLength={10}
                                            className={`w-full px-4 py-3 pl-10 border ${fieldErrors.refereePhone ? 'border-red-500 bg-red-50' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[#2D3E50] focus:border-transparent`}
                                            placeholder="Enter 10 digits number"
                                        />
                                    </div>
                                    {fieldErrors.refereePhone && <p className="text-red-500 text-xs mt-1">{fieldErrors.refereePhone}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Friend&apos;s Email (Optional)
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="email"
                                            name="refereeEmail"
                                            value={formData.refereeEmail}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 pl-10 border ${fieldErrors.refereeEmail ? 'border-red-500 bg-red-50' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[#2D3E50] focus:border-transparent`}
                                            placeholder="Enter your friend's email"
                                        />
                                    </div>
                                    {fieldErrors.refereeEmail && <p className="text-red-500 text-xs mt-1">{fieldErrors.refereeEmail}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Additional Details */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Relationship
                                </label>
                                <Select
                                    value={formData.relationship}
                                    onValueChange={(value) => handleInputChange({ target: { name: 'relationship', value } })}
                                >
                                    <SelectTrigger className="w-full h-[50px] rounded-xl border-gray-200 focus:ring-2 focus:ring-[#2D3E50]">
                                        <SelectValue placeholder="Select relationship" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        {relationships.map(r => (
                                            <SelectItem key={r} value={r}>{r}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Loan Type Interested In
                                </label>
                                <Select
                                    value={formData.loanType}
                                    onValueChange={(value) => handleInputChange({ target: { name: 'loanType', value } })}
                                >
                                    <SelectTrigger className="w-full h-[50px] rounded-xl border-gray-200 focus:ring-2 focus:ring-[#2D3E50]">
                                        <SelectValue placeholder="Select loan type" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        {loanTypes.map(l => (
                                            <SelectItem key={l} value={l}>{l}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Remarks */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Additional Remarks
                            </label>
                            <textarea
                                name="remarks"
                                value={formData.remarks}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2D3E50] focus:border-transparent resize-none"
                                placeholder="Any additional information about your friend's loan requirements..."
                            />
                        </div>

                        {error && (
                            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-gradient-to-r from-[#2D3E50] to-[#3A6EA5] text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <>
                                    Submit Referral
                                    <ArrowRight className="h-5 w-5" />
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
