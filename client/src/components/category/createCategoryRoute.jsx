import { notFound } from 'next/navigation';

import { getCategoryPage, getClusterPages } from '@/content/categoryClusters';
import { buildMetadata } from '@/lib/seo';

import CategoryPage from './CategoryPage';

function buildCategoryMetadata(page) {
  const base = buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: page.path,
    keywords: [page.h1, `${page.h1} India`, 'Borrowww'],
  });
  // `absolute` keeps the exact title from the SEO brief even if a title template is applied later.
  return { ...base, title: { absolute: page.metaTitle } };
}

/**
 * Builds the pieces of a `[subpage]` route for one cluster. Each route file
 * re-exports them under the names Next.js looks for.
 */
export function createCategoryRoute(cluster) {
  return {
    staticParams: () => getClusterPages(cluster).map((p) => ({ subpage: p.slug })),
    metadata: ({ params }) => {
      const page = getCategoryPage(cluster, params.subpage);
      return page ? buildCategoryMetadata(page) : {};
    },
    render: ({ params }) => {
      const page = getCategoryPage(cluster, params.subpage);
      if (!page) notFound();
      return <CategoryPage page={page} />;
    },
  };
}
