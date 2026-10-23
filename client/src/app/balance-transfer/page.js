import BalanceTransferClient from './BalanceTransferClient';
import RelatedGuides from '@/components/category/RelatedGuides';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Home Loan Balance Transfer: Save Money with Lower Interest Rates | Borrowww',
  description:
    'Everything you need to know about transferring your home loan to a new lender. Compare costs, analyse savings, check RBI guidelines, and calculate your break-even point.',
  path: '/balance-transfer',
});

export default function BalanceTransferPage() {
  return (
    <>
      <BalanceTransferClient />
      <RelatedGuides cluster="bt" />
    </>
  );
}
