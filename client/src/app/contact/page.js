import ContactClient from './ContactClient';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "Let's Connect | Borrowww 24/7 Loan Support",
  description:
    'Have questions about loans or credit? Borrowww offers 24/7 personalized support via call, email, or WhatsApp to help you quickly and securely.',
  path: '/contact',
});

export default function ContactPage() {
  return <ContactClient />;
}
