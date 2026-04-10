import EMIClient from './EMIClient';
import SeoContentBlock from '@/components/SeoContentBlock';
import { existingPageContent } from '@/content/seoPages';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'EMI Calculator - Calculate Home, Personal and Car Loan EMI',
  description:
    'Calculate monthly EMI for home loans, personal loans, and car loans with Borrowww\'s easy-to-use EMI calculator.',
  path: '/emi',
});

export default function EMIPage() {
  return (
    <>
      <EMIClient />
      <SeoContentBlock {...existingPageContent.emi} />
    </>
  );
}
