import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/forum(.*)"]);

export default clerkMiddleware(
  (auth, req) => {
    if (isProtectedRoute(req)) auth().protect();
  },
  { clockSkewInMs: 14000 }
); //paremove na lang pag may issue pa ren taena isang oras para rito T^T

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
