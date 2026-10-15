import { createCategoryRoute } from '@/components/category/createCategoryRoute';

const route = createCategoryRoute('bt');

// Only the guide pages defined in content/categoryPages.json exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return route.staticParams();
}

export function generateMetadata(props) {
  return route.metadata(props);
}

export default function BalanceTransferGuidePage(props) {
  return route.render(props);
}
