import Link from 'next/link';
import { ChevronDown, PhoneCall } from 'lucide-react';

import { CLUSTERS, SITE_URL } from '@/content/categoryClusters';

import EmiMiniCalculator from './EmiMiniCalculator';
import RelatedGuides from './RelatedGuides';
import TransferCalculator from './TransferCalculator';

const DATE_MODIFIED = '2026-10-14';

const stripTags = (html) => html.replace(/<[^>]+>/g, '');

function JsonLd({ data }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

function buildSchemas(page, cluster) {
  const url = `${SITE_URL}${page.path}`;
  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: page.metaTitle,
    description: page.metaDescription,
    inLanguage: 'en-IN',
    dateModified: DATE_MODIFIED,
    isPartOf: { '@type': 'WebSite', name: 'Borrowww', url: SITE_URL },
    breadcrumb: { '@id': `${url}#breadcrumb` },
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: cluster.hubLabel, item: `${SITE_URL}${cluster.hubPath}` },
      { '@type': 'ListItem', position: 3, name: page.h1, item: url },
    ],
  };
  const faq = page.faqs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: page.faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: stripTags(f.answer) },
        })),
      }
    : null;
  return { webPage, breadcrumb, faq };
}

function Table({ block, caption }) {
  return (
    <div className="my-6 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-slate-50">
          <tr>
            {block.head.map((h) => (
              <th key={h} scope="col" className="px-4 py-3 text-left font-semibold text-slate-700">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {block.rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, i) =>
                i === 0 ? (
                  <th key={i} scope="row" className="whitespace-nowrap px-4 py-3 text-left font-medium text-slate-900">
                    {cell}
                  </th>
                ) : (
                  <td key={i} className="whitespace-nowrap px-4 py-3 text-slate-600">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Toc({ sections, hasFaq, faqTitle }) {
  return (
    <ol className="space-y-2 text-sm">
      {sections.map((s) => (
        <li key={s.id}>
          <a href={`#${s.id}`} className="text-slate-600 hover:text-[var(--primary-blue)]">
            {s.title}
          </a>
        </li>
      ))}
      {hasFaq ? (
        <li>
          <a href="#faqs" className="text-slate-600 hover:text-[var(--primary-blue)]">
            {faqTitle}
          </a>
        </li>
      ) : null}
    </ol>
  );
}

export default function CategoryPage({ page }) {
  const cluster = CLUSTERS[page.cluster];
  const { webPage, breadcrumb, faq } = buildSchemas(page, cluster);
  const hasFaq = page.faqs.length > 0;
  const faqTitle = page.faqTitle || 'Frequently asked questions';

  const ctaTitle = page.cta?.title || cluster.ctaTitle;
  const ctaHtml = page.cta?.html || cluster.ctaText;

  return (
    <main className="bg-white">
      <JsonLd data={webPage} />
      <JsonLd data={breadcrumb} />
      {faq ? <JsonLd data={faq} /> : null}

      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#f8fbff_0%,#ffffff_55%,#d9e6ef_100%)] pb-12 pt-8 sm:pb-16 sm:pt-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <li>
                <Link href="/" className="hover:text-[var(--primary-blue)]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={cluster.hubPath} className="hover:text-[var(--primary-blue)]">
                  {cluster.hubLabel}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-slate-700">
                {page.navLabel}
              </li>
            </ol>
          </nav>

          <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-[var(--primary-blue)]">
            {cluster.label} guide
          </p>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {page.h1}
          </h1>
          <div className="seo-content-rich-text mt-6 max-w-3xl space-y-4 text-lg leading-8 text-slate-600">
            {page.intro.map((html) => (
              <p key={html.slice(0, 40)} dangerouslySetInnerHTML={{ __html: html }} />
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="tel:+919560069525"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--primary-blue-dark)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              <PhoneCall className="h-4 w-4" />
              Call Borrowww
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              Contact form
            </Link>
            {page.cluster === 'emi' ? (
              <Link
                href="/loan-emi-calculator"
                className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                Open the full EMI calculator
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem]">
          <div className="min-w-0 space-y-8">
            <details className="rounded-2xl border border-slate-200 bg-slate-50 p-4 lg:hidden">
              <summary className="cursor-pointer text-sm font-semibold text-slate-900">On this page</summary>
              <div className="mt-3">
                <Toc sections={page.sections} hasFaq={hasFaq} faqTitle={faqTitle} />
              </div>
            </details>

            {page.calculator?.type === 'emi' ? (
              <EmiMiniCalculator initial={page.calculator} title={page.calculator.title} />
            ) : null}
            {page.calculator?.type === 'transfer' ? (
              <TransferCalculator initial={page.calculator} title={page.calculator.title} />
            ) : null}

            {page.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-h`}
                className="scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
              >
                <h2 id={`${section.id}-h`} className="text-2xl font-semibold text-slate-900">
                  {section.title}
                </h2>
                <div className="seo-content-rich-text mt-5 space-y-4 text-base leading-8 text-slate-600">
                  {section.blocks.map((block, i) =>
                    block.type === 'table' ? (
                      <Table key={i} block={block} caption={section.title} />
                    ) : (
                      <p key={i} dangerouslySetInnerHTML={{ __html: block.html }} />
                    ),
                  )}
                </div>
              </section>
            ))}

            {hasFaq ? (
              <section id="faqs" aria-labelledby="faqs-h" className="scroll-mt-28">
                <h2 id="faqs-h" className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                  {faqTitle}
                </h2>
                <div className="mt-6 space-y-3">
                  {page.faqs.map((item) => (
                    <details
                      key={item.question}
                      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
                        <h3 className="text-base font-semibold">{item.question}</h3>
                        <ChevronDown className="h-5 w-5 flex-shrink-0 text-slate-500 transition-transform group-open:rotate-180" />
                      </summary>
                      <p
                        className="seo-content-rich-text mt-4 text-sm leading-7 text-slate-600"
                        dangerouslySetInnerHTML={{ __html: item.answer }}
                      />
                    </details>
                  ))}
                </div>
              </section>
            ) : null}

            <section aria-labelledby="cta-h" className="rounded-[28px] bg-[var(--primary-blue-dark)] p-7 text-white shadow-xl sm:p-8">
              <h2 id="cta-h" className="text-2xl font-semibold">
                {ctaTitle}
              </h2>
              <p
                className="mt-3 max-w-2xl text-sm leading-7 text-white/80 [&_a]:font-semibold [&_a]:text-white [&_a]:underline"
                dangerouslySetInnerHTML={{ __html: ctaHtml }}
              />
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="tel:+919560069525"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--primary-blue-dark)] transition hover:bg-slate-100"
                >
                  <PhoneCall className="h-4 w-4" />
                  Call Borrowww
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Contact form
                </Link>
              </div>
            </section>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              <nav aria-label="On this page" className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="mb-3 text-sm font-semibold text-slate-900">On this page</p>
                <Toc sections={page.sections} hasFaq={hasFaq} faqTitle={faqTitle} />
              </nav>
              <div className="rounded-2xl border border-slate-200 p-5">
                <p className="text-sm font-semibold text-slate-900">Need help with your loan?</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Speak to a Borrowww advisor before you apply.
                </p>
                <a
                  href="tel:+919560069525"
                  className="mt-3 inline-block text-sm font-semibold text-[var(--primary-blue)] underline underline-offset-4"
                >
                  +91 9560069525
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <RelatedGuides
        cluster={page.cluster}
        excludePath={page.path}
        heading={`More ${cluster.label.toLowerCase()} guides`}
      />
    </main>
  );
}
