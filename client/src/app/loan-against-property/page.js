import LAPClient from './LAPClient';
import SeoContentBlock from '@/components/SeoContentBlock';
import { existingPageContent } from '@/content/seoPages';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Loan Against Property India | Easy Docs & Fast Approval - Borrowww',
  description:
    'Get loan against property in India with minimal documents. Use funds for business expansion with low interest rates, long tenure & quick approval from Borrowww.',
  path: '/loan-against-property',
});

export default function LoanAgainstPropertyPage() {
  return (
    <>
      <LAPClient />
      <SeoContentBlock {...existingPageContent.loanAgainstProperty} />
    </>
  );
}
