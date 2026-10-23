import { buildMetadata } from '@/lib/seo';
import LoanAdvisorGurgaonClient from './LoanAdvisorGurgaonClient';

export const metadata = buildMetadata({
  title: 'Loan Advisor in Gurgaon for Home Loan & Property Loan',
  description:
    'Find the best loan advisor in Gurgaon for home loan & loan against property. Get the lowest interest rates, maximum eligibility & expert guidance today.',
  path: '/loan-advisor-gurgaon-for-home-loan',
  keywords: [
    'loan advisor in Gurgaon',
    'home loan advisor Gurgaon',
    'loan against property consultant Gurgaon',
    'mortgage advisor Gurgaon',
    'home loan Gurgaon',
    'LAP Gurgaon',
    'best loan advisor Gurgaon',
    'low interest home loan Gurgaon',
  ],
});

export default function LoanAdvisorGurgaonPage() {
  return <LoanAdvisorGurgaonClient />;
}
