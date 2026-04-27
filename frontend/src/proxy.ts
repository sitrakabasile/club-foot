import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Next.js Proxy — Elite route protection.
 * Redirects unauthenticated users to /login for protected paths.
 */
export function proxy(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  // Define protected and public routes
  const isProtectedRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/settings");
  const isPublicAuthRoute = pathname === "/login" || pathname === "/register";

  // TEMPORARY: Authentication disabled
  return NextResponse.next();

  /*
  // Redirect if trying to access protected route without token
  if (isProtectedRoute && !token) {
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  // Redirect if trying to access auth routes while already logged in
  if (isPublicAuthRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
  */
}

/**
 * Configure which routes the proxy should run on.
 */
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/settings/:path*",
    "/login",
    "/register",
  ],
};
