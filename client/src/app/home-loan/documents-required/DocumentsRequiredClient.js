'use client';

import { useState } from 'react';

import { ChevronDown, Home } from 'lucide-react';

const faqs = [
  {
    q: 'What documents are required for a home loan?',
    a: 'Broadly, lenders require identity and KYC documents, address proof, income proof, employment or business-related documents, bank statements, details of existing liabilities where applicable, and property-related documents. The exact combination depends on your profile, the lender, and the property being purchased.',
  },
  {
    q: 'What documents are required for a home loan for salaried employees?',
    a: 'Salaried applicants are commonly asked for identity and address proof, recent salary slips, bank statements showing salary credits, and Form 16 or other income tax documents. Additional employment documentation may sometimes be requested depending on the lender.',
  },
  {
    q: 'What documents are required for a self-employed home loan?',
    a: 'Self-employed applicants typically need to provide Income Tax Returns, income computation statements, financial statements where applicable, bank statements, and business or professional registration documents. The exact list varies by business type and lender.',
  },
  {
    q: 'Is a bank statement required for a home loan?',
    a: 'Yes, bank statements are commonly requested for both salaried and self-employed applicants, since they help verify income credits and give the lender a broader view of financial activity beyond salary slips or tax filings alone.',
  },
  {
    q: 'Is Form 16 required for a home loan?',
    a: 'Form 16 is commonly requested from salaried applicants to substantiate annual income, though whether it is mandatory can depend on the specific lender and the loan amount involved. It is worth keeping it ready regardless, since it is a frequently requested document.',
  },
  {
    q: 'What property documents are required for a home loan?',
    a: 'This depends on the type of property. Commonly relevant documents include the sale agreement, title or ownership documents, approved building plans, property tax records, encumbrance-related documentation, and builder or project documents for properties bought from a developer.',
  },
  {
    q: 'Are documents required from a home loan co-applicant?',
    a: 'Yes, co-applicants generally need to submit their own KYC, address proof and, where their income is being considered, income and bank statement documents. The extent of documentation depends on the co-applicant’s role in the application.',
  },
  {
    q: 'Can I apply for a home loan if some documents are unavailable?',
    a: 'It’s best to check directly with the lender, since requirements and flexibility around missing documents vary. In many cases, lenders may accept alternative documents or ask for supporting explanations, but this isn’t guaranteed and depends on which document is missing and why.',
  },
  {
    q: 'How many months of bank statements are required for a home loan?',
    a: 'This varies by lender rather than following one fixed rule — some commonly request a few months’ worth, while others may ask for a longer period, particularly for self-employed applicants. It’s best to confirm the exact requirement with your chosen lender.',
  },
  {
    q: 'Do home loan documents differ between lenders?',
    a: 'Yes, while the broad categories of documentation are similar across lenders, the exact list, accepted document types, and specific requirements can vary. It’s advisable to confirm the current requirements directly with your chosen lender before applying.',
  },
  {
    q: 'What documents are required for a resale property home loan?',
    a: 'For a resale property, lenders typically look at the sale agreement, title and ownership documents, previous ownership records, encumbrance-related documentation, and property tax records, in addition to your standard applicant-level documents. Requirements can vary based on the property’s history.',
  },
  {
    q: 'How should I prepare my documents before applying for a home loan?',
    a: 'Check that your details are consistent across all documents, ensure everything is current and clearly readable, organise income documents chronologically, start collecting property papers early, and confirm the specific lender’s requirements before submission.',
  },
];

function Section({ title, children }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
      <div className="mt-5 space-y-4 text-base leading-8 text-slate-600">{children}</div>
    </article>
  );
}

function Bullets({ items }) {
  return (
    <ul className="list-disc space-y-2 pl-6 marker:text-[#3A6EA5]">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function ChecklistCard({ title, items }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <h4 className="font-semibold text-slate-900">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3A6EA5]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DocumentsRequiredClient() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
            <span>Home</span>
            <span className="mx-2">›</span>
            <span>Home Loan</span>
            <span className="mx-2">›</span>
            <span className="text-slate-800">Documents Required</span>
          </nav>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#2D3E50]/10 px-3 py-1.5 text-sm font-medium text-[#2D3E50]">
            <Home className="h-4 w-4" /> Home Loan Documentation
          </div>
          <h1 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Home Loan Documents Required: Complete Checklist for Borrowers
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Before a lender approves and disburses a home loan, it needs to verify who you are,
            where you live, how much you earn, how you&apos;ve handled credit in the past, and
            whether the property you&apos;re buying is legally sound. This is why home loan
            documents required span several categories — identity, address, income, employment or
            business proof, bank statements, existing liabilities and property papers — rather than
            a single form.
          </p>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            This page walks through what&apos;s generally requested from different types of
            applicants, why each document matters, and how to organise your paperwork so the
            application process moves smoothly. Exact requirements vary by lender, borrower profile
            and property, so treat this as a practical starting point and confirm the specifics with
            your chosen lender before applying.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
        <Section title="What Documents Are Required for a Home Loan?">
          <p>Most home loan applications involve documentation from a few broad categories:</p>
          <Bullets
            items={[
              'Identity and KYC documents.',
              'Address proof.',
              'Income proof.',
              'Employment or business-related documents.',
              'Bank statements.',
              'Details of existing loans or liabilities, where applicable.',
              'Property-related documents.',
              'Photographs and other application-related documents.',
              'Any additional documents the specific lender may request.',
            ]}
          />
          <p>
            Exactly which documents apply to you depends on whether you&apos;re salaried or
            self-employed, whether you&apos;re applying alone or with a co-applicant, the type of
            property you&apos;re buying, and the specific lender&apos;s own policy. There isn&apos;t
            one universal checklist that applies identically to every borrower — the sections below
            break this down by situation.
          </p>
        </Section>

        <Section title="Home Loan Documents Required for Salaried Employees">
          <p>
            For salaried applicants, documentation is generally built around verifying identity, a
            regular income and stable employment.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">Identity and Address Proof</h3>
          <p>
            Commonly accepted documents include PAN, Aadhaar, passport, voter ID or other
            government-issued identity and address proof. Which specific documents are accepted can
            vary by lender, so it&apos;s worth checking this in advance.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">Salary Slips</h3>
          <p>
            Recent salary slips are commonly requested to establish your current income level and
            salary structure. Lenders often ask for a few months&apos; worth, though the exact
            number can vary by lender rather than following one fixed rule.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">Bank Statements</h3>
          <p>
            Bank statements showing salary credits and overall financial activity are typically
            reviewed to cross-verify the income shown on your salary slips and to understand your
            broader financial behaviour.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">
            Form 16 and Income Tax Documents
          </h3>
          <p>
            Form 16 or other income-tax-related documents may be requested to further substantiate
            your annual income, particularly for higher loan amounts or when a lender wants
            additional verification beyond salary slips.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">
            Employment-Related Documents
          </h3>
          <p>
            Depending on the applicant and lender, additional employment documentation — such as an
            offer letter, appointment letter or employment certificate — may sometimes be requested
            to confirm employment continuity.
          </p>
          <p>
            For a closer look at how these documents fit into the broader picture for salaried
            borrowers, see Borrowww&apos;s page on home loan for salaried employees.
          </p>
        </Section>

        <Section title="Home Loan Documents Required for Self-Employed Applicants">
          <p>
            Self-employed applicants don&apos;t have a salary slip to rely on, so lenders typically
            look at a broader set of financial records to assess income. Commonly requested
            documents include:
          </p>
          <Bullets
            items={[
              'Identity and address proof.',
              'Income Tax Returns for recent assessment years.',
              'Income computation statements accompanying the ITRs.',
              'Profit and loss statements, where applicable to the business.',
              'Balance sheets, where applicable.',
              'Business or professional registration documents, where applicable.',
              'GST-related documents, where applicable to the business.',
              'Bank statements covering business and/or personal accounts.',
              'Business continuity or vintage-related documentation, where specifically requested by the lender.',
              'Other financial documents depending on the nature of the business.',
            ]}
          />
          <p>
            Documentation can look somewhat different depending on the type of self-employed
            applicant. A business owner may need to submit financial statements and business
            registration proof; a self-employed professional such as a doctor or chartered
            accountant may need professional registration documents alongside income tax records;
            and a freelancer or consultant may rely more heavily on bank statements and consolidated
            tax filings, since income often comes from multiple clients. Not every self-employed
            applicant needs to submit every document listed above — the specific combination depends
            on your profile and the lender&apos;s requirements. For a more detailed look, see
            Borrowww&apos;s page on home loan for self-employed applicants.
          </p>
        </Section>

        <Section title="KYC Documents for a Home Loan">
          <p>
            KYC (Know Your Customer) documentation exists to verify who you are and where you live,
            both for the primary applicant and any co-applicant. This typically includes:
          </p>
          <Bullets
            items={[
              'Proof of identity, such as PAN, Aadhaar or passport.',
              'Proof of current address, which may sometimes differ from the identity document.',
              "Applicant details as required on the lender's application form.",
              'Co-applicant identity and address documentation, where a co-applicant is involved.',
              'PAN-related documentation, which is generally required for financial transactions of this nature.',
            ]}
          />
          <p>
            Which specific documents are accepted as valid KYC proof can vary by lender and is also
            subject to current regulatory requirements, so it&apos;s worth confirming the accepted
            list with your chosen lender rather than assuming a fixed set applies everywhere.
          </p>
        </Section>

        <Section title="Income Proof Documents for Home Loan">
          <p>
            Income documentation is central to how a lender assesses repayment capacity, and what
            counts as adequate proof differs by the nature of your income.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">Salaried Applicants</h3>
          <p>
            Salary slips, Form 16, bank statements showing salary credits, and other relevant income
            documentation are typically used to establish and verify income.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">Self-Employed Applicants</h3>
          <p>
            Income Tax Returns, financial statements, bank statements and business-related
            documentation, where applicable, are generally used to build a picture of documented
            income over time.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">
            Applicants With Multiple Income Sources
          </h3>
          <p>
            If you have additional income — rental income, professional income on the side, or other
            documented sources — you may be asked for supporting proof for each source. Whether a
            specific income source is considered as part of your overall eligibility depends
            entirely on the individual lender&apos;s policy, so it&apos;s worth checking this
            directly.
          </p>
        </Section>

        <Section title="Property Documents Required for a Home Loan">
          <p>
            Property documentation tends to be the most variable part of a home loan application,
            since it depends heavily on the type of property and the nature of the transaction.
            Requirements can differ depending on whether you&apos;re purchasing:
          </p>
          <Bullets
            items={[
              'A ready-to-move-in property.',
              'An under-construction property.',
              'A resale property.',
              'A plot.',
              'An independent house.',
              'A property directly from a builder or developer.',
            ]}
          />
          <p>Depending on the transaction, commonly relevant property documentation can include:</p>
          <Bullets
            items={[
              'The sale agreement or agreement to sell.',
              'The sale deed or other title-related documents.',
              'Previous ownership documents, where the property has changed hands before.',
              'Approved building or layout plans, where applicable.',
              'Property tax-related documents, where applicable.',
              "Encumbrance-related documentation confirming the property's legal status.",
              'Builder or project-related documents, for properties bought from a developer.',
              'Possession or completion-related documents, for ready or newly completed properties.',
              'Other title and legal verification documents specific to the transaction.',
            ]}
          />
          <p>
            Not every property transaction requires the exact same set of documents — a resale flat,
            an under-construction apartment from a builder, and an independent plot each come with
            different documentation needs. Property documents are generally subject to a legal and
            technical verification process by the lender before the loan is sanctioned, which is
            separate from the applicant-level document review.
          </p>
        </Section>

        <Section title="Home Loan Documents for a Joint Applicant or Co-Applicant">
          <p>
            When you apply for a home loan with a co-applicant, documentation is generally required
            for both individuals, not just the primary applicant. This typically includes:
          </p>
          <Bullets
            items={[
              'KYC documents for the co-applicant.',
              'Address proof for the co-applicant.',
              'Income documents for the co-applicant, where their income is being considered.',
              'Bank statements for the co-applicant.',
              'Employment or business documentation for the co-applicant, where applicable.',
            ]}
          />
          <p>
            How much documentation is required from a co-applicant often depends on their role in
            the application — for instance, whether their income is being combined with yours for
            eligibility purposes, or whether they&apos;re being added mainly for ownership reasons.
            You can read more about documents for joint home loan applicants on Borrowww&apos;s
            joint home loan page.
          </p>
        </Section>

        <Section title="Documents Required for Home Loan Application vs Property Verification">
          <p>
            It helps to think of home loan documentation in two broad buckets, since they serve
            different purposes in the lender&apos;s process.
          </p>
          <p>
            <strong className="text-slate-900">
              Applicant-level documents establish who is borrowing and whether they can repay:
            </strong>
          </p>
          <Bullets
            items={[
              'KYC documents.',
              'Income documents.',
              'Employment or business documentation.',
              'Bank statements.',
              'Details of existing financial obligations.',
            ]}
          />
          <p>
            <strong className="text-slate-900">
              Property-level documents establish what is being financed and whether it&apos;s
              legally sound:
            </strong>
          </p>
          <Bullets
            items={[
              'Ownership and title documents.',
              'Sale or purchase agreements.',
              'Approvals and sanctioned plans.',
              'Builder or project-related documents.',
              'Other property verification documents.',
            ]}
          />
          <p>
            Both sets matter for different reasons — a lender needs to be confident in your ability
            to repay the loan and in the legal standing of the property before disbursing funds.
            Understanding this distinction can make it easier to see why a lender might request
            documents from you personally as well as documents related purely to the property.
          </p>
        </Section>

        <Section title="Additional Documents That May Be Required">
          <p>
            Beyond the standard categories, lenders may ask for additional documents based on your
            individual circumstances. Examples can include:
          </p>
          <Bullets
            items={[
              'Statements for existing loans, to assess current obligations.',
              "Proof of additional income, if you've declared income from other sources.",
              'Additional business documents, for more complex business structures.',
              'Partnership deed or company-related documents, where the applicant is part of a partnership or company.',
              "Legal documents related to the property, if there's anything unusual about its history.",
              'Documents relating to previous ownership, for properties that have changed hands.',
              'Explanations or supporting records for unusual financial transactions in your bank statements.',
              'Additional documents for co-applicants, depending on their role in the loan.',
            ]}
          />
          <p>
            These additional requirements aren&apos;t universal — they depend on your specific
            borrower profile, the loan application, and the property involved, and are usually
            communicated by the lender once your initial documents have been reviewed.
          </p>
        </Section>

        <Section title="How to Prepare Your Home Loan Documents Before Applying">
          <p>A little preparation upfront can prevent delays later in the process:</p>
          <Bullets
            items={[
              'Check that your name and other details are consistent across all documents.',
              'Ensure documents are current and clearly readable.',
              'Keep both digital and physical copies where appropriate.',
              'Organise income documents chronologically.',
              'Keep bank statements readily accessible, covering the relevant period.',
              'Start preparing property documents early, since these can take time to gather.',
              'Check whether your co-applicant needs to submit separate documentation.',
              'Keep explanations or supporting records ready for any unusual financial transactions.',
              "Verify the specific lender's requirements before submission, since these can vary.",
              'Avoid submitting incomplete or unclear documents, as this typically slows down processing.',
            ]}
          />
        </Section>

        <Section title="What Happens After You Submit Home Loan Documents?">
          <p>
            Once you submit your documents, the lender generally moves through a review process that
            typically includes:
          </p>
          <Bullets
            items={[
              'Initial document submission and completeness check.',
              'KYC verification of the applicant (and co-applicant, if any).',
              'Verification of income and employment or business details.',
              'An overall financial assessment based on income, obligations and credit history.',
              'Legal and technical verification of the property.',
              'Requests for additional documents, if anything is unclear or incomplete.',
              "Further processing toward the lender's final decision.",
            ]}
          />
          <p>
            The exact sequence and duration of this process vary by lender and by how complete your
            initial submission is — there&apos;s no fixed or guaranteed timeline that applies across
            all applications, and submitting documents does not guarantee approval.
          </p>
        </Section>

        <Section title="Common Mistakes to Avoid When Submitting Home Loan Documents">
          <Bullets
            items={[
              'Submitting expired or outdated documents.',
              'Providing unclear or poor-quality scans.',
              'Mismatched names or details across different documents.',
              'Missing pages from bank statements or financial statements.',
              'Incomplete income documentation.',
              'Overlooking co-applicant documentation.',
              'Delaying the collection of property documents.',
              'Providing inconsistent financial information across forms and documents.',
              'Failing to disclose existing loans or obligations.',
              'Assuming the same document list applies to every lender.',
            ]}
          />
          <p>
            None of these mistakes are unusual — they&apos;re simply easy to make when you&apos;re
            organising paperwork for the first time, which is exactly why a bit of upfront
            preparation helps.
          </p>
        </Section>

        <Section title="How to Make Your Home Loan Documentation Process Easier">
          <h3 className="pt-2 text-xl font-semibold text-slate-900">Before Applying</h3>
          <Bullets
            items={[
              'Organise your KYC documents.',
              'Prepare your income documents.',
              'Collect recent bank statements.',
              'Gather employment or business documentation.',
              'Start collecting property papers.',
            ]}
          />
          <h3 className="pt-2 text-xl font-semibold text-slate-900">Before Submission</h3>
          <Bullets
            items={[
              'Check that documents are valid and not expired.',
              'Check names and details for consistency.',
              'Check that statements and forms are complete, with no missing pages.',
              'Keep digital copies as backup.',
              "Confirm the specific lender's requirements.",
            ]}
          />
          <h3 className="pt-2 text-xl font-semibold text-slate-900">During Verification</h3>
          <Bullets
            items={[
              'Respond promptly to any requests for additional documents.',
              'Provide accurate supporting information when asked.',
              'Keep property documents organised and accessible throughout the process.',
            ]}
          />
        </Section>

        <Section title="Home Loan Documents Checklist">
          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistCard
              title="Applicant Documents"
              items={[
                'PAN card.',
                'Aadhaar or other identity/address proof.',
                'Recent photographs.',
              ]}
            />
            <ChecklistCard
              title="Income Documents"
              items={[
                'Salary slips (salaried) or Income Tax Returns (self-employed).',
                'Form 16, where applicable.',
                'Income computation statements, where applicable.',
              ]}
            />
            <ChecklistCard
              title="Employment/Business Documents"
              items={[
                'Employment-related documents, where requested.',
                'Business registration or professional registration documents, where applicable.',
              ]}
            />
            <ChecklistCard
              title="Financial Documents"
              items={[
                'Bank statements for the relevant period.',
                'Statements for existing loans, where applicable.',
              ]}
            />
            <ChecklistCard
              title="Property Documents"
              items={[
                'Sale agreement or agreement to sell.',
                'Title or ownership documents.',
                'Approved plans, builder documents or possession-related papers, as applicable.',
              ]}
            />
            <ChecklistCard
              title="Co-Applicant Documents"
              items={[
                'KYC and address proof for the co-applicant.',
                "Income and bank statement documents, where the co-applicant's income is being considered.",
              ]}
            />
          </div>
          <p className="pt-2 text-sm text-slate-500">
            This checklist is a general starting point rather than a lender-specific list — always
            confirm the exact requirements with your chosen lender before submission.
          </p>
        </Section>

        <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">
            Home Loan Documents Required FAQs
          </h2>
          <div className="mt-6 grid gap-4">
            {faqs.map((item, index) => (
              <div key={item.q} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 text-left"
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  aria-expanded={openIndex === index}
                >
                  <span className="text-base font-semibold text-slate-900">{item.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-slate-500 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openIndex === index ? (
                  <p className="mt-4 text-sm leading-7 text-slate-600">{item.a}</p>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] bg-[#2D3E50] p-8 text-white shadow-xl">
          <h2 className="text-2xl font-semibold">
            Get Your Home Loan Documentation Right From the Start
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/80">
            Understanding what you&apos;ll likely need — and organising them in advance — can make
            the difference between a smooth home loan application and one that gets repeatedly
            delayed for missing paperwork. Since exact requirements vary by lender, borrower profile
            and property, it&apos;s always worth confirming the current requirements with your
            chosen lender before you submit your application.
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/80">
            For a fuller picture of your home loan options, explore Borrowww&apos;s home loan guide,
            check your home loan eligibility, review home loan interest rates, and use the home loan
            EMI calculator to plan your budget before you apply.
          </p>
        </section>
      </div>
    </main>
  );
}
