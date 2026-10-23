import FloatingContactButton from '@/components/FloatingContactButton';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LenisProvider from '@/components/LenisProvider';
import CookieConsent from '@/components/CookieConsent';
import PageTracker from '@/components/PageTracker';
import { Toaster } from '@/components/ui/sonner';
import Providers from '@/components/Providers';
import { buildMetadata, companyInfo, organizationSchema } from '@/lib/seo';

import './globals.css';
import Script from 'next/script';

// Site-wide defaults. The canonical is left out on purpose: set here, every page
// without its own canonical would point Google at the homepage. Each page sets
// its own canonical through buildMetadata({ path }).
const { alternates: _homepageCanonical, ...siteDefaults } = buildMetadata({
  title: 'Borrowww - Credit Check & Instant Loan Provider',
  description:
    'Get your credit score checked instantly and apply for personal loans, home loans, business loans, and more with a transparent, guided process.',
  path: '/',
  keywords: [
    'CIBIL check',
    'credit score',
    'personal loan',
    'home loan',
    'business loan',
    'instant loan',
    'loan approval',
    'credit report',
  ],
});

export const metadata = {
  metadataBase: new URL(companyInfo.siteUrl),
  title: {
    default: 'Borrowww - Credit Check & Instant Loan Provider',
    template: '%s | Borrowww',
  },
  applicationName: 'Borrowww',
  category: 'Finance',
  authors: [{ name: 'Borrowww' }],
  creator: 'Borrowww',
  publisher: 'Borrowww',
  ...siteDefaults,
};

// Note: This implementation was requested by client despite being non-compliant with DPDP Act.


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`overflow-x-hidden`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-BPE9276VQP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-BPE9276VQP');
          `}
        </Script>
        <Providers>
          <LenisProvider />
          <Header />
          <PageTracker />
          {children}
          <Footer />
          <FloatingContactButton />
          <CookieConsent />
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
