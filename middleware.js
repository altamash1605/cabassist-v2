// middleware.js
import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Refresh session cookies if needed
  await supabase.auth.getSession();

  // If already logged in and hits /auth, redirect to /dashboard
  if (req.nextUrl.pathname === "/auth") {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const url = req.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return res;
}

export const config = {
  matcher: ["/auth", "/dashboard/:path*"],
};
