import { buildMetadata } from '@/lib/seo';
import InstantLoanGhaziabadClient from './InstantLoanGhaziabadClient';

export const metadata = buildMetadata({
  title: 'Instant Loan Services in Ghaziabad | Quick Approval 2026',
  description: 'Get instant loans in Ghaziabad with fast approval, low interest rates, and zero foreclosure charges. Safe, RBI-compliant digital lending. Apply anytime.',
  path: '/instant-loan-services-ghaziabad',
  keywords: [
    'instant loan Ghaziabad',
    'quick approval loans Ghaziabad',
    'digital lending Ghaziabad',
    'RBI compliant loans',
    'zero foreclosure charges loan',
  ],
});

export default function InstantLoanGhaziabadPage() {
  return <InstantLoanGhaziabadClient />;
}
