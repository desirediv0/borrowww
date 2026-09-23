'use client';

import { useState } from 'react';

import { ChevronDown, Home, Phone } from 'lucide-react';

const faqs = [
  {
    q: 'What is home loan eligibility?',
    a: 'Home loan eligibility is the maximum amount a bank or housing finance company is willing to lend you based on your repayment capacity. It depends on your income, age, existing EMIs, credit history, job or business stability, tenure and the property’s value. It remains an estimate until the lender verifies your documents and the property.',
  },
  {
    q: 'How is home loan eligibility calculated?',
    a: 'Lenders work out the EMI you can afford by applying their repayment limit to your income and subtracting existing EMIs. They convert that EMI into a loan amount using the interest rate and tenure, then check it against the RBI loan-to-value cap on the property. The lower figure is usually the eligible amount.',
  },
  {
    q: 'How much home loan can I get on a ₹50,000 salary?',
    a: "It depends on the lender's policy, your EMIs, rate and tenure. As an illustration, with no existing EMIs, a 50% income limit and an 8.5% rate, a ₹50,000 net salary supports about ₹28.8 lakh over 20 years or about ₹32.5 lakh over 30 years. Actual offers can be higher or lower.",
  },
  {
    q: 'What is the minimum salary required for a home loan?',
    a: 'There is no single minimum across lenders. Some lenders list ₹10,000 per month for salaried applicants, while others set higher thresholds. In practice, the loan amount you need matters more, because your income must support the EMI for that amount within the lender’s repayment limit.',
  },
  {
    q: 'Does age affect home loan eligibility?',
    a: 'Yes. Lenders usually require the loan to end before a set age, which varies by lender and employment type. The older you are when applying, the shorter the tenure you may be offered. A shorter tenure means a higher EMI per lakh, which reduces the amount your income can support.',
  },
  {
    q: 'What credit score is needed for a home loan?',
    a: 'RBI does not set a minimum credit score for home loans; each lender sets its own criteria. Scores of 750 and above are widely viewed as favourable and can help with approval and pricing. Lower scores may still be considered, sometimes with a higher rate, a lower loan-to-value ratio or a co-applicant.',
  },
  {
    q: 'Can self-employed individuals get a home loan?',
    a: 'Yes. Self-employed professionals and business owners can apply. Lenders usually review two to three years of ITRs and financial statements, business continuity, bank statements and credit history. Because income can vary, many lenders average earnings across years, and income declared after deductions is typically what counts.',
  },
  {
    q: 'Do existing EMIs reduce home loan eligibility?',
    a: 'Yes. Existing EMIs use part of the income a lender allows for repayments, leaving less room for a home loan EMI. As an illustration, at 8.5% over 20 years, every ₹10,000 of existing EMI reduces eligibility by roughly ₹11.5 lakh. Credit card dues and loans you have guaranteed may also be counted.',
  },
  {
    q: 'Can a co-applicant improve home loan eligibility?',
    a: "Often, yes. An earning co-applicant such as a spouse or parent lets the lender consider combined income, which can increase the eligible amount. The co-applicant's credit history and obligations are assessed too. An older co-applicant may reduce the tenure offered, so their age also matters.",
  },
  {
    q: 'How much down payment is required for a home loan?',
    a: 'Under RBI loan-to-value limits, you generally need at least 10% of the property value for loans up to ₹30 lakh, 20% for loans above ₹30 lakh and up to ₹75 lakh, and 25% above ₹75 lakh. Stamp duty and registration are usually payable separately from your own funds.',
  },
  {
    q: 'What documents are needed to check home loan eligibility?',
    a: 'No documents are needed for an initial estimate. For approval, lenders usually ask for PAN and address proof, income documents such as salary slips and Form 16 or ITRs and financial statements, bank statements and property papers. The exact list varies by lender and applicant profile.',
  },
  {
    q: 'Is home loan eligibility the same as loan approval?',
    a: 'No. Eligibility is an estimate of how much you may borrow. In-principle approval is a conditional offer after the lender reviews your credit report and income documents. Final sanction comes only after full verification, including legal and technical checks on the property, and confirms the amount, rate and tenure.',
  },
];

function Section({ title, children, id }) {
  return (
    <article id={id} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
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

function DataTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto my-4 rounded-2xl border border-slate-200 shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-[#2D3E50]/5">
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-slate-50/60">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-4 py-3 text-slate-600 ${j === 0 ? 'font-medium text-slate-900' : ''}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DefinitionList({ items }) {
  return (
    <dl className="space-y-4">
      {items.map((item) => (
        <div key={item.term}>
          <dt className="font-semibold text-slate-900">{item.term}</dt>
          <dd className="mt-1 text-base leading-8 text-slate-600">{item.def}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function EligibilityClient() {
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
            <span className="text-slate-800">Home Loan Eligibility</span>
          </nav>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#2D3E50]/10 px-3 py-1.5 text-sm font-medium text-[#2D3E50]">
            <Home className="h-4 w-4" /> Home Loan Eligibility: How Much Can You Borrow
          </div>
          <h1 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Home Loan Eligibility
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Home loan eligibility is the loan amount a bank or housing finance company is prepared
            to lend you, based mainly on how comfortably you can repay it. Lenders look at your
            income, age, job or business stability, credit history, existing EMIs, the loan tenure
            and the value of the property you want to buy.
          </p>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            There is no single formula that every lender follows. In practice, most start with one
            question: after your current EMIs, how much of your monthly income can safely go towards
            a new home loan EMI? That figure, together with the interest rate and the longest tenure
            your age allows, sets an income-based limit. The property&apos;s value sets a second
            limit. Your eligible amount is usually the lower of the two, and it is still subject to
            the lender&apos;s credit, document and legal checks.
          </p>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            This guide explains each factor in plain language, shows how the calculation works with
            clearly labelled examples, and covers what you can do to strengthen your profile before
            you apply. If you are still exploring, you can also see home loan options with Borrowww.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
        <Section title="At a Glance (General Guidance, Not Lender Policy)">
          <p className="text-sm italic text-slate-500">
            General guidance, not lender policy. Criteria change — always confirm with your chosen
            lender.
          </p>
          <DataTable
            headers={['Factor', 'What is common in India', 'Varies by lender?']}
            rows={[
              [
                'Minimum age',
                'Usually 21 years; some lenders accept 18 and others start at 23 or 25',
                'Yes',
              ],
              [
                'Maximum age',
                'Typically counted at loan maturity; often between 60 and 75 years depending on lender and whether you are salaried or self-employed',
                'Yes',
              ],
              ['Maximum tenure', 'Up to 30 years with many lenders, limited by your age', 'Yes'],
              [
                'Share of income for all EMIs',
                'Lender-specific; commonly cited ranges are about 40% to 60% of income, sometimes higher for high-income profiles',
                'Yes',
              ],
              [
                'Credit score',
                'No regulator-set minimum; scores of 750 and above are widely viewed as favourable',
                'Yes',
              ],
              [
                'Maximum loan against property value',
                'Capped by RBI loan-to-value (LTV) limits: 90%, 80% or 75% depending on the loan size',
                'Lenders can lend less, not more',
              ],
            ]}
          />
        </Section>

        <Section title="What Is Home Loan Eligibility?">
          <p>
            Home loan eligibility is the maximum amount a lender is willing to lend you after
            assessing your repayment capacity and the property. It depends on your net income,
            existing loan EMIs, age, credit history, employment or business stability, the tenure
            you choose and the property&apos;s value. It is an estimate until the lender verifies
            your documents and approves the loan.
          </p>
          <p>
            Eligibility is personal. Two people with the same salary can qualify for very different
            amounts because one has a car loan EMI, a shorter tenure due to age, or a weaker
            repayment record.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">
            Eligibility, In-Principle Approval and Final Sanction
          </h3>
          <p>These terms are often used interchangeably, but they mean different things:</p>
          <DataTable
            headers={['Stage', 'What it means', 'What it is based on']}
            rows={[
              [
                'Eligibility estimate',
                'An indication of how much you may be able to borrow',
                'Details you share, such as income, age, existing EMIs and tenure',
              ],
              [
                'In-principle approval',
                'A conditional offer from a lender, usually before the property is finalised or verified',
                'Your credit report and income documents',
              ],
              [
                'Final sanction',
                "The lender's formal approval of the amount, rate and tenure, confirmed in a sanction letter",
                "Full verification, including the property's legal and technical checks",
              ],
            ]}
          />
          <p>
            An estimate helps you set a realistic budget. It is not a promise that a loan will be
            sanctioned for that amount.
          </p>
        </Section>

        <Section title="Home Loan Eligibility Criteria">
          <p>
            Lenders assess a combination of personal, financial and property factors. The table
            gives a quick overview, followed by more detail on each.
          </p>
          <DataTable
            headers={['Criterion', 'What lenders look at', 'Effect on eligibility']}
            rows={[
              [
                'Age',
                'Age today and age when the loan ends',
                'Decides the maximum tenure, which affects the loan amount',
              ],
              [
                'Income',
                'Net monthly salary or assessed business income',
                'Higher, stable income supports a larger EMI',
              ],
              [
                'Stability',
                'Work experience or business vintage',
                'Longer, consistent history lowers perceived risk',
              ],
              [
                'Credit score and history',
                'Repayment track record, defaults, enquiries',
                'Affects approval, interest rate and sometimes the amount',
              ],
              [
                'Existing EMIs',
                'Loans, credit card dues, guarantees',
                'Every rupee of existing EMI reduces room for a new one',
              ],
              [
                'Repayment capacity',
                'Share of income already committed',
                'Sets the EMI you can take on',
              ],
              [
                'Loan tenure',
                'Years of repayment available',
                'Longer tenure lowers the EMI and raises the amount',
              ],
              [
                'Property value',
                "Lender's valuation and legal checks",
                'Caps the loan through LTV limits',
              ],
              [
                'Down payment',
                'Your own contribution',
                'Closes the gap between loan and property price',
              ],
              [
                'Co-applicant',
                'Income and credit profile of a joint borrower',
                'Can add income and improve the combined profile',
              ],
            ]}
          />

          <h3 className="pt-2 text-xl font-semibold text-slate-900">Age</h3>
          <p>
            Age matters mainly because it limits tenure. Lenders usually want the loan repaid before
            a set age at maturity, which differs by lender and by whether you are salaried or
            self-employed. A 30-year-old may be offered a 30-year tenure, while a 50-year-old may be
            offered far fewer years. A shorter tenure means a higher EMI for the same loan, so the
            eligible amount falls even when income is unchanged.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">Income</h3>
          <p>
            Your income determines how large an EMI you can support. For salaried applicants,
            lenders usually work from net take-home pay, and they may treat fixed and variable
            components differently. For self-employed applicants, they typically use income shown in
            income tax returns and financial statements. Some lenders also consider regular rental
            or other income if it is properly documented.
          </p>
          <p>
            Minimum income requirements vary widely. For example, some banks list a minimum salary
            of ₹10,000 per month for salaried applicants on eligibility calculator pages, while
            other lenders set higher thresholds. In practice, the loan amount you need matters more
            than the minimum.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">
            Employment or Business Stability
          </h3>
          <p>
            Lenders prefer predictable income. Salaried applicants are generally asked about total
            work experience and time with the current employer. Self-employed applicants are usually
            asked for proof that the business has been running for a few years, often around three.
            Frequent job changes or gaps can lead to closer scrutiny, though they do not
            automatically disqualify you.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">
            Credit Score and Credit History
          </h3>
          <p>
            Your credit report shows how you have handled loans and credit cards. Lenders use it to
            judge risk, which can affect whether you are approved, the interest rate offered and
            sometimes the amount or LTV. Missed payments, settled accounts and very high credit card
            use weaken a profile. See the credit score section below for more detail.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">Existing Loans and EMIs</h3>
          <p>
            Car loans, personal loans, education loans, consumer durable EMIs and credit card dues
            all count as fixed obligations. If you are a guarantor or co-borrower on someone
            else&apos;s loan, that may also be considered. The more income already committed, the
            less room there is for a home loan EMI.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">Repayment Capacity (FOIR)</h3>
          <p>
            Many lenders measure repayment capacity with the Fixed Obligation to Income Ratio
            (FOIR): total monthly EMIs, including the proposed home loan EMI, divided by monthly
            income. If a lender&apos;s limit is 50% and you earn ₹1,00,000 a month, your total EMIs
            should generally stay within ₹50,000.
          </p>
          <p>
            There is no single industry-wide FOIR. Commonly cited ranges are roughly 40% to 60%, and
            some lenders allow a higher share for high-income borrowers. The limit you receive
            depends on the lender&apos;s policy, your income level and your overall profile.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">Loan Tenure</h3>
          <p>
            A longer tenure spreads repayment over more months, lowering the EMI and raising the
            amount you can borrow on the same income. The trade-off is higher total interest over
            the life of the loan. The best tenure is one where the EMI is comfortable today and you
            can still prepay when income rises. You can compare EMIs at different tenures using the
            Borrowww EMI calculator.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">
            Property Value and Loan-to-Value (LTV) Ratio
          </h3>
          <p>
            Even with a high income, a lender cannot finance the full property price. The Reserve
            Bank of India (RBI) sets maximum loan-to-value ratios for individual housing loans:
          </p>
          <DataTable
            headers={['Loan amount', 'Maximum LTV (RBI cap)', 'Minimum own contribution']}
            rows={[
              ['Up to ₹30 lakh', '90%', '10% of property value'],
              ['Above ₹30 lakh and up to ₹75 lakh', '80%', '20% of property value'],
              ['Above ₹75 lakh', '75%', '25% of property value'],
            ]}
          />
          <p>
            These are upper limits. A lender may offer less based on your profile or its valuation
            of the property. Stamp duty, registration and documentation charges are generally not
            included in the property cost when calculating LTV, so budget for them separately. RBI
            permits these charges to be included only where the cost of the house does not exceed
            ₹10 lakh.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">Down Payment</h3>
          <p>
            Your down payment covers the difference between the property price and the loan. A
            larger down payment reduces the loan you need, lowers the EMI and can make an
            application stronger. It also helps if your income-based eligibility is lower than the
            LTV limit.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">Co-Applicant Profile</h3>
          <p>
            Adding an earning co-applicant, often a spouse or parent, allows the lender to consider
            combined income. This can increase eligibility, provided the co-applicant also has a
            reasonable credit history and manageable obligations. Lenders usually require all
            co-owners of the property to be co-applicants, although not every co-applicant has to be
            a co-owner. An older co-applicant may shorten the tenure a lender allows, so the choice
            of co-applicant matters.
          </p>
        </Section>

        <Section title="Why Home Loan Eligibility Criteria Differ Between Lenders">
          <p>
            Each lender sets its own credit policy within RBI rules. Published criteria from two
            lenders show how much they can differ:
          </p>
          <DataTable
            headers={['Published criterion', 'HDFC Bank', 'Bajaj Housing Finance']}
            rows={[
              ['Age (salaried)', '21 to 65 years', '23 to 67 years (at loan maturity)'],
              ['Age (self-employed)', '21 to 65 years', '25 to 70 years (at loan maturity)'],
              [
                'Minimum income',
                '₹10,000 p.m. (salaried); ₹2 lakh p.a. (business)',
                'Not stated on calculator page',
              ],
              ['Experience / business vintage', 'Not stated on calculator page', 'Minimum 3 years'],
              ['Maximum tenure', '30 years', 'Not stated on calculator page'],
            ]}
          />
          <p className="text-sm text-slate-500">
            Source: lenders&apos; official eligibility calculator pages, checked September 2026.
            Criteria change, so always confirm the current terms with the lender. Interest rates
            also differ by lender and profile; see current home loan interest rates.
          </p>
          <p className="text-sm italic text-slate-500">
            Note for web team: re-check both lenders&apos; pages on the day of publishing and update
            the table and date if anything has changed.
          </p>
        </Section>

        <Section title="How Is Home Loan Eligibility Calculated?">
          <p>
            Most lenders calculate eligibility by working out the EMI you can afford, converting
            that EMI into a loan amount using the interest rate and tenure, and then checking it
            against the property&apos;s LTV limit. The lower figure usually becomes your eligible
            amount, subject to credit and property checks.
          </p>
          <Bullets
            items={[
              'Start with monthly income. Net salary for salaried applicants, or assessed income from ITRs for self-employed applicants.',
              "Apply the lender's repayment limit (FOIR). This gives the maximum total EMI you can carry.",
              'Subtract existing EMIs. What remains is the EMI available for the home loan.',
              'Convert that EMI into a loan amount. The interest rate and the tenure your age allows decide how much principal the EMI can support.',
              "Compare with the property limit. The loan cannot exceed the LTV cap on the property's value.",
              "Final checks. Credit report, income documents, employer or business verification, and the property's legal and technical review.",
            ]}
          />
          <p>
            Some lenders also cross-check the result against an income multiple or their own product
            limits, and take the more conservative figure.
          </p>
          <DataTable
            headers={['Step', 'Calculation', 'Result']}
            rows={[
              ['1. Maximum total EMI', '50% of ₹80,000', '₹40,000'],
              ['2. EMI available for home loan', '₹40,000 − ₹12,000 existing EMI', '₹28,000'],
              ['3. Loan this EMI supports', '₹28,000 EMI at 8.5% for 20 years', 'About ₹32.3 lakh'],
              [
                '4. LTV ceiling',
                'Loan falls in the above ₹30 lakh to ₹75 lakh slab, so 80% of ₹55 lakh',
                '₹44 lakh',
              ],
              ['5. Indicative eligibility', 'Lower of ₹32.3 lakh and ₹44 lakh', 'About ₹32.3 lakh'],
              [
                '6. Own funds needed',
                '₹55 lakh − ₹32.3 lakh, plus stamp duty, registration and other costs',
                'About ₹22.7 lakh + charges',
              ],
            ]}
          />
          <p>
            In this example income, not property value, is the limiting factor. If the car loan were
            closed, the available EMI would rise to ₹40,000 and the supported loan to about ₹46.1
            lakh. The LTV cap of ₹44 lakh would then become the limit.
          </p>
        </Section>

        <Section title="Home Loan Eligibility Based on Salary">
          <p>
            Your salary sets the EMI you can afford, and that EMI decides the loan amount at a given
            rate and tenure. Roughly, a higher net salary with no other EMIs supports a larger loan,
            but the exact figure depends on the lender&apos;s repayment limit, the interest rate,
            your age and your credit profile.
          </p>
          <p className="text-sm italic text-slate-500">
            The table below shows how the maths works across salary levels. It is a teaching
            illustration, not an offer.
          </p>
          <DataTable
            headers={['Net monthly salary', 'EMI capacity (50%)', 'Illustrative loan amount']}
            rows={[
              ['₹30,000', '₹15,000', 'About ₹17.3 lakh'],
              ['₹50,000', '₹25,000', 'About ₹28.8 lakh'],
              ['₹75,000', '₹37,500', 'About ₹43.2 lakh'],
              ['₹1,00,000', '₹50,000', 'About ₹57.6 lakh'],
              ['₹1,50,000', '₹75,000', 'About ₹86.4 lakh'],
            ]}
          />
          <p>
            Your actual eligibility could be lower or higher than these figures. It will be lower if
            you have existing EMIs, a shorter tenure, a lower repayment limit or a higher rate. It
            may be higher if the lender allows a larger share of income, offers a longer tenure or
            adds a co-applicant&apos;s income. LTV limits still apply in every case.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">
            How Tenure Changes the Amount
          </h3>
          <p>
            With the same available EMI of ₹30,000 and an assumed 8.5% rate, the supported loan
            changes with tenure:
          </p>
          <DataTable
            headers={['Tenure', 'Illustrative loan amount', 'EMI per ₹1 lakh']}
            rows={[
              ['10 years', 'About ₹24.2 lakh', 'About ₹1,240'],
              ['15 years', 'About ₹30.5 lakh', 'About ₹985'],
              ['20 years', 'About ₹34.6 lakh', 'About ₹868'],
              ['25 years', 'About ₹37.3 lakh', 'About ₹805'],
              ['30 years', 'About ₹39.0 lakh', 'About ₹769'],
            ]}
          />
          <p>
            The jump is largest when moving from 10 to 20 years. Beyond that, extra years add less
            to eligibility but considerably more to total interest.
          </p>
        </Section>

        <Section title="Home Loan Eligibility for Salaried Individuals">
          <p>
            Salaried applicants are assessed mainly on net salary, job stability, employer profile,
            existing obligations and credit history. Because income is regular and easy to verify
            through salary slips, Form 16 and bank statements, the process is usually more
            straightforward than for self-employed applicants.
          </p>
          <DefinitionList
            items={[
              {
                term: 'Salary and structure',
                def: 'Lenders generally use net take-home pay. Fixed pay is usually counted in full, while variable pay, bonuses and incentives may be averaged or partly considered.',
              },
              {
                term: 'Employment history',
                def: 'Total work experience and time with the current employer help show continuity. Requirements differ by lender.',
              },
              {
                term: 'Employer profile',
                def: 'Some lenders categorise employers, such as government bodies, listed companies or established private firms, which can influence the terms offered.',
              },
              {
                term: 'Existing obligations',
                def: 'EMIs on other loans and credit card dues reduce the EMI available for a home loan.',
              },
              {
                term: 'Credit profile',
                def: 'A consistent repayment record supports both approval and pricing.',
              },
              {
                term: 'Years to retirement',
                def: 'Your age and expected retirement age can cap the tenure.',
              },
            ]}
          />
          <p>
            For more on loans built around salaried profiles, see home loans for salaried employees.
          </p>
        </Section>

        <Section title="Home Loan Eligibility for Self-Employed Individuals">
          <p>
            Yes, self-employed professionals and business owners can get a home loan. Lenders assess
            them on documented business or professional income, how stable that income has been over
            a few years, business continuity, existing obligations and credit history.
          </p>
          <p>
            Lenders often divide self-employed applicants into two groups: professionals such as
            doctors, chartered accountants, architects and lawyers, and non-professionals such as
            traders, manufacturers and service providers. Criteria and documents can differ between
            the two.
          </p>
          <DefinitionList
            items={[
              {
                term: 'Income from ITRs',
                def: 'Lenders typically review income tax returns, profit and loss statements and balance sheets for the last two to three years.',
              },
              {
                term: 'Income stability',
                def: 'Because earnings can fluctuate, many lenders average income across years rather than relying on the best year.',
              },
              {
                term: 'Deductions affect assessed income',
                def: 'Eligibility is generally based on the income you declare. Aggressive expense claims that reduce taxable income can also reduce the loan amount you qualify for.',
              },
              {
                term: 'Cash profit',
                def: 'Some lenders add back non-cash expenses such as depreciation when assessing income, which can help asset-heavy businesses.',
              },
              {
                term: 'Business continuity',
                def: 'Proof that the business has operated for a few years, often around three, is commonly required.',
              },
              {
                term: 'Banking and tax records',
                def: 'Current account statements and, where applicable, GST returns help lenders confirm that business activity matches declared income.',
              },
              {
                term: 'Obligations and credit history',
                def: 'Business loans guaranteed personally, overdrafts and personal EMIs may all be considered alongside your credit report.',
              },
            ]}
          />
          <p>Learn more about home loans for self-employed professionals and business owners.</p>
        </Section>

        <Section title="How Credit Score Affects Home Loan Eligibility">
          <p>
            A credit score does not set your loan amount on its own, but it strongly influences
            whether you are approved and at what interest rate. In India, scores from credit bureaus
            such as CIBIL range from 300 to 900. RBI does not prescribe a minimum score for home
            loans; each lender sets its own cut-offs and pricing.
          </p>
          <p>
            Scores of 750 and above are widely regarded as favourable. Lower scores do not always
            mean rejection, but they may lead to a higher rate, a lower LTV, a request for a
            co-applicant, or closer review of your repayment history.
          </p>
          <p>Lenders look beyond the number at:</p>
          <Bullets
            items={[
              'Missed or late payments and how recent they are.',
              'Accounts marked as settled or written off.',
              'How much of your credit card limit you use.',
              'Multiple loan or card applications in a short period.',
              'Your mix of secured and unsecured credit.',
            ]}
          />
          <p>
            Review your report a few months before applying so there is time to correct errors. You
            can check your credit score with Borrowww.
          </p>
        </Section>

        <Section title="How Existing EMIs Affect Home Loan Eligibility">
          <p>
            Existing EMIs reduce home loan eligibility because they use up part of the income a
            lender allows for loan repayments. Every rupee already committed is a rupee that cannot
            go towards a new home loan EMI.
          </p>
          <DataTable
            headers={['Scenario', 'EMI available for home loan', 'Illustrative loan amount']}
            rows={[
              ['No existing EMIs', '₹40,000', 'About ₹46.1 lakh'],
              ['Car loan EMI of ₹12,000', '₹28,000', 'About ₹32.3 lakh'],
            ]}
          />
          <p>
            On these assumptions, each ₹10,000 of existing EMI reduces eligibility by roughly ₹11.5
            lakh. Before applying, it can help to close small loans that are near completion, clear
            revolving credit card balances and avoid new EMI purchases.
          </p>
          <p>
            If you already have a home loan at a high rate, a lower rate through a balance transfer
            can reduce that EMI, which may free up repayment capacity for other goals.
          </p>
        </Section>

        <Section title="Documents Generally Required for Home Loan Eligibility">
          <p>
            You do not need documents for a first estimate, but lenders will ask for identity,
            address, income and property documents before approving a loan. Requirements vary by
            lender, loan type and applicant profile.
          </p>
          <DataTable
            headers={['Document type', 'Salaried', 'Self-employed']}
            rows={[
              [
                'Identity and address (KYC)',
                'PAN, Aadhaar or other officially valid documents',
                'PAN, Aadhaar or other officially valid documents',
              ],
              [
                'Income proof',
                'Recent salary slips, Form 16',
                'ITRs with computation of income, profit and loss statement, balance sheet',
              ],
              [
                'Bank statements',
                'Salary account statements for recent months',
                'Personal and business account statements, often for a longer period',
              ],
              [
                'Employment or business proof',
                'Employment details or letter, as asked',
                'Business registration, GST registration or professional certificate, as applicable',
              ],
              [
                'Property documents',
                'Sale agreement, title documents, approvals, builder documents for under-construction property',
                'Same as salaried',
              ],
            ]}
          />
          <p>
            Co-applicants usually need to submit their own KYC and income documents. For a full
            list, see our complete home loan documents checklist.
          </p>
        </Section>

        <Section title="How to Improve Your Home Loan Eligibility">
          <p>
            You can usually improve eligibility by reducing existing debt, strengthening your credit
            history, choosing a suitable tenure, adding an earning co-applicant and planning a
            larger down payment. Most of these steps take a few months, so start before you
            shortlist a property.
          </p>
          <DefinitionList
            items={[
              {
                term: 'Build a clean credit history.',
                def: 'Pay every EMI and card bill on time, keep card usage well within limits and fix errors in your credit report.',
              },
              {
                term: 'Reduce outstanding debt.',
                def: 'Close small personal loans or consumer EMIs where practical and avoid taking new credit before applying.',
              },
              {
                term: 'Keep income stable and well documented.',
                def: 'Avoid changing jobs just before applying if you can, and self-employed applicants should file ITRs on time with income that reflects the business.',
              },
              {
                term: 'Choose a suitable tenure.',
                def: 'A longer tenure raises eligibility, but check the total interest and plan for prepayments.',
              },
              {
                term: 'Add an eligible co-applicant where appropriate.',
                def: 'A spouse or parent with steady income and a good credit record can raise combined eligibility. Joint borrowers who are also co-owners may be able to claim home loan tax benefits individually, subject to tax rules.',
              },
              {
                term: 'Save for a reasonable down payment.',
                def: 'It reduces the loan you need and leaves a buffer for stamp duty, registration and moving costs.',
              },
              {
                term: 'Declare all regular income.',
                def: 'Documented rental income or regular variable pay may be considered by some lenders.',
              },
              {
                term: 'Avoid applying to many lenders at once.',
                def: 'Compare options first, then apply selectively.',
              },
            ]}
          />
          <p>
            Buying for the first time? Our guide for first-time home buyers covers budgeting and the
            purchase process.
          </p>
        </Section>

        <Section title="Common Reasons Eligibility Comes Out Lower Than Expected">
          <Bullets
            items={[
              'Existing EMIs or credit card dues that were not factored in.',
              'A shorter tenure because of age.',
              'Variable pay or business income being averaged or partly counted.',
              'A lower property valuation than the agreed price, which reduces the LTV-based limit.',
              'Credit report issues such as late payments or settled accounts.',
              'Property-related concerns, such as incomplete approvals or unclear title.',
            ]}
          />
        </Section>

        <Section title="Home Loan Eligibility Calculator">
          <p>
            A home loan eligibility calculator estimates how much you may be able to borrow using
            your income, existing EMIs, age, interest rate and tenure. It is a planning tool. It
            does not check your credit report, verify documents or assess the property, so the final
            sanctioned amount can differ.
          </p>
          <p>A good calculator should let you enter:</p>
          <Bullets
            items={[
              "Net monthly income, and a co-applicant's income if applicable.",
              'Total existing EMIs.',
              'Your age or preferred tenure.',
              'An interest rate you can change to test different scenarios.',
            ]}
          />
          <p>
            To plan with Borrowww, use the EMI calculator to see how different loan amounts, rates
            and tenures change your EMI, and compare that EMI with the share of income you are
            comfortable committing. For a profile-based assessment, share your details through the
            eligibility form and a Borrowww advisor can walk you through suitable options.
          </p>
        </Section>

        <section className="rounded-[28px] bg-[#2D3E50] p-8 text-white shadow-xl">
          <h2 className="text-2xl font-semibold">Check Your Eligibility with Borrowww</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/80">
            Borrowww helps you understand where your profile stands before you approach a lender.
            Our advisors can review your income, existing obligations and property plans, explain
            which factors are limiting your eligibility, and help you compare home loan options with
            Borrowww from the lenders we work with. Final approval, loan amount, interest rate and
            tenure are always decided by the lender after its own assessment.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#eligibility-form"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#2D3E50] transition hover:bg-slate-100"
            >
              Check My Eligibility
            </a>
            <a
              href="tel:+919560069525"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <Phone className="h-4 w-4" /> Talk to an Advisor
            </a>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Home Loan Eligibility FAQs</h2>
          <div className="mt-6 grid gap-4">
            {faqs.map((item, index) => (
              <div key={item.q} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 text-left"
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  aria-expanded={openIndex === index}
                >
                  <h3 className="text-base font-semibold text-slate-900">{item.q}</h3>
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
      </div>
    </main>
  );
}
