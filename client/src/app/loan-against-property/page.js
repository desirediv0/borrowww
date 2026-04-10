import LAPClient from './LAPClient';
import SeoContentBlock from '@/components/SeoContentBlock';
import { existingPageContent } from '@/content/seoPages';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Loan Against Property - Unlock Your Property Value',
  description:
    'Get a loan against residential or commercial property with competitive interest rates, flexible tenure, and support from Borrowww.',
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
