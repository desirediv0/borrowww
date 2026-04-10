export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/wp-admin/', '/cgi-bin/', '/tmp/'],
      },
    ],
    sitemap: 'https://www.borrowww.com/sitemap.xml',
  };
}
