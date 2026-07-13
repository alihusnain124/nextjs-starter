import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Dummy auth guard — replace the cookie check with your real session/token
// logic (next-auth, JWT cookie, etc.). Update `matcher` below to cover the
// routes you actually want to protect.
export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
