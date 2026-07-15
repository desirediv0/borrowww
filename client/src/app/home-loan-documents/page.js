import HomeLoanDocumentsClient from './HomeLoanDocumentsClient';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Home Loan Documents – Complete Checklist | Borrowww',
  description:
    'Complete home loan documents checklist for salaried, self-employed & NRI applicants. Know exactly what\'s needed for faster approval. Apply via Borrowww.',
  path: '/home-loan-documents',
});

export default function HomeLoanDocumentsPage() {
  return (
    <>
      <HomeLoanDocumentsClient />
    </>
  );
}
