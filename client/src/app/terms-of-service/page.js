'use client';

export default function TermsOfService() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20 text-gray-800 leading-relaxed">
      <h1 className="text-4xl font-semibold mb-6 text-[var(--primary-blue-dark)]">
        Terms of Service
      </h1>
      <p className="text-gray-600 italic mb-10">Last updated: 01 January 2025</p>

      <div className="space-y-8 text-[17px] text-gray-700">
        <p>
          These terms govern the use of <strong>Borrowww.com</strong>, operated by <strong>Borrowww</strong>. By using our website, you agree to the Terms
          listed below.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">1. Nature of Services</h2>
        <p>
          Borrowww is not a bank or NBFC. We do not provide loans directly. We provide loan
          advisory and facilitate communication between users and regulated financial institutions.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">2. User Responsibilities</h2>
        <p>
          You must provide accurate information, not misuse the platform, and comply with applicable
          Indian laws. Submission of false data may lead to suspension of services.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">3. No Guarantee</h2>
        <p>
          We do not guarantee loan approval, specific interest rates, processing time, or outcomes.
          Final decisions are taken by respective banks/NBFCs.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">4. Third-Party Services</h2>
        <p>
          We are not responsible for decisions made by lenders. Users must review lender terms
          independently before applying.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">5. Intellectual Property</h2>
        <p>
          All content on the site is owned by Borrowww. Copying or redistribution without
          consent is prohibited.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">6. Limitation of Liability</h2>
        <p>
          Borrowww shall not be liable for indirect or consequential damages arising from use
          of our services or reliance on advisory support.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">7. Governing Law</h2>
        <p>
          These terms are governed by Indian laws. Any disputes shall be subject to courts located
          in India.
        </p>
      </div>
    </section>
  );
}
