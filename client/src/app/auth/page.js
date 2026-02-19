'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Phone, Lock, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { isValidIndianNumber } from '@/utils/validation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
const RESEND_TIMER_SECONDS = 30;

function AuthPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [step, setStep] = useState('phone'); // 'phone' | 'otp' | 'success'
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [devOtp, setDevOtp] = useState('');
    const [resendTimer, setResendTimer] = useState(0);

    // Get redirect params from URL
    const redirectTo = searchParams.get('redirect') || '/profile';
    const redirectData = searchParams.get('data') || '';

    // Check for logout or existing session
    useEffect(() => {
        // If coming from a 401/logout flow, force clear everything
        if (searchParams.get('logout')) {
            localStorage.removeItem('user_token');
            localStorage.removeItem('user');
            localStorage.removeItem('borrowww_session_id');
            window.dispatchEvent(new Event('auth-change'));

            // Remove 'logout' param from URL without refreshing to avoid loops if they refresh
            const newParams = new URLSearchParams(searchParams);
            newParams.delete('logout');
            router.replace(`/auth?${newParams.toString()}`);
            return;
        }

        const token = localStorage.getItem('user_token');
        if (token) {
            // Redirect with data if present
            const finalUrl = redirectData
                ? `${redirectTo}?data=${redirectData}`
                : redirectTo;
            router.push(finalUrl);
        }
    }, [redirectTo, redirectData, router, searchParams]);

    // Resend timer countdown
    useEffect(() => {
        if (resendTimer > 0) {
            const interval = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [resendTimer]);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError('');

        if (!phoneNumber || !isValidIndianNumber(phoneNumber)) {
            setError('Please enter a valid mobile number');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/users/send-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber }),
            });

            const data = await response.json();

            if (response.ok) {
                // In dev mode, OTP might be returned
                if (data.data?.otp) {
                    setDevOtp(data.data.otp);
                }
                setStep('otp');
                setResendTimer(RESEND_TIMER_SECONDS); // Start resend timer
            } else {
                setError(data.message || 'Failed to send OTP');
            }
        } catch (err) {
            setError('Failed to send OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');

        if (!otp || otp.length !== 6) {
            setError('Please enter a valid 6-digit OTP');
            return;
        }

        setLoading(true);
        try {
            // Get sessionId from localStorage for session tracking
            const sessionId = localStorage.getItem('borrowww_session_id');

            const response = await fetch(`${API_URL}/users/verify-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber, otp, sessionId }),
            });

            const data = await response.json();

            if (response.ok && data.data?.token) {
                // Store token
                localStorage.setItem('user_token', data.data.token);
                localStorage.setItem('user', JSON.stringify(data.data.user));
                // Notify other components (Header) of auth change
                window.dispatchEvent(new Event('auth-change'));

                setStep('success');

                // Redirect after short delay to target page (with data if present)
                setTimeout(() => {
                    const finalUrl = redirectData
                        ? `${redirectTo}?data=${redirectData}`
                        : redirectTo;
                    router.push(finalUrl);
                }, 2000);
            } else {
                setError(data.message || 'Invalid OTP');
            }
        } catch (err) {
            setError('Failed to verify OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        if (resendTimer > 0) return;

        setError('');
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/users/retry-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber }),
            });

            const data = await response.json();

            if (response.ok) {
                if (data.data?.otp) {
                    setDevOtp(data.data.otp);
                }
                setError('');
                setResendTimer(RESEND_TIMER_SECONDS); // Reset timer
                // Show success toast/message
            } else {
                setError(data.message || 'Failed to resend OTP');
            }
        } catch (err) {
            setError('Failed to resend OTP');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-[#3A6EA5]/10 flex items-center justify-center py-12 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#2D3E50] to-[#3A6EA5] rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-2xl">B</span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Welcome to Borrowww</h1>
                        <p className="text-gray-600 mt-2">
                            {step === 'phone' && 'Login or Register with your mobile number'}
                            {step === 'otp' && 'Enter the OTP sent to your mobile'}
                            {step === 'success' && 'Successfully logged in!'}
                        </p>
                    </div>

                    {step === 'phone' && (
                        <form onSubmit={handleSendOtp} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Mobile Number
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Phone className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="tel"
                                        maxLength={10}
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                                        placeholder="Enter 10-digit mobile number"
                                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2D3E50] focus:border-transparent transition-all text-lg"
                                    />
                                </div>
                            </div>

                            {error && (
                                <p className="text-red-500 text-sm text-center">{error}</p>
                            )}

                            <button
                                type="submit"
                                disabled={loading || phoneNumber.length !== 10}
                                className="w-full py-4 bg-gradient-to-r from-[#2D3E50] to-[#3A6EA5] text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                            >
                                {loading ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <>
                                        Send OTP
                                        <ArrowRight className="h-5 w-5" />
                                    </>
                                )}
                            </button>
                        </form>
                    )}

                    {step === 'otp' && (
                        <form onSubmit={handleVerifyOtp} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Enter 6-digit OTP
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        maxLength={6}
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                        placeholder="Enter OTP"
                                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2D3E50] focus:border-transparent transition-all text-lg text-center tracking-widest"
                                    />
                                </div>
                                <p className="text-sm text-gray-500 mt-2 text-center">
                                    OTP sent to +91 {phoneNumber}
                                </p>

                                {/* Dev mode OTP display */}
                                {devOtp && (
                                    <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                        <p className="text-sm text-yellow-800 text-center">
                                            <strong>Dev Mode:</strong> Your OTP is <span className="font-mono font-bold">{devOtp}</span>
                                        </p>
                                    </div>
                                )}
                            </div>

                            {error && (
                                <p className="text-red-500 text-sm text-center">{error}</p>
                            )}

                            <button
                                type="submit"
                                disabled={loading || otp.length !== 6}
                                className="w-full py-4 bg-gradient-to-r from-[#2D3E50] to-[#3A6EA5] text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                            >
                                {loading ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <>
                                        Verify & Login
                                        <ArrowRight className="h-5 w-5" />
                                    </>
                                )}
                            </button>

                            <div className="flex items-center justify-between text-sm">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setStep('phone');
                                        setOtp('');
                                        setDevOtp('');
                                        setError('');
                                        setResendTimer(0);
                                    }}
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    Change Number
                                </button>
                                <button
                                    type="button"
                                    onClick={handleResendOtp}
                                    disabled={loading || resendTimer > 0}
                                    className="text-[#3A6EA5] hover:underline disabled:opacity-50 disabled:no-underline"
                                >
                                    {resendTimer > 0 ? (
                                        <span className="text-gray-500">Resend in {resendTimer}s</span>
                                    ) : (
                                        'Resend OTP'
                                    )}
                                </button>
                            </div>
                        </form>
                    )}

                    {step === 'success' && (
                        <div className="text-center py-8">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="h-10 w-10 text-green-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                Login Successful!
                            </h2>
                            <p className="text-gray-600">
                                Redirecting you to your profile...
                            </p>
                            <div className="mt-4">
                                <Loader2 className="h-6 w-6 animate-spin mx-auto text-[#3A6EA5]" />
                            </div>
                        </div>
                    )}
                </div>

                <p className="text-center text-sm text-gray-500 mt-6">
                    By continuing, you agree to our{' '}
                    <a href="/terms-of-service" className="text-[#3A6EA5] hover:underline">
                        Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="/privacy-policy" className="text-[#3A6EA5] hover:underline">
                        Privacy Policy
                    </a>
                </p>
            </motion.div>
        </div>
    );
}

// Wrap with Suspense for useSearchParams
export default function AuthPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#3A6EA5]"></div></div>}>
            <AuthPageContent />
        </Suspense>
    );
}
