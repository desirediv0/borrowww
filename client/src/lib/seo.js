const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.borrowww.com';

const DEFAULT_OG_IMAGE = `${SITE_URL}/newlogo.png`;

export const companyInfo = {
  name: 'Borrowww',
  siteUrl: SITE_URL,
  logo: DEFAULT_OG_IMAGE,
  phones: ['+91 9560069525', '+91 8264111345'],
  email: 'support.borrowww@gmail.com',
  // Add the official Borrowww profile URLs here (full URLs, not domain roots).
  // Left empty on purpose: placeholder links produce invalid `sameAs` data.
  socialLinks: [],
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  name: companyInfo.name,
  url: companyInfo.siteUrl,
  logo: companyInfo.logo,
  description:
    'Borrowww provides home loans, personal loans, and financial solutions in India.',
  areaServed: 'India',
  ...(companyInfo.socialLinks.length ? { sameAs: companyInfo.socialLinks } : {}),
  contactPoint: companyInfo.phones.map((telephone) => ({
    '@type': 'ContactPoint',
    telephone,
    contactType: 'customer support',
    areaServed: 'IN',
    availableLanguage: ['English', 'Hindi'],
  })),
};

export function buildMetadata({
  title,
  description,
  path = '/',
  keywords = [],
  type = 'website',
  index = true,
}) {
  const canonicalPath = path === '/' ? '/' : path.replace(/\/+$/, '');
  const url = canonicalPath === '/' ? companyInfo.siteUrl : `${companyInfo.siteUrl}${canonicalPath}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: companyInfo.name,
      type,
      locale: 'en_IN',
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${companyInfo.name} logo`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    robots: {
      index,
      follow: index,
    },
  };
}
