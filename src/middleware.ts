import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { APP_NAME } from "./config";
import Cookies from "js-cookie";

const token_cookie_name = APP_NAME + "-token";

export function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  const tokenLogin = req.cookies.get(token_cookie_name)?.value;

  if (tokenLogin) {
    if (pathname == "/") {
      return NextResponse.redirect("/product");
    }

    return NextResponse.next();
  } else {
    if (pathname == "/") {
      return NextResponse.next();
    }

    return NextResponse.rewrite(`${origin}`);
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/admin/:path*",
};
