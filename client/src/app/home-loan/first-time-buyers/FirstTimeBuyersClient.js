'use client';

import { useState } from 'react';

import { ChevronDown, Home, Phone } from 'lucide-react';

const faqs = [
  {
    q: 'Can a first-time buyer get a home loan?',
    a: "Yes. Being a first-time buyer doesn't restrict your ability to apply for a home loan — lenders assess your application based on the usual factors such as income, credit history, existing obligations and the property being purchased, regardless of whether it's your first property or not.",
  },
  {
    q: 'What is a home loan for first-time buyers?',
    a: "It's simply a housing loan taken by someone purchasing their first property. The loan structure is the same as any other home loan; the term mainly reflects that the buyer is navigating the process — affordability, eligibility, documentation and comparison — for the first time.",
  },
  {
    q: 'How much down payment is needed for a first home?',
    a: "Lenders typically finance only part of the property's value, with the remainder paid upfront as a down payment. The exact proportion depends on regulatory guidelines, lender policy and the property itself, so it's best to confirm the applicable limit with your chosen lender rather than assuming a fixed percentage.",
  },
  {
    q: 'How is home loan eligibility calculated?',
    a: "Lenders typically assess eligibility using a combination of factors, including income, age, employment or business stability, credit history, existing financial obligations, and the loan amount and tenure requested. There's no single formula that applies across all lenders — see Borrowww's home loan eligibility page for a fuller explanation.",
  },
  {
    q: 'Does CIBIL score affect a first-time home loan?',
    a: "Yes, your credit score is generally an important input in a lender's assessment, even for first-time applicants with no prior home loan history. A stronger score may support access to more favourable terms, though it's considered alongside other factors like income and existing debt.",
  },
  {
    q: 'Can a salaried person get a home loan as a first-time buyer?',
    a: 'Yes, salaried applicants are commonly assessed using salary slips, bank statements and tax documents. Stable employment and income are generally viewed positively, though approval still depends on the complete application, including credit history and existing obligations.',
  },
  {
    q: 'Can self-employed people get a home loan for their first property?',
    a: 'Yes, self-employed applicants can apply, though the assessment usually relies more heavily on income tax returns, bank statements and business continuity rather than salary slips. Keeping financial documentation organised in advance can help streamline the process.',
  },
  {
    q: 'Can first-time buyers apply for a joint home loan?',
    a: "Yes, applying jointly with a co-applicant, such as a spouse or parent, is common and can allow the lender to consider combined income. This can affect loan amount, repayment responsibility and ownership, so it's worth understanding the implications fully, including consulting a professional for tax-related questions.",
  },
  {
    q: 'What documents are required for a first-time home loan?',
    a: "Commonly required documents include identity and address proof, income proof (salary slips or income tax returns depending on employment type), bank statements, employment or business documents, and property-related documents. Exact requirements vary by lender — see Borrowww's home loan documents page for details by borrower type.",
  },
  {
    q: 'How much EMI can a first-time buyer afford?',
    a: 'This depends on your income, existing obligations, household expenses and personal comfort with monthly outflows. Rather than relying on a fixed rule of thumb, it helps to work out a realistic monthly budget and use an EMI calculator to see how different loan amounts, tenures and rates translate into a monthly payment.',
  },
  {
    q: 'What costs should I consider besides the home loan EMI?',
    a: 'Beyond the EMI, first-time buyers should budget for the down payment, registration and stamp-related charges where applicable, processing fees, legal or technical charges, moving costs, initial furnishing, ongoing maintenance charges, and an emergency fund. These vary significantly by location and property.',
  },
  {
    q: 'How should first-time buyers compare home loan offers?',
    a: "Look beyond the advertised interest rate to the type of rate, EMI, tenure, total repayment, processing and other charges, prepayment terms, and the lender's overall terms and conditions. Comparing the complete cost of the loan, rather than a single headline figure, generally gives a more accurate picture of which offer suits you best.",
  },
];

const checklistGroups = [
  {
    title: 'Before Applying',
    items: ['Budget', 'Credit profile', 'Down payment', 'Existing debt', 'Emergency fund'],
  },
  {
    title: 'Before Choosing the Loan',
    items: ['Interest rate', 'EMI', 'Tenure', 'Total cost', 'Terms and charges'],
  },
  {
    title: 'Before Finalizing the Property',
    items: [
      'Property documents',
      'Ownership/title checks',
      'Applicable approvals',
      'Additional costs',
    ],
  },
  {
    title: 'Before Signing',
    items: ['Sanction terms', 'Loan agreement', 'Rate type', 'Charges', 'Repayment conditions'],
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

export default function FirstTimeBuyersClient() {
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
            <span className="font-medium text-slate-800">First-Time Buyers</span>
          </nav>
          <div className="mt-6 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#3A6EA5]/20 bg-white/80 px-4 py-1.5 text-sm font-medium text-[#2D3E50] shadow-sm backdrop-blur">
              <Home className="h-4 w-4 text-[#3A6EA5]" aria-hidden="true" /> Home Loan for
              First-Time Buyers
            </span>
          </div>
          <h1 className="mt-5 text-center text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Home Loan{' '}
            <span className="italic tiemposfine text-[#2D3E50]">for First-Time Buyers</span>
          </h1>
          <div className="mx-auto mt-6 max-w-3xl space-y-4 text-center text-base leading-8 text-slate-600 sm:text-lg">
            <p>
              Buying your first home involves a lot more than choosing a property you like. Before
              you get there, you need a clear picture of what you can comfortably afford, how much
              you can put down, what a lender will expect from you, and how the loan you take on
              today will play out over the next 15–25 years. A home loan for first time buyers is
              not fundamentally different from any other home loan in how it is structured, but the
              decisions around it carry extra weight simply because this is likely the largest
              financial commitment you have made so far.
            </p>
            <p className="text-base">
              This page walks through the first-time home buyer journey — from understanding
              affordability and eligibility to documentation, interest rates, EMI planning and the
              costs that often get overlooked. Wherever a topic has its own dedicated page on
              Borrowww, we&apos;ve kept the explanation here brief and pointed you to the detailed
              page for the specifics.
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
        <Section title="What Is a Home Loan for First-Time Buyers?">
          <p>
            A home loan for first-time buyers is simply a housing loan taken by someone purchasing
            property for the first time. The loan mechanics — principal, interest, EMI, tenure —
            work the same way as for any other home loan. What differs is that first-time buyers are
            usually navigating several new concepts at once, often without the benefit of having
            gone through the process before.
          </p>
          <p>As a first-time buyer, you will generally need to think through:</p>
          <Bullets
            items={[
              'Property affordability relative to your income and savings.',
              'The down payment you can realistically arrange.',
              'The loan amount you may need and can comfortably repay.',
              'The EMI, tenure and interest rate that will apply to your loan.',
              'Your eligibility as assessed by the lender.',
              'The documentation the lender will require.',
              'Additional costs beyond the property price and loan itself.',
            ]}
          />
          <p>
            It&apos;s worth noting that first-time buyers do not automatically receive special
            interest rates or relaxed eligibility criteria unless a specific lender scheme or
            government-linked programme explicitly provides for it. Always verify with the lender
            whether any such scheme applies to your situation rather than assuming it by default.
          </p>
        </Section>

        <Section title="How Does a Home Loan Work for a First-Time Buyer?">
          <p>
            While the exact process can vary by lender and property type, the broad journey usually
            looks like this:
          </p>
          <Bullets
            items={[
              'Assess your budget, including income, expenses and existing obligations.',
              'Check your likely loan eligibility before you start property hunting.',
              'Compare loan options across a few lenders.',
              'Arrange your down payment and confirm the funds are available.',
              'Select a property that fits your budget and requirements.',
              'Prepare the documents the lender will need.',
              'Submit your loan application.',
              'The lender evaluates you as a borrower as well as the property.',
              'On approval, you receive the sanction letter and complete the loan documentation.',
              'The loan amount is disbursed according to the applicable terms and construction/purchase stage.',
            ]}
          />
          <p>
            Some steps may happen in a different order — for instance, some buyers finalise a
            property before checking eligibility — but starting with a realistic budget and
            eligibility check generally makes the rest of the process smoother.
          </p>
        </Section>

        <Section title="How Much Home Can a First-Time Buyer Afford?">
          <p>
            It&apos;s useful to separate two different questions: how much loan you may be eligible
            for, and how much you can comfortably afford to repay. Lenders assess eligibility based
            on their own criteria, but that figure doesn&apos;t always account for your full
            financial picture — your lifestyle, savings goals, or how comfortable you want to be
            month to month.
          </p>
          <p>When estimating a comfortable budget, it helps to look at:</p>
          <Bullets
            items={[
              'Your current monthly income and how stable it is.',
              'Any existing EMIs or recurring debt obligations.',
              'Regular household expenses.',
              'The down payment you can arrange without depleting your savings entirely.',
              'The EMI you would be comfortable paying every month for the loan tenure.',
              'The loan tenure and interest rate, which together with the loan amount determine the EMI.',
              "An emergency fund you'd want to keep untouched, separate from the down payment.",
              'Other home-buying expenses that come up alongside the loan and down payment.',
            ]}
          />
          <p>
            There isn&apos;t a single income-to-loan ratio that applies universally — this depends
            on the lender&apos;s policies and your individual financial situation. Rather than
            borrowing the maximum amount a lender may be willing to offer, it&apos;s generally worth
            working backwards from an EMI you&apos;re genuinely comfortable with, factoring in some
            room for unexpected expenses or income fluctuations.
          </p>
        </Section>

        <Section title="Home Loan Eligibility for First-Time Buyers">
          <p>
            Lenders typically assess a combination of factors before approving a home loan
            application. As a first-time buyer, it helps to understand these broadly before you
            apply:
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">Age</h3>
          <p>
            Your age at the time of application, and the age you will be at the end of the loan
            tenure, can influence the maximum tenure a lender is willing to offer.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">Income</h3>
          <p>
            Your income level and stability are typically central to how a lender assesses your
            repayment capacity.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">
            Employment or Business Profile
          </h3>
          <p>
            Whether you are salaried or self-employed, and how stable your employment or business
            history is, is usually considered as part of the evaluation.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">Credit History</h3>
          <p>
            Your credit score and past repayment behaviour give lenders an indication of credit
            discipline, and are usually an important part of the assessment.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">
            Existing Financial Obligations
          </h3>
          <p>
            Any ongoing loans or credit obligations are typically factored in while assessing how
            much additional EMI you can reasonably take on.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">Property Details</h3>
          <p>
            The property being purchased, including its legal and technical status, is usually
            reviewed by the lender as part of the loan process.
          </p>

          <h3 className="pt-2 text-xl font-semibold text-slate-900">Loan Amount and Tenure</h3>
          <p>
            The amount you&apos;re requesting and the tenure you choose can also influence the
            lender&apos;s assessment and the terms offered.
          </p>
          <p>
            None of these factors guarantees eligibility on its own — lenders generally look at your
            profile holistically. For a more detailed breakdown of how this works, see
            Borrowww&apos;s home loan eligibility criteria page.
          </p>
        </Section>

        <Section title="How Much Down Payment Is Needed for a First Home?">
          <p>
            The down payment is the portion of the property&apos;s value that you pay upfront, from
            your own funds, rather than through the loan. Lenders generally finance only part of the
            property&apos;s value, which means you&apos;ll need to arrange the remaining amount
            yourself.
          </p>
          <p>
            The exact proportion a lender will finance depends on regulatory guidelines, the
            lender&apos;s own policy, and factors like the property value and type. Rather than
            assuming a fixed percentage, it&apos;s best to confirm the applicable financing limit
            directly with the lender you&apos;re considering, since this can vary and change over
            time.
          </p>
          <p>
            It&apos;s also worth planning for more than just the down payment. Buyers sometimes
            stretch their savings entirely to meet the down payment and are then caught off guard by
            registration charges, processing fees, or moving costs that come up around the same
            time. Keeping a buffer beyond the minimum down payment required is generally a sound
            approach.
          </p>
        </Section>

        <Section title="Home Loan Interest Rates for First-Time Buyers">
          <p>
            The interest rate is the cost a lender charges for the loan, usually expressed as an
            annual percentage of the outstanding amount. It&apos;s one of the biggest factors
            affecting your EMI and the total amount you&apos;ll repay over the loan tenure.
          </p>
          <p>
            Home loans are generally offered under fixed or floating rate structures. A fixed rate
            stays unchanged for a defined period, offering predictable EMIs, while a floating rate
            is linked to a benchmark and can move up or down over the tenure. Neither is universally
            better — the right fit depends on your comfort with potential EMI changes and how long
            you expect to hold the loan.
          </p>
          <p>
            It&apos;s a common misconception that first-time buyers automatically receive the lowest
            advertised rate. In practice, the rate you&apos;re offered depends on factors such as
            your credit profile, income, loan amount, tenure and the lender&apos;s own assessment at
            the time — advertised rates are usually a starting point, not a guarantee for every
            applicant. It&apos;s worth comparing the complete loan cost, not just the headline rate,
            across a few lenders. You can read more on Borrowww&apos;s home loan interest rates
            page.
          </p>
        </Section>

        <Section title="Choosing the Right Home Loan Tenure">
          <p>
            Loan tenure has a direct effect on both your EMI and the total interest you&apos;ll pay.
            A longer tenure generally results in a lower EMI but a higher total interest outgo over
            the life of the loan, since interest accrues over a longer period. A shorter tenure
            increases the EMI but usually reduces the total interest paid.
          </p>
          <p>
            There&apos;s no universally correct tenure — it comes down to balancing monthly
            affordability against the overall cost of the loan, and factoring in your income growth
            expectations, other financial goals, and how many years you have left until retirement
            or other major life changes. It&apos;s worth running a few different tenure options
            through the numbers before deciding.
          </p>
        </Section>

        <Section title="Home Loan EMI Planning for First-Time Buyers">
          <p>
            Your EMI is calculated using three variables: the loan amount, the interest rate, and
            the tenure. Each EMI you pay is split between an interest component and a principal
            component — in the earlier years of the loan, a larger portion typically goes towards
            interest, shifting gradually towards principal as the outstanding balance reduces.
          </p>
          <p>
            Estimating your EMI before you finalise a property, rather than after, gives you a
            realistic sense of whether a particular price range actually fits your monthly budget.
            It also helps you compare how changing the loan amount or tenure affects your monthly
            outflow.
          </p>
          <p>
            Illustrative example (hypothetical, not an actual lender offer): for a loan of
            ₹40,00,000 over a 20-year tenure, a small change in the assumed interest rate — say,
            from 8% to 9% per annum — would noticeably change both the EMI and the total interest
            paid over the tenure. These numbers are purely illustrative and are meant to show the
            relationship between rate, tenure and EMI, not to represent a current or guaranteed
            rate.
          </p>
          <p>
            You can test different loan amounts, tenures and rates for your own situation using
            Borrowww&apos;s home loan EMI calculator before you commit to a specific property or
            lender.
          </p>
        </Section>

        <Section title="Documents First-Time Home Buyers May Need">
          <p>
            Exact documentation requirements vary by lender and by whether you&apos;re salaried or
            self-employed, but first-time buyers commonly need to submit:
          </p>
          <Bullets
            items={[
              'Identity and address proof.',
              'Income proof, such as salary slips for salaried applicants.',
              'Recent bank statements.',
              'Income tax returns, where applicable.',
              'Employment or business-related documents.',
              'Property-related documents for the home being purchased.',
              'Any other documents the specific lender may request.',
            ]}
          />
          <p>
            Since this is often the first time you&apos;re compiling this kind of paperwork, it
            helps to start early and keep documents organised. For a fuller breakdown by borrower
            type, see Borrowww&apos;s home loan documents page.
          </p>
        </Section>

        <Section title="Home Loan for Salaried First-Time Buyers">
          <p>
            Salaried applicants typically have a documented, regular income, which lenders often
            find straightforward to assess through salary slips, bank statements and Form 16 or
            equivalent tax documents. Employment history and continuity, existing obligations such
            as other loans or credit cards, and overall credit profile are usually reviewed
            alongside income.
          </p>
          <p>
            Having a stable salaried income is generally viewed as a positive input, but it does not
            by itself guarantee approval — lenders still assess the complete application, including
            credit history and existing debt.
          </p>
        </Section>

        <Section title="Home Loan for Self-Employed First-Time Buyers">
          <p>
            Self-employed applicants are usually assessed differently, since income can vary year to
            year and isn&apos;t captured through salary slips. Lenders commonly look at income tax
            returns over a few years, bank statements, business continuity and stability, financial
            statements where applicable, existing obligations, and credit history.
          </p>
          <p>
            Because the assessment process can involve more documentation and scrutiny of business
            income, it&apos;s worth keeping financial records well organised well in advance of
            applying. As with salaried applicants, meeting these criteria does not guarantee a
            specific loan amount or approval — it depends on the lender&apos;s complete evaluation.
          </p>
        </Section>

        <Section title="Can Two First-Time Buyers Apply Together?">
          <p>
            Yes, many first-time buyers apply jointly — commonly with a spouse, parent or sibling —
            as co-applicants. A joint home loan generally allows lenders to consider the combined
            income of both applicants, which can affect the loan amount that may be considered. Both
            co-applicants are typically responsible for repayment, and ownership of the property is
            usually linked to how the applicants are named on the property documents.
          </p>
          <p>
            Joint applications also involve additional documentation for each applicant, and there
            can be tax implications depending on individual circumstances. Since these details
            depend on personal financial and legal circumstances, it&apos;s advisable to consult a
            qualified tax or legal professional for guidance specific to your situation rather than
            relying solely on general information. You can read more on Borrowww&apos;s joint home
            loan page.
          </p>
        </Section>

        <Section title="Other Costs First-Time Buyers Should Budget For">
          <p>
            The property price and monthly EMI are usually the most visible numbers, but they
            aren&apos;t the only costs involved in buying a first home. It&apos;s worth budgeting
            for:
          </p>
          <Bullets
            items={[
              'The down payment itself.',
              'Registration and stamp-related charges, where applicable, which vary by state and property value.',
              'Loan processing fees charged by the lender.',
              'Legal or technical valuation charges, where applicable.',
              'Insurance costs, if opted for or required.',
              'Moving and relocation costs.',
              'Initial furnishing, fittings or minor repairs.',
              'Ongoing maintenance or society-related charges, where applicable.',
              'An emergency fund kept aside, separate from all of the above.',
            ]}
          />
          <p>
            These costs can add up to a meaningful amount over and above the property price, and
            they vary significantly by location, property type and the specific transaction.
            It&apos;s worth getting a realistic estimate of these before you commit to a purchase,
            rather than discovering them midway through the process.
          </p>
        </Section>

        <Section title="How First-Time Buyers Can Prepare Before Applying for a Home Loan">
          <p>A little preparation before you apply can make the process considerably smoother:</p>
          <Bullets
            items={[
              'Review your monthly income and expenses realistically.',
              'Check your credit history and score in advance.',
              'Calculate the down payment you can genuinely arrange.',
              'Estimate an EMI you would be comfortable paying, not just the maximum eligible amount.',
              'Pay down unnecessary existing debt where possible.',
              'Organise your income and financial documents in advance.',
              'Compare loan terms across a few lenders rather than approaching just one.',
              'Research the property thoroughly, including its legal status.',
              'Keep an emergency fund untouched, separate from your down payment.',
              'Read the final loan agreement carefully before signing.',
            ]}
          />
        </Section>

        <Section title="Common Mistakes First-Time Home Buyers Should Avoid">
          <p>
            A few patterns tend to come up repeatedly among first-time buyers, and being aware of
            them in advance can help:
          </p>
          <Bullets
            items={[
              "Choosing a property based purely on the maximum loan amount you're eligible for, rather than what's comfortable.",
              'Overlooking additional purchase-related costs beyond the property price.',
              'Comparing lenders only on the advertised interest rate, without checking the complete cost.',
              'Picking a tenure without considering its effect on total interest or monthly cash flow.',
              'Not reviewing existing debt obligations before estimating affordability.',
              'Skipping a credit history check before applying.',
              'Submitting incomplete or inconsistent documentation.',
              'Deciding based on EMI alone, without looking at total repayment over the tenure.',
              'Skipping legal or technical checks on the property.',
              'Not reading the loan terms and conditions carefully before signing.',
            ]}
          />
          <p>
            None of these are unusual mistakes — they&apos;re simply easy to overlook when
            you&apos;re navigating the process for the first time, which is exactly why it helps to
            go in prepared.
          </p>
        </Section>

        <Section title="How to Compare Home Loans as a First-Time Buyer">
          <p>
            When comparing offers from different lenders, it helps to look at the complete picture
            rather than a single number:
          </p>
          <Bullets
            items={[
              'Interest rate offered to you specifically.',
              'Type of rate — fixed, floating or hybrid.',
              'Loan amount being offered.',
              'Resulting EMI.',
              'Tenure options available.',
              'Total repayment over the full tenure.',
              'Processing fees and other applicable charges.',
              'Prepayment or foreclosure terms.',
              'Reset mechanism, for floating rate loans.',
              'Documentation requirements.',
              'Overall lender terms and conditions.',
              'Your own eligibility and how it may affect the final offer.',
            ]}
          />
          <p>
            The lowest advertised rate isn&apos;t necessarily the best overall deal once charges,
            terms and your specific eligibility are factored in — comparing the complete cost of the
            loan generally gives a more accurate picture.
          </p>
        </Section>

        <Section title="First-Time Home Buyer Checklist">
          <div className="grid gap-4 sm:grid-cols-2">
            {checklistGroups.map((group) => (
              <div
                key={group.title}
                className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 transition-all duration-300 hover:border-[#3A6EA5]/30 hover:shadow-sm"
              >
                <h4 className="font-semibold text-slate-900">{group.title}</h4>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3A6EA5]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-7 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#2D3E50]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#2D3E50]">
              FAQ
            </span>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
              Frequently Asked Questions About Home Loans for First-Time Buyers
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
                Start Your First Home Loan Journey With Borrowww
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/85">
                Buying your first home is a significant milestone, and understanding the process —
                affordability, eligibility, documentation, interest rates and the true cost of
                borrowing — puts you in a much stronger position to make an informed decision. Loan
                terms, rates and requirements vary across lenders and change over time, so it&apos;s
                always worth verifying the latest applicable details directly with the lender before
                you commit.
              </p>
              <p className="mt-4 text-sm leading-7 text-white/85">
                Ready to explore your options? Visit Borrowww&apos;s home loan page to get started,
                check your eligibility, review the documents you&apos;ll likely need, and use the
                EMI calculator to plan your budget before you start house-hunting.
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
