import { buildMetadata } from '@/lib/seo';

import SalariedHomeLoanClient from './SalariedHomeLoanClient';

export const metadata = buildMetadata({
  title: 'Home Loan for Salaried Employees in India | Borrowww',
  description:
    'Understand how a home loan for salaried employees works in India — eligibility, documents, salary assessment, EMI planning and the application process.',
  path: '/home-loan/salaried',
  keywords: [
    'home loan for salaried employees',
    'salaried home loan eligibility',
    'home loan salary slips Form 16',
    'home loan private sector employees',
    'home loan government employees',
    'salaried home loan documents',
    'home loan EMI planning salaried',
  ],
});

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can a salaried person get a home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Salaried individuals, whether working in the private sector, government, public-sector organisations or multinational companies, can apply for a home loan. Approval and terms depend on the lender assessment of income, credit history, existing obligations and the property, rather than employment type alone.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the eligibility for a home loan for salaried employees?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Common considerations include age, salary or income level, employment stability and work experience, existing financial obligations, credit history, the loan amount and tenure requested, and property details. Exact criteria vary by lender.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does salary affect home loan eligibility?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Your salary is a key input in assessing repayment capacity, but lenders also weigh it against existing EMIs, household expenses, the requested tenure and interest rate. A higher salary does not automatically mean you should borrow the maximum eligible amount — it is worth assessing what is comfortably affordable as well.',
      },
    },
    {
      '@type': 'Question',
      name: 'What documents are required for a salaried home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Commonly requested documents include identity and address proof, recent salary slips, bank statements showing salary credits, Form 16 or other income tax documents, and property-related documents. Exact requirements vary by lender.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does CIBIL score affect home loan eligibility for salaried employees?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, credit score and repayment history are generally an important part of the assessment for salaried applicants as well. There is no single score that guarantees approval, since thresholds and their importance in the overall decision vary by lender.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much home loan can a salaried person get?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This depends on documented income, existing EMIs, repayment capacity, credit profile, the property value, the down payment and the lender own assessment — not salary alone. It is generally advisable to borrow an amount that is comfortable to repay rather than the maximum eligible amount.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a private-sector employee get a home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, private-sector employees can apply for a home loan like any other salaried applicant. Lenders typically assess salary documentation, employment history, existing obligations and credit profile as part of the evaluation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a government employee apply for a home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, government and public-sector employees can apply for a home loan, subject to the lender applicable criteria. While some lenders may offer specific schemes for government employees, this is not universal, so it is worth checking directly with the lender.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a salaried person apply for a joint home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, salaried applicants can apply jointly with a co-applicant, such as a spouse or family member, which may allow combined eligible income to be considered. This does not automatically guarantee a higher loan amount, since it depends on the combined strength of both applicants profiles.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does EMI affect home loan affordability for salaried borrowers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The EMI directly affects your monthly cash flow, so it is worth estimating it before finalising a property rather than after. A comfortable EMI generally leaves room for existing obligations, household expenses and savings, rather than stretching your take-home income to its limit.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are home loan interest rates different for salaried employees?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not inherently. The interest rate offered depends on factors like credit profile, income, loan amount and tenure, and the lender own policies — not on employment type alone. Salaried applicants are not automatically offered lower rates than self-employed applicants.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can a salaried borrower prepare for a home loan application?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Preparation generally involves reviewing your credit report, checking your income and expenses, reviewing existing EMIs, estimating a comfortable EMI, organising salary slips and bank statements, and comparing lenders before applying.',
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
      name: 'Salaried',
      item: 'https://www.borrowww.com/home-loan/salaried',
    },
  ],
};

export default function SalariedHomeLoanPage() {
  return (
    <>
      <SalariedHomeLoanClient />
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
