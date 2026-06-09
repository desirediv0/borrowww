import HomeLoanClient from './HomeLoanClient';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Best Home Loan in India | Check Eligibility by Salary & Get Low Rates - Borrowww',
  description:
    'Get the best home loan in India with Borrowww. Check eligibility by salary, enjoy low interest rates, flexible tenure & expert assistance for fast, hassle-free approval.',
  path: '/home-loan',
});

export default function HomeLoanPage() {
  return (
    <>
      <HomeLoanClient />
    </>
  );
}
