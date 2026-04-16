import EMIClient from './EMIClient';
import SeoContentBlock from '@/components/SeoContentBlock';
import { existingPageContent } from '@/content/seoPages';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'EMI Calculator Online | Home, Personal, Business Loan & LAP - Borrowww',
  description:
    'Borrowww EMI Calculator helps you calculate EMIs for home loan, personal loan, business loan & loan against property. Compare rates, plan repayments & choose the best loan easily.',
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
