import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const privateRoutes = ["/dashboard", "/profile", "/settings"];

const publicRoutes = ["/login", "/sign-up", "/forgot-password"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });

  if (
    publicRoutes.some((route) => pathname.startsWith(route)) &&
    token?.email
  ) {
    const dashboardUrl = new URL("/dashboard", req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  if (
    privateRoutes.some((route) => pathname.startsWith(route)) &&
    !token?.email
  ) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/login",
    "/sign-up",
  ],
};
