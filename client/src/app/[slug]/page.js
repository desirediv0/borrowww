import { notFound } from 'next/navigation';

import SeoContentBlock from '@/components/SeoContentBlock';
import { seoPageMap, seoSlugs } from '@/content/seoPages';
import { buildMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return seoSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const page = seoPageMap[params.slug];

  if (!page) {
    return {};
  }

  return buildMetadata({
    title: page.title,
    description: page.description,
    path: `/${page.slug}`,
    keywords: [page.title, page.heading, 'Borrowww'],
    type: page.type === 'blog' ? 'article' : 'website',
  });
}

export default function SeoPage({ params }) {
  const page = seoPageMap[params.slug];

  if (!page) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#f8fbff_0%,#ffffff_55%,#d9e6ef_100%)] py-20">
        <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-[var(--primary-blue)]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-[var(--primary-blue-dark)]/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--primary-blue)]">
              {page.type === 'blog' ? 'Borrowww Blog' : 'Borrowww Loan Guide'}
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              {page.heading}
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">{page.intro}</p>
          </div>
        </div>
      </section>

      <SeoContentBlock
        heading={page.heading}
        intro={page.intro}
        sections={page.sections}
        faqs={page.faqs}
        ctaTitle="Need help with your loan profile?"
        ctaDescription="Borrowww can help you compare options, understand documentation, and move ahead with a clearer borrowing plan."
      />
    </main>
  );
}
