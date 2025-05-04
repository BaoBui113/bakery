"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useModal } from "@/context/ModalContext";
import { Cake, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoginModal } from "./LoginModal";
export default function Header() {
  const { user, logout } = useAuth();
  const { countCart } = useCart();
  const router = useRouter();
  const { handleOpenLogin } = useModal();
  return (
    <>
      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between py-4">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Cake className="h-6 w-6 text-rose-500" />
            <span className="text-xl font-bold">Sweet Delights</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Trang chủ
            </Link>
            <Link
              href="#products"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Sản phẩm
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Về chúng tôi
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Liên hệ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <form className="hidden lg:flex relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Tìm kiếm..."
                className="w-[200px] pl-8 md:w-[200px] lg:w-[300px]"
              />
            </form>
            {!!user ? (
              <div className="flex gap-2 items-center cursor-pointer">
                <span>{user.name}</span>
                <Button
                  onClick={() => {
                    logout();
                  }}
                  variant="destructive"
                  className="bg-amber-400 hover:bg-rose-600 cursor-pointer"
                >
                  Đăng xuất
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleOpenLogin}
                variant="default"
                className="bg-rose-500 hover:bg-rose-600"
              >
                Đăng nhập
              </Button>
            )}
            <LoginModal />
            {countCart > 0 && !!user && (
              <Button
                onClick={() => {
                  router.push("/cart");
                }}
                variant="outline"
                size="icon"
                className="relative cursor-pointer"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-xs text-white">
                  {countCart}
                </span>
              </Button>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
