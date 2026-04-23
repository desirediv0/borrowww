import { notFound } from 'next/navigation';
import SeoContentBlock from '@/components/SeoContentBlock';
import SeoHero from '@/components/SeoHero';
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
      <SeoHero page={page} />

      <SeoContentBlock
        heading={page.heading}
        intro={page.intro}
        sections={page.sections}
        faqs={page.faq}
        ctaTitle="Need help with your loan profile?"
        ctaDescription="Borrowww can help you compare options, understand documentation, and move ahead with a clearer borrowing plan."
      />
    </main>
  );
}
