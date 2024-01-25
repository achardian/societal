export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/((?!signin|signup|api|_next/static|_next/image|favicon.ico|public).*)(.+)",
  ],
};
