import pages from './categoryPages.json';

export const SITE_URL = 'https://www.borrowww.com';

/**
 * The three topic clusters that have generated guide pages (content in
 * categoryPages.json) plus the existing home-loan sub-pages, so every group of
 * guides can be linked from the header, footer, hub pages and the homepage.
 */
export const CLUSTERS = {
  home: {
    key: 'home',
    label: 'Home Loan',
    hubPath: '/home-loan',
    hubLabel: 'Home Loan',
    guidesHeading: 'Home loan guides',
    guidesIntro: 'Eligibility, rates, documents and planning guides for every kind of home loan borrower.',
  },
  lap: {
    key: 'lap',
    label: 'Loan Against Property',
    hubPath: '/loan-against-property',
    hubLabel: 'Loan Against Property',
    guidesHeading: 'Loan against property guides',
    moreGuidesHeading: 'More loan against property guides',
    guidesIntro: 'Prepare your application: eligibility, rates, documents, business use and tax questions explained.',
    ctaTitle: 'Talk to Borrowww about a loan against property',
    ctaText:
      'Bring your income details, borrowing purpose and basic property information. Borrowww can help you work out the next checks before you approach a lender.',
  },
  emi: {
    key: 'emi',
    label: 'EMI Calculator',
    hubPath: '/loan-emi-calculator',
    hubLabel: 'EMI Calculator',
    guidesHeading: 'EMI calculators and guides',
    moreGuidesHeading: 'More EMI calculator guides',
    guidesIntro: 'Estimate monthly payments by loan amount and tenure, and plan the budget around them.',
    ctaTitle: 'Plan your EMI with Borrowww',
    ctaText:
      'Share the loan amount, tenure and your monthly budget. Borrowww can help you review a realistic payment range before you apply.',
  },
  bt: {
    key: 'bt',
    label: 'Balance Transfer',
    hubPath: '/balance-transfer',
    hubLabel: 'Balance Transfer',
    guidesHeading: 'Home loan balance transfer guides',
    moreGuidesHeading: 'More balance transfer guides',
    guidesIntro: 'Check eligibility, compare rates and costs, and prepare documents before moving your home loan.',
    ctaTitle: 'Review a balance transfer with Borrowww',
    ctaText:
      'Bring your current balance, rate, EMI and remaining tenure, plus any written offer. Borrowww can help you compare the transfer in rupees.',
  },
};

// Existing pages under /home-loan (not generated, listed here only for linking).
const HOME_PAGES = [
  {
    cluster: 'home',
    path: '/home-loan-eligibility',
    title: 'Home Loan Eligibility',
    navLabel: 'Eligibility',
    summary: 'How lenders assess income, age, credit score and existing EMIs, with salary-based examples.',
  },
  {
    cluster: 'home',
    path: '/home-loan/interest-rates',
    title: 'Home Loan Interest Rates',
    navLabel: 'Interest Rates',
    summary: 'What affects your home loan rate, fixed vs floating options and how to compare offers.',
  },
  {
    cluster: 'home',
    path: '/home-loan-documents',
    title: 'Home Loan Documents Required',
    navLabel: 'Documents Required',
    summary: 'KYC, income proof and property papers for salaried and self-employed applicants.',
  },
  {
    cluster: 'home',
    path: '/home-loan/salaried',
    title: 'Home Loan for Salaried Employees',
    navLabel: 'For Salaried',
    summary: 'How salary is assessed, EMI planning and the application process for salaried employees.',
  },
  {
    cluster: 'home',
    path: '/home-loan/self-employed',
    title: 'Home Loan for Self-Employed Borrowers',
    navLabel: 'For Self-Employed',
    summary: 'Income documents, EMI planning and application tips for self-employed borrowers.',
  },
  {
    cluster: 'home',
    path: '/home-loan/first-time-buyers',
    title: 'Home Loan for First-Time Buyers',
    navLabel: 'First-Time Buyers',
    summary: 'Affordability, eligibility, documents, rates and EMI planning for a first home purchase.',
  },
];

export const categoryPages = pages.map((p) => ({ ...p, title: p.h1, summary: p.metaDescription }));

export function getCategoryPage(cluster, slug) {
  return categoryPages.find((p) => p.cluster === cluster && p.slug === slug) || null;
}

export function getClusterPages(cluster) {
  if (cluster === 'home') return HOME_PAGES;
  return categoryPages.filter((p) => p.cluster === cluster);
}

/** Display order for grouped link lists (footer, homepage, sitemap page). */
export const CLUSTER_ORDER = ['home', 'lap', 'emi', 'bt'];

/** Every guide URL that is new or previously unlinked, for sitemap generation. */
export const allGuidePaths = CLUSTER_ORDER.flatMap((c) => getClusterPages(c).map((p) => p.path));
