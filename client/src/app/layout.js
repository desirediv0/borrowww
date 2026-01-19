import FloatingContactButton from '@/components/FloatingContactButton';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LenisProvider from '@/components/LenisProvider';
import CookieConsent from '@/components/CookieConsent';
import PageTracker from '@/components/PageTracker';
import { Toaster } from '@/components/ui/sonner';

import './globals.css';

export const metadata = {
  title: 'Borrowww - Credit Check & Instant Loan Provider',
  description:
    'Get your credit score checked instantly and apply for personal loans, home loans, business loans, and more. Quick approval, competitive rates, and transparent process.',
  keywords:
    'CIBIL check, credit score, personal loan, home loan, business loan, instant loan, loan approval, credit report',
};

// Note: This implementation was requested by client despite being non-compliant with DPDP Act.

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`overflow-x-hidden`}>
        <LenisProvider />
        <Header />
        <PageTracker />
        {children}
        <Footer />
        <FloatingContactButton />
        <CookieConsent />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
