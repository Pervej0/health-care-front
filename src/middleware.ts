import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getAuthCookieToken } from "./utils/validateCookieToken";

const authRoutes = ["/login", "/register"];

const commonPrivateRoutes = [
  "/dashboard",
  "/dashboard/change-password",
  "/doctors",
  "/doctors/:id",
];
const roleBasedPrivateRoutes = {
  PATIENT: [/^\/dashboard\/patient/],
  DOCTOR: [/^\/dashboard\/doctor/],
  ADMIN: [/^\/dashboard\/admin/],
  SUPER_ADMIN: [/^\/dashboard\/super-admin/],
};

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const refreshToken = getAuthCookieToken();
  const { pathname } = request.nextUrl;
  if (!refreshToken) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (
    refreshToken &&
    (commonPrivateRoutes.includes(pathname) ||
      commonPrivateRoutes.some((route) => pathname.startsWith(route)))
  ) {
    return NextResponse.next();
  }

  let decodeData;
  if (refreshToken) {
    decodeData = jwtDecode(refreshToken) as any;
  }

  const role = decodeData?.role;

  const routes =
    roleBasedPrivateRoutes[role as keyof typeof roleBasedPrivateRoutes];
  if (role && routes) {
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/register", "/dashboard/:page*", "/doctors/:page*"],
};
