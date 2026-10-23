import EMIClient from './EMIClient';
import SeoContentBlock from '@/components/SeoContentBlock';
import RelatedGuides from '@/components/category/RelatedGuides';
import { existingPageContent } from '@/content/seoPages';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Loan EMI Calculator - Calculate Your Monthly EMI Instantly | Borrowww',
  description:
    'Calculate your monthly home loan EMI instantly with Borrowww\'s Loan EMI Calculator. Get accurate principal and interest splits, amortisation tables and repayment tips.',
  path: '/loan-emi-calculator',
});

export default function EMIPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is EMI in a home loan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "EMI, or Equated Monthly Instalment, is the fixed monthly payment you make towards your home loan. It includes both principal repayment and interest, calculated using your loan amount, interest rate, and tenure."
        }
      },
      {
        "@type": "Question",
        "name": "How is home loan EMI calculated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Home loan EMI is calculated using the formula EMI = P × R × (1 + R)ⁿ / ((1 + R)ⁿ - 1), where P is the principal, R is the monthly interest rate, and n is the tenure in months. Borrowww's EMI calculator applies this formula instantly once you enter your details."
        }
      },
      {
        "@type": "Question",
        "name": "What is a good EMI to income ratio?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most lenders prefer your total EMI obligations to stay within 40-50% of your monthly income, though many financial planners suggest keeping it closer to 30-35% for comfortable, sustainable repayment."
        }
      },
      {
        "@type": "Question",
        "name": "Does a higher CIBIL score reduce my EMI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. A higher CIBIL score, typically 750 and above, generally helps you qualify for a lower interest rate, which reduces your EMI on the same loan amount and tenure."
        }
      },
      {
        "@type": "Question",
        "name": "What happens to my EMI if the repo rate changes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If your loan is on a floating rate linked to EBLR, a repo rate change usually gets passed on to your interest rate within a quarter, which can increase or decrease your EMI or tenure accordingly."
        }
      },
      {
        "@type": "Question",
        "name": "Is it better to reduce EMI or tenure after a prepayment?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Reducing tenure while keeping the EMI unchanged typically saves more total interest, since your loan closes faster. Reducing the EMI while keeping tenure the same instead frees up monthly cash flow. The right choice depends on your financial priorities."
        }
      },
      {
        "@type": "Question",
        "name": "Can I change my home loan tenure after taking the loan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Some lenders allow tenure changes, especially after a part-prepayment or in case of income changes, subject to their internal policies. It's best to check directly with your lender or discuss it with a loan expert."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between fixed and floating interest rates?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A fixed rate stays constant for the loan tenure (or a specified period), offering predictable EMIs. A floating rate moves with market benchmarks like the repo rate, which can raise or lower your EMI over time."
        }
      },
      {
        "@type": "Question",
        "name": "Are there charges for prepaying my home loan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "As per RBI guidelines, most floating-rate home loans for individual borrowers don't carry prepayment or foreclosure charges. Fixed-rate loans may still have such charges, so it's worth checking your loan agreement."
        }
      },
      {
        "@type": "Question",
        "name": "What documents are needed to apply for a home loan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Typically, you'll need identity and address proof, income documents (salary slips or ITRs), bank statements, property documents, and passport-size photographs. Requirements can vary slightly by lender and employment type."
        }
      },
      {
        "@type": "Question",
        "name": "Can self-employed professionals use the EMI calculator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, the EMI calculator works the same way regardless of employment type. Self-employed applicants may additionally want to factor in income variability when deciding on a comfortable EMI."
        }
      },
      {
        "@type": "Question",
        "name": "What is a home loan balance transfer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A balance transfer lets you move your existing home loan to a new lender offering a lower interest rate or better terms, which can reduce your EMI or overall interest cost."
        }
      },
      {
        "@type": "Question",
        "name": "Does loan tenure affect loan eligibility?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. A longer tenure lowers the EMI for a given loan amount, which can improve your loan eligibility since lenders assess affordability based on your EMI-to-income ratio."
        }
      },
      {
        "@type": "Question",
        "name": "How accurate is an online EMI calculator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An EMI calculator gives a mathematically accurate result based on the inputs you provide. The actual EMI in your sanction letter may vary slightly if your final approved rate, tenure, or loan amount differs from your estimate."
        }
      },
      {
        "@type": "Question",
        "name": "Should I choose the maximum tenure my lender offers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Not necessarily. While a maximum tenure lowers your EMI, it also increases total interest substantially. It's usually better to choose the shortest tenure your monthly budget can comfortably support."
        }
      }
    ]
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": "Home Loan EMI Calculator",
    "provider": {
      "@type": "Organization",
      "name": "Borrowww",
      "url": "https://www.borrowww.com/"
    },
    "url": "https://www.borrowww.com/loan-emi-calculator",
    "description": "Free online EMI calculator to compute home loan monthly instalments, total interest and amortisation schedule."
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.borrowww.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "EMI Calculator",
        "item": "https://www.borrowww.com/loan-emi-calculator"
      }
    ]
  };

  return (
    <>
      <EMIClient />
      <SeoContentBlock {...existingPageContent.emi} />
      <RelatedGuides cluster="emi" />
      
      {/* Schema Markups published before end of body */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
