import HomeLoanEligibilityClient from './HomeLoanEligibilityClient';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Home Loan Eligibility Criteria 2026 - Check Now | Borrowww',
  description:
    'Check your home loan eligibility instantly. Learn salary, age, CIBIL score & income criteria for salaried and self-employed applicants. Apply with Borrowww.',
  path: '/home-loan-eligibility',
});

export default function HomeLoanEligibilityPage() {
  return (
    <>
      <HomeLoanEligibilityClient />
    </>
  );
}
