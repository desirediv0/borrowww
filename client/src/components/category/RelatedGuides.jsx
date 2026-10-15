import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { CLUSTERS, getClusterPages } from '@/content/categoryClusters';

/**
 * Grid of links to every guide in a cluster. Server-rendered so the links are
 * in the HTML crawlers receive. Used on hub pages, guide pages and the homepage.
 */
export default function RelatedGuides({ cluster, excludePath, heading, intro, tone = 'light', headingLevel = 2 }) {
  const config = CLUSTERS[cluster];
  const pages = getClusterPages(cluster).filter((p) => p.path !== excludePath);
  if (!config || pages.length === 0) return null;

  const Heading = `h${headingLevel}`;
  const id = `guides-${cluster}${excludePath ? '-related' : ''}`;

  return (
    <section
      aria-labelledby={id}
      className={tone === 'light' ? 'bg-slate-50 py-12 sm:py-16' : 'bg-white py-12 sm:py-16'}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Heading id={id} className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {heading || config.guidesHeading}
          </Heading>
          <p className="mt-3 text-base leading-7 text-slate-600">{intro || config.guidesIntro}</p>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) => (
            <li key={page.path}>
              <Link
                href={page.path}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[var(--primary-blue)]/40 hover:shadow-md"
              >
                <span className="text-base font-semibold text-slate-900 group-hover:text-[var(--primary-blue)]">
                  {page.title}
                </span>
                <span className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{page.summary}</span>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--primary-blue)]">
                  Read guide
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {excludePath ? (
          <p className="mt-6 text-sm text-slate-600">
            Back to the{' '}
            <Link href={config.hubPath} className="font-semibold text-[var(--primary-blue)] underline underline-offset-4">
              {config.hubLabel} overview
            </Link>
            .
          </p>
        ) : null}
      </div>
    </section>
  );
}
