import CreditCheckClient from './CreditCheckClient';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Check Your Free Credit Score Instantly | No Charges, Secure - Borrowww',
  description:
    'Check your free credit score online instantly with Borrowww. No hidden charges, no credit card required. Secure, fast & accurate credit report with tips to improve your loan eligibility.',
  path: '/credit-check',
});

export default function CreditCheckPage() {
  return <CreditCheckClient />;
}
