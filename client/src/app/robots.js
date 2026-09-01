const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.borrowww.com';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // /auth and /profile use `noindex` metadata instead of a Disallow, so
        // Googlebot can crawl them and actually see the noindex directive.
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
