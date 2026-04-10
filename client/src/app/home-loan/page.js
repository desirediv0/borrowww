import HomeLoanClient from './HomeLoanClient';
import SeoContentBlock from '@/components/SeoContentBlock';
import { existingPageContent } from '@/content/seoPages';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Home Loan - Best Interest Rates and Offers',
  description:
    'Apply for a home loan with Borrowww, compare interest rates, check eligibility, and get guided support from top lenders.',
  path: '/home-loan',
});

export default function HomeLoanPage() {
  return (
    <>
      <HomeLoanClient />
      <SeoContentBlock {...existingPageContent.homeLoan} />
    </>
  );
}
