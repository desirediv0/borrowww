import ProfileClient from './ProfileClient';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Your Profile | Borrowww',
  description: 'Manage your Borrowww account profile and personal details.',
  path: '/profile',
  index: false,
});

export default function ProfilePage() {
  return <ProfileClient />;
}
