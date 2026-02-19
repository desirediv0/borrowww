'use client';

import { Suspense, useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    FaCalendarAlt,
    FaChartLine,
    FaCheckCircle,
    FaLock,
    FaShieldAlt,
    FaUser,
} from 'react-icons/fa';

import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { isValidIndianNumber } from '@/utils/validation';
import { toast } from 'sonner';
import axios from 'axios';
import { Loader2, AlertCircle, FileText } from 'lucide-react';
import ScoreGauge from '@/components/ScoreGauge';
import AccountCard from '@/components/AccountCard';
import PaymentHistory from '@/components/PaymentHistory';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

function CIBILCheckContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // Form State
    const [FormData, setFormData] = useState({
        firstName: '',
        mobileNumber: '',
        consent: false,
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Report State
    const [report, setReport] = useState(null);
    const [loadingReport, setLoadingReport] = useState(true);
    const [fetchingReport, setFetchingReport] = useState(false);
    const [reportError, setReportError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    const transactionId = searchParams.get('transaction_id');
    const fetchedRef = useRef(false);

    // Initial Load & Auth Check
    useEffect(() => {
        const token = localStorage.getItem('user_token');

        // 1. Handle Transaction Callback (Priority)
        if (transactionId) {
            if (!fetchedRef.current) {
                fetchedRef.current = true;
                fetchReportWithRetry(transactionId);
            }
        }
        // 2. Check Cache if logged in (Fallback)
        else if (token) {
            checkCache();
        }
        // 3. Default (Show Form)
        else {
            setLoadingReport(false);
        }

        // Handle URL Data (Redirect from Auth)
        const encodedData = searchParams.get('data');
        if (encodedData) {
            try {
                const decodedData = JSON.parse(atob(encodedData));
                setFormData((prev) => ({
                    ...prev,
                    firstName: decodedData.firstName || '',
                    mobileNumber: decodedData.mobileNumber || '',
                    consent: decodedData.consent || false,
                }));
                window.history.replaceState({}, '', '/credit-check');
            } catch (e) {
                console.error('Failed to decode form data:', e);
            }
        }
    }, [searchParams, transactionId]);

    const fetchReportWithRetry = async (txnId) => {
        setFetchingReport(true);
        setReportError(null);
        let attempts = 0;
        const maxAttempts = 5;

        const tryFetch = async () => {
            const token = localStorage.getItem('user_token');
            // If no token, we might need to handle it? 
            // Assume user is logged in if they have txnId or session cookie persists.
            // But for robustness, check token. 
            // If redirect from DeepVue happens, token should be in localStorage.
            const headers = token ? { Authorization: `Bearer ${token}` } : {};

            try {
                attempts++;
                setRetryCount(attempts);

                const res = await axios.post(
                    `${API_URL}/credit-report/fetch`,
                    { transactionId: txnId },
                    { withCredentials: true, headers }
                );

                if (res.data) {
                    setReport(res.data);
                    toast.success("CIBIL report generated successfully");
                    setFetchingReport(false);
                    // Clear param
                    router.replace('/credit-check');
                    return true;
                }
            } catch (error) {
                console.error(`Attempt ${attempts} failed:`, error);
                // Continue retry mechanism
                return false;
            }
            return false;
        };

        // Retry Loop
        for (let i = 0; i < maxAttempts; i++) {
            const success = await tryFetch();
            if (success) return;
            // Wait 5 seconds before next retry if not last attempt
            if (i < maxAttempts - 1) {
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        }

        // Final Failure
        setFetchingReport(false);
        setReportError("We are processing your report with the bureau. It may take a few more minutes. Please check back later.");
    };

    const checkCache = async () => {
        try {
            const token = localStorage.getItem('user_token');
            const headers = { Authorization: `Bearer ${token}` };

            const res = await axios.get(`${API_URL}/credit-report/check-cache`, { withCredentials: true, headers });

            if (res.data.cached) {
                const fullRes = await axios.get(`${API_URL}/credit-report/my-report`, { withCredentials: true, headers });
                setReport(fullRes.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingReport(false);
        }
    };

    const handleDownloadPdf = async () => {
        try {
            const token = localStorage.getItem('user_token');
            const headers = { Authorization: `Bearer ${token}` };

            const res = await axios.get(`${API_URL}/credit-report/pdf`, { withCredentials: true, headers });
            if (res.data.pdfSpacesUrl) {
                window.open(res.data.pdfSpacesUrl, '_blank');
            } else {
                toast.error("PDF not available yet");
            }
        } catch (err) {
            toast.error("Failed to download PDF");
        }
    };

    const validateBureauForm = () => {
        const newErrors = {};
        if (!FormData.firstName.trim()) {
            newErrors.firstName = 'Please enter your name';
        } else if (!/^[a-zA-Z\s]+$/.test(FormData.firstName.trim())) {
            newErrors.firstName = 'Name should contain only letters';
        }

        if (!FormData.mobileNumber.trim()) {
            newErrors.mobileNumber = 'Please enter mobile number';
        } else if (!isValidIndianNumber(FormData.mobileNumber)) {
            newErrors.mobileNumber = 'Please enter a valid mobile number';
        }

        if (!FormData.consent) {
            newErrors.consent = 'You must agree to the terms';
        }

        setErrors(newErrors);
        return newErrors;
    };

    const handleInputChange = (field, value) => {
        let filteredValue = value;
        if (field === 'firstName') {
            filteredValue = value.replace(/[^a-zA-Z\s]/g, '');
        } else if (field === 'mobileNumber') {
            filteredValue = value.replace(/\D/g, '');
        }

        setFormData((prev) => ({ ...prev, [field]: filteredValue }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
    };

    const handleBureauSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateBureauForm();
        if (Object.keys(formErrors).length > 0) {
            toast.error(Object.values(formErrors)[0]);
            return;
        }

        const token = localStorage.getItem('user_token');
        if (!token) {
            const dataToSave = {
                firstName: FormData.firstName,
                mobileNumber: FormData.mobileNumber,
                consent: FormData.consent,
            };
            const encodedData = btoa(JSON.stringify(dataToSave));
            const redirectUrl = `/auth?redirect=${encodeURIComponent('/credit-check')}&data=${encodedData}`;
            toast.info('Please login to continue');
            router.push(redirectUrl);
            return;
        }

        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            // Background lead save
            fetch(`${API_URL}/client/credit-check`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(FormData),
            }).catch(err => console.error("Lead save failed", err));

            // Start Session
            const headers = { Authorization: `Bearer ${token}` };
            const sessionPayload = {
                firstName: FormData.firstName,
                mobileNumber: FormData.mobileNumber
            };

            const res = await axios.post(`${API_URL}/credit-report/session`, sessionPayload, { withCredentials: true, headers });

            if (res.data.success && res.data.redirect_url) {
                toast.success("Redirecting to verification...");
                window.location.href = res.data.redirect_url;
            } else {
                toast.error("Failed to start session. Please try again.");
                setIsSubmitting(false);
            }

        } catch (error) {
            console.error('Session Error:', error);
            const errorMsg = error.response?.data?.message || "Failed to start verification.";
            toast.error(errorMsg);
            setIsSubmitting(false);
        }
    };

    // UI Variables
    const factors = [
        { factor: 'Payment History', impact: '35%', description: 'Timely payment of EMIs and credit card bills', icon: FaCheckCircle },
        { factor: 'Credit Utilization', impact: '30%', description: 'How much of your available credit you use', icon: FaChartLine },
        { factor: 'Credit History Length', impact: '15%', description: 'How long you have been using credit', icon: FaCalendarAlt },
        { factor: 'Credit Mix', impact: '10%', description: 'Types of credit accounts you have', icon: FaShieldAlt },
        { factor: 'New Credit', impact: '10%', description: 'Recent credit inquiries and new accounts', icon: FaUser },
    ];

    const tips = [
        'Pay all your bills on time, every time',
        'Keep your credit utilization below 30%',
        "Don't close old credit accounts",
        'Limit new credit applications',
        'Monitor your credit report regularly',
        'Dispute any errors in your credit report',
    ];

    // --- RENDER STATES ---

    // 1. Loading / Fetching
    if (loadingReport || fetchingReport) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100 max-w-md w-full mx-4">
                    <Loader2 className="h-12 w-12 animate-spin text-[var(--primary-blue)] mx-auto mb-6" />
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        {fetchingReport ? "Generating Your Report..." : "Loading..."}
                    </h2>
                    <p className="text-gray-500 mb-4">
                        Please do not close this window.
                    </p>
                    {fetchingReport && (
                        <div className="text-sm text-[var(--primary-blue)] bg-blue-50 py-2 px-4 rounded-full inline-block">
                            Checking status (Attempt {retryCount}/5)...
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // 2. Report Display
    if (report) {
        const { creditScore, totalAccounts, totalBalance, activeAccounts, totalOverdue, expiresAt, fullReport } = report;
        const accounts = fullReport?.credit_report?.CCRResponse?.CIRReportDataLst?.[0]?.CIRReportData?.RetailAccountDetails || [];
        const personalInfo = fullReport?.credit_report?.CCRResponse?.CIRReportDataLst?.[0]?.CIRReportData?.IDAndContactInfo?.PersonalInfo || {};

        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Your Credit Report</h1>
                            <p className="text-sm text-gray-500 mt-1">
                                Generated on {new Date().toLocaleDateString()}
                                {expiresAt && ` • Valid until ${new Date(expiresAt).toLocaleDateString()}`}
                            </p>
                        </div>
                        <Button variant="outline" onClick={handleDownloadPdf} className="w-full md:w-auto">
                            <FileText className="mr-2 h-4 w-4" /> Download Official PDF
                        </Button>
                    </div>

                    <Tabs defaultValue="overview" className="space-y-6">
                        <TabsList className="bg-white p-1 rounded-xl border border-gray-200 w-full md:w-auto justify-start overflow-x-auto">
                            <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-[var(--primary-blue)] data-[state=active]:text-white">Overview</TabsTrigger>
                            <TabsTrigger value="accounts" className="rounded-lg data-[state=active]:bg-[var(--primary-blue)] data-[state=active]:text-white">Accounts ({accounts.length})</TabsTrigger>
                            <TabsTrigger value="personal" className="rounded-lg data-[state=active]:bg-[var(--primary-blue)] data-[state=active]:text-white">Personal Info</TabsTrigger>
                        </TabsList>

                        {/* Overview Tab */}
                        <TabsContent value="overview" className="space-y-8">
                            {/* Score Section */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Card className="col-span-1 md:col-start-2 border-none shadow-none bg-transparent">
                                    <div className="flex justify-center transform scale-100 md:scale-110 transition-transform duration-500">
                                        <ScoreGauge score={creditScore || 300} />
                                    </div>
                                </Card>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {[
                                    { label: 'Total Accounts', value: totalAccounts, color: 'text-gray-900' },
                                    { label: 'Active Accounts', value: activeAccounts, color: 'text-[var(--primary-blue)]' },
                                    { label: 'Total Balance', value: `₹${parseInt(totalBalance || 0).toLocaleString()}`, color: 'text-gray-900' },
                                    { label: 'Total Overdue', value: `₹${parseInt(totalOverdue || 0).toLocaleString()}`, color: 'text-red-600' },
                                ].map((stat, idx) => (
                                    <Card key={idx} className="hover:shadow-md transition-shadow">
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wide">{stat.label}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                        {/* Accounts Tab */}
                        <TabsContent value="accounts" className="space-y-4">
                            {accounts.length > 0 ? (
                                accounts.map((acc, idx) => (
                                    <div key={idx} className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
                                        <AccountCard account={acc} />
                                        <div className="mt-6 pt-6 border-t border-gray-100">
                                            <h4 className="text-xs font-semibold text-gray-500 mb-4 uppercase tracking-wider">Payment History (Last 48 Months)</h4>
                                            <PaymentHistory history={Array.isArray(acc.History48Months) ? acc.History48Months : []} />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                                    <p className="text-gray-500">No active accounts found in your report.</p>
                                </div>
                            )}
                        </TabsContent>

                        {/* Personal Info Tab */}
                        <TabsContent value="personal">
                            <Card className="border-none shadow-md">
                                <CardHeader>
                                    <CardTitle>Personal Information</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {[
                                            { label: 'Full Name', value: personalInfo?.Name?.FullName || report.name },
                                            { label: 'PAN Number', value: report.pan },
                                            { label: 'Mobile Number', value: report.mobile },
                                            { label: 'Date of Birth', value: personalInfo?.DateOfBirth },
                                            { label: 'Gender', value: personalInfo?.Gender },
                                        ].map((item, idx) => (
                                            <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                                                <p className="text-sm font-medium text-gray-500 mb-1">{item.label}</p>
                                                <p className="text-gray-900 font-semibold">{item.value || 'N/A'}</p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        );
    }

    // 3. Form Display (Default)
    return (
        <>
            {reportError && (
                <Alert variant="destructive" className="max-w-7xl mx-auto mt-4 mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Start Failed</AlertTitle>
                    <AlertDescription>{reportError}</AlertDescription>
                </Alert>
            )}

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-[var(--primary-blue-light)] py-12 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-8 md:mb-12"
                    >
                        <div className="inline-flex items-center px-4 py-2 bg-[var(--primary-blue)]/10 text-[var(--primary-blue)] rounded-full text-sm font-medium mb-6">
                            <FaShieldAlt className="mr-2" />
                            Free Credit Check
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 mb-6 tracking-tighter">
                            Check Your{' '}
                            <span className="text-[var(--primary-blue)] italic tiemposfine">Credit Score</span>
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
                            Get your free credit score instantly. No hidden charges, no credit card required.
                            Check your credit health and improve your loan eligibility.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Form Section */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-6 md:gap-8 md:grid-cols-2">
                        {/* Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-8">
                                <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                                    <FaLock className="text-white text-xl" />
                                </div>
                                <div>
                                    <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                                        Secure Credit Check
                                    </h2>
                                    <p className="text-gray-600 text-sm">
                                        Your data is protected with bank-level security
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleBureauSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName" className="text-sm font-medium">
                                            Full Name <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="firstName"
                                            placeholder="Enter Your Full Name"
                                            value={FormData.firstName}
                                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                                            disabled={isSubmitting}
                                            className={`rounded-md border border-gray-300 transition-all duration-200 bg-gray-50 focus:bg-white text-black placeholder:text-gray-500 h-12 disabled:opacity-50 disabled:cursor-not-allowed ${errors.firstName ? 'border-red-500' : ''}`}
                                        />
                                        {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="mobileNumber" className="text-sm font-medium">
                                            Mobile Number <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="mobileNumber"
                                            placeholder="Enter Your 10-digit Mobile Number"
                                            value={FormData.mobileNumber}
                                            onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                                            disabled={isSubmitting}
                                            className={`rounded-md border border-gray-300 transition-all duration-200 bg-gray-50 focus:bg-white text-black placeholder:text-gray-500 h-12 disabled:opacity-50 disabled:cursor-not-allowed ${errors.mobileNumber ? 'border-red-500' : ''}`}
                                            type="tel"
                                            maxLength="10"
                                        />
                                        {errors.mobileNumber && (
                                            <p className="text-red-500 text-xs">{errors.mobileNumber}</p>
                                        )}
                                    </div>

                                    <div className="flex items-start space-x-3 pt-4">
                                        <Checkbox
                                            id="consent"
                                            checked={FormData.consent}
                                            onCheckedChange={(checked) => handleInputChange('consent', checked)}
                                            disabled={isSubmitting}
                                            className={`mt-1 rounded border-gray-400 data-[state=checked]:bg-[var(--primary-blue)] data-[state=checked]:border-[var(--primary-blue)] disabled:opacity-50 disabled:cursor-not-allowed ${errors.consent ? 'border-red-500' : ''}`}
                                        />
                                        <div className="space-y-1">
                                            <Label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer text-gray-600">
                                                I agree, all information mentioned above is true and I authorize Borrowww to
                                                fetch my data.
                                            </Label>
                                            {errors.consent && <p className="text-red-500 text-xs">{errors.consent}</p>}
                                        </div>
                                    </div>

                                    <div className="pt-6">
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full md:w-auto px-12 py-6 bg-[var(--primary-blue)] hover:bg-[var(--primary-blue-dark)] text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
                                        >
                                            {isSubmitting ? (
                                                <div className="flex items-center">
                                                    <Loader2 className="animate-spin h-5 w-5 mr-3" />
                                                    Checking...
                                                </div>
                                            ) : (
                                                'Check My Score'
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </motion.div>

                        {/* Features */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 h-full">
                                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
                                    Why Check Credit Score?
                                </h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-1">
                                            <FaCheckCircle className="text-green-600 text-lg" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 text-lg">Free & Instant</h4>
                                            <p className="text-gray-600 text-sm mt-1">
                                                Get your score instantly without any charges.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-1">
                                            <FaLock className="text-[var(--primary-blue)] text-lg" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 text-lg">Secure & Private</h4>
                                            <p className="text-gray-600 text-sm mt-1">
                                                Bank-level encryption protects your personal data.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-1">
                                            <FaChartLine className="text-purple-600 text-lg" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 text-lg">Improve Score</h4>
                                            <p className="text-gray-600 text-sm mt-1">
                                                Get personalized tips to improve your credit score.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Score Factors */}
            <section className="py-8 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-6">
                            What Affects Your Credit Score?
                        </h2>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {factors.map((factor, index) => (
                            <motion.div
                                key={factor.factor}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group h-full"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 h-full flex flex-col"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                                            <factor.icon className="text-white text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">{factor.factor}</h3>
                                            <span className="text-[var(--primary-blue)] font-medium text-lg">
                                                {factor.impact}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed">{factor.description}</p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default function CreditCheckClient() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--primary-blue)]"></div>
                </div>
            }
        >
            <CIBILCheckContent />
        </Suspense>
    );
}
