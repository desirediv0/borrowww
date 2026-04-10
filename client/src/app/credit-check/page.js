import CreditCheckClient from './CreditCheckClient';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Free Credit Score Check - Check Your CIBIL Score',
  description:
    'Check your credit score for free with Borrowww, access your detailed credit report, and improve your loan eligibility.',
  path: '/credit-check',
});

export default function CreditCheckPage() {
  return <CreditCheckClient />;
}
