// import Calculator from '@/components/Calculator';
import ConcernsSection from '@/components/ConcernsSection';
import FAQSection from '@/components/FAQSection';
import HeroSection from '@/components/HeroSection';
// import LogoSlider from '@/components/LogoSlider';
import LoanToolsSection from '@/components/LoanToolsSection';
import TransparencySection from '@/components/TransparencySection';
import ValuesSection from '@/components/ValuesSection';
import { buildMetadata } from '@/lib/seo';
import PartnerBanks from '@/components/PartnerBanks';
import LoanGuidesSection from '@/components/category/LoanGuidesSection';

// import VideoSection from '@/components/VideoSection';

// import HomeLoanSections from '@/components/home-loan-sections';

// Note: This implementation was requested by client despite being non-compliant with DPDP Act.

export const metadata = buildMetadata({
  title: 'Compare Home Loans & Loan Against Property | Borrowww',
  description:
    'Compare home loan and loan against property offers from RBI-regulated banks and NBFCs. Check your credit score for free and get an advisor to help you apply.',
  path: '/',
  keywords: [
    'Borrowww',
    'credit check',
    'home loan',
    'loan comparison',
    'EMI calculator',
    'loan advisor',
    'business loans',
  ],
});

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <HeroSection />
      <PartnerBanks />
      <ConcernsSection />
      {/* <VideoSection /> */}
      <TransparencySection />
      {/* <PropertyCheckSection /> */}
      <LoanToolsSection />
      {/* <LogoSlider /> */}

      {/* <HomeLoanSections /> */}
      <ValuesSection />
      <LoanGuidesSection />
      {/* <Calculator /> */}
      <FAQSection />
    </main>
  );
}
