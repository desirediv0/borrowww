import AboutClient from './AboutClient';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'About Borrowww | Loan Advisory & Free Credit Check',
  description:
    'Borrowww is a loan advisory platform run by Premier Penny Ventures Private Limited. We help you compare and apply for loans from RBI-regulated banks and NBFCs.',
  path: '/about',
});

export default function AboutPage() {
  return <AboutClient />;
}
