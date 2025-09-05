import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const loginPath = "/admin/login";

  // Allow Next internals + common public assets to pass through
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/api") || // if you want to allow some admin APIs adjust accordingly
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Only protect /admin and its subpaths
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Allow the login page itself (handle trailing slash)
  if (pathname === loginPath || pathname === `${loginPath}/`) {
    return NextResponse.next();
  }

  // Get token
  const token = req.cookies.get("token")?.value;
  if (!token) {
    // redirect to login and preserve original path so login can return the user
    const redirectUrl = new URL(loginPath, req.url);
    redirectUrl.searchParams.set("from", pathname + search);
    return NextResponse.redirect(redirectUrl);
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? "");
    await jose.jwtVerify(token, secret);
    // token valid
    return NextResponse.next();
  } catch {
    // invalid token -> redirect to login (preserve original)
    const redirectUrl = new URL(loginPath, req.url);
    redirectUrl.searchParams.set("from", pathname + search);
    return NextResponse.redirect(redirectUrl);
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
