import FaqClient from './FaqClient';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Frequently Asked Questions | Borrowww',
  description:
    'Answers to common questions about CIBIL score checks, loan eligibility, required documents, EMIs, charges, and the Borrowww loan process.',
  path: '/faq',
  keywords: [
    'loan FAQ',
    'CIBIL score questions',
    'home loan eligibility questions',
    'loan documents required',
    'EMI questions',
  ],
});

export default function FAQPage() {
  return <FaqClient />;
}
