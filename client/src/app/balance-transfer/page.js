import BalanceTransferClient from './BalanceTransferClient';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Balance Transfer EMI Calculator | Save on Loan Interest - Borrowww',
  description:
    'Compare your current loan with top banks, calculate savings with our Balance Transfer Calculator, and reduce EMI & interest. Get started with Borrowww today!',
  path: '/balance-transfer',
});

export default function BalanceTransferPage() {
  return <BalanceTransferClient />;
}
