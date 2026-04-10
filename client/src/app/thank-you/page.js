import Link from 'next/link';

import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Thank You',
  description:
    'Thank you for contacting Borrowww. Our team will review your request and connect with you shortly.',
  path: '/thank-you',
  index: false,
});

export default function ThankYouPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl items-center px-6 py-20">
      <section className="w-full rounded-[32px] bg-[var(--primary-blue-dark)] px-8 py-12 text-white shadow-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/70">
          Request Received
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
          Thank you for reaching out to Borrowww.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-white/85">
          We have received your details. Our team will review your request and get in touch with
          you shortly to guide you on the next steps.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--primary-blue-dark)] transition hover:bg-slate-100"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Contact Support
          </Link>
        </div>
      </section>
    </main>
  );
}
