import { buildMetadata } from '@/lib/seo';

import FirstTimeBuyersClient from './FirstTimeBuyersClient';

export const metadata = buildMetadata({
  title: 'Home Loan for First-Time Buyers | Borrowww',
  description:
    'Planning your first home purchase? Learn how a home loan for first-time buyers works: affordability, eligibility, documents, rates and EMI planning.',
  path: '/home-loan/first-time-buyers',
  keywords: [
    'home loan for first-time buyers',
    'first time home buyer loan',
    'first home loan eligibility',
    'down payment first home',
    'first time home buyer documents',
    'first home loan EMI planning',
  ],
});

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can a first-time buyer get a home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Being a first-time buyer does not stop you applying for a home loan. Lenders assess your application on the usual factors, such as income, credit history, existing obligations and the property being purchased, whether or not it is your first property.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a home loan for first-time buyers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It is simply a housing loan taken by someone purchasing their first property. The loan structure is the same as any other home loan; the term simply means the buyer is going through affordability, eligibility, documentation and loan comparison for the first time.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much down payment is needed for a first home?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lenders typically finance only part of the property value, with the remainder paid upfront as a down payment. The exact proportion depends on regulatory guidelines, lender policy and the property itself, so it is best to confirm the applicable limit with your chosen lender rather than assuming a fixed percentage.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is home loan eligibility calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lenders typically assess eligibility using a combination of factors, including income, age, employment or business stability, credit history, existing financial obligations, and the loan amount and tenure requested. There is no single formula that applies across all lenders.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does CIBIL score affect a first-time home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, your credit score is generally an important input in a lender’s assessment, even for first-time applicants with no prior home loan history. A stronger score may support access to more favourable terms, though it is considered alongside other factors like income and existing debt.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a salaried person get a home loan as a first-time buyer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, salaried applicants are commonly assessed using salary slips, bank statements and tax documents. Stable employment and income are generally viewed positively, though approval still depends on the complete application, including credit history and existing obligations.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can self-employed people get a home loan for their first property?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, self-employed applicants can apply, though the assessment usually relies more heavily on income tax returns, bank statements and business continuity rather than salary slips. Keeping financial documentation organised in advance can help streamline the process.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can first-time buyers apply for a joint home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, applying jointly with a co-applicant, such as a spouse or parent, is common and can allow the lender to consider combined income. This can affect loan amount, repayment responsibility and ownership, so make sure you understand the implications fully and consult a professional for tax-related questions.',
      },
    },
    {
      '@type': 'Question',
      name: 'What documents are required for a first-time home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Commonly required documents include identity and address proof, income proof (salary slips or income tax returns depending on employment type), bank statements, employment or business documents, and property-related documents. Exact requirements vary by lender.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much EMI can a first-time buyer afford?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This depends on your income, existing obligations, household expenses and personal comfort with monthly outflows. Rather than relying on a fixed rule of thumb, it helps to work out a realistic monthly budget and use an EMI calculator to see how different loan amounts, tenures and rates translate into a monthly payment.',
      },
    },
    {
      '@type': 'Question',
      name: 'What costs should I consider besides the home loan EMI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Beyond the EMI, first-time buyers should budget for the down payment, registration and stamp-related charges where applicable, processing fees, legal or technical charges, moving costs, initial furnishing, ongoing maintenance charges, and an emergency fund. These vary significantly by location and property.',
      },
    },
    {
      '@type': 'Question',
      name: 'How should first-time buyers compare home loan offers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Look beyond the advertised interest rate to the type of rate, EMI, tenure, total repayment, processing and other charges, prepayment terms, and the lender’s overall terms and conditions. Comparing the complete cost of the loan, rather than a single headline figure, generally gives a more accurate picture of which offer suits you best.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.borrowww.com/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Home Loan',
      item: 'https://www.borrowww.com/home-loan',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'First-Time Buyers',
      item: 'https://www.borrowww.com/home-loan/first-time-buyers',
    },
  ],
};

export default function FirstTimeBuyersPage() {
  return (
    <>
      <FirstTimeBuyersClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
