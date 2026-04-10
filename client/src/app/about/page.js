import AboutClient from './AboutClient';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'About Us - Premier Penny Digital Lending Partner',
  description:
    'Learn more about Borrowww and how we connect borrowers with trusted lenders for home loans, personal loans, and related financial solutions.',
  path: '/about',
});

export default function AboutPage() {
  return <AboutClient />;
}
