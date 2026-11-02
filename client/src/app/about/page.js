import AboutClient from './AboutClient';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'About Borrowww | Loan Consultant & Free Credit Check',
  description:
    'Borrowww is a loan consultancy run by Premier Penny. We help you compare and apply for loans from RBI-regulated banks and NBFCs.',
  path: '/about',
});

export default function AboutPage() {
  return <AboutClient />;
}
