import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Lấy token từ cookie
  const token = req.cookies.get("auth_token");

  // Nếu người dùng đã đăng nhập và truy cập /admin/login, chuyển hướng đến /admin
  if (pathname === "/admin/login") {
    if (token) {
      const adminUrl = new URL("/admin", req.url);
      return NextResponse.redirect(adminUrl);
    }
    return NextResponse.next(); // Cho phép truy cập /admin/login nếu chưa đăng nhập
  }

  // Kiểm tra nếu đường dẫn bắt đầu bằng /admin
  if (pathname.startsWith("/admin")) {
    // Nếu không có token, chuyển hướng đến trang /admin/login
    if (!token) {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Cho phép truy cập nếu đã đăng nhập hoặc không thuộc /admin
  return NextResponse.next();
}

// Chỉ áp dụng middleware cho các đường dẫn bắt đầu bằng /admin
export const config = {
  matcher: ["/admin/:path*"],
};
