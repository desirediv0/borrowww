'use client';

import { useState } from 'react';

import { ChevronDown, Home, Phone } from 'lucide-react';

const faqs = [
  {
    q: 'Can a self-employed person get a home loan?',
    a: 'Yes. Self-employed individuals, including business owners, professionals, consultants and freelancers, can apply for a home loan. Approval and terms depend on the lender’s assessment of the specific applicant’s income documentation, credit history and overall financial profile, rather than on self-employment status alone.',
  },
  {
    q: 'What are the eligibility criteria for a home loan for self-employed applicants?',
    a: 'Common considerations include age, documented income, business or professional continuity, credit history, existing liabilities, the loan amount and tenure requested, and property details. Exact criteria vary by lender — see Borrowww’s home loan eligibility page for a fuller explanation.',
  },
  {
    q: 'What income documents are required for self-employed home loans?',
    a: 'Commonly requested documents include income tax returns, income computation statements, profit and loss statements and balance sheets where applicable, bank statements, and business or professional registration documents. Exact requirements depend on your business structure, profession and the specific lender.',
  },
  {
    q: 'How do lenders calculate income for self-employed borrowers?',
    a: 'Lenders typically look at documented income from tax filings and financial statements, cross-checked against bank statements, rather than relying on gross business turnover alone. Business or professional continuity and existing liabilities are usually considered alongside this documented income.',
  },
  {
    q: 'Can a freelancer apply for a home loan?',
    a: 'Yes, freelancers can apply for a home loan. Since income may come from multiple clients and vary month to month, lenders often place additional emphasis on bank statements, tax filings and overall financial consistency to assess repayment capacity.',
  },
  {
    q: 'Can a business owner get a home loan?',
    a: 'Yes, business owners can apply for a home loan. Lenders typically assess documented business income, continuity, financial statements and existing business liabilities rather than relying only on business turnover to determine eligibility and terms.',
  },
  {
    q: 'Does CIBIL score affect a self-employed home loan?',
    a: 'Yes, credit score and history are generally an important part of the assessment for self-employed applicants, often carrying extra weight alongside variable business income. There is no single score that guarantees approval, since thresholds and their importance vary by lender.',
  },
  {
    q: 'How much home loan can a self-employed person get?',
    a: 'This depends on documented income, existing obligations, credit profile, the property value, the down payment and the lender’s own assessment — not simply a multiple of business turnover. It’s generally advisable to borrow an amount comfortable to repay rather than the maximum eligible amount.',
  },
  {
    q: 'Are home loan interest rates different for self-employed borrowers?',
    a: 'Not inherently. The interest rate offered depends on factors like credit profile, documented income, loan amount and tenure, and the lender’s own policies — not on employment type alone. Self-employed borrowers are not automatically charged higher or lower rates than salaried applicants.',
  },
  {
    q: 'Can self-employed professionals apply for a home loan?',
    a: 'Yes, professionals such as doctors, lawyers, chartered accountants and architects can apply. Documentation may differ slightly based on how the practice is structured, but no specific profession automatically receives preferential loan terms.',
  },
  {
    q: 'Can a self-employed borrower apply with a co-applicant?',
    a: 'Yes, self-employed applicants can apply jointly with a co-applicant, such as a spouse or family member, which may allow combined eligible income to be considered. This doesn’t automatically guarantee a higher loan amount, since it depends on the combined strength of both applicants’ profiles.',
  },
  {
    q: 'How can self-employed borrowers prepare for a home loan application?',
    a: 'Preparation generally involves reviewing your credit report, organising income-tax and financial records, keeping bank statements accessible, reviewing existing obligations, estimating a comfortable EMI, planning the down payment, and comparing lenders before applying.',
  },
];

function Section({ title, children }) {
  return (
    <article className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#3A6EA5]/30 hover:shadow-md sm:p-8">
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="mt-1.5 h-8 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-b from-[#2D3E50] to-[#3A6EA5]"
        />
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">{title}</h2>
      </div>
      <div className="mt-5 space-y-4 text-base leading-8 text-slate-600">{children}</div>
    </article>
  );
}

function Bullets({ items }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-base leading-7 text-slate-600">
          <span
            aria-hidden="true"
            className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3A6EA5]"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function SelfEmployedHomeLoanClient() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-slate-50 via-white to-[#c4d7e0]/50">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -top-40 -right-32 h-96 w-96 rounded-full bg-[#2D3E50]/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-[#3A6EA5]/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap justify-center gap-1 text-sm text-slate-500"
          >
            <span>Home</span>
            <span className="mx-1" aria-hidden="true">
              ›
            </span>
            <span>Home Loan</span>
            <span className="mx-1" aria-hidden="true">
              ›
            </span>
            <span className="font-medium text-slate-800">Self-Employed</span>
          </nav>
          <div className="mt-6 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#3A6EA5]/20 bg-white/80 px-4 py-1.5 text-sm font-medium text-[#2D3E50] shadow-sm backdrop-blur">
              <Home className="h-4 w-4 text-[#3A6EA5]" aria-hidden="true" /> Home Loan for
              Self-Employed
            </span>
          </div>
          <h1 className="mt-5 text-center text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Home Loan <span className="italic tiemposfine text-[#2D3E50]">for Self-Employed</span>
          </h1>
          <div className="mx-auto mt-6 max-w-3xl space-y-4 text-center text-base leading-8 text-slate-600 sm:text-lg">
            <p>
              Applying for a home loan for self employed individuals often involves a different
              documentation trail than a salaried application. Business and professional income can
              vary month to month or year to year, so lenders generally rely on a broader set of
              financial records — tax filings, bank statements, business continuity and more — to
              assess repayment capacity, rather than a single salary slip.
            </p>
            <p className="text-base">
              This doesn&apos;t make a home loan harder to get for self-employed applicants, but it
              does mean the preparation looks a little different. This page walks through how
              lenders typically assess self-employed borrowers, what documentation may be required,
              and how business owners, professionals, consultants and freelancers can each approach
              the process, along with the practical steps that can make an application smoother.
            </p>
          </div>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="tel:+919560069525"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2D3E50] to-[#3A6EA5] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl sm:w-auto"
            >
              <Phone className="h-4 w-4" aria-hidden="true" /> Talk to an Advisor
            </a>
            <a
              href="tel:+919560069525"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#2D3E50] px-6 py-3 text-sm font-semibold text-[#2D3E50] transition-all hover:bg-[#2D3E50] hover:text-white sm:w-auto"
            >
              Check Eligibility
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
        <Section title="Can Self-Employed Individuals Get a Home Loan?">
          <p>
            Yes. Self-employed individuals can apply for a home loan, subject to the applicable
            lender&apos;s eligibility criteria and its assessment of the specific application.
            Lenders generally welcome applications from a wide range of self-employed profiles,
            including:
          </p>
          <Bullets
            items={[
              'Business owners running proprietorship, partnership or private limited entities.',
              'Self-employed professionals such as doctors, lawyers or chartered accountants.',
              'Entrepreneurs and founders of newer ventures.',
              'Independent consultants.',
              'Freelancers with income from multiple clients or projects.',
              'Sole proprietors and partners in a business.',
            ]}
          />
          <p>
            What differs across these profiles is mainly how income is documented and how
            consistently it can be demonstrated — not whether self-employment itself is acceptable
            to lenders. The eventual assessment depends on the individual&apos;s financial and
            business profile, not on the broad category of self-employment alone.
          </p>
        </Section>

        <Section title="How Do Lenders Assess Home Loan Applications From Self-Employed Borrowers?">
          <p>
            Salaried income is usually verified through a salary slip and employer-issued documents,
            which makes it relatively straightforward to assess. Self-employed income doesn&apos;t
            come with an equivalent single document, so lenders typically look at a combination of
            financial indicators to build a picture of repayment capacity.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">
            Income and Repayment Capacity
          </h3>
          <p>
            Lenders typically examine documented income — through tax returns, income computations
            and financial statements — to assess whether the EMI on the requested loan amount would
            be comfortably serviceable.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">Business Stability</h3>
          <p>
            The continuity and financial performance of the business or professional practice over
            recent years may be relevant, since it can indicate how consistent the income is likely
            to be going forward.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">Banking History</h3>
          <p>
            Bank statements showing regular transactions, income credits and financial discipline
            are commonly reviewed as part of the assessment, since they offer an independent view of
            cash flow alongside tax filings.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">
            Existing Financial Obligations
          </h3>
          <p>
            Any existing EMIs, business loans or other liabilities are typically factored in, since
            they affect how much additional repayment capacity is available.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">Credit History</h3>
          <p>
            Past repayment behaviour, as reflected in the credit report, generally forms part of the
            lender&apos;s assessment, alongside income and business factors.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">Property and Loan Details</h3>
          <p>
            The property being purchased and the loan amount and tenure requested can also influence
            the overall assessment and the terms that may be offered.
          </p>
          <p>
            No single factor above determines approval or the terms offered on its own — lenders
            generally assess self-employed applications holistically, weighing income documentation,
            business stability, banking history, credit profile, and the loan and property details
            together.
          </p>
        </Section>

        <Section title="Home Loan Eligibility for Self-Employed Borrowers">
          <p>
            Broadly, the eligibility considerations for self-employed applicants include age,
            documented income, the nature and continuity of the business or profession, credit
            history, existing liabilities, the loan amount and tenure requested, property details,
            and the documentation provided. Exact criteria — including any minimum income or
            business-continuity expectations — vary by lender and are subject to that lender&apos;s
            applicable policies.
          </p>
          <p>
            Rather than repeating the complete eligibility framework here, you can review
            Borrowww&apos;s dedicated home loan eligibility page for a fuller explanation of how
            these factors generally apply.
          </p>
        </Section>

        <Section title="What Income Documents Are Required for Self-Employed Home Loans?">
          <p>
            Because self-employed income isn&apos;t captured through a single payslip, lenders
            commonly request a set of financial documents to build a complete picture. Depending on
            your business structure, profession and the specific lender&apos;s policy, this may
            include:
          </p>
          <Bullets
            items={[
              'Income tax returns for recent assessment years.',
              'Computation of income accompanying the tax returns.',
              'Profit and loss statements, where applicable to your business.',
              'Balance sheets, where applicable.',
              'Bank statements covering business and/or personal accounts.',
              'Business registration documents, where applicable.',
              'GST-related records, where applicable to your business.',
              'Professional qualification or registration documents, where relevant to your profession.',
              'Any other financial records specifically requested by the lender.',
            ]}
          />
          <p>
            Not every applicant will need to submit every document on this list — the exact
            requirements depend on whether you run a business, practise a profession, or work
            independently as a consultant or freelancer, as well as the specific lender&apos;s
            documentation policy.
          </p>
        </Section>

        <Section title="Home Loan for Self-Employed Business Owners">
          <p>
            For business owners — whether operating as a sole proprietorship, partnership or private
            limited company — lenders typically look beyond gross turnover to assess how
            consistently income has been documented and reported. Relevant considerations often
            include:
          </p>
          <Bullets
            items={[
              'Business income as reflected in tax filings, not just revenue.',
              'Continuity of the business, based on how long it has been operating and its financial track record.',
              'Financial statements, including profit and loss accounts and balance sheets where applicable.',
              'Consistency between tax filings and banking records.',
              'Existing business liabilities, such as working capital loans or business EMIs.',
              'The ownership structure of the business and how it affects personal versus business finances.',
              'The extent to which personal and business finances are kept separate and well documented.',
            ]}
          />
          <p>
            A business with strong revenue but poorly documented or inconsistent income reporting
            may find the assessment more involved than a smaller business with clean, consistent
            financial records. There is no fixed minimum number of years a business must have
            operated that applies universally — this depends on the lender&apos;s own policy.
          </p>
        </Section>

        <Section title="Home Loan for Self-Employed Professionals">
          <p>
            Self-employed professionals — such as doctors, lawyers, chartered accountants,
            architects and independent consultants — are usually assessed based on their
            professional income, which is often documented through tax returns, income computations
            and, in some cases, professional registration or qualification proof.
          </p>
          <p>
            Documentation requirements can differ somewhat by profession and by how the practice is
            structured — for instance, a professional operating an independent practice may need to
            provide different records than one who is a partner in a larger firm. No specific
            profession is automatically entitled to preferential loan terms; the assessment still
            depends on documented income, credit history and the overall application.
          </p>
        </Section>

        <Section title="Home Loan for Freelancers and Consultants">
          <p>
            Freelancers and independent consultants often earn from multiple clients, with income
            that can fluctuate from month to month. This can make it harder to present a single,
            consistent income figure, so lenders typically place extra weight on:
          </p>
          <Bullets
            items={[
              'Bank statements showing the pattern of income credits over time.',
              'Tax filings that consolidate income from various sources.',
              'Client receipts or invoices, where relevant to substantiate income.',
              'Overall financial consistency across documents.',
              'Existing liabilities relative to average income.',
            ]}
          />
          <p>
            Keeping organised, consistent financial records — even when income varies — generally
            makes it easier for a lender to assess repayment capacity. This doesn&apos;t mean every
            lender treats freelance income identically; policies and the level of scrutiny can vary.
          </p>
        </Section>

        <Section title="Credit Score and Home Loans for Self-Employed Borrowers">
          <p>
            A credit score is a numerical summary of your credit history, based on factors such as
            repayment track record, existing debt, credit utilisation and the length and mix of your
            credit accounts. For self-employed borrowers, credit history often carries additional
            weight in the assessment, since it&apos;s an independent, standardised indicator of
            financial discipline alongside variable business income.
          </p>
          <p>
            There isn&apos;t a single credit score that guarantees approval across all lenders —
            thresholds and their weight in the overall decision vary by lender and by the rest of
            your application. It&apos;s worth reviewing your credit report before applying, checking
            for errors such as incorrectly reported accounts or outdated information, and addressing
            any discrepancies in advance. You can learn more about understanding your CIBIL score
            for a home loan on Borrowww.
          </p>
        </Section>

        <Section title="How Much Home Loan Can a Self-Employed Person Get?">
          <p>
            Loan eligibility for a self-employed applicant is not simply a multiple of annual
            business turnover. Lenders typically look at documented income (rather than gross
            revenue), existing obligations, credit profile, the requested tenure, the value of the
            property being purchased, the down payment being made, and their own internal assessment
            policies.
          </p>
          <p>
            It also helps to separate two different numbers: the maximum loan amount a lender may be
            willing to offer, and the loan amount that is comfortable to repay given your income
            variability and other commitments. Since self-employed income can fluctuate, it&apos;s
            often prudent not to borrow right up to the maximum eligible amount, leaving some room
            for months when business income may be lower than average.
          </p>
        </Section>

        <Section title="Home Loan EMI Planning for Self-Employed Borrowers">
          <p>
            EMI planning matters for every borrower, but it takes on extra importance when your
            income isn&apos;t the same every month. Before committing to a specific loan amount and
            tenure, it&apos;s worth thinking through:
          </p>
          <Bullets
            items={[
              'How your monthly income has varied historically, not just the annual average.',
              'Ongoing business expenses that need to be met regardless of loan repayment.',
              'Any existing EMIs or business loan repayments.',
              'Regular household expenses.',
              'An emergency reserve to cover EMIs during a slower income month.',
              "The loan tenure and interest rate you're being offered, and how they affect the EMI.",
              'The total repayment over the full tenure, not just the monthly figure.',
            ]}
          />
          <p>
            Illustrative example (hypothetical, not an actual lender offer): for a loan of
            ₹35,00,000 over a 15-year tenure, choosing a longer tenure of, say, 20 years instead
            would lower the EMI but increase the total interest paid over the life of the loan. For
            a self-employed borrower with variable income, a lower EMI with some buffer may
            sometimes be preferable to the shortest possible tenure — but this depends entirely on
            your own cash flow and risk comfort. These figures are illustrative only and not
            indicative of a current or lender-specific offer.
          </p>
          <p>
            You can model different loan amounts, tenures and rates using Borrowww&apos;s home loan
            EMI calculator before finalising your budget.
          </p>
        </Section>

        <Section title="Home Loan Interest Rates for Self-Employed Borrowers">
          <p>
            The interest rate applicable to your loan is generally influenced by your credit
            profile, documented income, the loan amount and tenure requested, the property being
            financed, and the specific lender&apos;s own policies at the time of application. Loans
            are typically offered under fixed or floating rate structures, each with its own
            trade-offs around predictability versus potential rate movement over time.
          </p>
          <p>
            It&apos;s a common misconception that self-employed borrowers are automatically charged
            higher — or, in some cases, lower — interest rates than salaried applicants. In
            practice, the rate offered depends on the overall strength of the individual
            application, not on employment type alone. As with any home loan, it&apos;s worth
            comparing the complete cost of the loan, not just the advertised starting rate, across a
            few lenders. You can read more on Borrowww&apos;s home loan interest rates page.
          </p>
        </Section>

        <Section title="Documents Checklist for Self-Employed Home Loan Applicants">
          <p>A general checklist of documents commonly requested from self-employed applicants:</p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">Identity and Address</h3>
          <Bullets items={['PAN card.', 'Aadhaar or other applicable identity/address proof.']} />

          <h3 className="pt-2 text-xl font-semibold text-slate-900">Income</h3>
          <Bullets
            items={[
              'Income tax returns for recent assessment years.',
              'Income computation statements.',
              'Financial statements, where applicable.',
              'Bank statements.',
            ]}
          />

          <h3 className="pt-2 text-xl font-semibold text-slate-900">Business or Profession</h3>
          <Bullets
            items={[
              'Business registration or proof of business, where applicable.',
              'GST-related records, where applicable.',
              'Professional registration or qualification documents, where relevant.',
            ]}
          />

          <h3 className="pt-2 text-xl font-semibold text-slate-900">Property</h3>
          <Bullets items={['Property-related documents as requested by the lender.']} />

          <p>
            This list is indicative — the exact documents needed will depend on your specific lender
            and profile. For a fuller breakdown, see Borrowww&apos;s home loan documents page.
          </p>
        </Section>

        <Section title="How to Prepare for a Home Loan as a Self-Employed Borrower">
          <p>A bit of preparation can make the application process considerably smoother:</p>
          <Bullets
            items={[
              'Review your credit report and address any discrepancies.',
              'Organise your income-tax records for recent years.',
              'Keep bank statements easily accessible.',
              'Maintain clear, consistent financial records for your business or practice.',
              'Review existing loans and EMIs against your current income.',
              "Estimate an EMI that's comfortable given your income variability.",
              'Plan the down payment you can realistically arrange.',
              'Keep an emergency reserve separate from the down payment.',
              'Compare lenders and loan terms rather than approaching just one.',
              'Organise property-related documents in advance.',
              'Review the final sanction letter and loan terms carefully before signing.',
            ]}
          />
        </Section>

        <Section title="How Self-Employed Borrowers Can Improve Their Loan Application">
          <p>There are legitimate steps that can strengthen how your application is assessed:</p>
          <Bullets
            items={[
              'Maintain accurate and up-to-date financial records for your business or practice.',
              'File applicable tax returns on time and consistently, year after year.',
              'Keep banking transactions organised and reflective of your actual income.',
              'Manage existing debt responsibly and avoid unnecessary new borrowing.',
              'Avoid taking on new credit lines or loans immediately before applying for a home loan.',
              'Check your credit report for accuracy well in advance.',
              'Ensure documentation is consistent across your tax filings, bank statements and application.',
              'Choose a loan amount aligned with your actual repayment capacity, not just the maximum offered.',
              'Compare loan options across multiple lenders.',
            ]}
          />
          <p>
            These are all about presenting an accurate, well-organised financial picture — not about
            inflating income, hiding liabilities or misrepresenting your business performance, which
            can create serious problems later in the loan process.
          </p>
        </Section>

        <Section title="Common Challenges Self-Employed Borrowers May Face">
          <p>
            A few practical challenges tend to come up for self-employed applicants, though none of
            them automatically leads to rejection if handled well:
          </p>
          <Bullets
            items={[
              'Variable income: month-to-month fluctuations can make it harder to present a single consistent figure — addressed through documentation over a longer period.',
              'Multiple income sources: freelancers and consultants may need to consolidate income across several clients or projects.',
              'Inconsistent documentation: mismatches between tax filings and bank statements can complicate assessment.',
              'Cash-heavy transactions: businesses with significant cash dealings may find it harder to demonstrate documented income.',
              'Turnover vs taxable income: a gap between gross business turnover and the income actually reported for tax purposes can affect how a lender assesses repayment capacity.',
              'Existing business obligations: working capital loans or business EMIs can reduce the personal loan amount that may be considered.',
              'Demonstrating income stability: newer businesses or practices may need to show a longer or clearer track record.',
              'Incomplete financial records: missing or disorganised documents can slow down the assessment process.',
            ]}
          />
          <p>
            In most cases, the practical solution to these challenges is better financial
            organisation — consistent tax filings, clean banking records and clear documentation —
            rather than anything more complicated.
          </p>
        </Section>

        <Section title="Common Mistakes to Avoid When Applying for a Home Loan">
          <Bullets
            items={[
              'Applying without first checking your own credit history.',
              'Submitting incomplete or inconsistent financial documents.',
              'Confusing business turnover with your actual personal repayment capacity.',
              'Ignoring existing debt when estimating how much you can additionally borrow.',
              "Choosing a property based purely on the maximum loan you're eligible for.",
              'Comparing lenders only on the advertised interest rate.',
              'Overlooking additional home-buying costs beyond the EMI.',
              'Not maintaining sufficient emergency savings alongside the down payment.',
              'Providing inconsistent information across different documents or forms.',
              'Signing the loan agreement without carefully reviewing its terms.',
            ]}
          />
        </Section>

        <Section title="Self-Employed vs Salaried Home Loan Applications">
          <p>
            Lenders generally assess self-employed and salaried applicants using the same broad
            principles — income, repayment capacity, credit history and property — but the way
            income is documented and verified differs between the two.
          </p>
          <Bullets
            items={[
              'Income documentation: salaried applicants typically rely on salary slips and Form 16; self-employed applicants rely on tax returns, financial statements and bank statements.',
              'Income consistency: salaried income is usually fixed and predictable; self-employed income can vary and is often assessed over multiple years.',
              'Tax records: self-employed applicants generally rely more heavily on income tax filings as primary income evidence.',
              'Banking records: both are reviewed, but banking patterns often carry more weight for self-employed applicants given variable income.',
              'Employment/business continuity: salaried applicants are assessed on job tenure; self-employed applicants on business or practice continuity.',
              'Existing liabilities: relevant to both, though self-employed applicants may also have business-related obligations to account for.',
              'Credit history: assessed similarly for both profiles.',
              'Property assessment: generally the same process regardless of employment type.',
            ]}
          />
          <p>
            Neither profile is inherently better positioned than the other — a well-documented
            self-employed application can be just as competitive as a salaried one. The key
            difference lies in the type of paperwork involved, not the outcome.
          </p>
        </Section>

        <Section title="Should Self-Employed Borrowers Apply Alone or With a Co-Applicant?">
          <p>
            A joint home loan involves applying together with a co-applicant, often a spouse or
            family member, and can allow the lender to consider both applicants&apos; eligible
            incomes together. This may affect the loan amount that can be considered, though the
            exact impact depends on the lender&apos;s specific policy and the co-applicant&apos;s
            own profile.
          </p>
          <p>
            Both co-applicants are typically responsible for repayment, and ownership of the
            property is usually linked to how the applicants are named on the property documents.
            Adding a co-applicant doesn&apos;t automatically guarantee a higher loan amount or
            improved approval chances — it depends on the combined strength of both profiles. You
            can read more on Borrowww&apos;s joint home loan page.
          </p>
        </Section>

        <Section title="Additional Costs Self-Employed Home Buyers Should Plan For">
          <p>
            Beyond the loan EMI, it&apos;s worth budgeting for other costs involved in a property
            purchase:
          </p>
          <Bullets
            items={[
              'The down payment itself.',
              'Registration and stamp-related charges, where applicable, which vary by state and property value.',
              'Loan processing fees.',
              'Legal or technical valuation charges, where applicable.',
              'Insurance costs, where applicable or opted for.',
              'Moving and relocation expenses.',
              'Initial repairs or furnishing.',
              'Maintenance or society-related charges, where applicable.',
              'An emergency reserve, kept separate from the down payment.',
            ]}
          />
          <p>
            These costs vary considerably by location, property type and the specific transaction,
            so it&apos;s worth getting a realistic estimate before committing to a purchase,
            especially given the added importance of maintaining a cash buffer when your income can
            fluctuate.
          </p>
        </Section>

        <Section title="Step-by-Step Home Loan Process for Self-Employed Applicants">
          <p>
            While the exact process can vary by lender and transaction, it broadly follows these
            steps:
          </p>
          <Bullets
            items={[
              'Assess your financial position, including income, savings and existing obligations.',
              'Review your credit profile before applying.',
              "Estimate a loan amount that's genuinely affordable, not just the maximum eligible.",
              'Compare lenders and their applicable terms.',
              'Prepare your financial and business documents in advance.',
              'Select a property that fits your budget.',
              'Submit your loan application with the required documentation.',
              'The lender evaluates both you as a borrower and the property.',
              'On approval, you receive the sanction letter and complete the loan documentation.',
              'The loan amount is disbursed subject to the applicable conditions.',
            ]}
          />
        </Section>

        <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-7 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#2D3E50]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#2D3E50]">
              FAQ
            </span>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
              Frequently Asked Questions About Home Loans for Self-Employed
            </h2>
          </div>
          <div className="grid gap-3">
            {faqs.map((item, index) => (
              <div
                key={item.q}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  openIndex === index
                    ? 'border-[#3A6EA5]/40 bg-[#3A6EA5]/5 shadow-sm'
                    : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  aria-expanded={openIndex === index}
                >
                  <span className="text-base font-semibold text-slate-900">{item.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 transition-transform ${
                      openIndex === index ? 'rotate-180 text-[#3A6EA5]' : 'text-slate-400'
                    }`}
                  />
                </button>
                {openIndex === index ? (
                  <p className="border-t border-slate-200/80 px-5 pb-4 pt-3 text-sm leading-7 text-slate-600">
                    {item.a}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-[#2D3E50] via-[#2D3E50] to-[#3A6EA5] p-7 text-white shadow-xl sm:p-10">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-12 h-64 w-64 rounded-full bg-white/5 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight">
                Explore Your Home Loan Options With Borrowww
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/85">
                Being self-employed doesn&apos;t limit your ability to get a home loan — it simply
                means the documentation and assessment process work a little differently, relying
                more on financial records than a single income document. Understanding what lenders
                typically look for, and preparing your paperwork accordingly, can make the
                application process considerably more straightforward.
              </p>
              <p className="mt-4 text-sm leading-7 text-white/85">
                Looking to understand your home loan options as a self-employed borrower? Explore
                Borrowww&apos;s home loan resources, check your eligibility, review the documents
                you may need, and use the EMI calculator to plan your repayment before you apply.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <a
                href="tel:+919560069525"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#2D3E50] shadow-lg transition hover:bg-slate-100"
              >
                <Phone className="h-4 w-4" aria-hidden="true" /> Call Borrowww
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
