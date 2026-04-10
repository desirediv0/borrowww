import ContactClient from './ContactClient';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Contact Us',
  description:
    'Contact Borrowww for loan assistance, application support, and guidance on home loans, credit checks, and other financial services.',
  path: '/contact',
});

export default function ContactPage() {
  return <ContactClient />;
}
