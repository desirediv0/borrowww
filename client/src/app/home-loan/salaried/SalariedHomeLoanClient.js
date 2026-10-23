'use client';

import { useState } from 'react';
import Link from 'next/link';

import { ChevronDown, Home, Phone } from 'lucide-react';

const faqs = [
  {
    q: 'Can a salaried person get a home loan?',
    a: 'Yes. Salaried individuals, whether working in the private sector, government, public-sector organisations or multinational companies, can apply for a home loan. Approval and terms depend on the lender’s assessment of income, credit history, existing obligations and the property, rather than employment type alone.',
  },
  {
    q: 'What is the eligibility for a home loan for salaried employees?',
    a: 'Common considerations include age, salary or income level, employment stability and work experience, existing financial obligations, credit history, the loan amount and tenure requested, and property details. Exact criteria vary by lender. See Borrowww’s home loan eligibility page for a fuller explanation.',
  },
  {
    q: 'How does salary affect home loan eligibility?',
    a: 'Your salary is a key input in assessing repayment capacity, but lenders also weigh it against existing EMIs, household expenses, the requested tenure and interest rate. A higher salary doesn’t automatically mean you should borrow the maximum eligible amount. Work out what is comfortably affordable as well.',
  },
  {
    q: 'What documents are required for a salaried home loan?',
    a: 'Commonly requested documents include identity and address proof, recent salary slips, bank statements showing salary credits, Form 16 or other income tax documents, and property-related documents. Exact requirements vary by lender. See Borrowww’s home loan documents page for details.',
  },
  {
    q: 'Does CIBIL score affect home loan eligibility for salaried employees?',
    a: 'Yes, credit score and repayment history are generally an important part of the assessment for salaried applicants as well. There is no single score that guarantees approval, since thresholds and their importance in the overall decision vary by lender.',
  },
  {
    q: 'How much home loan can a salaried person get?',
    a: 'This depends on documented income, existing EMIs, repayment capacity, credit profile, the property value, the down payment and the lender’s own assessment, not salary alone. It’s generally advisable to borrow an amount that’s comfortable to repay rather than the maximum eligible amount.',
  },
  {
    q: 'Can a private-sector employee get a home loan?',
    a: 'Yes, private-sector employees can apply for a home loan like any other salaried applicant. Lenders typically assess salary documentation, employment history, existing obligations and credit profile as part of the evaluation.',
  },
  {
    q: 'Can a government employee apply for a home loan?',
    a: 'Yes, government and public-sector employees can apply for a home loan, subject to the lender’s applicable criteria. While some lenders may offer specific schemes for government employees, this isn’t universal, so check directly with the lender.',
  },
  {
    q: 'Can a salaried person apply for a joint home loan?',
    a: 'Yes, salaried applicants can apply jointly with a co-applicant, such as a spouse or family member, which may allow combined eligible income to be considered. This doesn’t automatically guarantee a higher loan amount, since it depends on the combined strength of both applicants’ profiles.',
  },
  {
    q: 'How does EMI affect home loan affordability for salaried borrowers?',
    a: 'The EMI directly affects your monthly cash flow, so estimate it before finalising a property rather than after. A comfortable EMI generally leaves room for existing obligations, household expenses and savings, rather than stretching your take-home income to its limit.',
  },
  {
    q: 'Are home loan interest rates different for salaried employees?',
    a: 'Not inherently. The interest rate offered depends on factors like credit profile, income, loan amount and tenure, and the lender’s own policies, not on employment type alone. Salaried applicants are not automatically offered lower rates than self-employed applicants.',
  },
  {
    q: 'How can a salaried borrower prepare for a home loan application?',
    a: 'Preparation generally involves reviewing your credit report, checking your income and expenses, reviewing existing EMIs, estimating a comfortable EMI, organising salary slips and bank statements, and comparing lenders before applying.',
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

export default function SalariedHomeLoanClient() {
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
            <Link href="/" className="hover:text-[#3A6EA5] hover:underline">
              Home
            </Link>
            <span className="mx-1" aria-hidden="true">
              ›
            </span>
            <Link href="/home-loan" className="hover:text-[#3A6EA5] hover:underline">
              Home Loan
            </Link>
            <span className="mx-1" aria-hidden="true">
              ›
            </span>
            <span className="font-medium text-slate-800">Salaried</span>
          </nav>
          <div className="mt-6 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#3A6EA5]/20 bg-white/80 px-4 py-1.5 text-sm font-medium text-[#2D3E50] shadow-sm backdrop-blur">
              <Home className="h-4 w-4 text-[#3A6EA5]" aria-hidden="true" /> Home Loan for Salaried
              Employees
            </span>
          </div>
          <h1 className="mt-5 text-center text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Home Loan <span className="italic tiemposfine text-[#2D3E50]">for Salaried Employees</span>
          </h1>
          <div className="mx-auto mt-6 max-w-3xl space-y-4 text-center text-base leading-8 text-slate-600 sm:text-lg">
            <p>
              A regular salary credit and a stable employment record can make parts of a home loan
              for salaried applicants relatively straightforward to document. A salary slip, Form
              16 and a few months of bank statements usually cover much of what a lender needs to
              see. But a documented income doesn’t automatically translate into approval or the
              best possible terms. Lenders still look at your complete financial picture: existing
              obligations, credit history, the loan amount and tenure you’re requesting, and
              the property itself.
            </p>
            <p className="text-base">
              This page walks through how lenders typically assess salaried applicants, what affects
              eligibility and interest rates, how to plan your EMI realistically, and what to
              prepare before you apply, whether you work in the private sector, a public-sector
              organisation, government service, or a multinational company.
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
        <Section title="Can a Salaried Person Get a Home Loan?">
          <p>
            Yes. Salaried individuals can apply for a home loan, subject to the applicable
            lender’s eligibility criteria and its assessment of the specific application. This
            holds across a range of employment types, including:
          </p>
          <Bullets
            items={[
              'Employees of private-sector companies.',
              'Government employees.',
              'Public-sector employees.',
              'Employees of multinational companies.',
              'Employees of other established organisations where income is received as salary.',
            ]}
          />
          <p>
            Being salaried doesn’t automatically guarantee approval or a specific set of terms. Lender policies differ, and each application is assessed on its own merits, including
            income, credit history, existing obligations and the property being financed.
          </p>
        </Section>

        <Section title="How Do Lenders Assess Salaried Home Loan Applicants?">
          <p>
            While salaried income is generally easier to document than self-employed income, lenders
            still look at several factors together to arrive at a lending decision.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">Monthly and Annual Income</h3>
          <p>
            Your documented salary, as shown in salary slips, bank credits and Form 16, is
            typically used to assess repayment capacity for the requested loan amount and tenure.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">Employment Stability</h3>
          <p>
            How long you’ve been with your current employer, and your broader employment
            history, can be relevant, since it indicates the likely continuity of your income.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">
            Existing EMIs and Financial Obligations
          </h3>
          <p>
            Any existing loans, credit card dues or other obligations are typically factored in,
            since they reduce the additional EMI you can comfortably take on.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">Credit History</h3>
          <p>
            Your credit score and repayment track record generally form an important part of the
            assessment, alongside income and employment factors.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">Loan Amount and Tenure</h3>
          <p>
            The amount you’re requesting and the repayment period you choose affect the
            resulting EMI, which in turn affects how the lender views affordability.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">Property Details</h3>
          <p>
            The property being purchased, including its legal and technical status, is usually
            reviewed by the lender as part of the overall transaction.
          </p>
          <p>
            No single factor above determines approval on its own. Lenders typically assess
            salaried applications as a whole, weighing income, employment stability, existing
            obligations, credit history and the property together.
          </p>
        </Section>

        <Section title="Home Loan Eligibility for Salaried Employees">
          <p>
            Broadly, eligibility considerations for salaried applicants include age, salary or
            income level, employment profile and work experience, existing financial obligations,
            credit history, the loan amount and tenure requested, property details, and
            documentation. Exact criteria, including any minimum income expectations, vary by
            lender and are subject to that lender’s applicable policies.
          </p>
          <p>
            Rather than repeating the complete framework here, you can review Borrowww’s
            dedicated home loan eligibility page for a fuller explanation of how these factors
            generally apply across borrower types.
          </p>
        </Section>

        <Section title="How Does Salary Affect Home Loan Eligibility?">
          <p>
            Your salary is a central input in assessing how much loan you could be eligible for, but
            it’s not the only one. Lenders typically weigh your income against existing EMIs,
            household expenses, the requested tenure and interest rate, and your overall repayment
            capacity, not income in isolation.
          </p>
          <p>
            Keep two figures separate. Loan eligibility is the maximum amount a lender may be
            willing to offer based on its assessment. Comfortable affordability is the amount you
            can repay without straining your monthly budget or compromising other financial goals.
            A higher salary doesn’t automatically mean you should borrow the maximum amount
            offered; it’s generally better to work backwards from an EMI that leaves reasonable
            room for savings, existing commitments and unexpected expenses.
          </p>
        </Section>

        <Section title="Home Loan for Private-Sector Employees">
          <p>
            For employees of private companies, lenders typically rely on salary slips, bank
            statements showing salary credits, and documents like Form 16 to assess income.
            Employment history (including how long you’ve been with your current employer and
            your broader career continuity), existing obligations and credit profile are usually
            reviewed alongside income.
          </p>
          <p>
            Private-sector employees are not automatically treated more or less favourably than
            other salaried applicants; the strength of an individual application depends on the same
            broad factors: documented income, stability, credit history and existing liabilities.
          </p>
        </Section>

        <Section title="Home Loan for Government and Public-Sector Employees">
          <p>
            Government and public-sector employees can apply for home loans in the same way as other
            salaried applicants, subject to the lender’s applicable criteria. Lenders typically
            look at salary documentation, employment records, bank statements, existing obligations,
            credit profile and property details.
          </p>
          <p>
            While government employment is sometimes associated with income stability, this does not
            automatically translate into special interest rates, higher eligibility, or guaranteed
            approval. These still depend on the lender’s own policies and the complete
            application. Some lenders may offer specific schemes for government employees, so
            check directly with the lender whether any such scheme applies to
            you.
          </p>
        </Section>

        <Section title="Documents Required for Salaried Home Loan Applicants">
          <p>
            Requirements vary by lender, but salaried applicants are commonly asked for documents
            such as:
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">Identity and Address</h3>
          <Bullets items={['PAN card.', 'Aadhaar or other applicable identity/address proof.']} />

          <h3 className="pt-2 text-xl font-semibold text-slate-900">Income</h3>
          <Bullets
            items={[
              'Recent salary slips.',
              'Bank statements showing salary credits.',
              'Form 16 or applicable income tax documents.',
              'Other income proof, where applicable.',
            ]}
          />

          <h3 className="pt-2 text-xl font-semibold text-slate-900">Employment</h3>
          <Bullets items={['Employment-related documents, where requested by the lender.']} />

          <h3 className="pt-2 text-xl font-semibold text-slate-900">Property</h3>
          <Bullets items={['Property documents requested by the lender.']} />

          <p>
            Not every lender requires every document listed above. The exact list depends on the
            specific lender and your profile. For a fuller breakdown, see Borrowww’s home loan
            documents page.
          </p>
        </Section>

        <Section title="Credit Score and Home Loans for Salaried Borrowers">
          <p>
            A credit score is a numerical summary of your credit history, reflecting factors such as
            repayment track record, existing loans and credit obligations, credit utilisation, and
            the length and mix of your credit accounts. For salaried borrowers, a strong and
            consistent repayment history is generally viewed favourably during the assessment.
          </p>
          <p>
            There is no single credit score that guarantees approval across all lenders. Thresholds
            and how much weight they carry vary by lender and by the rest of your application. Since
            credit reports can occasionally contain errors, such as an incorrectly reported account
            or outdated information, review your report and address any
            discrepancies before you apply. You can learn more about understanding your CIBIL score
            on Borrowww.
          </p>
        </Section>

        <Section title="How Much Home Loan Can a Salaried Person Get?">
          <p>
            Loan eligibility for a salaried applicant depends on more than just salary. Lenders
            typically look at documented income, existing EMIs, overall repayment capacity, credit
            profile, the requested tenure and interest rate, the value of the property, the down
            payment being made, and their own internal assessment policies.
          </p>
          <p>
            The maximum amount a lender is willing to offer is not necessarily the same as the
            amount that is financially comfortable for you to repay. Rather than aiming for the
            highest eligible loan amount, it’s generally better to work out what EMI fits
            comfortably within your monthly budget, factoring in existing commitments and future
            financial goals.
          </p>
        </Section>

        <Section title="Home Loan EMI Planning for Salaried Employees">
          <p>
            Estimating your EMI before finalising a property, rather than after, gives you a
            realistic sense of what price range actually fits your budget. Before committing,
            review:
          </p>
          <Bullets
            items={[
              'Your monthly take-home income, after taxes and deductions.',
              'Any existing EMIs or credit obligations.',
              'Regular household expenses.',
              "An emergency reserve you'd want to maintain.",
              'The EMI that would apply for different loan amounts, tenures and interest rates.',
              'The total repayment over the full tenure, not just the monthly figure.',
            ]}
          />
          <p>
            Illustrative example (hypothetical, not an actual lender offer): for a loan of
            ₹45,00,000 over a 20-year tenure, opting for a 15-year tenure instead would increase the
            EMI but reduce the total interest paid over the life of the loan. Which option makes
            more sense depends entirely on your monthly cash flow and financial priorities. These
            figures are illustrative only and not indicative of a current or lender-specific offer.
          </p>
          <p>
            You can test different combinations of loan amount, tenure and interest rate using
            Borrowww’s home loan EMI calculator before finalising your budget.
          </p>
        </Section>

        <Section title="Home Loan Interest Rates for Salaried Borrowers">
          <p>
            The interest rate applicable to your loan is generally influenced by your credit
            profile, income and employment profile, the loan amount and tenure requested, and the
            specific lender’s own policies at the time of application. Loans are typically
            offered under fixed or floating rate structures, each with different trade-offs between
            predictability and potential rate movement over time.
          </p>
          <p>
            Being salaried doesn’t automatically mean you’ll be offered the lowest
            advertised rate. The rate offered depends on the overall strength of your individual
            application, not on employment type alone. As with any home loan, compare
            the complete cost across a few lenders rather than the headline rate alone.
            You can read more on Borrowww’s home loan interest rates page.
          </p>
        </Section>

        <Section title="Home Loan Tenure for Salaried Borrowers">
          <p>
            Loan tenure has a direct effect on your EMI and the total interest you’ll pay. A
            longer tenure generally results in a lower EMI but a higher total interest outgo over
            the life of the loan, while a shorter tenure increases the EMI but usually reduces the
            total interest paid.
          </p>
          <p>
            The right tenure depends on your age, income, affordability, other financial goals, and
            the terms your lender is willing to offer. There’s no tenure that’s
            universally correct for every salaried borrower. Weigh a few tenure
            options against your monthly budget and long-term plans before deciding.
          </p>
        </Section>

        <Section title="Can a Salaried Person Apply for a Joint Home Loan?">
          <p>
            Yes. A joint home loan involves applying together with a co-applicant, commonly a spouse
            or family member, which can allow the lender to consider combined eligible income. This
            may affect the loan amount that can be considered, though the exact impact depends on
            the lender’s specific policy and the co-applicant’s own profile.
          </p>
          <p>
            Both co-applicants are typically responsible for repayment, and ownership of the
            property is usually linked to how the applicants are named on the property documents.
            Adding a co-applicant doesn’t automatically increase the loan amount or improve
            approval chances. It depends on the combined strength of both profiles. You can read
            more on Borrowww’s joint home loan page.
          </p>
        </Section>

        <Section title="How Salaried Borrowers Can Prepare Before Applying">
          <p>A bit of preparation can make the application process considerably smoother:</p>
          <Bullets
            items={[
              'Review your credit report and address any discrepancies.',
              'Check your monthly income and expenses realistically.',
              'Review your existing EMIs and other obligations.',
              'Estimate an EMI you would be comfortable paying.',
              'Plan the down payment you can realistically arrange.',
              'Organise recent salary slips and bank statements.',
              'Keep other income documents, such as Form 16, ready.',
              'Compare lenders and loan terms rather than approaching just one.',
              'Research the property carefully, including its legal status.',
              'Maintain an emergency fund, separate from the down payment.',
              'Review the final loan terms carefully before signing.',
            ]}
          />
        </Section>

        <Section title="How to Improve Your Home Loan Application as a Salaried Borrower">
          <p>There are legitimate steps that can strengthen how your application is assessed:</p>
          <Bullets
            items={[
              'Maintain a healthy, consistent credit profile.',
              'Pay existing EMIs and credit card dues on time.',
              'Keep financial documents organised and easily accessible.',
              'Avoid taking on unnecessary new debt before applying.',
              'Check your credit report for accuracy well in advance.',
              'Choose a loan amount aligned with your actual repayment capacity.',
              'Compare loan terms across multiple lenders.',
              'Maintain consistent employment and income documentation.',
            ]}
          />
          <p>
            These are all about presenting an accurate, well-organised financial picture, not about
            manipulating salary documents, hiding liabilities or misrepresenting your financial
            position, which can create serious problems later in the loan process.
          </p>
        </Section>

        <Section title="Common Mistakes Salaried Home Loan Applicants Should Avoid">
          <Bullets
            items={[
              "Choosing a property based purely on the maximum loan you're eligible for.",
              'Ignoring existing EMIs when estimating how much you can additionally borrow.',
              'Comparing lenders only on the advertised interest rate.',
              'Not checking your credit history before applying.',
              'Applying without first organising your documents.',
              'Overlooking additional home-buying expenses beyond the EMI.',
              'Choosing a loan tenure without understanding its effect on total interest.',
              'Assuming a stable salary alone guarantees approval.',
              'Not reading the sanction letter and loan agreement carefully.',
              'Failing to maintain an emergency reserve alongside the down payment.',
            ]}
          />
        </Section>

        <Section title="Additional Costs Salaried Home Buyers Should Plan For">
          <p>
            The EMI is usually the most visible cost, but it isn’t the only one involved in
            buying a home. You should also budget for:
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
            so get a realistic estimate before committing to a purchase rather
            than discovering them midway through the process.
          </p>
        </Section>

        <Section title="Step-by-Step Home Loan Process for Salaried Applicants">
          <p>
            While the exact process can vary by lender and transaction, it broadly follows these
            steps:
          </p>
          <Bullets
            items={[
              'Assess your finances, including income, savings and existing obligations.',
              'Check your credit profile before applying.',
              "Estimate a loan amount that's genuinely affordable.",
              'Compare lenders and their applicable terms.',
              'Prepare your income and identity documents in advance.',
              'Select a property that fits your budget.',
              'Submit your loan application with the required documentation.',
              'The lender evaluates both you as a borrower and the property.',
              'On approval, you receive the sanction letter and complete the loan documentation.',
              'The loan amount is disbursed subject to the applicable conditions.',
            ]}
          />
        </Section>

        <Section title="Salaried vs Self-Employed Home Loan Applications">
          <p>
            Lenders generally assess salaried and self-employed applicants using the same broad
            principles (income, repayment capacity, credit history and property), but the way
            income is documented and verified differs between the two.
          </p>
          <Bullets
            items={[
              'Income documentation: salaried applicants typically rely on salary slips and Form 16; self-employed applicants rely on tax returns, financial statements and bank statements.',
              'Income consistency: salaried income is usually fixed and predictable; self-employed income can vary and is often assessed over multiple years.',
              'Employment/business records: salaried applicants are assessed on job tenure and employer details; self-employed applicants on business or practice continuity.',
              'Bank statements: reviewed for both, though they play an especially important role in verifying self-employed income.',
              'Tax documentation: self-employed applicants generally rely more heavily on income tax filings as primary income evidence.',
              'Existing liabilities: relevant to both, though self-employed applicants may also have business-related obligations to account for.',
              'Credit history: assessed similarly for both profiles.',
              'Repayment assessment: based on documented, verifiable income in both cases, arrived at through different documentation.',
            ]}
          />
          <p>
            Neither profile is inherently better positioned than the other for securing a home loan. A well-documented application from either can be equally competitive. If you or a
            co-applicant is self-employed, Borrowww’s page on home loan options for
            self-employed borrowers covers that side of the assessment in more detail.
          </p>
        </Section>

        <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-7 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#2D3E50]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#2D3E50]">
              FAQ
            </span>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
              Frequently Asked Questions
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
                A stable salary and organised documentation can make parts of the home loan process
                more straightforward, but a well-informed application still comes down to
                understanding your complete financial picture: income, existing obligations, credit
                profile and what you can comfortably repay. Loan terms, rates and requirements vary
                across lenders and change over time, so always verify the latest
                applicable details directly with the lender before you commit.
              </p>
              <p className="mt-4 text-sm leading-7 text-white/85">
                Ready to explore your options? Visit Borrowww’s home loan page to get started,
                check your eligibility, review the documents you’ll likely need, and use the
                EMI calculator to plan your budget before you apply.
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
