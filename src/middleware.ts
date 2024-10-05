import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)', 
  '/sign-up(.*)', 
  '/',
]);

export default clerkMiddleware((auth, req) => {
  const { userId } = auth();
  console.log("hello from middleware", userId);

  // If user is not authenticated and it's not a public route, redirect to sign-in
  if (!userId && !isPublicRoute(req)) {
    return NextResponse.rewrite(new URL('/sign-in', req.url));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
