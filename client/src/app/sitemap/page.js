import Link from 'next/link';

import { seoPages } from '@/content/seoPages';
import { buildMetadata, companyInfo } from '@/lib/seo';

const baseLinks = [
  { href: '/', label: 'Borrowww - Credit Check & Instant Loan Provider' },
  { href: '/credit-check', label: 'Free Credit Score Check - Check Your CIBIL Score' },
  { href: '/home-loan', label: 'Home Loan - Best Interest Rates and Offers' },
  { href: '/loan-against-property', label: 'Loan Against Property - Unlock Your Property Value' },
  { href: '/emi', label: 'EMI Calculator - Calculate Home, Personal and Car Loan EMI' },
  { href: '/balance-transfer', label: 'Balance Transfer - Transfer Your Home Loan and Save' },
  { href: '/comparison', label: 'Loan Comparison - Compare Loans and Interest Rates' },
  { href: '/about', label: 'About Us' },
  { href: '/referral', label: 'Refer a Friend' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms-of-service', label: 'Terms of Service' },
  { href: '/rbi-compliance', label: 'RBI Compliance' },
  { href: '/loan-advisor-gurgaon-for-home-loan', label: 'Loan Advisor Gurgaon for Home Loan' }
];

const sitemapLinks = [
  ...baseLinks,
  ...seoPages.map((page) => ({
    href: `/${page.slug}`,
    label: page.title,
  })),
];

export const metadata = buildMetadata({
  title: 'HTML Sitemap',
  description: 'Browse important Borrowww pages through the HTML sitemap.',
  path: '/sitemap',
});

export default function HtmlSitemapPage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-20">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
          HTML Sitemap
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-[var(--primary-blue-dark)]">
          {companyInfo.name} site links
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-600">
          This page lists the primary public pages available on {companyInfo.name}.
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {sitemapLinks.map((link) => (
            <li key={link.href} className="rounded-2xl border border-slate-200 p-4 transition hover:border-slate-300">
              <Link className="text-base font-medium text-[var(--primary-blue-dark)]" href={link.href}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
