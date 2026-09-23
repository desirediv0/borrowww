import { buildMetadata } from '@/lib/seo';

import InterestRatesClient from './InterestRatesClient';

export const metadata = buildMetadata({
  title: 'Home Loan Interest Rates in India | Borrowww',
  description:
    'Understand how home loan interest rates work in India, what affects your rate, fixed vs floating options, and how to compare offers wisely with Borrowww.',
  path: '/home-loan/interest-rates',
  keywords: [
    'home loan interest rates',
    'home loan interest rates in India',
    'fixed vs floating home loan rate',
    'home loan rate comparison',
    'home loan EMI interest',
    'factors affecting home loan interest rate',
  ],
});

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are home loan interest rates?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A home loan interest rate is the cost a lender charges, expressed as an annual percentage of the outstanding loan amount, for lending you money to buy or construct a property. It is combined with the loan amount and tenure to calculate your EMI, and it directly affects the total amount you repay over the life of the loan.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is a home loan interest rate decided?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lenders typically assess a combination of factors, including your credit score and history, income and employment profile, existing financial obligations, the loan amount and tenure requested, the property being financed, and prevailing market conditions. The final rate offered is usually based on this overall assessment rather than any single factor.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does credit score affect home loan interest rates?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Credit score and repayment history are generally considered important inputs while assessing an application, since they indicate how reliably you have managed credit in the past. A stronger credit profile may support access to more competitive terms, though it is evaluated alongside other factors rather than in isolation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which is better, fixed or floating home loan interest rate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Neither option is universally better. A fixed rate offers predictable EMIs for a defined period but may not reduce if market rates fall, while a floating rate is linked to a benchmark and can move up or down over the tenure. The right choice depends on your risk appetite, expected holding period and comfort with EMI fluctuations.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the interest rate affect home loan EMI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The interest rate is one of three inputs — along with loan amount and tenure — used to calculate EMI. A higher rate increases the EMI for the same loan amount and tenure, while a lower rate reduces it. Even a modest change in the rate can noticeably change the EMI and total interest paid over a long tenure.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can home loan interest rates change during the loan tenure?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, if you have a floating rate loan, the applicable rate can change when the underlying benchmark is revised, which may affect your EMI or the remaining tenure. Fixed rate loans generally remain unchanged during the fixed period, though the exact terms — including whether the fixed period covers the entire tenure — vary by lender and product.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I negotiate my home loan interest rate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Some lenders may consider requests for a better rate, particularly for applicants with a strong credit profile, stable income or an existing relationship with the lender. However, this is entirely at the lender discretion and is not guaranteed. Comparing offers from multiple lenders is generally a more reliable way to assess whether you are getting reasonable terms.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I reduce the total interest paid on a home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Total interest paid can potentially be reduced by choosing a shorter tenure where affordable, making prepayments towards the principal when the lender terms allow it, maintaining a strong credit profile, and comparing offers to secure more favourable terms. Using an EMI calculator can help you evaluate how different choices affect the total interest outgo.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does loan tenure affect the total interest payable?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. A longer tenure generally reduces the EMI but increases the total interest paid over the life of the loan, since interest accrues over a longer period. A shorter tenure increases the EMI but usually reduces the total interest paid. Choosing a tenure involves balancing monthly affordability against overall cost.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I compare apart from the home loan interest rate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Beyond the interest rate, it is worth comparing the type of rate (fixed or floating), the benchmark and reset mechanism, tenure, processing and other charges, prepayment or foreclosure terms, the resulting EMI, total repayment amount, and the overall loan terms and conditions. Comparing only the headline rate can miss significant differences in the total cost of borrowing.',
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
      name: 'Interest Rates',
      item: 'https://www.borrowww.com/home-loan/interest-rates',
    },
  ],
};

export default function InterestRatesPage() {
  return (
    <>
      <InterestRatesClient />
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
