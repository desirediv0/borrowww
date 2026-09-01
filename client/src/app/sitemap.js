import { seoSlugs } from '@/content/seoPages';

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.borrowww.com';
  // Resolved at build time, so each deploy stamps a real date. When a CMS with
  // per-page updatedAt is added, replace this with the page's own timestamp.
  const lastModified = new Date();

  const routes = [
    '',
    '/about',
    '/contact',
    '/faq',
    '/home-loan',
    '/loan-against-property',
    '/loan-emi-calculator',
    '/balance-transfer',
    '/credit-check',
    '/comparison',
    '/privacy-policy',
    '/terms-of-service',
    '/rbi-compliance',
    '/referral',
    '/home-loan-documents',
    '/home-loan-eligibility',
    '/first-time-loan-consultant',
    '/instant-loan-services-ghaziabad',

    ...seoSlugs.map((slug) => `/${slug}`),
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
