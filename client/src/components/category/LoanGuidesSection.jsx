import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { GUIDE_GROUPS, GUIDE_GROUP_ORDER } from '@/content/guideLinks';

/**
 * Homepage block linking to every loan guide, grouped by topic.
 * Server-rendered so the links are present in the crawled HTML.
 */
export default function LoanGuidesSection() {
  return (
    <section aria-labelledby="loan-guides-heading" className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 id="loan-guides-heading" className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Explore our loan guides
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Plain-language guides on eligibility, interest rates, documents, EMIs and balance transfers, so you know
            what to check before you apply.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {GUIDE_GROUP_ORDER.map((key) => {
            const group = GUIDE_GROUPS[key];
            return (
              <div key={key} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  <Link href={group.hubPath} className="hover:text-[var(--primary-blue)]">
                    {group.hubLabel}
                  </Link>
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.path}>
                      <Link
                        href={link.path}
                        className="text-sm leading-6 text-slate-600 transition hover:text-[var(--primary-blue)]"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={group.hubPath}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--primary-blue)]"
                >
                  {group.hubLabel} overview
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
