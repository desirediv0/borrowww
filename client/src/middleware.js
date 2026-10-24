import { NextResponse } from 'next/server';

import { DRAFT_PAGES } from '@/content/draftPages';

// Sends visitors of draft pages to their live replacement (see src/content/draftPages.js).
// 307 is temporary, so browsers don't cache it and a page can be published again later.
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const path = pathname === '/' ? pathname : pathname.replace(/\/+$/, '');
  const target = DRAFT_PAGES[path];
  if (!target) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = target;
  url.search = '';
  return NextResponse.redirect(url, 307);
}

export const config = {
  // Skip Next.js internals, API routes and static files.
  matcher: ['/((?!_next/|api/|.*\\.[a-zA-Z0-9]+$).*)'],
};
