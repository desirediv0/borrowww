import Link from 'next/link';

import { buildMetadata, companyInfo } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Grievance Redressal',
  description:
    'How to raise a complaint with Borrowww, who handles it, response timelines, and how to escalate a complaint about a lender to the RBI Ombudsman.',
  path: '/grievance-redressal',
});

export default function GrievanceRedressal() {
  const officer = companyInfo.grievanceOfficer;
  const hasOfficer = Boolean(officer?.name && officer?.phone && officer?.email);
  // Section numbers shift by one when the Grievance Officer block is shown.
  const n = (base) => (hasOfficer ? base + 1 : base);

  return (
    <section className="max-w-5xl mx-auto px-6 py-20 text-gray-800 leading-relaxed">
      <h1 className="text-4xl font-semibold mb-6 text-[var(--primary-blue-dark)]">
        Grievance Redressal
      </h1>
      <p className="text-gray-600 italic mb-10">Last updated: 25 October 2026</p>

      <div className="space-y-8 text-[17px] text-gray-700">
        <p>
          Borrowww is a brand of <strong>{companyInfo.legalName}</strong> (CIN: {companyInfo.cin}).
          If something we did went wrong, such as advice you received, how our team communicated with
          you, or how your personal data was handled, this page explains how to tell us and what
          happens next.
        </p>
        <p>
          Borrowww is not a bank or NBFC. Decisions on loan approval, interest rate, fees and
          disbursal are made by the lender, so complaints about those decisions are handled under the
          lender&apos;s own grievance process (see section {n(3)}).
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">1. How to raise a complaint</h2>
        <p>Email or call us with:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>your name and the mobile number you used with Borrowww</li>
          <li>the lender and loan type, if your complaint relates to an application</li>
          <li>what happened, with dates and any messages or documents that help explain it</li>
        </ul>
        <p>
          Email: <a href={`mailto:${companyInfo.email}`} className="text-[#3A6EA5] font-medium hover:underline">{companyInfo.email}</a>
          <br />
          Phone:{' '}
          {companyInfo.phones.map((phone, i) => (
            <span key={phone}>
              {i > 0 && ' / '}
              <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-[#3A6EA5] font-medium hover:underline">{phone}</a>
            </span>
          ))}
        </p>

        {hasOfficer && (
          <>
            <h2 className="text-2xl font-semibold text-gray-900">2. Grievance Officer</h2>
            <p>
              If you are not satisfied with our first response, or have not heard back within the
              timelines below, write directly to our Grievance Officer:
            </p>
            <p>
              <strong>{officer.name}</strong>
              {officer.designation && `, ${officer.designation}`}
              <br />
              Email: <a href={`mailto:${officer.email}`} className="text-[#3A6EA5] font-medium hover:underline">{officer.email}</a>
              <br />
              Phone: <a href={`tel:${officer.phone.replace(/\s/g, '')}`} className="text-[#3A6EA5] font-medium hover:underline">{officer.phone}</a>
            </p>
          </>
        )}

        <h2 className="text-2xl font-semibold text-gray-900">{n(2)}. Response timelines</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>We acknowledge every complaint within 2 working days.</li>
          <li>We send a final response within 15 days of receiving it.</li>
          <li>If we need more time because a lender or another party is involved, we tell you why and when to expect an answer.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900">{n(3)}. Complaints about a lender or a loan decision</h2>
        <p>
          For a rejected application, the interest rate offered, charges, disbursal or servicing of
          your loan, contact the lender&apos;s grievance redressal or nodal officer. Every bank and
          NBFC publishes these details on its website. We can help you find the right contact and
          share what we know about your application.
        </p>
        <p>
          If the lender does not reply within 30 days, or you are not satisfied with its reply, you
          can file a complaint under the Reserve Bank – Integrated Ombudsman Scheme at{' '}
          <a href="https://cms.rbi.org.in" target="_blank" rel="noopener noreferrer" className="text-[#3A6EA5] font-medium hover:underline">cms.rbi.org.in</a>.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">{n(4)}. Privacy and data concerns</h2>
        <p>
          For questions about how your personal data is used, or to ask us to correct or delete it,
          use the contacts above. Our <Link href="/privacy-policy" className="text-[#3A6EA5] font-medium hover:underline">Privacy Policy</Link> explains
          what we collect and why.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">{n(5)}. Office address</h2>
        <p>
          {companyInfo.legalName}
          <br />
          {companyInfo.address}
        </p>
      </div>
    </section>
  );
}
