import CibilCheckSection from '@/components/CibilCheckSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import LoanCalculator from '@/components/LoanCalculator';
import LogoSlider from '@/components/LogoSlider';
import ValuesSection from '@/components/ValuesSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <CibilCheckSection />
      <LogoSlider />
      <ValuesSection />
      <LoanCalculator />
      <FAQSection />
      <Footer />
    </main>
  );
}
