"use client";

import type React from "react";

import { Eye, EyeOff, Facebook, Mail } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";

export function LoginModal() {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user, logout } = useAuth();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // mutation.mutate({ email, password });
    login(email, password);
  };

  useEffect(() => {
    if (user) setOpen(false);
  }, [user]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
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
          <Button variant="default" className="bg-rose-500 hover:bg-rose-600">
            Đăng nhập
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Đăng nhập
          </DialogTitle>

          <DialogDescription className="text-center">
            Đăng nhập để truy cập tài khoản của bạn và tiếp tục mua sắm
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password" className="text-sm font-medium">
                Mật khẩu
              </Label>
              <Link
                href="/forgot-password"
                className="text-xs text-rose-500 hover:text-rose-600"
              >
                Quên mật khẩu?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" className="text-sm font-medium">
              Ghi nhớ đăng nhập
            </Label>
          </div>
          <Button
            type="submit"
            className="w-full bg-rose-500 hover:bg-rose-600"
          >
            Đăng nhập
          </Button>
        </form>
        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Hoặc đăng nhập với
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <Button variant="outline" className="w-full">
            <Facebook className="mr-2 h-4 w-4 text-blue-600" />
            Facebook
          </Button>
          <Button variant="outline" className="w-full">
            <Mail className="mr-2 h-4 w-4 text-red-500" />
            Google
          </Button>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-center sm:space-x-2">
          <span className="text-sm text-center">
            Chưa có tài khoản?{" "}
            <Link
              href="/register"
              className="text-rose-500 hover:text-rose-600 font-medium"
            >
              Đăng ký ngay
            </Link>
          </span>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
