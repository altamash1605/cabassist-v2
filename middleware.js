// middleware.js
import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Refresh session cookies if needed
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If already logged in and hits /auth, redirect to /dashboard
  if (req.nextUrl.pathname === "/auth") {
    if (session) {
      const url = req.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  // If not logged in and tries to access /dashboard, redirect to /auth
  if (!session && req.nextUrl.pathname.startsWith("/dashboard")) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: ["/auth", "/dashboard/:path*"],
};
