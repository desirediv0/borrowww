export default function sitemap() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.borrowww.com';

    // Static routes
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
    ];

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8,
    }));
}
