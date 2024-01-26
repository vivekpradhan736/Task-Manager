import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {

  const authToken = request.cookies.get("authToken")?.value;

//   if (
//     request.nextUrl.pathname === "/api/signin/login" ||
//     request.nextUrl.pathname === "/api/user"
//   ) {
//     return;
//   }

  const loggedInUserNotAccessPaths =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/signup" ||
    request.nextUrl.pathname === "/api/signin/login" ||
    request.nextUrl.pathname === "/api/user/register"

  if (loggedInUserNotAccessPaths) {
    // access not secured route
    if (authToken) {
      return NextResponse.redirect(new URL("/profile/user", request.url));
    }
  } else {
    // accessing secured route

    if (!authToken) {
      if (request.nextUrl.pathname.startsWith("/api")) {
        return NextResponse.json(
          {
            message: "Access Denied !!",
            success: false,
          },
          {
            status: 401,
          }
        );
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  //   return NextResponse.r edirect(new URL("/home", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // "/",
    "/login",
    "/signup",
    "/add-task",
    "/show-tasks",
    "/profile/:path*",
    "/api/:path*",
  ],
};
