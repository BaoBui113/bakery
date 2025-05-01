"use client";
import { navItems } from "@/app/constant";
import { CakeSlice, LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function SideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };
  return (
    <>
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-white shadow-md transition-all duration-300 ease-in-out relative`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div
            className={`flex items-center ${
              !isSidebarOpen && "justify-center w-full"
            }`}
          >
            <CakeSlice className="h-8 w-8 text-amber-600" />
            {isSidebarOpen && (
              <h1 className="ml-2 text-xl font-semibold text-gray-800">
                Sweet Bakery
              </h1>
            )}
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-1 rounded-md hover:bg-gray-100 ${
              !isSidebarOpen && "absolute -right-4 bg-white border shadow-sm"
            }`}
          >
            <Menu className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <nav className="p-2">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center p-3 rounded-md transition-colors ${
                    isActive(item.href)
                      ? "bg-amber-50 text-amber-700"
                      : "text-gray-700 hover:bg-gray-100"
                  } ${!isSidebarOpen && "justify-center"}`}
                >
                  <item.icon
                    className={`h-5 w-5 ${
                      isActive(item.href) ? "text-amber-600" : "text-gray-500"
                    }`}
                  />
                  {isSidebarOpen && <span className="ml-3">{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 w-full border-t p-4">
          <Link
            href="/logout"
            className={`flex items-center p-3 rounded-md text-gray-700 hover:bg-gray-100 transition-colors ${
              !isSidebarOpen && "justify-center"
            }`}
          >
            <LogOut className="h-5 w-5 text-gray-500" />
            {isSidebarOpen && <span className="ml-3">Đăng xuất</span>}
          </Link>
        </div>
      </aside>
    </>
  );
}
