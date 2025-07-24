import FAQSection from '@/components/FAQSection';
import FeaturesSection from '@/components/FeaturesSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ValuesSection from '@/components/ValuesSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <ValuesSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
