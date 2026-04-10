import BalanceTransferClient from './BalanceTransferClient';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Balance Transfer - Transfer Your Home Loan and Save',
  description:
    'Transfer your existing home loan to a new lender with lower interest rates, improved terms, and transparent support from Borrowww.',
  path: '/balance-transfer',
});

export default function BalanceTransferPage() {
  return <BalanceTransferClient />;
}
