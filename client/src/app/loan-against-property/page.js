import LAPClient from './LAPClient';
import RelatedGuides from '@/components/category/RelatedGuides';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Loan Against Property in India | Compare Banks & NBFCs',
  description:
    'Need money for your business or a big expense? Compare loan against property offers from RBI-regulated banks and NBFCs, and let Borrowww help you apply.',
  path: '/loan-against-property',
});

export default function LoanAgainstPropertyPage() {
  return (
    <>
      <LAPClient />
      <RelatedGuides cluster="lap" />
    </>
  );
}
