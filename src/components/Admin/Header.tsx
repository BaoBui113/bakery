"use client";
import {
  getNotification,
  maskReadNotification,
} from "@/services/admin/notification";
import { INotification } from "@/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
dayjs.extend(relativeTime);

export default function AdminHeader() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState({
    role: "admin",
    page: 1,
    limit: 10,
  });
  const { data: listNotification } = useQuery({
    queryKey: ["notifications", JSON.stringify(search)],
    queryFn: getNotification,
  });

  const mutationUpdate = useMutation({
    mutationFn: (notificationId: string) =>
      maskReadNotification(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      setOpen(false);
      router.push("/admin/orders");
    },
    onError: (error) => {
      console.error("Error marking notification as read:", error);
    },
  });

  const unreadCount = listNotification?.metadata?.data?.filter(
    (n: INotification) => !n.read
  ).length;

  return (
    <div className="w-full flex items-center justify-between bg-white px-6 py-3 border-b shadow-sm sticky top-0 z-30">
      <div className="text-xl font-bold text-amber-600">Sweet Bakery Admin</div>
      <div className="relative">
        <button
          className="relative p-2 rounded-full hover:bg-gray-100 transition"
          onClick={() => setOpen((v) => !v)}
        >
          <Bell className="h-6 w-6 text-gray-700" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
              {unreadCount}
            </span>
          )}
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
            <div className="p-4 border-b font-semibold">Thông báo</div>
            {listNotification?.metadata?.data?.length === 0 ? (
              <div className="p-4 text-gray-500 text-center">
                Không có thông báo
              </div>
            ) : (
              listNotification?.metadata?.data?.map((n: INotification) => (
                <div
                  key={n._id}
                  className={`px-4 py-3 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 ${
                    !n.read ? "bg-amber-50" : ""
                  }`}
                  onClick={() => {
                    mutationUpdate.mutate(n._id);
                  }}
                >
                  <div className="font-medium text-gray-800 flex justify-between items-center">
                    {n.title}
                    {!n.read && (
                      <span className="ml-2 w-2 h-2 bg-red-500 rounded-full inline-block" />
                    )}
                  </div>
                  <div className="text-sm text-gray-600">{n.content}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {dayjs(n.createdAt).fromNow()}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
