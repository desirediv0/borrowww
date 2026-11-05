import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description:
    'Read the Borrowww Privacy Policy to understand how personal information is collected, used, protected, and shared.',
  path: '/privacy-policy',
});

export default function PrivacyPolicy() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20 text-gray-800 leading-relaxed">
      <h1 className="text-4xl font-semibold mb-6 text-[var(--primary-blue-dark)]">
        Privacy Policy
      </h1>
      <p className="text-gray-600 italic mb-10">Last updated: 05 November 2026</p>

      <div className="space-y-8 text-[17px] text-gray-700">
        <p>
          At <strong>Borrowww</strong>, we take care of your private data and documents. We do not
          sell your personal data, and we share it with lenders and service providers only with your
          consent.
        </p>
        <p>
          Here, we explain what information we collect from you and for what purpose this information
          or documentation is used.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">Information Collected</h2>
        <p>
          We collect your data, which includes your name, contact number, email address, credit
          requirements, and device information. If you use our credit check, we also collect the
          details needed for it and your credit report. Additionally, information may be collected
          when you interact with our consultants. We store this information so that we can help you
          with your loan.
        </p>
        <p>
          Our website uses cookies and Google Analytics to understand how the site is used.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">Purpose of Information</h2>
        <p>
          We use your personal data to help you obtain a loan quickly. This lets us provide loan
          advice, connect you with lenders, improve communication, and comply with applicable legal
          requirements.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">Data Exchange</h2>
        <p>
          We only share data with lenders and service providers with your consent. Banks and other
          financial institutions may have their own data protection practices and policies.
        </p>
        <p>
          We employ encryption and secure procedures to protect your data. However, never share
          sensitive information such as passwords, one-time passwords, or banking-related credentials
          with any third party.
        </p>
        <p>
          You can contact us at any time at <strong>support.borrowww@gmail.com</strong> for questions
          or concerns, or to request a correction or deletion.
        </p>
      </div>
    </section>
  );
}
