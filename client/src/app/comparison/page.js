import ComparisonClient from './ComparisonClient';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Loan Comparison - Compare Loans and Interest Rates',
  description:
    'Compare loan offers side by side and review interest rates, fees, and tenure options to choose the best fit for your needs.',
  path: '/comparison',
});

export default function ComparisonPage() {
  return <ComparisonClient />;
}
