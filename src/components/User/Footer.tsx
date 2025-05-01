import { Cake } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer
        className="border-t bg-background flex flex-col items-center"
        id="contact"
      >
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Cake className="h-6 w-6 text-rose-500" />
                <span className="text-xl font-bold">Sweet Delights</span>
              </div>
              <p className="text-muted-foreground">
                Chúng tôi cung cấp các loại bánh ngọt thơm ngon, được làm thủ
                công từ những nguyên liệu tươi ngon nhất.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Liên kết nhanh</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link
                    href="#products"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Sản phẩm
                  </Link>
                </li>
                <li>
                  <Link
                    href="#about"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Về chúng tôi
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Liên hệ
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Liên hệ</h3>
              <ul className="space-y-2">
                <li className="text-muted-foreground">
                  123 Đường Bánh Ngọt, Quận 1, TP.HCM
                </li>
                <li className="text-muted-foreground">
                  info@sweetdelights.com
                </li>
                <li className="text-muted-foreground">+84 123 456 789</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Giờ mở cửa</h3>
              <ul className="space-y-2">
                <li className="text-muted-foreground">
                  Thứ 2 - Thứ 6: 7:00 - 19:00
                </li>
                <li className="text-muted-foreground">Thứ 7: 8:00 - 20:00</li>
                <li className="text-muted-foreground">
                  Chủ nhật: 8:00 - 18:00
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center">
            <p className="text-muted-foreground">
              © 2024 Sweet Delights. Tất cả các quyền được bảo lưu.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
