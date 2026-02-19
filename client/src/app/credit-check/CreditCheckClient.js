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
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { Loader2, AlertCircle, FileText } from 'lucide-react';
import ScoreGauge from '@/components/ScoreGauge';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ChartLineLabel from '@/components/ChartLineLabel';
import { Skeleton } from "@/components/ui/skeleton";


function CIBILCheckContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();

    // Form State
    const [FormData, setFormData] = useState({
        firstName: '',
        mobileNumber: '',
        consent: false,
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

    // Report State
    const [report, setReport] = useState(null);
    const [loadingReport, setLoadingReport] = useState(true);
    const [fetchingReport, setFetchingReport] = useState(false);
    const [reportError, setReportError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    const transactionId = searchParams.get('transaction_id');
    const fetchedRef = useRef(false);

    useEffect(() => {
        if (authLoading) return;
        if (transactionId) {
            if (!fetchedRef.current) {
                fetchedRef.current = true;
                fetchReportWithRetry(transactionId);
            }
        }
        else if (user && !transactionId) {
            checkCache();
        }
        else {
            setLoadingReport(false);
        }

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
    }, [searchParams, transactionId, authLoading, user]);

    const fetchReportWithRetry = async (txnId) => {
        setFetchingReport(true);
        setReportError(null);
        let attempts = 0;
        const maxAttempts = 5;

        const tryFetch = async () => {
            try {
                attempts++;
                setRetryCount(attempts);

                const res = await api.post('/credit-report/fetch', { transactionId: txnId });

                if (res.data?.status === 'PROCESSING') {
                    return { shouldRetry: true };
                }

                if (res.data) {
                    setReport(res.data);
                    toast.success("CIBIL report generated successfully");
                    setFetchingReport(false);
                    // Clear param
                    router.replace('/credit-check');
                    return { success: true };
                }
            } catch (error) {
                console.error(`Attempt ${attempts} failed:`, error);
                const status = error.response?.status;

                if (status === 401) {
                    toast.error("Session expired. Please login again.");
                    router.push('/auth?logout=true');
                    return { stop: true };
                }

                if (status && [400, 404, 500].includes(status)) {
                    setReportError("Something went wrong. Please try again.");
                    setFetchingReport(false);
                    return { stop: true };
                }

                return { shouldRetry: true };
            }
            return { shouldRetry: true };
        };
        for (let i = 0; i < maxAttempts; i++) {
            const result = await tryFetch();

            if (result.success) return;
            if (result.stop) return;

            if (i < maxAttempts - 1) {
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        }

        setFetchingReport(false);
        setReportError("Something went wrong. Please try again.");
    };

    const checkCache = async () => {
        try {
            const res = await api.get('/credit-report/check-cache');

            if (res.data.cached) {
                const fullRes = await api.get('/credit-report/my-report');
                setReport(fullRes.data);
            }
        } catch (err) {
            console.error(err);
            if (err.response?.status === 401) {
                toast.error("Session expired. Please login again.");
                router.push('/auth?logout=true');
            }
        } finally {
            setLoadingReport(false);
        }
    };

    const handleDownloadPdf = async () => {
        if (isDownloadingPdf) return;
        setIsDownloadingPdf(true);

        try {
            const res = await api.get('/credit-report/pdf');
            if (res.data.success && res.data.url) {
                window.open(res.data.url, '_blank');
            } else if (res.data.status === 'PROCESSING') {
                toast.info("PDF is being generated. Please try again in a moment.");
            } else {
                toast.error("PDF not available");
            }
        } catch (err) {
            console.error("PDF Download Error:", err);
            if (err.response?.status === 401) {
                toast.error("Session expired. Please login again.");
                router.push('/auth?logout=true');
            } else if (err.response?.status === 404) {
                toast.error("Report not found");
            } else {
                toast.error("Failed to download PDF");
            }
        } finally {
            setIsDownloadingPdf(false);
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

        if (!user) {
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
            api.post('/client/credit-check', FormData)
                .catch(err => console.error("Lead save failed", err));

            // Start Session
            const sessionPayload = {
                firstName: FormData.firstName,
                mobileNumber: FormData.mobileNumber
            };

            const res = await api.post('/credit-report/session', sessionPayload);

            if (res.data.success && res.data.redirect_url) {
                toast.success("Redirecting to verification...");
                window.location.href = res.data.redirect_url;
            } else {
                toast.error("Failed to start session. Please try again.");
                setIsSubmitting(false);
            }

        } catch (error) {
            console.error('Session Error:', error);

            // Handle 401 (Invalid/Stale Token)
            if (error.response?.status === 401) {
                toast.error("Session expired. Please login again.");
                router.push('/auth?logout=true');
                return;
            }

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



    // 1. Loading / Fetching
    if (authLoading || loadingReport || fetchingReport) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex flex-col items-center space-y-4">
                        <Skeleton className="h-16 w-16 rounded-full" />
                        <Skeleton className="h-6 w-48 rounded-lg" />
                    </div>
                    <div className="space-y-3">
                        <Skeleton className="h-4 w-full rounded" />
                        <Skeleton className="h-4 w-5/6 rounded" />
                        <Skeleton className="h-4 w-4/6 rounded" />
                    </div>
                    {fetchingReport && (
                        <div className="pt-2 flex justify-center">
                            <div className="text-xs font-medium text-[var(--primary-blue)] bg-blue-50 px-3 py-1 rounded-full">
                                Processing...
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // 2. Report Display
    if (report) {
        const { creditScore, totalAccounts, activeAccounts, expiresAt, fullReport, history } = report;
        const accounts = fullReport?.credit_report?.CCRResponse?.CIRReportDataLst?.[0]?.CIRReportData?.RetailAccountDetails || [];
        const personalInfo = fullReport?.credit_report?.CCRResponse?.CIRReportDataLst?.[0]?.CIRReportData?.IDAndContactInfo?.PersonalInfo || {};

        return (
            <div className="min-h-screen bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Your Credit Report</h1>
                            <p className="text-sm text-gray-500 mt-1">
                                Generated on {new Date().toLocaleDateString()}
                                {expiresAt && ` • Valid until ${new Date(expiresAt).toLocaleDateString()}`}
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            onClick={handleDownloadPdf}
                            disabled={isDownloadingPdf}
                            className="w-full md:w-auto mt-4 md:mt-0 shadow-sm border-gray-200"
                        >
                            {isDownloadingPdf ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                                </>
                            ) : (
                                <>
                                    <FileText className="mr-2 h-4 w-4" /> Download Official PDF
                                </>
                            )}
                        </Button>
                    </div>

                    <Tabs defaultValue="overview" className="mt-4 space-y-6">
                        <TabsList className="bg-white p-1 rounded-xl border border-gray-200 w-full md:w-auto justify-start overflow-x-auto shadow-sm">
                            <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-[var(--primary-blue)] data-[state=active]:text-white px-4 py-2">Overview</TabsTrigger>
                            <TabsTrigger value="personal" className="rounded-lg data-[state=active]:bg-[var(--primary-blue)] data-[state=active]:text-white px-4 py-2">Personal Info</TabsTrigger>
                        </TabsList>

                        {/* Overview Tab */}
                        <TabsContent value="overview" className="space-y-6">
                            <div className="grid grid-cols-12 gap-6">
                                {/* Left Column: Chart (8 cols) */}
                                <div className="col-span-12 lg:col-span-8 flex flex-col h-full">
                                    <Card className="border-none shadow-sm rounded-2xl bg-white h-full flex flex-col">
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                                <FaChartLine className="h-5 w-5 text-[var(--primary-blue)]" />
                                                Score History
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex-1 min-h-[320px] md:min-h-[340px] p-4">
                                            <div className="h-[320px] md:h-[340px] w-full">
                                                <ChartLineLabel history={history || []} />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Right Column: Score + Stats (4 cols) */}
                                <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                                    {/* Score Gauge */}
                                    <Card className="border-none shadow-sm rounded-2xl bg-white p-6 flex flex-col items-center justify-center">
                                        <div className="mb-6 mt-2 transform scale-105">
                                            <ScoreGauge score={creditScore || 300} />
                                        </div>
                                    </Card>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                                        {[
                                            { label: 'Total Accounts', value: totalAccounts, color: 'text-gray-900', icon: FaChartLine },
                                            { label: 'Active Accounts', value: activeAccounts, color: 'text-[var(--primary-blue)]', icon: FaCheckCircle },
                                        ].map((stat, idx) => (
                                            <Card key={idx} className="border-none shadow-sm rounded-2xl bg-white hover:shadow-md transition-shadow">
                                                <CardContent className="flex items-center p-5 gap-4">
                                                    <div className={`p-3 rounded-full ${idx === 1 ? 'bg-blue-50 text-[var(--primary-blue)]' : 'bg-gray-100 text-gray-600'}`}>
                                                        <stat.icon className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{stat.label}</p>
                                                        <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </TabsContent>



                        {/* Personal Info Tab */}
                        <TabsContent value="personal">
                            <Card className="mt-6 border-none shadow-sm rounded-2xl bg-white">
                                <CardHeader className="border-b border-gray-100 pb-4">
                                    <CardTitle>Personal Information</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {[
                                            { label: 'Full Name', value: personalInfo?.Name?.FullName || report.name },
                                            { label: 'PAN Number', value: report.pan },
                                            { label: 'Mobile Number', value: report.mobile },
                                            { label: 'Date of Birth', value: personalInfo?.DateOfBirth },
                                            { label: 'Gender', value: personalInfo?.Gender },
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex flex-col">
                                                <p className="text-sm font-medium text-gray-500 mb-1">{item.label}</p>
                                                <p className="text-gray-900 font-semibold text-lg border-b border-gray-100 pb-2">{item.value || 'N/A'}</p>
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
