import LAPClient from './LAPClient';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Loan Against Property in India | Minimal Documents & Fast Approval',
  description:
    'Unlock capital from your property to fund strategic business growth. Get loan against property in India with minimal documents and fast approval from Borrowww.',
  path: '/loan-against-property',
});

export default function LoanAgainstPropertyPage() {
  return (
    <>
      <LAPClient />
    </>
  );
}
