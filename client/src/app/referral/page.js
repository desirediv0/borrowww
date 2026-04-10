import ReferralClient from './ReferralClient';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Refer a Friend',
  description:
    'Refer friends and family to Borrowww and help them connect with loan services and guided financial assistance.',
  path: '/referral',
});

export default function ReferralPage() {
  return <ReferralClient />;
}
