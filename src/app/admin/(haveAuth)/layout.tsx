import AdminHeader from "@/components/Admin/Header";
import SideBar from "@/components/Admin/SideBar";
import React from "react";

export default function LayoutAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar />
      <div className="flex-1 flex flex-col w-full">
        <AdminHeader />
        <div className="p-4 container">{children}</div>
      </div>
    </div>
  );
}
