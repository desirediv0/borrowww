import { buildMetadata } from '@/lib/seo';

import SelfEmployedHomeLoanClient from './SelfEmployedHomeLoanClient';

export const metadata = buildMetadata({
  title: 'Home Loan for Self-Employed in India | Borrowww',
  description:
    'Explore how a home loan for self employed borrowers works in India — eligibility, income documents, EMI planning and application tips, on Borrowww.',
  path: '/home-loan/self-employed',
  keywords: [
    'home loan for self employed',
    'self employed home loan eligibility',
    'self employed home loan documents',
    'home loan for business owners',
    'home loan for freelancers',
    'ITR documents home loan',
  ],
});

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can a self-employed person get a home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Self-employed individuals, including business owners, professionals, consultants and freelancers, can apply for a home loan. Approval and terms depend on the lender assessment of the specific applicant income documentation, credit history and overall financial profile, rather than on self-employment status alone.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the eligibility criteria for a home loan for self-employed applicants?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Common considerations include age, documented income, business or professional continuity, credit history, existing liabilities, the loan amount and tenure requested, and property details. Exact criteria vary by lender.',
      },
    },
    {
      '@type': 'Question',
      name: 'What income documents are required for self-employed home loans?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Commonly requested documents include income tax returns, income computation statements, profit and loss statements and balance sheets where applicable, bank statements, and business or professional registration documents. Exact requirements depend on your business structure, profession and the specific lender.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do lenders calculate income for self-employed borrowers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lenders typically look at documented income from tax filings and financial statements, cross-checked against bank statements, rather than relying on gross business turnover alone. Business or professional continuity and existing liabilities are usually considered alongside this documented income.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a freelancer apply for a home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, freelancers can apply for a home loan. Since income may come from multiple clients and vary month to month, lenders often place additional emphasis on bank statements, tax filings and overall financial consistency to assess repayment capacity.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a business owner get a home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, business owners can apply for a home loan. Lenders typically assess documented business income, continuity, financial statements and existing business liabilities rather than relying only on business turnover to determine eligibility and terms.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does CIBIL score affect a self-employed home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, credit score and history are generally an important part of the assessment for self-employed applicants, often carrying extra weight alongside variable business income. There is no single score that guarantees approval, since thresholds and their importance vary by lender.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much home loan can a self-employed person get?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This depends on documented income, existing obligations, credit profile, the property value, the down payment and the lender own assessment — not simply a multiple of business turnover. It is generally advisable to borrow an amount comfortable to repay rather than the maximum eligible amount.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are home loan interest rates different for self-employed borrowers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not inherently. The interest rate offered depends on factors like credit profile, documented income, loan amount and tenure, and the lender own policies — not on employment type alone. Self-employed borrowers are not automatically charged higher or lower rates than salaried applicants.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can self-employed professionals apply for a home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, professionals such as doctors, lawyers, chartered accountants and architects can apply. Documentation may differ slightly based on how the practice is structured, but no specific profession automatically receives preferential loan terms.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a self-employed borrower apply with a co-applicant?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, self-employed applicants can apply jointly with a co-applicant, such as a spouse or family member, which may allow combined eligible income to be considered. This does not automatically guarantee a higher loan amount, since it depends on the combined strength of both applicants profiles.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can self-employed borrowers prepare for a home loan application?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Preparation generally involves reviewing your credit report, organising income-tax and financial records, keeping bank statements accessible, reviewing existing obligations, estimating a comfortable EMI, planning the down payment, and comparing lenders before applying.',
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
      name: 'Self-Employed',
      item: 'https://www.borrowww.com/home-loan/self-employed',
    },
  ],
};

export default function SelfEmployedHomeLoanPage() {
  return (
    <>
      <SelfEmployedHomeLoanClient />
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
