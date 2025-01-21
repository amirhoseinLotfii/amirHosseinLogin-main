import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest ) {
  // const session = await getServerSession(authOption)
  
  const isPrivateRoute = req.nextUrl.pathname.startsWith("/login");
  const token = await req.cookies.get("next-auth.session-token"); // Check the session token

  const isPrivateRoute2 = req.nextUrl.pathname.startsWith("/dashboard");
  const isPrivateRoute3 = req.nextUrl.pathname.startsWith("/sign-up");

  if (token && isPrivateRoute) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }
  
  if (token && isPrivateRoute3) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if(!token && isPrivateRoute2){
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
