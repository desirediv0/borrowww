// import CibilCheckSection from '@/components/CibilCheckSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import LoanCalculator from '@/components/LoanCalculator';
// import Loans from '@/components/Loans';
import LogoSlider from '@/components/LogoSlider';
import ValuesSection from '@/components/ValuesSection';
import HomeLoanSections from '@/components/home-loan-sections';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <LogoSlider />
      {/* <CibilCheckSection /> */}
      {/* <Loans /> */}
      <HomeLoanSections />
      <ValuesSection />
      <LoanCalculator />
      <FAQSection />
      <Footer />
    </main>
  );
}
