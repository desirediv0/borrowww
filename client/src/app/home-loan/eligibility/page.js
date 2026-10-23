import { buildMetadata } from '@/lib/seo';

import EligibilityClient from './EligibilityClient';

export const metadata = buildMetadata({
  title: 'Home Loan Eligibility: Criteria, Salary & Calculation',
  description:
    'Check home loan eligibility in India: how lenders assess income, age, credit score, existing EMIs and property value, with clear salary-based examples.',
  path: '/home-loan/eligibility',
  keywords: [
    'home loan eligibility',
    'home loan eligibility criteria',
    'home loan eligibility by salary',
    'how is home loan eligibility calculated',
    'home loan FOIR',
    'RBI loan to value home loan',
    'home loan eligibility calculator',
  ],
});

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is home loan eligibility?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Home loan eligibility is the maximum amount a bank or housing finance company is willing to lend you based on your repayment capacity. It depends on your income, age, existing EMIs, credit history, job or business stability, tenure and the property value. It remains an estimate until the lender verifies your documents and the property.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is home loan eligibility calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lenders work out the EMI you can afford by applying their repayment limit to your income and subtracting existing EMIs. They convert that EMI into a loan amount using the interest rate and tenure, then check it against the RBI loan-to-value cap on the property. The lower figure is usually the eligible amount.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much home loan can I get on a ₹50,000 salary?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It depends on the lender’s policy, your EMIs, rate and tenure. As an illustration, with no existing EMIs, a 50% income limit and an 8.5% rate, a ₹50,000 net salary supports about ₹28.8 lakh over 20 years or about ₹32.5 lakh over 30 years. Actual offers can be higher or lower.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the minimum salary required for a home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'There is no single minimum across lenders. Some list around ₹10,000 per month for salaried applicants, while others set higher thresholds. In practice, the loan amount you need matters more, because your income must support the EMI for that amount within the lender’s repayment limit.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does age affect home loan eligibility?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Lenders usually require the loan to end before a set age, which varies by lender and employment type. The older you are when applying, the shorter the tenure you may be offered. A shorter tenure means a higher EMI per lakh, which reduces the amount your income can support.',
      },
    },
    {
      '@type': 'Question',
      name: 'What credit score is needed for a home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'RBI does not set a minimum credit score for home loans; each lender sets its own criteria. Scores of 750 and above are widely viewed as favourable and can help with approval and pricing. Lower scores may still be considered, sometimes with a higher rate, a lower loan-to-value ratio or a co-applicant.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can self-employed individuals get a home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Self-employed professionals and business owners can apply. Lenders usually review two to three years of ITRs and financial statements, business continuity, bank statements and credit history. Because income can vary, many lenders average earnings across years, and income declared after deductions is typically what counts.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do existing EMIs reduce home loan eligibility?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Existing EMIs use part of the income a lender allows for repayments, leaving less room for a home loan EMI. As an illustration, at 8.5% over 20 years, every ₹10,000 of existing EMI reduces eligibility by roughly ₹11.5 lakh. Credit card dues and loans you have guaranteed may also be counted.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a co-applicant improve home loan eligibility?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Often, yes. An earning co-applicant such as a spouse or parent lets the lender consider combined income, which can increase the eligible amount. The co-applicant’s credit history and obligations are assessed too. An older co-applicant may reduce the tenure offered, so their age also matters.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much down payment is required for a home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under RBI loan-to-value limits, you generally need at least 10% of the property value for loans up to ₹30 lakh, 20% for loans above ₹30 lakh and up to ₹75 lakh, and 25% above ₹75 lakh. Stamp duty and registration are usually payable separately from your own funds.',
      },
    },
    {
      '@type': 'Question',
      name: 'What documents are needed to check home loan eligibility?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No documents are needed for an initial estimate. For approval, lenders usually ask for PAN and address proof, income documents such as salary slips and Form 16 or ITRs and financial statements, bank statements and property papers. The exact list varies by lender and applicant profile.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is home loan eligibility the same as loan approval?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Eligibility is an estimate of how much you may borrow. In-principle approval is a conditional offer after the lender reviews your credit report and income documents. Final sanction comes only after full verification, including legal and technical checks on the property, and confirms the amount, rate and tenure.',
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
      name: 'Home Loan Eligibility',
      item: 'https://www.borrowww.com/home-loan/eligibility',
    },
  ],
};

export default function EligibilityPage() {
  return (
    <>
      <EligibilityClient />
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
