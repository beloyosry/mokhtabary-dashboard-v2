import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the path starts with dashboard
  const isDashboardPage = pathname.startsWith("/dashboard");
  
  // Get the authentication token
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET 
  });
  
  console.log("Middleware check:", { 
    path: pathname, 
    isAuthenticated: !!token,
    userId: token?.id
  });

  // Redirect logic
  if (isDashboardPage) {
    if (!token) {
      // Redirect to login if trying to access dashboard without being authenticated
      console.log("Redirecting to login - No token found");
      const url = new URL("/login", request.url);
      url.searchParams.set("callbackUrl", encodeURI(pathname));
      return NextResponse.redirect(url);
    }
  }
  
  // No more additional checks - this was causing the issue
  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api/auth routes (next-auth)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public assets)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.).*)",
  ],
};
