import { createCategoryRoute } from '@/components/category/createCategoryRoute';

const route = createCategoryRoute('emi');

// Only the guide pages defined in content/categoryPages.json exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return route.staticParams();
}

export function generateMetadata(props) {
  return route.metadata(props);
}

export default function EmiGuidePage(props) {
  return route.render(props);
}
