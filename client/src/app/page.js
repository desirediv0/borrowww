// import Calculator from '@/components/Calculator';
import ConcernsSection from '@/components/ConcernsSection';
import FAQSection from '@/components/FAQSection';
import HeroSection from '@/components/HeroSection';
// import LogoSlider from '@/components/LogoSlider';
import LoanToolsSection from '@/components/LoanToolsSection';
import TransparencySection from '@/components/TransparencySection';
import ValuesSection from '@/components/ValuesSection';
import { buildMetadata } from '@/lib/seo';

// import VideoSection from '@/components/VideoSection';

// import HomeLoanSections from '@/components/home-loan-sections';

// Note: This implementation was requested by client despite being non-compliant with DPDP Act.

export const metadata = buildMetadata({
  title: 'Borrowww - Credit Check & Instant Loan Provider',
  description:
    'Check your credit score and explore home loan, balance transfer, EMI calculator, and loan comparison tools with Borrowww.',
  path: '/',
  keywords: [
    'Borrowww',
    'credit check',
    'home loan',
    'loan comparison',
    'EMI calculator',
  ],
});

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <HeroSection />
      <ConcernsSection />
      {/* <VideoSection /> */}
      <TransparencySection />
      {/* <PropertyCheckSection /> */}
      <LoanToolsSection />
      {/* <LogoSlider /> */}

      {/* <HomeLoanSections /> */}
      <ValuesSection />
      {/* <Calculator /> */}
      <FAQSection />
    </main>
  );
}
