// Import dynamically to prevent execution during build time
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Create a middleware function that dynamically imports Clerk's authMiddleware
export async function middleware(request: NextRequest) {
  // Dynamically import auth middleware to prevent execution during build
  const { authMiddleware } = await import("@clerk/nextjs");
  
  // Create the middleware handler with our config
  const handler = authMiddleware({
    publicRoutes: ["/", "/api/chat", "/api/image", "/api/write", "/learn", "/sign-in", "/sign-up"]
  });
  
  // Call the handler with the request
  return handler(request);
}
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
