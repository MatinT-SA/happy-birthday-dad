import { NextResponse } from "next/server";

export function middleware(req) {
  const cookie = req.cookies.get("secret")?.value;

  // Must match your chosen password
  const correctPassword = "arash";

  // If user already has correct cookie → allow access
  if (cookie === correctPassword) {
    return NextResponse.next();
  }

  // Otherwise redirect to password page
  return NextResponse.redirect(new URL("/auth", req.url));
}

export const config = {
  matcher: ["/real/:path*"], // protect everything under /real
};
