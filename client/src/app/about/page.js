import AboutClient from './AboutClient';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'About Borrowww | India’s Trusted Loan & Credit Platform',
  description:
    'Discover Borrowww, backed by Premier Penny, delivering secure, fast and transparent loan solutions. Empowering financial inclusion with innovative and customer-first lending services.',
  path: '/about',
});

export default function AboutPage() {
  return <AboutClient />;
}
