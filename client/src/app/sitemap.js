import { seoSlugs } from '@/content/seoPages';

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.borrowww.com';
  const lastModified = new Date('2026-04-08T00:00:00.000Z');

  const routes = [
    '',
    '/about',
    '/contact',
    '/home-loan',
    '/loan-against-property',
    '/emi',
    '/balance-transfer',
    '/credit-check',
    '/comparison',
    '/privacy-policy',
    '/terms-of-service',
    '/rbi-compliance',
    '/referral',
    '/blog',
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
