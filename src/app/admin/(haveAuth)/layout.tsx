import SideBar from "@/components/Admin/SideBar";
import React from "react";

export default function LayoutAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <SideBar />
      <div className="p-4">{children}</div>
    </div>
  );
}
