// Pages taken offline, like drafts in WordPress. The page code stays in the repo, but
// visitors and Google are sent (307, temporary) to the page on the right, and every menu
// and guide list leaves the page out.
//
// To publish a page again: delete its line here, then add it to INDEXABLE_PATHS in
// src/lib/seo.js and to public/sitemap.xml if Google should index it.
export const DRAFT_PAGES = {
  // Home loan guides
  '/home-loan/interest-rates': '/home-loan',
  '/home-loan/salaried': '/home-loan',
  '/home-loan/self-employed': '/home-loan',
  '/home-loan/first-time-buyers': '/home-loan',
  '/home-loan-process-india': '/home-loan',
  '/first-time-loan-consultant': '/home-loan',

  // Loan against property guides
  '/loan-against-property/eligibility': '/loan-against-property',
  '/loan-against-property/interest-rates': '/loan-against-property',
  '/loan-against-property/documents': '/loan-against-property',
  '/loan-against-property/self-employed': '/loan-against-property',
  '/loan-against-property/business': '/loan-against-property',
  '/loan-against-property/tax-benefits': '/loan-against-property',
  '/commercial-property-loan': '/loan-against-property',
  '/loan-without-income-proof': '/loan-against-property',

  // EMI calculator variants
  '/loan-emi-calculator/home-loan': '/loan-emi-calculator',
  '/loan-emi-calculator/loan-against-property': '/loan-emi-calculator',
  '/loan-emi-calculator/20-lakh-home-loan-emi': '/loan-emi-calculator',
  '/loan-emi-calculator/30-lakh-home-loan': '/loan-emi-calculator',
  '/loan-emi-calculator/50-lakh-home-loan-emi': '/loan-emi-calculator',
  '/loan-emi-calculator/1-crore-home-loan': '/loan-emi-calculator',
  '/comparison': '/loan-emi-calculator',

  // Balance transfer
  '/balance-transfer': '/home-loan',
  '/balance-transfer/eligibility': '/home-loan',
  '/balance-transfer/interest-rates': '/home-loan',
  '/balance-transfer/documents': '/home-loan',
  '/balance-transfer/benefits': '/home-loan',
  '/balance-transfer/home-loan-balance-transfer-calculator': '/home-loan',
  '/balance-transfer/self-employed': '/home-loan',

  // Credit score guides
  '/loan-for-low-cibil-score': '/credit-check',
  '/minimum-cibil-score-home-loan': '/credit-check',
  '/how-to-increase-credit-score': '/credit-check',
  '/free-credit-score-check-delhi': '/credit-check',

  // City and advisor pages
  '/loan-advisor-gurgaon-for-home-loan': '/contact',
  '/best-home-loan-advisor-delhi-ncr': '/contact',
  '/home-loan-consultant-noida': '/contact',
  '/best-loan-agent-faridabad': '/contact',
  '/loan-against-property-consultant-gurgaon': '/loan-against-property',
  '/loan-against-property-for-salaried-delhi': '/loan-against-property',
  '/instant-loan-for-salaried-employees-delhi': '/',
  '/instant-loan-services-ghaziabad': '/',

  // General pages
  '/secured-vs-unsecured-loan': '/',
  '/instant-loan-tips': '/',
  '/faq': '/',
  '/referral': '/contact',
  '/sitemap': '/',
};

function normalisePath(href) {
  const path = href.split(/[?#]/)[0].replace(/^https?:\/\/(www\.)?borrowww\.com/, '');
  return path === '/' ? path : path.replace(/\/+$/, '');
}

// False for draft pages; true for everything else, including external and '#' links.
export function isPublished(href) {
  if (!href) return true;
  return !(normalisePath(href) in DRAFT_PAGES);
}
