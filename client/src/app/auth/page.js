import AuthClient from './AuthClient';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Sign In | Borrowww',
  description: 'Sign in to your Borrowww account with your phone number and OTP.',
  path: '/auth',
  index: false,
});

export default function AuthPage() {
  return <AuthClient />;
}
