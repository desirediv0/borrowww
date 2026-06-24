import HomeLoanClient from './HomeLoanClient';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Home Loan in India – Check Eligibility by Salary & Get Low Interest Rates',
  description:
    'Simplify your home buying journey through Borrowww’s secured loans. Check eligibility by salary, get low interest rates, and apply for a home loan in India.',
  path: '/home-loan',
});

export default function HomeLoanPage() {
  return (
    <>
      <HomeLoanClient />
    </>
  );
}
