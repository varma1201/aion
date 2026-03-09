import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Protect all /admin routes except the login page itself
  if (path.startsWith('/admin') && path !== '/admin') {
    const token = request.cookies.get('admin_token')?.value;
    
    // If there is no token, redirect to login page
    if (!token) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
