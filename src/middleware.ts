import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/Welcome", "/dashboard", "/profile","/Ai","/tenant"];

const authRoutes = ["/Login", "/Signup", "/verify-otp"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const currentPath = request.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((route) =>
    currentPath.startsWith(route)
  );
  
  const isAuthRoute = authRoutes.some((route) => currentPath.startsWith(route));

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/Login", request.url));
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/Welcome", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$).*)",
  ],
};