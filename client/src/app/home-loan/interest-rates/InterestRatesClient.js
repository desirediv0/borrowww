'use client';

import { useState } from 'react';

import { ChevronDown, Home, Phone } from 'lucide-react';

const faqs = [
  {
    q: 'What are home loan interest rates?',
    a: 'A home loan interest rate is the cost a lender charges, expressed as an annual percentage of the outstanding loan amount, for lending you money to buy or construct a property. It is combined with the loan amount and tenure to calculate your EMI, and it directly affects the total amount you repay over the life of the loan.',
  },
  {
    q: 'How is a home loan interest rate decided?',
    a: 'Lenders typically assess a combination of factors, including your credit score and history, income and employment profile, existing financial obligations, the loan amount and tenure requested, the property being financed, and prevailing market conditions. The final rate offered is usually based on this overall assessment rather than any single factor.',
  },
  {
    q: 'Does credit score affect home loan interest rates?',
    a: 'Credit score and repayment history are generally considered important inputs while assessing an application, since they indicate how reliably you have managed credit in the past. A stronger credit profile may support access to more competitive terms, though it is evaluated alongside other factors rather than in isolation.',
  },
  {
    q: 'Which is better, fixed or floating home loan interest rate?',
    a: 'Neither option is universally better. A fixed rate offers predictable EMIs for a defined period but may not reduce if market rates fall, while a floating rate is linked to a benchmark and can move up or down over the tenure. The right choice depends on your risk appetite, expected holding period and comfort with EMI fluctuations.',
  },
  {
    q: 'How does the interest rate affect home loan EMI?',
    a: 'The interest rate is one of three inputs — along with loan amount and tenure — used to calculate EMI. A higher rate increases the EMI for the same loan amount and tenure, while a lower rate reduces it. Even a modest change in the rate can noticeably change the EMI and total interest paid over a long tenure.',
  },
  {
    q: 'Can home loan interest rates change during the loan tenure?',
    a: 'Yes, if you have a floating rate loan, the applicable rate can change when the underlying benchmark is revised, which may affect your EMI or the remaining tenure. Fixed rate loans generally remain unchanged during the fixed period, though the exact terms — including whether the fixed period covers the entire tenure — vary by lender and product.',
  },
  {
    q: 'Can I negotiate my home loan interest rate?',
    a: 'Some lenders may consider requests for a better rate, particularly for applicants with a strong credit profile, stable income or an existing relationship with the lender. However, this is entirely at the lender’s discretion and is not guaranteed. Comparing offers from multiple lenders is generally a more reliable way to assess whether you are getting reasonable terms.',
  },
  {
    q: 'How can I reduce the total interest paid on a home loan?',
    a: 'Total interest paid can potentially be reduced by choosing a shorter tenure where affordable, making prepayments towards the principal when the lender’s terms allow it, maintaining a strong credit profile, and comparing offers to secure more favourable terms. Using an EMI calculator can help you evaluate how different choices affect the total interest outgo.',
  },
  {
    q: 'Does loan tenure affect the total interest payable?',
    a: 'Yes. A longer tenure generally reduces the EMI but increases the total interest paid over the life of the loan, since interest accrues over a longer period. A shorter tenure increases the EMI but usually reduces the total interest paid. Choosing a tenure involves balancing monthly affordability against overall cost.',
  },
  {
    q: 'What should I compare apart from the home loan interest rate?',
    a: 'Beyond the interest rate, it is worth comparing the type of rate (fixed or floating), the benchmark and reset mechanism, tenure, processing and other charges, prepayment or foreclosure terms, the resulting EMI, total repayment amount, and the overall loan terms and conditions. Comparing only the headline rate can miss significant differences in the total cost of borrowing.',
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

export default function InterestRatesClient() {
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
            <span className="font-medium text-slate-800">Interest Rates</span>
          </nav>
          <div className="mt-6 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#3A6EA5]/20 bg-white/80 px-4 py-1.5 text-sm font-medium text-[#2D3E50] shadow-sm backdrop-blur">
              <Home className="h-4 w-4 text-[#3A6EA5]" aria-hidden="true" /> Home Loan Interest
              Rates
            </span>
          </div>
          <h1 className="mt-5 text-center text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Home Loan <span className="italic tiemposfine text-[#2D3E50]">Interest Rates</span>
          </h1>
          <div className="mx-auto mt-6 max-w-3xl space-y-4 text-center text-base leading-8 text-slate-600 sm:text-lg">
            <p>
              When you take a home loan, the interest rate is one of the biggest factors that
              decides how much the loan will actually cost you. Two borrowers taking the same loan
              amount for the same tenure can end up paying very different totals simply because of
              the rate attached to their loan. Over a repayment period of 15, 20 or 25 years, even a
              small difference in the home loan interest rate can change your EMI and add up to a
              substantial difference in the total amount you repay.
            </p>
            <p className="text-base">
              This page explains how home loan interest rates work, what lenders typically consider
              while pricing a loan, the difference between fixed and floating rate structures, and
              how you can compare offers more effectively. The goal is to help you understand the
              mechanics clearly, not to promise a specific rate, since actual home loan interest
              rates depend on the lender, your profile and prevailing market conditions at the time
              you apply.
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
              Compare Offers
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
        <Section title="What Are Home Loan Interest Rates?">
          <p>
            A home loan interest rate is the cost charged by a lender for lending you money to
            purchase, construct or renovate a property. It is usually expressed as an annual
            percentage of the outstanding loan amount, and it is the mechanism through which the
            lender earns a return on the funds it has lent.
          </p>
          <p>
            When you repay a home loan, each instalment is generally split into two parts: the
            principal (the portion that reduces your outstanding loan balance) and the interest (the
            cost of borrowing on the balance still outstanding). The interest rate, the loan amount
            and the tenure together determine your EMI, or Equated Monthly Instalment — the fixed
            monthly payment you make until the loan is repaid.
          </p>
          <p>
            Because home loans usually run for many years, the interest rate has a compounding
            effect on the total cost of the loan. A rate that looks only marginally higher on paper
            can translate into a meaningfully larger outflow by the end of the tenure, which is why
            understanding how the rate is calculated and applied is an important part of planning a
            home purchase.
          </p>
        </Section>

        <Section title="How Home Loan Interest Rates Work">
          <p>The mechanics of a home loan are built around four core elements:</p>
          <Bullets
            items={[
              'Principal amount: the amount you borrow from the lender.',
              'Interest rate: the annual rate applied to the outstanding principal.',
              'Loan tenure: the period over which you repay the loan.',
              'EMI: the fixed monthly payment calculated using the principal, rate and tenure.',
            ]}
          />
          <p>
            In the early years of a home loan, a larger share of each EMI typically goes towards
            interest, because the outstanding principal is still high. As you continue repaying, the
            outstanding principal reduces, and over time a larger share of the EMI goes towards the
            principal component. This is a standard feature of amortising loans and is not specific
            to any single lender.
          </p>
          <p>
            This is also why prepaying a portion of the loan, where the lender&apos;s terms allow
            it, can reduce the outstanding principal earlier and potentially lower the total
            interest paid over the life of the loan. You can use a home loan EMI calculator to see
            how changes in tenure or prepayment can affect your EMI and overall interest outgo for
            different scenarios.
          </p>
        </Section>

        <Section title="What Determines Your Home Loan Interest Rate?">
          <p>
            Lenders do not offer the same interest rate to every applicant. The rate you are offered
            is usually based on an assessment of several factors together, rather than any single
            factor in isolation. The sections below explain the broad considerations that commonly
            influence pricing.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">
            Credit Score and Credit History
          </h3>
          <p>
            Your credit score and repayment history give lenders an indication of how reliably you
            have handled past credit obligations. A strong, well-maintained credit history is
            generally viewed favourably, while a history of missed or delayed payments may affect
            the rate or terms offered. You can read more about how this is assessed on the home loan
            CIBIL score page.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">
            Income and Employment Profile
          </h3>
          <p>
            Your income level, stability of employment and the nature of your profession (salaried
            or self-employed) are typically considered while assessing risk and repayment capacity.
            Applicants with stable and well-documented income sources may find it easier to access
            competitive terms, though this is one input among several.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">Loan Amount</h3>
          <p>
            The size of the loan relative to the property value and your income can influence the
            terms offered. Lenders often assess whether the requested loan amount is comfortably
            serviceable based on your income and existing obligations.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">Loan Tenure</h3>
          <p>
            The tenure you choose affects both your EMI and the total interest payable. A longer
            tenure usually reduces the EMI but can increase the total interest paid over the life of
            the loan, while a shorter tenure typically does the opposite. Tenure can also be a
            factor that lenders weigh while structuring an offer.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">
            Property and Loan-to-Value Considerations
          </h3>
          <p>
            The property being financed, including factors such as its legal status, location and
            market value, is generally assessed by the lender. The loan-to-value (LTV) ratio — the
            proportion of the property&apos;s value being financed through the loan — is also
            typically taken into account.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">
            Existing Financial Obligations
          </h3>
          <p>
            Any existing loans, credit card balances or other financial commitments are usually
            reviewed as part of assessing your overall repayment capacity. Higher existing
            obligations relative to income may influence the terms a lender is willing to offer.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">
            Relationship With the Lender
          </h3>
          <p>
            Some lenders may consider an applicant&apos;s existing relationship with them, such as a
            salary account, prior loans or other banking history, as one of several inputs while
            evaluating an application. This varies by lender and is not a guaranteed factor in every
            case.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">
            Market and Lending Conditions
          </h3>
          <p>
            Broader market conditions, the lender&apos;s cost of funds, applicable regulatory
            benchmarks and internal lending policies also play a role in how interest rates are set
            and revised from time to time. These conditions can change, which is one reason
            advertised rates are typically described as starting from a certain level rather than
            fixed for all applicants at all times.
          </p>
          <p>
            It is worth remembering that no single factor discussed above determines approval or
            pricing on its own — lenders typically evaluate applications holistically. You can check
            the general criteria lenders look for on the home loan eligibility page and see the
            documentation usually required on the home loan documents page.
          </p>
        </Section>

        <Section title="Fixed vs Floating Home Loan Interest Rates">
          <p>
            Home loans are generally offered under two broad interest rate structures: fixed and
            floating. Understanding how each works can help you evaluate which structure may suit
            your situation.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">
            Fixed Home Loan Interest Rate
          </h3>
          <p>
            Under a fixed rate structure, the interest rate remains unchanged for a specified
            period, or in some cases for the entire tenure, regardless of movements in the broader
            market. This can make EMIs predictable during that period, which some borrowers find
            useful for budgeting purposes. However, fixed rates offered by lenders may sometimes be
            higher than prevailing floating rates, and borrowers may not automatically benefit if
            market rates fall during the fixed period. The exact terms, including whether the rate
            is fixed for the full tenure or only an initial period, vary by lender and loan product.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">
            Floating Home Loan Interest Rate
          </h3>
          <p>
            A floating interest rate is linked to a benchmark rate determined by the lender (such as
            an external benchmark rate mandated by the Reserve Bank of India, or an internal
            reference rate, depending on the lender&apos;s structure). As the benchmark moves, the
            applicable interest rate — and consequently the EMI or tenure — may be revised
            periodically. Floating rates can offer the potential benefit of lower interest costs if
            the benchmark declines, but they also carry the possibility of the rate increasing if
            the benchmark rises. The specific reset frequency and benchmark used should always be
            confirmed with the lender.
          </p>
          <p>
            Neither structure is universally better — the right choice depends on your risk
            appetite, how long you intend to hold the loan, your expectations about future rate
            movements, and how comfortable you are with potential EMI fluctuations. It is advisable
            to read the specific terms and conditions applicable to your loan, including reset
            clauses and conversion options, before deciding between a fixed or floating home loan
            interest rate.
          </p>
        </Section>

        <Section title="How Home Loan Interest Rates Affect Your EMI">
          <p>
            Your EMI is a function of three variables: the loan amount (principal), the interest
            rate, and the tenure. A higher interest rate increases the EMI for a given loan amount
            and tenure, while a lower rate reduces it. Similarly, for the same interest rate, a
            longer tenure lowers the EMI but increases the total interest paid over the life of the
            loan, and a shorter tenure raises the EMI while reducing the total interest paid.
          </p>
          <p>
            Illustrative example (not a real or current offer): Suppose a borrower takes a home loan
            of ₹50,00,000 for a tenure of 20 years. If the applicable interest rate were,
            hypothetically, around 9% per annum, the EMI would be higher than it would be at a
            hypothetical rate of 8% per annum for the same amount and tenure — and the total
            interest paid over 20 years would also be noticeably higher at the higher rate. These
            figures are purely illustrative to demonstrate the relationship between rate, EMI and
            total interest; they are not indicative of any current or lender-specific rate.
          </p>
          <p>
            To see how a specific loan amount, tenure and interest rate would translate into an EMI
            for your own planning, you can use the home loan EMI calculator, which lets you test
            different combinations rather than relying on a single assumed figure.
          </p>
        </Section>

        <Section title="How to Compare Home Loan Interest Rates">
          <p>
            The advertised or starting interest rate is often just one part of the picture. It
            usually represents the best-case rate a lender may offer to borrowers with a particular
            profile, and the rate actually offered to you may differ. When comparing home loan
            offers, it helps to look beyond the headline rate at the following:
          </p>
          <Bullets
            items={[
              'Interest rate offered: the specific rate quoted to you, not just the advertised starting rate.',
              'Type of rate: whether it is fixed, floating, or a hybrid structure.',
              'Benchmark and reset mechanism: for floating rates, how frequently the rate can be revised and which benchmark it is linked to.',
              'Loan tenure: the repayment period being offered and how it affects EMI and total cost.',
              'Processing and other charges: processing fees, administrative charges and any other applicable costs.',
              'Prepayment and foreclosure terms: whether charges apply for prepaying or closing the loan early, where applicable.',
              'EMI amount: the actual monthly outflow based on the final terms offered.',
              'Total repayment: the overall amount you will pay over the full tenure, including interest.',
              'Loan terms and conditions: clauses related to rate revision, conversion options and other conditions.',
              'Borrower-specific eligibility: how your own profile may affect the final rate and terms offered.',
            ]}
          />
          <p>
            Comparing only the headline interest rate can be misleading, since two offers with the
            same advertised rate can differ significantly once charges, tenure and terms are
            factored in. A meaningful comparison looks at the overall cost and suitability of the
            loan, not the rate in isolation.
          </p>
        </Section>

        <Section title="How to Get a Better Home Loan Interest Rate">
          <p>
            While no platform or lender can guarantee a specific interest rate, there are legitimate
            steps that may improve your chances of accessing more competitive terms:
          </p>
          <Bullets
            items={[
              'Maintaining a strong and consistent credit history over time.',
              'Keeping existing debt obligations at a manageable level relative to your income.',
              'Choosing a loan amount that is well aligned with your repayment capacity.',
              'Selecting a tenure that balances EMI affordability with total interest cost.',
              'Comparing offers from multiple lenders before finalising a loan.',
              'Maintaining accurate, complete and up-to-date income and financial documentation.',
              'Evaluating the overall cost of the loan, including charges, rather than the rate alone.',
            ]}
          />
          <p>
            These are general good practices rather than guarantees, and the final rate offered will
            still depend on the lender&apos;s own assessment and policies at the time of
            application.
          </p>
        </Section>

        <Section title="Home Loan Interest Rates for Different Borrower Profiles">
          <p>
            Interest rates and terms offered can vary depending on a borrower&apos;s profile, since
            lenders assess each application individually. Some broad examples of how profiles can
            differ include:
          </p>
          <Bullets
            items={[
              'Salaried applicants: often have documented, regular income, which lenders may find easier to assess.',
              'Self-employed applicants: may be assessed using business income, tax filings and other financial documents, which can involve a different evaluation process.',
              'Applicants with strong credit profiles: a consistent repayment history may be viewed favourably during assessment.',
              'Applicants with existing liabilities: significant existing debt may be factored into the lender’s overall risk assessment.',
              'Joint home loan applicants: combining income with a co-applicant may affect eligibility and the loan amount that can be considered.',
            ]}
          />
          <p>
            None of these profiles is assigned a fixed or predetermined rate — the examples above
            simply illustrate that a lender&apos;s assessment is individualised rather than uniform
            across all applicants.
          </p>
        </Section>

        <Section title="Home Loan Interest Rate vs Overall Loan Cost">
          <p>
            The interest rate is a central factor in the cost of a home loan, but it is not the only
            one. Charges such as processing fees, administrative fees, legal and technical valuation
            charges, insurance (where applicable) and prepayment or foreclosure charges can all add
            to the total cost of borrowing. Two loans with an identical interest rate can therefore
            have a different overall cost once these charges are taken into account.
          </p>
          <p>
            Because of this, it is useful to review the complete set of loan terms — not the
            interest rate in isolation — before deciding on a lender or a specific loan product.
            Reading the sanction letter and loan agreement carefully, and asking the lender to
            clarify any charges you don&apos;t understand, is a reasonable and prudent step before
            signing.
          </p>
        </Section>

        <Section title="Factors to Check Before Choosing a Home Loan">
          <p>
            Before finalising a home loan, it can help to run through a short checklist covering the
            aspects that materially affect your borrowing experience:
          </p>
          <Bullets
            items={[
              'Interest rate offered to you specifically, not just the advertised rate.',
              'EMI affordability relative to your monthly income and expenses.',
              'Loan tenure and how it affects both EMI and total interest.',
              'Total repayment amount over the full tenure.',
              'Applicable charges, including processing and other fees.',
              'Rate type — fixed, floating or hybrid.',
              'Reset conditions applicable to floating rates.',
              'Prepayment and foreclosure conditions.',
              'Your eligibility based on income, credit profile and other criteria.',
              'Overall lender terms and conditions, including any conversion options.',
            ]}
          />
          <p>
            If you would like to check your standing against typical lending criteria before
            applying, the home loan eligibility page outlines the broad parameters lenders generally
            consider. If you already have an existing home loan and are exploring whether switching
            lenders could reduce your interest cost, the home loan balance transfer page explains
            how that process typically works. Borrowers looking specifically for cost-conscious
            options may also find the affordable home loan page useful.
          </p>
        </Section>

        <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-7 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#2D3E50]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#2D3E50]">
              FAQ
            </span>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
              Frequently Asked Questions About Home Loan Interest Rates
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
                Understanding how home loan interest rates are determined — and what you can
                reasonably compare and check — puts you in a better position to evaluate offers
                rather than relying on the headline rate alone. Rates, charges and terms vary across
                lenders and change over time, so it is always worth verifying the latest applicable
                terms directly with the lender before making a decision.
              </p>
              <p className="mt-4 text-sm leading-7 text-white/85">
                Looking to understand your home loan options? Explore Borrowww&apos;s home loan
                resources to compare the factors that can influence your borrowing decision, check
                your eligibility, review the documents you may need, and use the EMI calculator to
                plan your repayment before you apply.
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
