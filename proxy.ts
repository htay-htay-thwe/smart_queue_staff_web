import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage =
    pathname.startsWith("/auth");

  const isProtected = pathname.startsWith("/dashboard");

  //  Not logged in
  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/auth/loginPage", request.url));
  }

  //  Already logged in
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/loginPage", "/auth/register/stepOne"],
};
