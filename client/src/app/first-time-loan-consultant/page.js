import { buildMetadata } from '@/lib/seo';
import FirstTimeLoanConsultantClient from './FirstTimeLoanConsultantClient';

export const metadata = buildMetadata({
  title: 'Best Loan Consultant in Delhi NCR for First-Time Borrowers',
  description: 'Looking for a loan consultant in Delhi NCR? Get expert help for first-time borrowers with fast approval, better rates & hassle-free loan processing.',
  path: '/first-time-loan-consultant',
  keywords: [
    'loan consultant Delhi NCR',
    'first-time borrowers Delhi NCR',
    'loan for first time borrower',
    'best loan consultant in Delhi NCR',
    'loan processing Delhi NCR',
  ],
});

export default function FirstTimeLoanConsultantPage() {
  return <FirstTimeLoanConsultantClient />;
}
