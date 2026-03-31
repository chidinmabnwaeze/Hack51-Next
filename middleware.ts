import { NextRequest, NextResponse } from "next/server";
import { UserRole } from "@/types/user";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Get user from localStorage (stored as JSON string)
  // Note: In middleware, we check cookies instead since localStorage is client-only
  const userCookie = request.cookies.get("user")?.value;
  let user = null;

  if (userCookie) {
    try {
      user = JSON.parse(userCookie);
    } catch {
      // Invalid cookie, clear it
      const response = NextResponse.next();
      response.cookies.delete("user");
      return response;
    }
  }

  // Allow auth pages regardless of authentication status
  if (pathname.startsWith("/auth/")) {
    return NextResponse.next();
  }

  // If user is not authenticated and trying to access protected routes
  if (!user) {
    // Redirect to login
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Role-based route protection
  const role: UserRole = user.role;

  // Employer routes
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/requests") ||
    pathname.startsWith("/shortlists") ||
    pathname.startsWith("/billing") ||
    pathname.startsWith("/new-request") ||
    pathname.startsWith("/custom-request")
  ) {
    if (role !== "employer") {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  // Admin routes
  if (pathname.startsWith("/admin")) {
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  // Candidate routes
  if (pathname.startsWith("/candidate")) {
    if (role !== "candidate") {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except:
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // - public folder
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
