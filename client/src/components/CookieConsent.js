'use client';

import { useState, useEffect } from 'react';
import { Cookie, X, Check } from 'lucide-react';

const CONSENT_KEY = 'borrowww_cookie_consent';
const SESSION_ID_KEY = 'borrowww_session_id';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://borrowww.com/api';

export default function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem(CONSENT_KEY);
        if (!consent) {
            const timer = setTimeout(() => {
                setShowBanner(true);
            }, 1200);
            return () => clearTimeout(timer);
        }
    }, []);

    const generateSessionId = () => {
        return 'sess_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    };

    const handleAccept = async () => {
        const sessionId = generateSessionId();
        localStorage.setItem(CONSENT_KEY, 'accepted');
        localStorage.setItem(SESSION_ID_KEY, sessionId);
        setShowBanner(false);

        try {
            await fetch(`${API_URL}/sessions/anon`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionId,
                    currentPage: window.location.pathname,
                    referrer: document.referrer || null,
                    trackingConsent: 'accepted',
                }),
            });
        } catch (error) {
            console.error('Error starting tracking:', error);
        }
    };

    const handleReject = () => {
        localStorage.setItem(CONSENT_KEY, 'rejected');
        localStorage.removeItem(SESSION_ID_KEY);
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom-10 duration-500">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                <div className="p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#2D3E50] to-[#3A6EA5] rounded-xl flex items-center justify-center">
                            <Cookie className="h-6 w-6 text-white" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            We value your privacy
                        </h3>
                        <p className="text-gray-600 text-sm">
                            We use cookies to enhance your browsing experience and analyze site traffic.
                            By clicking &quot;Accept&quot;, you consent to our use of cookies for analytics purposes.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button
                            onClick={handleReject}
                            className="flex-1 md:flex-none px-6 py-3 text-gray-700 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                        >
                            <X className="h-4 w-4" />
                            Reject
                        </button>
                        <button
                            onClick={handleAccept}
                            className="flex-1 md:flex-none px-6 py-3 text-white bg-gradient-to-r from-[#2D3E50] to-[#3A6EA5] rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                        >
                            <Check className="h-4 w-4" />
                            Accept
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
