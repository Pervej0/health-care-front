import { JwtPayload, jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { authKey } from "./constant/authKey";

const authRoutes = ["/login", "/register"];

const commonPrivateRoutes = [
  "/dashboard",
  "/dashboard/change-password",
  "/doctors",
];
const roleBasedPrivateRoutes = {
  PATIENT: [/^\/dashboard\/patient/],
  DOCTOR: [/^\/dashboard\/doctor/],
  ADMIN: [/^\/dashboard\/admin/],
  SUPER_ADMIN: [/^\/dashboard\/super-admin/],
};

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = cookies().get(authKey)?.value;
  const { pathname } = request.nextUrl;

  if (!token) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  if (token && commonPrivateRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  let decodeData;
  if (token) {
    decodeData = jwtDecode(token) as any;
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
  matcher: ["/login", "/register", "/dashboard/:page*"],
};
