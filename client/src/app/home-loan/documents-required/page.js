import { buildMetadata } from '@/lib/seo';

import DocumentsRequiredClient from './DocumentsRequiredClient';

export const metadata = buildMetadata({
  title: 'Home Loan Documents Required: Full Checklist | Borrowww',
  description:
    'A complete guide to home loan documents required in India — KYC, income proof, property papers and checklists for salaried and self-employed applicants.',
  path: '/home-loan/documents-required',
  keywords: [
    'home loan documents required',
    'home loan documents checklist',
    'documents required for home loan',
    'home loan KYC documents',
    'property documents for home loan',
    'home loan salary slips Form 16',
    'self-employed home loan documents',
  ],
});

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What documents are required for a home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Broadly, lenders require identity and KYC documents, address proof, income proof, employment or business-related documents, bank statements, details of existing liabilities where applicable, and property-related documents. The exact combination depends on your profile, the lender, and the property being purchased.',
      },
    },
    {
      '@type': 'Question',
      name: 'What documents are required for a home loan for salaried employees?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Salaried applicants are commonly asked for identity and address proof, recent salary slips, bank statements showing salary credits, and Form 16 or other income tax documents. Additional employment documentation may sometimes be requested depending on the lender.',
      },
    },
    {
      '@type': 'Question',
      name: 'What documents are required for a self-employed home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Self-employed applicants typically need to provide Income Tax Returns, income computation statements, financial statements where applicable, bank statements, and business or professional registration documents. The exact list varies by business type and lender.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is a bank statement required for a home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, bank statements are commonly requested for both salaried and self-employed applicants, since they help verify income credits and give the lender a broader view of financial activity beyond salary slips or tax filings alone.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Form 16 required for a home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Form 16 is commonly requested from salaried applicants to substantiate annual income, though whether it is mandatory can depend on the specific lender and the loan amount involved. It is worth keeping it ready regardless, since it is a frequently requested document.',
      },
    },
    {
      '@type': 'Question',
      name: 'What property documents are required for a home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This depends on the type of property. Commonly relevant documents include the sale agreement, title or ownership documents, approved building plans, property tax records, encumbrance-related documentation, and builder or project documents for properties bought from a developer.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are documents required from a home loan co-applicant?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, co-applicants generally need to submit their own KYC, address proof and, where their income is being considered, income and bank statement documents. The extent of documentation depends on the co-applicant role in the application.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I apply for a home loan if some documents are unavailable?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It is best to check directly with the lender, since requirements and flexibility around missing documents vary. In many cases, lenders may accept alternative documents or ask for supporting explanations, but this is not guaranteed and depends on which document is missing and why.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many months of bank statements are required for a home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This varies by lender rather than following one fixed rule. Some commonly request a few months worth, while others may ask for a longer period, particularly for self-employed applicants. It is best to confirm the exact requirement with your chosen lender.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do home loan documents differ between lenders?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, while the broad categories of documentation are similar across lenders, the exact list, accepted document types, and specific requirements can vary. It is advisable to confirm the current requirements directly with your chosen lender before applying.',
      },
    },
    {
      '@type': 'Question',
      name: 'What documents are required for a resale property home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For a resale property, lenders typically look at the sale agreement, title and ownership documents, previous ownership records, encumbrance-related documentation, and property tax records, in addition to your standard applicant-level documents. Requirements can vary based on the property history.',
      },
    },
    {
      '@type': 'Question',
      name: 'How should I prepare my documents before applying for a home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Check that your details are consistent across all documents, ensure everything is current and clearly readable, organise income documents chronologically, start collecting property papers early, and confirm the specific lender requirements before submission.',
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
      name: 'Documents Required',
      item: 'https://www.borrowww.com/home-loan/documents-required',
    },
  ],
};

export default function DocumentsRequiredPage() {
  return (
    <>
      <DocumentsRequiredClient />
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
