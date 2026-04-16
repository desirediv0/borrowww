import ReferralClient from './ReferralClient';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Refer a Friend for Loans | Borrowww',
  description:
    'Help friends get the best loans with Borrowww. Quick processing, expert guidance, and priority handling for all your loan referrals.',
  path: '/referral',
});

export default function ReferralPage() {
  return <ReferralClient />;
}
