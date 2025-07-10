import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const cookie = await cookies();
  const token = cookie.get("Session");
  const path = request.nextUrl.pathname;
  const baseUrl = request.nextUrl.origin;
  
  if (path.startsWith("/login") || path.startsWith("/register")) {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } else {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if(path.startsWith("/ronde")) {
      const round = path.split("/").pop();
      const response = await fetch(`${baseUrl}/api/ronde/${round}`, {
        headers: {
          Cookie: `Session=${token.value}`,
        }
      });
      const { message } = await response.json();
      if(message !== "success") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
  }
}

export const config = {
  matcher: ["/dashboard", "/register", "/login", "/data-peserta","/ronde/:round"],
};
