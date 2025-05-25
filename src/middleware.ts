// Import dynamically to prevent execution during build time
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Create a middleware function that dynamically imports Clerk's authMiddleware
export async function middleware(request: NextRequest) {
  try {
    // Dynamically import auth middleware to prevent execution during build
    const { authMiddleware } = await import("@clerk/nextjs");
    
    // Create the middleware handler with our config
    const authMiddlewareConfig = {
      publicRoutes: ["/", "/api/chat", "/api/image", "/api/write", "/learn", "/sign-in", "/sign-up"]
    };
    
    // Use a more direct approach to avoid type errors
    // Create a function that matches the expected signature
    const auth = authMiddleware(authMiddlewareConfig);
    
    // Call the auth function with request and event (second parameter)
    return auth(request, { event: {} });
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
}
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
