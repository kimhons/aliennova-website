import { authMiddleware } from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: [
    "/", 
    "/api/chat", 
    "/api/image", 
    "/api/write", 
    "/api/scheduler",
    "/api/translator",
    "/api/summarizer",
    "/api/finance",
    "/api/voice",
    "/learn", 
    "/sign-in", 
    "/sign-up",
    "/chat",
    "/write",
    "/image",
    "/scheduler",
    "/translator",
    "/summarizer",
    "/finance",
    "/voice"
  ]
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
