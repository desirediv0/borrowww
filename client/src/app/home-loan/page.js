import HomeLoanClient from './HomeLoanClient';
import RelatedGuides from '@/components/category/RelatedGuides';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Home Loan in India - Check Eligibility by Salary & Get Low Interest Rates',
  description:
    'Compare home loans from RBI-regulated banks and NBFCs with Borrowww. Check how much you can borrow on your salary, compare rates and get help applying.',
  path: '/home-loan',
});

export default function HomeLoanPage() {
  return (
    <>
      <HomeLoanClient />
      <RelatedGuides cluster="home" />
    </>
  );
}
