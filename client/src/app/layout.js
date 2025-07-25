import { Inter } from 'next/font/google';

import { Toaster } from '@/components/ui/sonner';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Borrowww - CIBIL Check & Instant Loan Provider',
  description:
    'Get your CIBIL score checked instantly and apply for personal loans, home loans, business loans, and more. Quick approval, competitive rates, and transparent process.',
  keywords:
    'CIBIL check, credit score, personal loan, home loan, business loan, instant loan, loan approval, credit report',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 overflow-x-hidden`}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
