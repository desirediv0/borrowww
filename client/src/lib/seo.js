const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.borrowww.com';

const DEFAULT_OG_IMAGE = `${SITE_URL}/newlogo.png`;

// The only pages Google may index. Every other public page is served with
// "noindex, follow" until it is rebuilt and added here (and to public/sitemap.xml).
export const INDEXABLE_PATHS = new Set([
  '/',
  '/home-loan',
  '/loan-against-property',
  '/home-loan-documents',
  '/home-loan-eligibility',
  '/loan-emi-calculator',
  '/credit-check',
  '/about',
  '/contact',
  '/privacy-policy',
  '/terms-of-service',
  '/rbi-compliance',
  '/grievance-redressal',
]);

// Official Borrowww profiles: shown in the footer and contact page, and used as `sameAs` in schema.
const SOCIAL_PROFILES = [
  { name: 'YouTube', url: 'https://www.youtube.com/@Borrowww_4u' },
  { name: 'Instagram', url: 'https://www.instagram.com/borrowww.27/' },
  { name: 'Facebook', url: 'https://www.facebook.com/p/Borrowww-61584178885882/' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/borrowww/' },
];

export const companyInfo = {
  name: 'Borrowww',
  parentCompany: 'Premier Penny',
  siteUrl: SITE_URL,
  logo: DEFAULT_OG_IMAGE,
  phones: ['+91 9560069525'],
  email: 'support.borrowww@gmail.com',
  address: '626, 6th Floor, Satya The Hive, Sector 102, Dwarka Expressway, Gurgaon 122505, Haryana, India',
  // Named Grievance Officer shown on /grievance-redressal. The officer block is only
  // published when name, phone and email are all filled in.
  grievanceOfficer: {
    name: 'Ishan Chugh',
    designation: 'Founder and CEO',
    phone: '+91 9560069525',
    email: 'support.borrowww@gmail.com',
  },
  socialProfiles: SOCIAL_PROFILES,
  socialLinks: SOCIAL_PROFILES.map((profile) => profile.url),
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  name: companyInfo.name,
  parentOrganization: { '@type': 'Organization', name: companyInfo.parentCompany },
  url: companyInfo.siteUrl,
  logo: companyInfo.logo,
  description:
    'Borrowww is a loan consultancy. It helps people in India compare and apply for home loans and loans against property from RBI-regulated banks and NBFCs. Borrowww does not lend money.',
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
    // Pages left out of INDEXABLE_PATHS stay followable so links through them still count;
    // pages that opt out with index: false (login, profile, thank-you) are nofollow as before.
    robots: {
      index: index && INDEXABLE_PATHS.has(canonicalPath),
      follow: index,
    },
  };
}
