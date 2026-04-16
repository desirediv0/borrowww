import ComparisonClient from './ComparisonClient';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Loan Comparison Calculator - Borrowww',
  description:
    'Compare home, personal, business & property loans with Borrowww. Find lowest EMI, interest & savings instantly with our easy loan comparison tool.',
  path: '/comparison',
});

export default function ComparisonPage() {
  return <ComparisonClient />;
}
