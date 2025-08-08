import Calculator from '@/components/Calculator';
// import CibilCheckSection from '@/components/CibilCheckSection';
import FAQSection from '@/components/FAQSection';
import HeroSection from '@/components/HeroSection';
import LoanCalculator from '@/components/LoanCalculator';
// import Loans from '@/components/Loans';
import LogoSlider from '@/components/LogoSlider';
import ValuesSection from '@/components/ValuesSection';
import HomeLoanSections from '@/components/home-loan-sections';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <LogoSlider />
      {/* <CibilCheckSection /> */}
      {/* <Loans /> */}
      <HomeLoanSections />
      <ValuesSection />
        <Calculator />
      {/* <LoanCalculator /> */}
      <FAQSection />
    </main>
  );
}
